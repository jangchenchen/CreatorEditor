import {
  AutoAwesome as InspirationIcon,
  Book as BookIcon,
  Movie as MovieIcon,
  MusicNote as MusicIcon,
  Image as ImageIcon,
  Public as WebIcon,
  Person as PersonIcon
} from '@mui/icons-material';

export const getSourceIcon = (source: string) => {
  const lowerSource = source.toLowerCase();
  
  if (lowerSource.includes('书') || lowerSource.includes('小说') || lowerSource.includes('文学')) {
    return BookIcon;
  } else if (lowerSource.includes('电影') || lowerSource.includes('影视') || lowerSource.includes('电视')) {
    return MovieIcon;
  } else if (lowerSource.includes('音乐') || lowerSource.includes('歌曲') || lowerSource.includes('歌词')) {
    return MusicIcon;
  } else if (lowerSource.includes('图') || lowerSource.includes('画') || lowerSource.includes('艺术')) {
    return ImageIcon;
  } else if (lowerSource.includes('网') || lowerSource.includes('网站') || lowerSource.includes('博客')) {
    return WebIcon;
  } else if (lowerSource.includes('人') || lowerSource.includes('对话') || lowerSource.includes('交流')) {
    return PersonIcon;
  }
  
  return InspirationIcon;
};