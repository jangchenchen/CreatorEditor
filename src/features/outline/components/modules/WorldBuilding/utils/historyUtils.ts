export const handleAddItem = (
  type: 'legend' | 'secret' | 'mystery',
  value: string,
  current: string[],
  setter: (items: string[]) => void,
  resetInput: (value: string) => void
) => {
  if (value.trim() && !current.includes(value.trim())) {
    setter([...current, value.trim()]);
    resetInput('');
  }
};

export const handleRemoveItem = (
  type: 'legend' | 'secret' | 'mystery',
  index: number,
  legends: string[],
  setLegends: (items: string[]) => void,
  familySecrets: string[],
  setFamilySecrets: (items: string[]) => void,
  mysteries: string[],
  setMysteries: (items: string[]) => void
) => {
  if (type === 'legend') {
    setLegends(legends.filter((_, i) => i !== index));
  } else if (type === 'secret') {
    setFamilySecrets(familySecrets.filter((_, i) => i !== index));
  } else {
    setMysteries(mysteries.filter((_, i) => i !== index));
  }
};

export const createHistoryUpdate = (
  timeline: any[],
  legends: string[],
  familySecrets: string[],
  mysteries: string[]
) => ({
  timeline,
  legends,
  familySecrets,
  mysteries,
});
