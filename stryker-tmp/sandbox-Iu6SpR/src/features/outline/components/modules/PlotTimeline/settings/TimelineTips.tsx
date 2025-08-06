import React from 'react';
import { Alert, List, ListItem, ListItemText, ListItemIcon, Typography } from '@mui/material';

export const TimelineTips: React.FC = () => {
  return (
    <Alert severity="info" sx={{ mb: 2 }}>
      <Typography variant="subtitle2" gutterBottom>
        💡 时间线设计建议
      </Typography>
      <List dense>
        <ListItem>
          <ListItemIcon>•</ListItemIcon>
          <ListItemText primary="时间设定要服务于故事，不必过分拘泥于现实时间的精确性" />
        </ListItem>
        <ListItem>
          <ListItemIcon>•</ListItemIcon>
          <ListItemText primary="关键事件之间要有合理的时间间隔，避免情节过于紧凑" />
        </ListItem>
        <ListItem>
          <ListItemIcon>•</ListItemIcon>
          <ListItemText primary="可以使用相对时间描述，如"三天后"、"一个月前"等" />
        </ListItem>
        <ListItem>
          <ListItemIcon>•</ListItemIcon>
          <ListItemText primary="注意季节、节日等时间要素对故事氛围的影响" />
        </ListItem>
      </List>
    </Alert>
  );
};