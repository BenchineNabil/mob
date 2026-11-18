import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

export interface DartRunResult {
  success: boolean;
  stdout: string;
  stderr: string;
  exitCode: number | null;
  timedOut: boolean;
  executionTimeMs: number;
}

export async function runDartCode(code: string, timeoutMs = 5000): Promise<DartRunResult> {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dart_exec_'));
  const tempFilePath = path.join(tempDir, 'main.dart');

  try {
    fs.writeFileSync(tempFilePath, code, 'utf-8');

    const startTime = Date.now();
    return await new Promise<DartRunResult>((resolve) => {
      let stdout = '';
      let stderr = '';
      let timedOut = false;

      // Spawn dart process
      const child = spawn('dart', ['run', tempFilePath], {
        cwd: tempDir,
        shell: false,
        env: {
          ...process.env,
          // Restrict Dart VM flags if needed
        },
      });

      const timer = setTimeout(() => {
        timedOut = true;
        child.kill('SIGKILL');
      }, timeoutMs);

      child.stdout?.on('data', (data) => {
        stdout += data.toString();
        // Guard against runaway stdout flooding
        if (stdout.length > 50000) {
          child.kill('SIGKILL');
        }
      });

      child.stderr?.on('data', (data) => {
        stderr += data.toString();
        if (stderr.length > 50000) {
          child.kill('SIGKILL');
        }
      });

      child.on('close', (code) => {
        clearTimeout(timer);
        const executionTimeMs = Date.now() - startTime;
        resolve({
          success: code === 0 && !timedOut,
          stdout,
          stderr: timedOut ? 'Execution timed out (5s limit exceeded).' : stderr,
          exitCode: code,
          timedOut,
          executionTimeMs,
        });
      });

      child.on('error', (err) => {
        clearTimeout(timer);
        resolve({
          success: false,
          stdout,
          stderr: `Failed to spawn Dart SDK: ${err.message}`,
          exitCode: -1,
          timedOut: false,
          executionTimeMs: Date.now() - startTime,
        });
      });
    });
  } finally {
    // Clean up temporary files safely
    try {
      if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
      if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });
    } catch (e) {
      // Ignore cleanup errors
    }
  }
}
