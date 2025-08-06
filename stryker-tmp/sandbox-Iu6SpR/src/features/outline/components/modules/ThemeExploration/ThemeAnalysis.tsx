import React from 'react';
import {
  Box,
  Typography,
  Divider,
  Button
} from '@mui/material';
import { 
  PrimaryTheme,
  ThemeList,
  ThemeDescriptionList,
  ThemeAnalysisGuide,
  useThemeAnalysis
} from './index';
import {
  AutoAwesome as SymbolIcon,
  Transform as MetaphorIcon,
  Pattern as MotifIcon
} from '@mui/icons-material';

const ThemeAnalysis: React.FC = () => {
  const {
    primaryTheme,
    setPrimaryTheme,
    secondaryThemes,
    symbols,
    metaphors,
    motifs,
    inputs,
    updateInput,
    handleAddItem,
    handleRemoveItem,
    handleSave
  } = useThemeAnalysis();

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        主题分析
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        深入分析故事的核心主题、象征意义和表现手法，挖掘作品的深层内涵。
      </Typography>

      {/* 主要主题 */}
      <PrimaryTheme 
        value={primaryTheme}
        onChange={setPrimaryTheme}
      />

      {/* 次要主题 */}
      <ThemeList
        title="次要主题"
        items={secondaryThemes}
        inputValue={inputs.newSecondaryTheme}
        inputLabel="添加次要主题"
        inputPlaceholder="例如: 友情、成长、正义与邪恶..."
        onInputChange={(value) => updateInput('newSecondaryTheme', value)}
        onAdd={() => handleAddItem('secondary')}
        onRemove={(index) => handleRemoveItem('secondary', index)}
        color="secondary"
      />

      {/* 象征意义 */}
      <ThemeDescriptionList
        title="象征意义"
        items={symbols}
        inputValue={inputs.newSymbol}
        inputLabel="添加象征元素"
        inputPlaceholder="描述某个具体事物的象征意义..."
        onInputChange={(value) => updateInput('newSymbol', value)}
        onAdd={() => handleAddItem('symbol')}
        onRemove={(index) => handleRemoveItem('symbol', index)}
        icon={<SymbolIcon />}
        color="warning"
        tip="象征是用具体事物代表抽象概念的手法，如玫瑰象征爱情，白鸽象征和平。"
      />

      {/* 隐喻元素 */}
      <ThemeDescriptionList
        title="隐喻元素"
        items={metaphors}
        inputValue={inputs.newMetaphor}
        inputLabel="添加隐喻表达"
        inputPlaceholder="描述用于隐喻的表达方式..."
        onInputChange={(value) => updateInput('newMetaphor', value)}
        onAdd={() => handleAddItem('metaphor')}
        onRemove={(index) => handleRemoveItem('metaphor', index)}
        icon={<MetaphorIcon />}
        color="info"
        tip="隐喻是暗示性的比较，不用"像"、"如"等词，直接说甲是乙，如"人生是一场旅行"。"
      />

      {/* 重复元素/母题 */}
      <ThemeDescriptionList
        title="重复元素/母题"
        items={motifs}
        inputValue={inputs.newMotif}
        inputLabel="添加重复元素"
        inputPlaceholder="描述在故事中反复出现的元素或主题..."
        onInputChange={(value) => updateInput('newMotif', value)}
        onAdd={() => handleAddItem('motifs')}
        onRemove={(index) => handleRemoveItem('motifs', index)}
        icon={<MotifIcon />}
        color="success"
        tip="母题是在作品中反复出现的主题、形象或情节模式，通过重复强化主题。"
      />

      {/* 保存按钮 */}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleSave}
          sx={{ minWidth: 120 }}
        >
          保存主题分析
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* 主题分析指南 */}
      <ThemeAnalysisGuide />
    </Box>
  );
};

export default ThemeAnalysis;