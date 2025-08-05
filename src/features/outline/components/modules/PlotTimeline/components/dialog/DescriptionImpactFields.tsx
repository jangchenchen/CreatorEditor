import React from 'react';
import { Grid, TextField, Autocomplete } from '@mui/material';

interface DescriptionImpactFieldsProps {
  description: string;
  impact: string;
  consequences: string[];
  onDescriptionChange: (value: string) => void;
  onImpactChange: (value: string) => void;
  onConsequencesChange: (event: any, newValue: string[]) => void;
}

export const DescriptionImpactFields: React.FC<DescriptionImpactFieldsProps> = ({
  description,
  impact,
  consequences,
  onDescriptionChange,
  onImpactChange,
  onConsequencesChange
}) => {
  return (
    <>
      <Grid item xs={12}>
        <TextField
          fullWidth
          multiline
          rows={3}
          label="事件描述"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          multiline
          rows={2}
          label="对故事的影响"
          value={impact}
          onChange={(e) => onImpactChange(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Autocomplete
          multiple
          freeSolo
          options={[]}
          value={consequences}
          onChange={onConsequencesChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="后续影响"
              placeholder="输入后果并按回车"
            />
          )}
        />
      </Grid>
    </>
  );
};