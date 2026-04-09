/** Theme definitions — colour schemes available in the theme switcher. */

export interface Theme {
  name: string
  bg: string
  surface: string
  border: string
  primary: string
  secondary: string
  accent: string
  text: string
  dim: string
  red: string
  amber: string
}

export const THEMES: Theme[] = [
  {
    name: 'Matrix',
    bg: '#0a0e14',
    surface: '#111820',
    border: '#1e2a3a',
    primary: '#00ff9f',
    secondary: '#00e5ff',
    accent: '#c792ea',
    text: '#c5cdd8',
    dim: '#5c6b7a',
    red: '#ff5252',
    amber: '#ffb300',
  },
  {
    name: 'Tokyo Night',
    bg: '#1a1b26',
    surface: '#24283b',
    border: '#3b4261',
    primary: '#7aa2f7',
    secondary: '#bb9af7',
    accent: '#7dcfff',
    text: '#c0caf5',
    dim: '#565f89',
    red: '#f7768e',
    amber: '#e0af68',
  },
  {
    name: 'Monochrome',
    bg: '#0a0a0a',
    surface: '#141414',
    border: '#262626',
    primary: '#ffffff',
    secondary: '#a0a0a0',
    accent: '#ffffff',
    text: '#e0e0e0',
    dim: '#606060',
    red: '#ff4444',
    amber: '#cccccc',
  },
  {
    name: 'Dracula',
    bg: '#282a36',
    surface: '#2d2f3d',
    border: '#44475a',
    primary: '#ff79c6',
    secondary: '#8be9fd',
    accent: '#bd93f9',
    text: '#f8f8f2',
    dim: '#6272a4',
    red: '#ff5555',
    amber: '#f1fa8c',
  },
  {
    name: 'Nord',
    bg: '#2e3440',
    surface: '#3b4252',
    border: '#434c5e',
    primary: '#88c0d0',
    secondary: '#81a1c1',
    accent: '#b48ead',
    text: '#eceff4',
    dim: '#7b88a1',
    red: '#bf616a',
    amber: '#ebcb8b',
  },
  {
    name: 'Gruvbox',
    bg: '#1d2021',
    surface: '#282828',
    border: '#3c3836',
    primary: '#fe8019',
    secondary: '#8ec07c',
    accent: '#fabd2f',
    text: '#ebdbb2',
    dim: '#928374',
    red: '#fb4934',
    amber: '#fabd2f',
  },
  {
    name: 'Ayu Dark',
    bg: '#0b0e14',
    surface: '#0f131a',
    border: '#1c2028',
    primary: '#e6b450',
    secondary: '#39bae6',
    accent: '#f07178',
    text: '#bfbdb6',
    dim: '#636a72',
    red: '#f07178',
    amber: '#e6b450',
  },
  {
    name: 'Ice',
    bg: '#0b1520',
    surface: '#101d2e',
    border: '#1a2d44',
    primary: '#a8d8ea',
    secondary: '#88c8e8',
    accent: '#c8e8ff',
    text: '#d0e4f0',
    dim: '#5a7a90',
    red: '#ff6b8a',
    amber: '#ffe4a0',
  },
]
