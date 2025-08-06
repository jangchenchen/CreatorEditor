import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@mui/material';
import { Save, Upload, Download, Delete } from '@mui/icons-material';

// 创建一个封装的按钮组件用于演示
interface CreationButtonProps {
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  icon?: 'save' | 'upload' | 'download' | 'delete' | 'none';
  children: React.ReactNode;
  onClick?: () => void;
}

const CreationButton: React.FC<CreationButtonProps> = ({
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  disabled = false,
  icon = 'none',
  children,
  onClick,
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'save': return <Save />;
      case 'upload': return <Upload />;
      case 'download': return <Download />;
      case 'delete': return <Delete />;
      default: return null;
    }
  };

  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      disabled={disabled}
      startIcon={getIcon()}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

const meta: Meta<typeof CreationButton> = {
  title: 'Design System/Button',
  component: CreationButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'CreationEditor设计系统中的基础按钮组件，基于Material-UI Button构建',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
      description: '按钮样式变体',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
      description: '按钮颜色主题',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '按钮尺寸',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
    },
    icon: {
      control: 'select',
      options: ['save', 'upload', 'download', 'delete', 'none'],
      description: '图标类型',
    },
    children: {
      control: 'text',
      description: '按钮文本',
    },
    onClick: {
      action: 'clicked',
      description: '点击回调',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 基础按钮
export const Primary: Story = {
  args: {
    children: '保存项目',
    icon: 'save',
  },
};

// 次要按钮
export const Secondary: Story = {
  args: {
    variant: 'outlined',
    color: 'secondary',
    children: '取消操作',
  },
};

// 危险操作按钮
export const Danger: Story = {
  args: {
    color: 'error',
    children: '删除角色',
    icon: 'delete',
  },
};

// 文本按钮
export const Text: Story = {
  args: {
    variant: 'text',
    children: '了解更多',
  },
};

// 小尺寸按钮
export const Small: Story = {
  args: {
    size: 'small',
    children: '导入数据',
    icon: 'upload',
  },
};

// 大尺寸按钮
export const Large: Story = {
  args: {
    size: 'large',
    children: '导出小说',
    icon: 'download',
  },
};

// 禁用状态
export const Disabled: Story = {
  args: {
    children: '保存中...',
    disabled: true,
    icon: 'save',
  },
};

// 按钮组合示例
export const ButtonGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <CreationButton icon="save" color="primary">保存</CreationButton>
      <CreationButton icon="upload" variant="outlined" color="secondary">导入</CreationButton>
      <CreationButton icon="download" variant="outlined" color="info">导出</CreationButton>
      <CreationButton icon="delete" variant="outlined" color="error">删除</CreationButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示不同类型按钮的组合使用效果',
      },
    },
  },
};