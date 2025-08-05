import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid
} from '@mui/material';

const ReflectionImprovementGuide: React.FC = () => {
  return (
    <Card elevation={1}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          提升思考深度的方法
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  哲学思辨
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • 追问本质：不断问"为什么"<br/>
                  • 对立统一：思考矛盾和统一<br/>
                  • 抽象升华：从具体到一般<br/>
                  • 历史视角：结合时代背景
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="subtitle1" color="secondary" gutterBottom>
                  社会观察
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • 现实关照：关注当代问题<br/>
                  • 批判精神：保持独立思考<br/>
                  • 人文关怀：体现价值立场<br/>
                  • 建设性思维：提供解决思路
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="subtitle1" color="success.main" gutterBottom>
                  个人成长
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • 内省反思：检视内心世界<br/>
                  • 经验总结：提炼人生智慧<br/>
                  • 情感深度：触及真实感受<br/>
                  • 价值澄清：明确人生意义
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="subtitle1" color="warning.main" gutterBottom>
                  表达技巧
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • 巧妙融入：避免生硬说教<br/>
                  • 层次递进：由浅入深展开<br/>
                  • 情理并重：感性与理性结合<br/>
                  • 留白思考：给读者思考空间
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ReflectionImprovementGuide;