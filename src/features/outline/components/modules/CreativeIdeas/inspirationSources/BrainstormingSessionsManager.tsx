import React from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';

interface BrainstormingSessionsManagerProps {
  brainstormingSessions: string[];
  newSession: string;
  setNewSession: (value: string) => void;
  handleAddSession: () => void;
  handleRemoveSession: (index: number) => void;
}

export const BrainstormingSessionsManager: React.FC<BrainstormingSessionsManagerProps> = ({
  brainstormingSessions,
  newSession,
  setNewSession,
  handleAddSession,
  handleRemoveSession,
}) => {
  return (
    <>
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={4}
          label='记录头脑风暴过程'
          value={newSession}
          onChange={e => setNewSession(e.target.value)}
          placeholder='记录您的思考过程、灵感闪现、创意碰撞的详细内容...'
          sx={{ mb: 2 }}
        />
        <Button
          variant='contained'
          onClick={handleAddSession}
          disabled={!newSession.trim()}
          startIcon={<AddIcon />}
        >
          保存会话
        </Button>
      </Box>

      {brainstormingSessions.length > 0 ? (
        <Grid container spacing={2}>
          {brainstormingSessions.map((session, index) => (
            <Grid item xs={12} key={index}>
              <Card variant='outlined'>
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      mb: 1,
                    }}
                  >
                    <Typography variant='subtitle1' color='secondary'>
                      头脑风暴 #{index + 1}
                    </Typography>
                    <IconButton
                      size='small'
                      color='error'
                      onClick={() => handleRemoveSession(index)}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </Box>
                  <Typography variant='body2' sx={{ whiteSpace: 'pre-wrap' }}>
                    {session}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant='body2' color='text.secondary' sx={{ textAlign: 'center', py: 2 }}>
          暂无头脑风暴记录
        </Typography>
      )}
    </>
  );
};
