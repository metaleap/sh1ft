import type { StorybookConfig } from '@storybook/html-vite'

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
  ],
  "framework": "@storybook/html-vite"
}
export default config
