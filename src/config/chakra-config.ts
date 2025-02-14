import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          value: '#04A51E',
        },
        outline: {
          value: '#3F3F3F',
        },
        card: {
          value: '#262626',
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
