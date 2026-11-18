import express from 'express';
import cors from 'cors';
import { runDartCode } from './runner';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Mobile Dev Quest Dart Execution Engine' });
});

// Run standalone Dart code
app.post('/api/code/run', async (req, res) => {
  const { code } = req.body;
  if (!code || typeof code !== 'string') {
    return res.status(400).json({ error: 'Missing code parameter' });
  }

  try {
    const result = await runDartCode(code);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Execution error' });
  }
});

// Submit code against test cases
app.post('/api/code/submit', async (req, res) => {
  const { code, testCases } = req.body;
  if (!code || !Array.isArray(testCases)) {
    return res.status(400).json({ error: 'Missing code or testCases array' });
  }

  try {
    // Generate test harness wrapper in Dart
    let harness = code + '\n\n';
    harness += 'void main() {\n';
    harness += '  int passed = 0;\n';
    harness += `  print("--- TEST HARNESS BEGIN ---");\n`;

    testCases.forEach((tc, idx) => {
      harness += `  try {\n`;
      harness += `    // Test Case ${idx + 1}: ${tc.description}\n`;
      if (tc.testSnippet) {
        harness += `    ${tc.testSnippet}\n`;
      }
      harness += `    print("TEST_${idx}_PASS");\n`;
      harness += `    passed++;\n`;
      harness += `  } catch (e) {\n`;
      harness += `    print("TEST_${idx}_FAIL: $e");\n`;
      harness += `  }\n`;
    });

    harness += `  print("TOTAL_PASSED: $passed / ${testCases.length}");\n`;
    harness += '}\n';

    const result = await runDartCode(harness);
    
    // Parse test results
    const results = testCases.map((tc, idx) => {
      const isPassed = result.stdout.includes(`TEST_${idx}_PASS`);
      return {
        id: tc.id,
        description: tc.description,
        passed: isPassed,
      };
    });

    const passedCount = results.filter((r) => r.passed).length;

    res.json({
      success: passedCount === testCases.length,
      passedCount,
      totalCount: testCases.length,
      results,
      rawOutput: result.stdout,
      rawError: result.stderr,
      executionTimeMs: result.executionTimeMs,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Test evaluation error' });
  }
});

app.listen(PORT, () => {
  console.log(`⚡ Mobile Dev Quest Dart Runner API listening on http://localhost:${PORT}`);
});
