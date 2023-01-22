import { addOpacityToColor } from './utils'

export const breakpoints = {
  tablet: '960px',
  mobile: '480px'
}

export const fonts = {
  base: 'Intel,system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, Ubuntu, "Helvetica Neue", sans-serif'
}

export const colors = {
  black: '#000000',
  white: '#ffffff',
  primary: '#0099ff',
  secondary: '#1c5480',
  background: '#96d5ff',
  right: '#88ff9c',
  wrong: '#ff8787'
}
export const backgroundSmooth = {
  transition: 'background-color 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: addOpacityToColor(colors.background, 0.1)
  }
}

export const fontSizes = {
  text: '18px',
  header: '24px',
  subheader: '20px',
  small: '14px',
  big: '48px',
  extraBig: '96px'
}
