/**
 * 导出功能测试运行器
 * 用于在开发模式下测试导出功能
 */

import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Alert,
  Chip,
  Divider,
} from '@mui/material';
import {
  PlayArrow as TestIcon,
  CheckCircle as SuccessIcon,
  Error as ErrorIcon,
  Description as JsonIcon,
  Article as WordIcon,
  PictureAsPdf as PdfIcon,
} from '@mui/icons-material';
import {
  runAllExportTests,
  testJsonExport,
  testWordExport,
  testPdfExport,
} from '../utils/exportTester';

interface TestResult {
  success: boolean;
  error?: string;
  duration?: number;
}

interface TestResults {
  json?: TestResult;
  word?: TestResult;
  pdf?: TestResult;
  overall: boolean;
}

const ExportTestRunner: React.FC = () => {
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState<TestResults>({ overall: false });
  const [currentTest, setCurrentTest] = useState<string>('');

  const formatNames = {
    json: 'JSON 格式',
    word: 'Word 文档',
    pdf: 'PDF 文档',
  };

  const formatIcons = {
    json: JsonIcon,
    word: WordIcon,
    pdf: PdfIcon,
  };

  const runSingleTest = async (format: 'json' | 'word' | 'pdf') => {
    setTesting(true);
    setCurrentTest(formatNames[format]);

    const startTime = Date.now();
    let result: TestResult;

    try {
      switch (format) {
        case 'json':
          result = await testJsonExport();
          break;
        case 'word':
          result = await testWordExport();
          break;
        case 'pdf':
          result = await testPdfExport();
          break;
      }

      result.duration = Date.now() - startTime;
      setResults(prev => ({ ...prev, [format]: result }));
    } catch (error) {
      result = {
        success: false,
        error: String(error),
        duration: Date.now() - startTime,
      };
      setResults(prev => ({ ...prev, [format]: result }));
    }

    setTesting(false);
    setCurrentTest('');
  };

  const runAllTests = async () => {
    setTesting(true);
    setResults({ overall: false });

    try {
      setCurrentTest('运行所有导出测试...');
      const startTime = Date.now();

      const testResults = await runAllExportTests();

      const duration = Date.now() - startTime;

      setResults({
        json: {
          success: testResults.json.success,
          error: testResults.json.error,
          duration: duration / 3,
        },
        word: {
          success: testResults.word.success,
          error: testResults.word.error,
          duration: duration / 3,
        },
        pdf: {
          success: testResults.pdf.success,
          error: testResults.pdf.error,
          duration: duration / 3,
        },
        overall: testResults.overall,
      });
    } catch (error) {
      setResults({
        overall: false,
        json: { success: false, error: String(error) },
        word: { success: false, error: String(error) },
        pdf: { success: false, error: String(error) },
      });
    }

    setTesting(false);
    setCurrentTest('');
  };

  const clearResults = () => {
    setResults({ overall: false });
  };

  const renderTestResult = (format: keyof TestResults, result?: TestResult) => {
    if (format === 'overall') return null;

    const IconComponent = formatIcons[format as keyof typeof formatIcons];
    const name = formatNames[format as keyof typeof formatNames];

    return (
      <Box key={format} sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <IconComponent sx={{ mr: 1 }} />
          <Typography variant='subtitle2'>{name}</Typography>
          <Box sx={{ ml: 'auto' }}>
            {result ? (
              <Chip
                icon={result.success ? <SuccessIcon /> : <ErrorIcon />}
                label={result.success ? '通过' : '失败'}
                color={result.success ? 'success' : 'error'}
                size='small'
              />
            ) : (
              <Chip label='未测试' variant='outlined' size='small' />
            )}
          </Box>
        </Box>

        {result && (
          <Box sx={{ pl: 4 }}>
            {result.duration && (
              <Typography variant='caption' color='textSecondary'>
                耗时: {result.duration}ms
              </Typography>
            )}
            {result.error && (
              <Alert severity='error' sx={{ mt: 1 }}>
                <Typography variant='caption'>{result.error}</Typography>
              </Alert>
            )}
          </Box>
        )}

        <Divider sx={{ mt: 1 }} />
      </Box>
    );
  };

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', mt: 2 }}>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          📋 导出功能测试
        </Typography>

        <Typography variant='body2' color='textSecondary' sx={{ mb: 3 }}>
          测试JSON、Word、PDF三种导出格式的功能完整性
        </Typography>

        {/* 测试控制按钮 */}
        <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Button
            variant='contained'
            startIcon={<TestIcon />}
            onClick={runAllTests}
            disabled={testing}
            size='small'
          >
            运行全部测试
          </Button>

          <Button
            variant='outlined'
            startIcon={<JsonIcon />}
            onClick={() => runSingleTest('json')}
            disabled={testing}
            size='small'
          >
            测试JSON
          </Button>

          <Button
            variant='outlined'
            startIcon={<WordIcon />}
            onClick={() => runSingleTest('word')}
            disabled={testing}
            size='small'
          >
            测试Word
          </Button>

          <Button
            variant='outlined'
            startIcon={<PdfIcon />}
            onClick={() => runSingleTest('pdf')}
            disabled={testing}
            size='small'
          >
            测试PDF
          </Button>

          {Object.keys(results).some(
            key => key !== 'overall' && results[key as keyof TestResults]
          ) && (
            <Button
              variant='text'
              onClick={clearResults}
              disabled={testing}
              size='small'
              color='secondary'
            >
              清除结果
            </Button>
          )}
        </Box>

        {/* 测试进度 */}
        {testing && (
          <Box sx={{ mb: 2 }}>
            <Typography variant='body2' sx={{ mb: 1 }}>
              {currentTest}
            </Typography>
            <LinearProgress />
          </Box>
        )}

        {/* 整体结果 */}
        {(results.json || results.word || results.pdf) && (
          <Box sx={{ mb: 2 }}>
            <Alert severity={results.overall ? 'success' : 'warning'} sx={{ mb: 2 }}>
              <Typography variant='subtitle2'>
                整体测试结果: {results.overall ? '✅ 全部通过' : '⚠️ 部分失败'}
              </Typography>
            </Alert>
          </Box>
        )}

        {/* 详细结果 */}
        {(results.json || results.word || results.pdf) && (
          <Box>
            <Typography variant='subtitle2' sx={{ mb: 2 }}>
              测试详情:
            </Typography>
            {renderTestResult('json', results.json)}
            {renderTestResult('word', results.word)}
            {renderTestResult('pdf', results.pdf)}
          </Box>
        )}

        {/* 使用说明 */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant='caption' display='block' gutterBottom>
            💡 测试说明:
          </Typography>
          <Typography variant='caption' display='block'>
            • 测试将创建示例数据并尝试导出到不同格式
          </Typography>
          <Typography variant='caption' display='block'>
            • 成功的测试会生成下载文件
          </Typography>
          <Typography variant='caption' display='block'>
            • 失败信息会显示具体错误原因
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ExportTestRunner;
