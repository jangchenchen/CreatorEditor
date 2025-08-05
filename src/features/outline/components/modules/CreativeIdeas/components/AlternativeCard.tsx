import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  CompareArrows as AlternativeIcon,
  ThumbUp as ProsIcon,
  ThumbDown as ConsIcon,
  Assessment as ImpactIcon,
  Lightbulb as OriginalIcon
} from '@mui/icons-material';
import { PlotAlternative } from '../../../../types/outline.types';

interface AlternativeCardProps {
  alternative: PlotAlternative;
  onEdit: (alternative: PlotAlternative) => void;
  onDelete: (alternativeId: string) => void;
}

const AlternativeCard: React.FC<AlternativeCardProps> = ({
  alternative,
  onEdit,
  onDelete
}) => {
  const handleDelete = () => {
    if (window.confirm('确定要删除这个情节替代方案吗？')) {
      onDelete(alternative.id);
    }
  };

  return (
    <Card elevation={2}>
      <CardContent>
        {/* 原始情节元素 */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <OriginalIcon sx={{ mr: 1, color: 'info.main' }} />
            原始情节元素
          </Typography>
          <Paper sx={{ p: 2, bgcolor: 'info.50' }}>
            <Typography variant="body1">
              {alternative.originalElement}
            </Typography>
          </Paper>
        </Box>

        {/* 替代版本 */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <AlternativeIcon sx={{ mr: 1, color: 'primary.main' }} />
            替代版本
          </Typography>
          <Paper sx={{ p: 2, bgcolor: 'primary.50' }}>
            <Typography variant="body1">
              {alternative.alternativeVersion}
            </Typography>
          </Paper>
        </Box>

        <Grid container spacing={3}>
          {/* 优点 */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <ProsIcon sx={{ mr: 1, color: 'success.main' }} />
              优点 ({alternative.pros.length})
            </Typography>
            {alternative.pros.length > 0 ? (
              <List dense>
                {alternative.pros.map((pro, index) => (
                  <ListItem key={index} sx={{ pl: 0 }}>
                    <ListItemIcon>
                      <ProsIcon color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={pro} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary">
                暂无优点分析
              </Typography>
            )}
          </Grid>

          {/* 缺点 */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <ConsIcon sx={{ mr: 1, color: 'error.main' }} />
              缺点 ({alternative.cons.length})
            </Typography>
            {alternative.cons.length > 0 ? (
              <List dense>
                {alternative.cons.map((con, index) => (
                  <ListItem key={index} sx={{ pl: 0 }}>
                    <ListItemIcon>
                      <ConsIcon color="error" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={con} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary">
                暂无缺点分析
              </Typography>
            )}
          </Grid>
        </Grid>

        {/* 影响分析 */}
        {alternative.impact && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <ImpactIcon sx={{ mr: 1, color: 'warning.main' }} />
              影响分析
            </Typography>
            <Paper sx={{ p: 2, bgcolor: 'warning.50' }}>
              <Typography variant="body2">
                {alternative.impact}
              </Typography>
            </Paper>
          </Box>
        )}
      </CardContent>
      
      <CardActions>
        <IconButton size="small" onClick={() => onEdit(alternative)}>
          <EditIcon />
        </IconButton>
        <IconButton size="small" color="error" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default AlternativeCard;