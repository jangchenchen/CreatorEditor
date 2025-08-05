import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Psychology as PrimaryIcon,
  AutoAwesome as SymbolIcon,
  Transform as MetaphorIcon,
  Pattern as MotifIcon,
  Add as AddIcon,
  Remove as RemoveIcon
} from '@mui/icons-material';
import { selectOutline } from '../../../outlineSlice';

const ThemeAnalysis: React.FC = () => {
  const dispatch = useDispatch();
  const outline = useSelector(selectOutline);
  const themes = outline.themes.themes;
  
  // 主题状态
  const [primaryTheme, setPrimaryTheme] = useState(themes.primary);
  const [secondaryThemes, setSecondaryThemes] = useState<string[]>(themes.secondary);
  const [symbols, setSymbols] = useState<string[]>(themes.symbols);
  const [metaphors, setMetaphors] = useState<string[]>(themes.metaphors);
  const [motifs, setMotifs] = useState<string[]>(themes.motifs);

  // 临时输入状态
  const [newSecondaryTheme, setNewSecondaryTheme] = useState('');
  const [newSymbol, setNewSymbol] = useState('');
  const [newMetaphor, setNewMetaphor] = useState('');
  const [newMotif, setNewMotif] = useState('');

  const handleAddItem = (type: 'secondary' | 'symbol' | 'metaphor' | 'motif') => {
    const getValues = () => {
      switch (type) {
        case 'secondary': return { value: newSecondaryTheme, setter: setSecondaryThemes, current: secondaryThemes, reset: setNewSecondaryTheme };
        case 'symbol': return { value: newSymbol, setter: setSymbols, current: symbols, reset: setNewSymbol };
        case 'metaphor': return { value: newMetaphor, setter: setMetaphors, current: metaphors, reset: setNewMetaphor };
        case 'motif': return { value: newMotif, setter: setMotifs, current: motifs, reset: setNewMotif };
      }
    };

    const { value, setter, current, reset } = getValues();
    
    if (value.trim() && !current.includes(value.trim())) {
      setter([...current, value.trim()]);
      reset('');
    }
  };

  const handleRemoveItem = (type: 'secondary' | 'symbol' | 'metaphor' | 'motif', index: number) => {
    switch (type) {
      case 'secondary':
        setSecondaryThemes(secondaryThemes.filter((_, i) => i !== index));
        break;
      case 'symbol':
        setSymbols(symbols.filter((_, i) => i !== index));
        break;
      case 'metaphor':
        setMetaphors(metaphors.filter((_, i) => i !== index));
        break;
      case 'motif':
        setMotifs(motifs.filter((_, i) => i !== index));
        break;
    }
  };

  const handleSave = () => {
    // TODO: 使用 dispatch 更新 Redux state
    const updatedThemes = {
      primary: primaryTheme,
      secondary: secondaryThemes,
      symbols,
      metaphors,
      motifs
    };
    console.log('保存主题分析:', updatedThemes);
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        主题分析
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        深入分析故事的核心主题、象征意义和表现手法，挖掘作品的深层内涵。
      </Typography>

      {/* 主要主题 */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
            <PrimaryIcon sx={{ mr: 1, color: 'primary.main' }} />
            主要主题
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="核心主题阐述"
            value={primaryTheme}
            onChange={(e) => setPrimaryTheme(e.target.value)}
            placeholder="深入阐述故事的核心主题，这是作品要传达的最重要的思想..."
            variant="outlined"
          />
          <Box sx={{ mt: 2, p: 2, bgcolor: 'primary.50', borderRadius: 1 }}>
            <Typography variant="caption" color="primary.main">
              💡 提示：主要主题应该贯穿整个故事，在情节发展和角色成长中得到体现和深化。
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* 次要主题 */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">
            次要主题 ({secondaryThemes.length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                fullWidth
                size="small"
                label="添加次要主题"
                value={newSecondaryTheme}
                onChange={(e) => setNewSecondaryTheme(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddItem('secondary')}
                placeholder="例如: 友情、成长、正义与邪恶..."
              />
              <Button 
                variant="contained" 
                onClick={() => handleAddItem('secondary')}
                disabled={!newSecondaryTheme.trim()}
                startIcon={<AddIcon />}
              >
                添加
              </Button>
            </Box>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {secondaryThemes.map((theme, index) => (
                <Chip
                  key={index}
                  label={theme}
                  onDelete={() => handleRemoveItem('secondary', index)}
                  color="secondary"
                  variant="outlined"
                />
              ))}
              {secondaryThemes.length === 0 && (
                <Typography variant="body2" color="text.secondary">
                  暂无次要主题
                </Typography>
              )}
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* 象征意义 */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
            <SymbolIcon sx={{ mr: 1, color: 'warning.main' }} />
            象征意义 ({symbols.length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                fullWidth
                size="small"
                multiline
                rows={2}
                label="添加象征元素"
                value={newSymbol}
                onChange={(e) => setNewSymbol(e.target.value)}
                placeholder="描述某个具体事物的象征意义..."
              />
              <Button 
                variant="contained" 
                onClick={() => handleAddItem('symbol')}
                disabled={!newSymbol.trim()}
                sx={{ minWidth: 80 }}
              >
                添加
              </Button>
            </Box>
            
            {symbols.length > 0 ? (
              <List>
                {symbols.map((symbol, index) => (
                  <ListItem key={index} sx={{ bgcolor: 'warning.50', mb: 1, borderRadius: 1 }}>
                    <ListItemIcon>
                      <SymbolIcon color="warning" />
                    </ListItemIcon>
                    <ListItemText primary={symbol} />
                    <IconButton 
                      size="small" 
                      color="error"
                      onClick={() => handleRemoveItem('symbol', index)}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                暂无象征元素
              </Typography>
            )}
          </Box>
          
          <Box sx={{ p: 2, bgcolor: 'warning.50', borderRadius: 1 }}>
            <Typography variant="caption" color="warning.main">
              💡 象征是用具体事物代表抽象概念的手法，如玫瑰象征爱情，白鸽象征和平。
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* 隐喻元素 */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
            <MetaphorIcon sx={{ mr: 1, color: 'info.main' }} />
            隐喻元素 ({metaphors.length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                fullWidth
                size="small"
                multiline
                rows={2}
                label="添加隐喻表达"
                value={newMetaphor}
                onChange={(e) => setNewMetaphor(e.target.value)}
                placeholder="描述用于隐喻的表达方式..."
              />
              <Button 
                variant="contained" 
                onClick={() => handleAddItem('metaphor')}
                disabled={!newMetaphor.trim()}
                sx={{ minWidth: 80 }}
              >
                添加
              </Button>
            </Box>
            
            {metaphors.length > 0 ? (
              <List>
                {metaphors.map((metaphor, index) => (
                  <ListItem key={index} sx={{ bgcolor: 'info.50', mb: 1, borderRadius: 1 }}>
                    <ListItemIcon>
                      <MetaphorIcon color="info" />
                    </ListItemIcon>
                    <ListItemText primary={metaphor} />
                    <IconButton 
                      size="small" 
                      color="error"
                      onClick={() => handleRemoveItem('metaphor', index)}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                暂无隐喻元素
              </Typography>
            )}
          </Box>
          
          <Box sx={{ p: 2, bgcolor: 'info.50', borderRadius: 1 }}>
            <Typography variant="caption" color="info.main">
              💡 隐喻是暗示性的比较，不用"像"、"如"等词，直接说甲是乙，如"人生是一场旅行"。
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* 重复元素/母题 */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
            <MotifIcon sx={{ mr: 1, color: 'success.main' }} />
            重复元素/母题 ({motifs.length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                fullWidth
                size="small"
                multiline
                rows={2}
                label="添加重复元素"
                value={newMotif}
                onChange={(e) => setNewMotif(e.target.value)}
                placeholder="描述在故事中反复出现的元素或主题..."
              />
              <Button 
                variant="contained" 
                onClick={() => handleAddItem('motif')}
                disabled={!newMotif.trim()}
                sx={{ minWidth: 80 }}
              >
                添加
              </Button>
            </Box>
            
            {motifs.length > 0 ? (
              <List>
                {motifs.map((motif, index) => (
                  <ListItem key={index} sx={{ bgcolor: 'success.50', mb: 1, borderRadius: 1 }}>
                    <ListItemIcon>
                      <MotifIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary={motif} />
                    <IconButton 
                      size="small" 
                      color="error"
                      onClick={() => handleRemoveItem('motif', index)}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                暂无重复元素
              </Typography>
            )}
          </Box>
          
          <Box sx={{ p: 2, bgcolor: 'success.50', borderRadius: 1 }}>
            <Typography variant="caption" color="success.main">
              💡 母题是在作品中反复出现的主题、形象或情节模式，通过重复强化主题。
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>

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
      <Card elevation={1}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            主题分析要点
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                层次递进
              </Typography>
              <Typography variant="body2" color="text.secondary">
                从主要主题到次要主题，形成层次清晰的主题体系，避免主题过于分散。
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                表现手法
              </Typography>
              <Typography variant="body2" color="text.secondary">
                通过象征、隐喻、母题等文学手法来表现主题，增强作品的艺术性和感染力。
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                情节结合
              </Typography>
              <Typography variant="body2" color="text.secondary">
                主题要与情节发展和角色成长紧密结合，在故事推进中自然展现，避免生硬说教。
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                读者共鸣
              </Typography>
              <Typography variant="body2" color="text.secondary">
                选择能引起目标读者共鸣的主题，关注当代人关心的话题和价值观念。
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ThemeAnalysis;