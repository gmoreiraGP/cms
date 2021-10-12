import { extendTheme, colors } from '@chakra-ui/react'
import { StepsStyleConfig as Steps } from 'chakra-ui-steps'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
  colors: {
    ...colors,
    tan: {
      100: '#ecd2c9',
      200: '#e4c0b3',
      300: '#e0b7a8',
      400: '#dcae9d',
      500: '#d9a593',
      600: '#c39484',
      700: '#ad8475',
      800: '#977366',
      900: '#826358',
    },
  },
  components: {
    Steps,
  },
}

const theme = extendTheme(config)

export default theme
