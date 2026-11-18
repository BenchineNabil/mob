import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Send, RotateCcw, CheckCircle2, XCircle, Clock, Terminal } from 'lucide-react';
import { executeDartCode, submitDartChallenge, TestCaseResult } from '../../services/dartService';
import { sound } from '../../utils/soundEffects';

interface MonacoCodeEditorProps {
  initialCode: string;
  solutionCode?: string;
  testCases?: { id: string; description: string; expectedOutput: any }[];
  onSuccess?: () => void;
  title?: string;
  subtitle?: string;
}

export const MonacoCodeEditor: React.FC<MonacoCodeEditorProps> = ({
  initialCode,
  testCases = [],
  onSuccess,
  title = 'Dart Sandbox Editor',
  subtitle = 'Write, test, and submit your solution',
}) => {
  const [code, setCode] = useState(initialCode);
  const [consoleOutput, setConsoleOutput] = useState<string>('');
  const [testResults, setTestResults] = useState<TestCaseResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<'console' | 'tests'>('console');
  const [engineUsed, setEngineUsed] = useState<string>('');

  const handleRun = async () => {
    setIsRunning(true);
    sound.playClick();
    setActiveTab('console');
    setConsoleOutput('Compiling and running Dart code...\n');

    try {
      const res = await executeDartCode(code);
      setEngineUsed(res.engine);
      if (res.success) {
        setConsoleOutput(res.stdout || '(Program completed with no output)');
        sound.playSuccess();
      } else {
        setConsoleOutput(`[Execution Error]\n${res.stderr || res.stdout}`);
        sound.playError();
      }
    } catch (e: any) {
      setConsoleOutput(`[Error]: ${e.message}`);
      sound.playError();
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    setIsRunning(true);
    sound.playClick();
    setActiveTab('tests');

    try {
      const res = await submitDartChallenge(code, testCases);
      setTestResults(res.results);
      setEngineUsed(res.engine);

      if (res.success) {
        sound.playFanfare();
        if (onSuccess) onSuccess();
      } else {
        sound.playError();
      }
    } catch (e: any) {
      sound.playError();
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode(initialCode);
    setConsoleOutput('Code reset to template.\n');
    setTestResults([]);
    sound.playClick();
  };

  return (
    <div className="flex flex-col h-full rounded-2xl glass-panel-glow overflow-hidden border border-quest-border/60">
      
      {/* Editor Top Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-quest-surface/90 border-b border-quest-border/60">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-quest-primary animate-pulse" />
            {title}
          </h3>
          <p className="text-[11px] text-quest-muted">{subtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          {engineUsed && (
            <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-quest-card text-quest-muted border border-quest-border/40">
              {engineUsed}
            </span>
          )}

          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg text-quest-muted hover:text-white hover:bg-quest-card transition"
            title="Reset code"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-quest-card hover:bg-quest-border text-white transition disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current text-emerald-400" />
            <span>{isRunning ? 'Running...' : 'Run'}</span>
          </button>

          {testCases.length > 0 && (
            <button
              onClick={handleSubmit}
              disabled={isRunning}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-quest-primary to-quest-secondary hover:from-indigo-600 hover:to-violet-600 text-white transition shadow-md shadow-quest-primary/25 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Solution</span>
            </button>
          )}
        </div>
      </div>

      {/* Editor Main Canvas */}
      <div className="flex-1 min-h-[340px] relative">
        <Editor
          height="100%"
          defaultLanguage="dart"
          language="dart"
          value={code}
          onChange={(val) => setCode(val || '')}
          theme="vs-dark"
          options={{
            fontSize: 13,
            minimap: { enabled: false },
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            formatOnType: true,
          }}
        />
      </div>

      {/* Bottom Output Tabs */}
      <div className="h-44 border-t border-quest-border/60 bg-quest-surface flex flex-col">
        <div className="flex items-center justify-between px-3 border-b border-quest-border/40 bg-quest-card/50">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('console')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold transition border-b-2 ${
                activeTab === 'console'
                  ? 'border-quest-primary text-white'
                  : 'border-transparent text-quest-muted hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Output Console</span>
            </button>

            {testCases.length > 0 && (
              <button
                onClick={() => setActiveTab('tests')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold transition border-b-2 ${
                  activeTab === 'tests'
                    ? 'border-quest-primary text-white'
                    : 'border-transparent text-quest-muted hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>
                  Test Cases ({testResults.filter((t) => t.passed).length}/{testCases.length})
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-3 overflow-y-auto font-mono text-xs">
          {activeTab === 'console' ? (
            <pre className="text-gray-300 whitespace-pre-wrap">
              {consoleOutput || 'Click "Run" to execute your Dart code or "Submit Solution" to run unit tests.'}
            </pre>
          ) : (
            <div className="space-y-2">
              {testResults.length === 0 ? (
                <p className="text-quest-muted font-sans text-xs">
                  Click "Submit Solution" to run automated verification against {testCases.length} unit test assertions.
                </p>
              ) : (
                testResults.map((tc, idx) => (
                  <div
                    key={tc.id || idx}
                    className={`flex items-center justify-between p-2 rounded-lg border text-xs font-sans ${
                      tc.passed
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                        : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {tc.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                      )}
                      <span>{tc.description}</span>
                    </div>
                    <span className="font-mono text-[11px] font-semibold">
                      {tc.passed ? 'PASSED' : 'FAILED'}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
