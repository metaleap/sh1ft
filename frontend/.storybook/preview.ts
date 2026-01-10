import type { Preview } from '@storybook/html-vite'
import '../src/style.css'
import './preview.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo' // show a11y violations in the test UI only
    }
  },
}

export default preview
