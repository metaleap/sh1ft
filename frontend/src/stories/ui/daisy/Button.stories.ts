import type { Meta, StoryObj } from '@storybook/html-vite'
import { fn } from 'storybook/test'

import { cn, html, } from '../../../ui/'
import { Button, type ButtonProps } from '../../../ui/daisy/Button'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'ui/daisy/Button',
  tags: ['autodocs'],
  render: (args) => {
    return html`<Button ...${args}>${args.title}</Button>` as Node
  },
  argTypes: {
    onclick: { action: 'onClick' },
  },
  args: { onclick: fn() },
} satisfies Meta<ButtonProps>

export default meta
type Story = StoryObj<ButtonProps>

export const Neutral: Story = {
  args: {
    title: 'Neutral',
    color: 'neutral',
  },
}

export const Primary: Story = {
  args: {
    title: 'Primary',
    color: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    title: 'Secondary',
    color: 'secondary'
  },
}

export const Accent: Story = {
  args: {
    title: 'Accent',
    color: 'accent',
  },
}

export const Info: Story = {
  args: {
    title: 'Info',
    color: 'info',
  },
}

export const Success: Story = {
  args: {
    title: 'Success',
    color: 'success',
  },
}

export const Warning: Story = {
  args: {
    title: 'Warning',
    color: 'warning',
  },
}

export const Error: Story = {
  args: {
    title: 'Error',
    color: 'error',
  },
}
