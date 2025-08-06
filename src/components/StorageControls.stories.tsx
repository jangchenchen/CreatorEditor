import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import StorageControls from '../features/outline/components/StorageControls';

const meta: Meta<typeof StorageControls> = {
  title: 'Components/StorageControls',
  component: StorageControls,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '存储控制组件 - 提供保存、加载、导入导出等存储相关功能',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onSave: {
      description: '保存回调函数',
      action: 'saved',
    },
    onLoad: {
      description: '加载回调函数',
      action: 'loaded',
    },
    onExport: {
      description: '导出回调函数',
      action: 'exported',
    },
    onImport: {
      description: '导入回调函数',
      action: 'imported',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用控件',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 基础故事
export const Default: Story = {
  args: {
    onSave: action('save-clicked'),
    onLoad: action('load-clicked'),
    onExport: action('export-clicked'),
    onImport: action('import-clicked'),
  },
};

// 禁用状态
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

// 加载状态
export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story: '显示加载状态时的存储控件外观',
      },
    },
  },
};

// 紧凑模式
export const Compact: Story = {
  args: {
    ...Default.args,
    variant: 'compact',
  },
  parameters: {
    docs: {
      description: {
        story: '紧凑布局模式，适用于空间有限的场景',
      },
    },
  },
};