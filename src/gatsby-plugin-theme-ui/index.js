export default {
  colors: {
    primary: 'rgba(198, 214, 45, 1)',
    primaryTrans: 'rgba(198, 214, 45, 0.75)',
    secondary: 'rgba(96,63,112, 0.7)',
    secondaryTrans: 'rgba(96,63,112, 0.4)',
    tertiary: 'rgba(97,76,107,0.7)',
    text: '#fff',
    background: 'rgba(0,0,0,0.8)',
    muted: '#000',
  },
  fonts: {
    body: 'Assistant',
    heading: 'Reenie Beanie',
    button: 'Reenie Beanie',
  },
  fontSizes: [
    12, // 0
    14, // 1
    16, // 2
    20, // 3
    30, // 4
    40, // 5
  ],
  space: [
    0, // 0
    5, // 1
    10, // 2
    15, // 3
    20, // 4
    25, // 5
    30, // 6
    50, // 7
    100, // 8
  ],
  breakpoints: [ '400px', '800px' ],
  shadows: [
    '0 0 5px #000',
    '0 4px 1px rgba(96,63,112,0.7)'
  ],
  borders: [
    '1px solid #fff',
    '1px solid #000',
  ],
  sizes: {
    minWidth: '320px',
    maxWidth: '1200px',
  },
  radii: [ 10 ],
  styles: {
    hr: {
      border: 'none',
      borderBottom: '1px solid',
      borderColor: 'primary',
      margin: 1,
    },
    h2: {
      fontFamily: 'button',
      fontWeight: 'normal',
      fontSize: 5,
      color: 'text',
      marginY: 2,
      textShadow: 0,
    } 

  }
};