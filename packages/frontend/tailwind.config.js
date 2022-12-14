const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  presets: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'home-h': { raw: '(min-height: 900px)' },
      'home-h-small': { raw: '(min-height: 768px)' },
      xzms: '320px',
      xzs: '360px',
      xxzs: '376px',
      xxs: '415px',
      xs: '601px',
      sm: '640px',
      md: '769px',
      lg: '1025px',
      xl: '1280px',
      '2xl': '1356px',
      '3xl': '1440px',
      '3.5xl': '1536px',
      '4xl': '1920px',
      '5xl': '2560px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
      red: colors.red,
      yellow: colors.amber,
      green: colors.emerald,
      blue: colors.blue,
      indigo: colors.indigo,
      purple: colors.violet,
      pink: colors.pink,
      neutral: {
        border: 'rgba(226, 226, 226, 0.08)',
        '000': '#070707',
        '035': '#E2E2E2',
        '050': '#111111',
        '055': '#AFAFAF',
        '075': '#171717',
        '078': '#757575',
        '080': '#141414',
        '085': '#333333',
        '090': '#1F1F1F',
        '095': '#545454',
        100: '#222222',
        200: '#292929',
        300: '#3C3C3C',
        400: '#505050',
        500: '#6D6D6D',
        600: '#929292',
        700: '#C2C2C2',
        800: '#D7D7D7',
        900: '#EEEEEE',
        1000: ' #FFFFFF',
      },
      colour: {
        b1: '#EDF6FF',
        b2: '#0A87FF',
        b3: '#007DFF',
        b4: '#000C17',
        f1: '#FFC043',
        g1: '#E2FFE8',
        g2: '#00D932',
        g3: '#00C832',
        g4: '#032312',
        r0: '#CF3B32',
        r1: '#FE453A',
        r2: '#CF3B32',
        r3: '#FF500A',
        r4: '#261004',
        r5: '#cf3b3240',
      },
      interface: {
        overlay: 'rgba(7, 7, 7, 0.5)',
      },
    },
    spacing: {
      'feed-in': '16.67vh',
      '15/16': '90.3%',
      '9/16': '56.25%',
      '1/2': '50%',
      px: '1px',
      0: '0px',
      0.5: '2px',
      0.75: '3px',
      1: '4px',
      1.25: '5px',
      1.5: '6px',
      1.75: '7px',
      2: '8px',
      2.5: '10px',
      2.75: '11px',
      3: '12px',
      3.25: '13px',
      3.5: '14px',
      4: '16px',
      4.25: '17px',
      4.5: '18px',
      5: '20px',
      5.25: '21px',
      5.5: '22px',
      6: '24px',
      6.25: '25px',
      6.5: '26px',
      7: '28px',
      8: '32px',
      9: '36px',
      10: '40px',
      10.5: '42px',
      11: '44px',
      12: '48px',
      12.5: '50px',
      13: '52px',
      14: '56px',
      15: '60px',
      16: '64px',
      17: '68px',
      17.5: '70px',
      18: '72px',
      19: '76px',
      20: '80px',
      22.5: '90px',
      23: '92px',
      23.5: '94px',
      24: '96px',
      25: '100px',
      28: '112px',
      32: '128px',
      35: '138px',
      36: '144px',
      37: '149.408px',
      39: '156px',
      40: '160px',
      42.75: '172px',
      44: '176px',
      45: '180px',
      48: '192px',
      52: '208px',
      54.75: '219px',
      56: '224px',
      60: '240px',
      64: '256px',
      73: '294.192px',
      75: '294.192px',
      80: '320px',
      82: '328px',
      83: '331.2px',
      87: '348px',
      88: '356px',
      89: '375px',
      96: '384px',
      100: '404.8px',
      103: '412.8px',
      106.25: '425px',
      110.5: '442px',
      120: '480px',
      150: '553.696px',
      160: '640px',
      180: '720px',
      200: '1792px',
    },
    animation: {
      none: 'none',
      spin: 'spin 1s linear infinite',
      ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      bounce: 'bounce 1s infinite',
    },
    backgroundColor: (theme) => theme('colors'),
    backgroundImage: {
      none: 'none',
      'gradient-hero-enabled':
        'linear-gradient(360deg, rgba(0, 0, 0, 0.16) 0%, rgba(0, 0, 0, 0.159116) 8.07%, rgba(0, 0, 0, 0.156515) 15.54%, rgba(0, 0, 0, 0.152269) 22.5%, rgba(0, 0, 0, 0.146453) 29.04%, rgba(0, 0, 0, 0.139141) 35.26%, rgba(0, 0, 0, 0.130406) 41.25%, rgba(0, 0, 0, 0.120324) 47.1%, rgba(0, 0, 0, 0.108967) 52.9%, rgba(0, 0, 0, 0.0964096) 58.75%, rgba(0, 0, 0, 0.0827259) 64.74%, rgba(0, 0, 0, 0.0679898) 70.96%, rgba(0, 0, 0, 0.0522752) 77.5%, rgba(0, 0, 0, 0.0356561) 84.46%, rgba(0, 0, 0, 0.0182063) 91.93%, rgba(0, 0, 0, 0) 100%)',
      'gradient-hero-hover':
        'linear-gradient(360deg, rgba(0, 0, 0, 0.16) 0%, rgba(0, 0, 0, 0.159116) 8.07%, rgba(0, 0, 0, 0.156515) 15.54%, rgba(0, 0, 0, 0.152269) 22.5%, rgba(0, 0, 0, 0.146453) 29.04%, rgba(0, 0, 0, 0.139141) 35.26%, rgba(0, 0, 0, 0.130406) 41.25%, rgba(0, 0, 0, 0.120324) 47.1%, rgba(0, 0, 0, 0.108967) 52.9%, rgba(0, 0, 0, 0.0964096) 58.75%, rgba(0, 0, 0, 0.0827259) 64.74%, rgba(0, 0, 0, 0.0679898) 70.96%, rgba(0, 0, 0, 0.0522752) 77.5%, rgba(0, 0, 0, 0.0356561) 84.46%, rgba(0, 0, 0, 0.0182063) 91.93%, rgba(0, 0, 0, 0) 100%)',
      'gradient-hero-pressed':
        'linear-gradient(360deg, rgba(0, 0, 0, 0.16) 0%, rgba(0, 0, 0, 0.159116) 8.07%, rgba(0, 0, 0, 0.156515) 15.54%, rgba(0, 0, 0, 0.152269) 22.5%, rgba(0, 0, 0, 0.146453) 29.04%, rgba(0, 0, 0, 0.139141) 35.26%, rgba(0, 0, 0, 0.130406) 41.25%, rgba(0, 0, 0, 0.120324) 47.1%, rgba(0, 0, 0, 0.108967) 52.9%, rgba(0, 0, 0, 0.0964096) 58.75%, rgba(0, 0, 0, 0.0827259) 64.74%, rgba(0, 0, 0, 0.0679898) 70.96%, rgba(0, 0, 0, 0.0522752) 77.5%, rgba(0, 0, 0, 0.0356561) 84.46%, rgba(0, 0, 0, 0.0182063) 91.93%, rgba(0, 0, 0, 0) 100%)',
      'gradient-hero-top':
        ' linear-gradient(360deg, rgba(0, 0, 0, 0.16) 0%, rgba(0, 0, 0, 0.159116) 8.07%, rgba(0, 0, 0, 0.156515) 15.54%, rgba(0, 0, 0, 0.152269) 22.5%, rgba(0, 0, 0, 0.146453) 29.04%, rgba(0, 0, 0, 0.139141) 35.26%, rgba(0, 0, 0, 0.130406) 41.25%, rgba(0, 0, 0, 0.120324) 47.1%, rgba(0, 0, 0, 0.108967) 52.9%, rgba(0, 0, 0, 0.0964096) 58.75%, rgba(0, 0, 0, 0.0827259) 64.74%, rgba(0, 0, 0, 0.0679898) 70.96%, rgba(0, 0, 0, 0.0522752) 77.5%, rgba(0, 0, 0, 0.0356561) 84.46%, rgba(0, 0, 0, 0.0182063) 91.93%, rgba(0, 0, 0, 0) 100%)',
      'gradient-hero-side': 'linear-gradient(77deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0) 85%)',
      'gradient-hero-bottom':
        'linear-gradient( to bottom, hsla(0, 0%, 0%, 0) 0%, hsla(0, 0%, 0%, 0.013) 8.1%, hsla(0, 0%, 0%, 0.049) 15.5%, hsla(0, 0%, 0%, 0.104) 22.5%, hsla(0, 0%, 0%, 0.175) 29%, hsla(0, 0%, 0%, 0.259) 35.3%, hsla(0, 0%, 0%, 0.352) 41.2%, hsla(0, 0%, 0%, 0.45) 47.1%, hsla(0, 0%, 0%, 0.55) 52.9%, hsla(0, 0%, 0%, 0.648) 58.8%, hsla(0, 0%, 0%, 0.741) 64.7%, hsla(0, 0%, 0%, 0.825) 71%, hsla(0, 0%, 0%, 0.896) 77.5%, hsla(0, 0%, 0%, 0.951) 84.5%, hsla(0, 0%, 0%, 0.987) 91.9%, hsl(0, 0%, 0%) 100%)',
      'gradient-to-t': 'linear-gradient(to top, var(--tw-gradient-stops))',
      'gradient-to-tr': 'linear-gradient(to top right, var(--tw-gradient-stops))',
      'gradient-to-r': 'linear-gradient(to right, var(--tw-gradient-stops))',
      'gradient-to-br': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
      'gradient-to-b': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
      'gradient-to-bl': 'linear-gradient(to bottom left, var(--tw-gradient-stops))',
      'gradient-to-l': 'linear-gradient(to left, var(--tw-gradient-stops))',
      'gradient-to-tl': 'linear-gradient(to top left, var(--tw-gradient-stops))',
    },
    backgroundOpacity: (theme) => theme('opacity'),
    backgroundPosition: {
      bottom: 'bottom',
      center: 'center',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top',
    },
    backgroundSize: {
      auto: 'auto',
      cover: 'cover',
      contain: 'contain',
    },
    borderColor: (theme) => ({
      ...theme('colors'),
      DEFAULT: theme('colors.gray.200', 'currentColor'),
    }),
    borderOpacity: (theme) => theme('opacity'),
    borderRadius: {
      none: '0px',
      sm: '2px',
      DEFAULT: '4px',
      md: '6px',
      lg: '8px',
      xl: '12px',
      '2xl': '16px',
      '3xl': '24px',
      full: '9999px',
    },
    borderWidth: {
      DEFAULT: '1px',
      0: '0px',
      1.5: '1.5px',
      2: '2px',
      4: '4px',
      8: '8px',
    },
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      dropdown: '0px 4px 16px rgba(0, 0, 0, 0.12)',
      alert: '0px 16px 48px rgba(0, 0, 0, 0.22)',
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      input: 'inset 0px 3000px 0px rgba(255, 255, 255, 0.08)',
      none: 'none',
      'gradient-white-hover': 'inset 0px 3000px 0px rgba(0, 0, 0, 0.08)',
      'gradient-white-pressed': 'inset 0px 3000px 0px rgba(0, 0, 0, 0.16)',
      'gradient-hover': 'inset 0px 3000px 0px rgba(255, 255, 255, 0.08)',
      'gradient-pressed': 'inset 0px 3000px 0px rgba(255, 255, 255, 0.16)',
      'gradient-hover-inset': '0px 3000px 0px 0px #00000014 inset',
      'gradient-pressed-inset': '0px 3000px 0px 0px #00000029 inset',
      focus: '0px 0px 0px 1.5px #292929',
      hover: '0px 0px 0px 1px #292929',
      transparent: '0px 0px 0px 1px transparent',
      inactive: '0px 0px 0px 1.5px #222222',
      'input-normal': '0 0 0 1px #505050',
      'input-search': '0 0 0 2px #E2E2E2',
      'input-error': '0 0 0 1px #FF5A14',
      'input-valid': '0 0 0 1px #00D932',
      'input-normal-focus': '0 0 0 2px #E2E2E2',
      'input-error-focus': '0 0 0 2px #FF5A14',
      'input-valid-focus': '0 0 0 2px #00D932',
    },
    container: {},
    cursor: {
      auto: 'auto',
      default: 'default',
      pointer: 'pointer',
      wait: 'wait',
      text: 'text',
      move: 'move',
      help: 'help',
      'not-allowed': 'not-allowed',
    },
    divideColor: (theme) => theme('borderColor'),
    divideOpacity: (theme) => theme('borderOpacity'),
    divideWidth: (theme) => theme('borderWidth'),
    fill: { current: 'currentColor' },
    flex: {
      1: '1 1 0%',
      auto: '1 1 auto',
      initial: '0 1 auto',
      none: 'none',
    },
    flexGrow: {
      0: '0',
      DEFAULT: '1',
    },
    flexShrink: {
      0: '0',
      DEFAULT: '1',
    },
    fontFamily: {
      sans: [
        'SF Pro Text',
        '-apple-system',
        'BlinkMacSystemFont, Roboto',
        'Segoe UI',
        'Helvetica',
        'Arial',
        'sans-serif',
      ],
      title: [
        'SF Pro Display',
        '-apple-system',
        'BlinkMacSystemFont, Roboto',
        'Segoe UI',
        'Helvetica',
        'Arial',
        'sans-serif',
      ],
      aeonik: ['Aeonik'],
      serif: ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      mono: [
        'ui-monospace',
        'SFMono-Regular',
        'Menlo',
        'Monaco',
        'Consolas',
        '"Liberation Mono"',
        '"Courier New"',
        'monospace',
      ],
    },
    fontSize: {
      xxs: ['11px', { lineHeight: '14px', letterSpacing: '-0.02rem' }],
      xs: ['12px', { lineHeight: '16px' }],
      xsm: ['13px', { lineHeight: '14px' }],
      sm: ['14px', { lineHeight: '20px' }],
      sb: ['15px', { lineHeight: '20px' }],
      base: ['16px', { lineHeight: '20px', letterSpacing: '0em' }],
      md: ['17px', { lineHeight: '24px', letterSpacing: '0em' }],
      lg: ['18px', { lineHeight: '28px' }],
      xl: ['20px', { lineHeight: '28px' }],
      '1xl': ['22px', { lineHeight: '28px' }],
      '2xl': ['24px', { lineHeight: '32px' }],
      '2.5xl': ['28px', { lineHeight: '32px' }],
      '3xl': ['30px', { lineHeight: '36px' }],
      '3.5xl': ['34px', { lineHeight: '40px' }],
      '4xl': ['36px', { lineHeight: '40px' }],
      '4.5xl': ['44px', { lineHeight: '56px' }],
      '5xl': ['48px', { lineHeight: '1' }],
      '6xl': ['60px', { lineHeight: '1' }],
      '7xl': ['72px', { lineHeight: '1' }],
      '8xl': ['96px', { lineHeight: '1' }],
      '9xl': ['128px', { lineHeight: '1' }],
      header: ['32px', { lineHeight: '32px' }],
      'feature-title': ['21px', { lineHeight: '20px' }],
      hero: ['44px', { lineHeight: '48px', letterSpacing: '0.02rem' }],
      title: ['32px', { lineHeight: '32px', letterSpacing: '-0.02rem' }],
      subtitle: ['16px', { lineHeight: '20px', letterSpacing: '-0.06rem' }],
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    gap: (theme) => theme('spacing'),
    gradientColorStops: (theme) => theme('colors'),
    gridAutoColumns: {
      auto: 'auto',
      min: 'min-content',
      max: 'max-content',
      fr: 'minmax(0, 1fr)',
    },
    gridAutoRows: {
      auto: 'auto',
      min: 'min-content',
      max: 'max-content',
      fr: 'minmax(0, 1fr)',
    },
    gridColumn: {
      auto: 'auto',
      'span-1': 'span 1 / span 1',
      'span-2': 'span 2 / span 2',
      'span-3': 'span 3 / span 3',
      'span-4': 'span 4 / span 4',
      'span-5': 'span 5 / span 5',
      'span-6': 'span 6 / span 6',
      'span-7': 'span 7 / span 7',
      'span-8': 'span 8 / span 8',
      'span-9': 'span 9 / span 9',
      'span-10': 'span 10 / span 10',
      'span-11': 'span 11 / span 11',
      'span-12': 'span 12 / span 12',
      'span-full': '1 / -1',
    },
    gridColumnEnd: {
      auto: 'auto',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
      13: '13',
    },
    gridColumnStart: {
      auto: 'auto',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
      13: '13',
    },
    gridRow: {
      auto: 'auto',
      'span-1': 'span 1 / span 1',
      'span-2': 'span 2 / span 2',
      'span-3': 'span 3 / span 3',
      'span-4': 'span 4 / span 4',
      'span-5': 'span 5 / span 5',
      'span-6': 'span 6 / span 6',
      'span-full': '1 / -1',
    },
    gridRowStart: {
      auto: 'auto',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
    },
    gridRowEnd: {
      auto: 'auto',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
    },
    gridTemplateColumns: {
      none: 'none',
      card: '60% 25% 15%',
      nav: '25% 50% 25%',
      1: 'repeat(1, minmax(0, 1fr))',
      2: 'repeat(2, minmax(0, 1fr))',
      3: 'repeat(3, minmax(0, 1fr))',
      4: 'repeat(4, minmax(0, 1fr))',
      5: 'repeat(5, minmax(0, 1fr))',
      6: 'repeat(6, minmax(0, 1fr))',
      7: 'repeat(7, minmax(0, 1fr))',
      8: 'repeat(8, minmax(0, 1fr))',
      9: 'repeat(9, minmax(0, 1fr))',
      10: 'repeat(10, minmax(0, 1fr))',
      11: 'repeat(11, minmax(0, 1fr))',
      12: 'repeat(12, minmax(0, 1fr))',
    },
    gridTemplateRows: {
      none: 'none',
      1: 'repeat(1, minmax(0, 1fr))',
      2: 'repeat(2, minmax(0, 1fr))',
      3: 'repeat(3, minmax(0, 1fr))',
      4: 'repeat(4, minmax(0, 1fr))',
      5: 'repeat(5, minmax(0, 1fr))',
      6: 'repeat(6, minmax(0, 1fr))',
    },
    height: (theme) => ({
      auto: 'auto',
      ...theme('spacing'),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.666667%',
      '2/6': '33.333333%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      full: '100%',
      screen: '100vh',
      '1/2-screen': '50vh',
      '1/3-screen': '33vh',
      '4/5-screen': '80vh',
      '7/10-screen': '70vh',
    }),
    inset: (theme, { negative }) => ({
      auto: 'auto',
      ...theme('spacing'),
      ...negative(theme('spacing')),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      full: '100%',
      '-1/2': '-50%',
      '-1/3': '-33.333333%',
      '-2/3': '-66.666667%',
      '-1/4': '-25%',
      '-2/4': '-50%',
      '-3/4': '-75%',
      '-full': '-100%',
    }),
    keyframes: {
      spin: {
        to: {
          transform: 'rotate(360deg)',
        },
      },
      ping: {
        '75%, 100%': {
          transform: 'scale(2)',
          opacity: '0',
        },
      },
      pulse: {
        '50%': {
          opacity: '.5',
        },
      },
      bounce: {
        '0%, 100%': {
          transform: 'translateY(-25%)',
          animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
        },
        '50%': {
          transform: 'none',
          animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
        },
      },
    },
    letterSpacing: {
      title: '-0.01em',
      subtitle: '-0.06em',
      tighter: '-0.05em',
      tight: '-0.02em',
      button: '-0.03em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
      3: '12px',
      3.5: '14px',
      4: '16px',
      4.5: '18px',
      5: '20px',
      6: '24px',
      7: '28px',
      8: '32px',
      9: '36px',
      10: '40px',
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
    },
    margin: (theme, { negative }) => ({
      auto: 'auto',
      ...theme('spacing'),
      ...negative(theme('spacing')),
    }),
    maxHeight: (theme) => ({
      ...theme('spacing'),
      full: '100%',
      screen: '100vh',
    }),
    maxWidth: (theme, { breakpoints }) => ({
      none: 'none',
      0: '0rem',
      xs: '320px',
      sm: '384px',
      xsm: '382px',
      md: '448px',
      lg: '512px',
      xl: '576px',
      '2xl': '672px',
      '3xl': '768px',
      '4xl': '896px',
      '5xl': '1024px',
      '6xl': '1152px',
      '7xl': '1280px',
      full: '100%',
      '1/2': '50%',
      '4/5': '80%',
      min: 'min-content',
      max: 'max-content',
      prose: '65ch',
      103: '412.8px',
      106.25: '425px',
      107: '428px',
      110.4: '442px',
      138: '552px',
      1040: '1040px',
      1400: '1400px',
      ...breakpoints(theme('screens')),
    }),
    minHeight: {
      0: '0px',
      10: '40px',
      14: '56px',
      full: '100%',
      screen: '100vh',
    },
    minWidth: (theme) => ({
      0: '0px',
      full: '100%',
      min: 'min-content',
      max: 'max-content',
      ...theme('spacing'),
    }),
    objectPosition: {
      bottom: 'bottom',
      center: 'center',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top',
    },
    opacity: {
      0: '0',
      5: '0.05',
      10: '0.1',
      20: '0.2',
      25: '0.25',
      30: '0.3',
      40: '0.4',
      50: '0.5',
      60: '0.6',
      70: '0.7',
      75: '0.75',
      80: '0.8',
      90: '0.9',
      95: '0.95',
      100: '1',
    },
    order: {
      first: '-9999',
      last: '9999',
      none: '0',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
    },
    outline: {
      none: ['2px solid transparent', '2px'],
      white: ['2px dotted white', '2px'],
      black: ['2px dotted black', '2px'],
      blue: ['2px solid #0084FF', '2px'],
    },
    padding: (theme) => theme('spacing'),
    placeholderColor: (theme) => theme('colors'),
    placeholderOpacity: (theme) => theme('opacity'),
    ringColor: (theme) => ({
      DEFAULT: theme('colors.blue.500', '#3b82f6'),
      ...theme('colors'),
    }),
    ringOffsetColor: (theme) => theme('colors'),
    ringOffsetWidth: {
      0: '0px',
      1: '1px',
      2: '2px',
      4: '4px',
      8: '8px',
    },
    ringOpacity: (theme) => ({
      DEFAULT: '0.5',
      ...theme('opacity'),
    }),
    ringWidth: {
      DEFAULT: '3px',
      0: '0px',
      1: '1px',
      2: '2px',
      4: '4px',
      8: '8px',
    },
    rotate: {
      '-180': '-180deg',
      '-90': '-90deg',
      '-45': '-45deg',
      '-12': '-12deg',
      '-6': '-6deg',
      '-3': '-3deg',
      '-2': '-2deg',
      '-1': '-1deg',
      0: '0deg',
      1: '1deg',
      2: '2deg',
      3: '3deg',
      6: '6deg',
      12: '12deg',
      45: '45deg',
      90: '90deg',
      180: '180deg',
    },
    scale: {
      0: '0',
      50: '.5',
      75: '.75',
      90: '.9',
      95: '.95',
      100: '1',
      105: '1.05',
      110: '1.1',
      125: '1.25',
      150: '1.5',
    },
    skew: {
      '-12': '-12deg',
      '-6': '-6deg',
      '-3': '-3deg',
      '-2': '-2deg',
      '-1': '-1deg',
      0: '0deg',
      1: '1deg',
      2: '2deg',
      3: '3deg',
      6: '6deg',
      12: '12deg',
    },
    space: (theme, { negative }) => ({
      ...theme('spacing'),
      ...negative(theme('spacing')),
    }),
    stroke: {
      current: 'currentColor',
    },
    strokeWidth: {
      0: '0',
      1: '1',
      2: '2',
    },
    textColor: (theme) => theme('colors'),
    textOpacity: (theme) => theme('opacity'),
    transformOrigin: {
      center: 'center',
      top: 'top',
      'top-right': 'top right',
      right: 'right',
      'bottom-right': 'bottom right',
      bottom: 'bottom',
      'bottom-left': 'bottom left',
      left: 'left',
      'top-left': 'top left',
    },
    transitionDelay: {
      75: '75ms',
      100: '100ms',
      150: '150ms',
      200: '200ms',
      300: '300ms',
      500: '500ms',
      700: '700ms',
      1000: '1000ms',
    },
    transitionDuration: {
      DEFAULT: '150ms',
      75: '75ms',
      100: '100ms',
      150: '150ms',
      200: '200ms',
      300: '300ms',
      500: '500ms',
      700: '700ms',
      1000: '1000ms',
    },
    transitionProperty: {
      none: 'none',
      all: 'all',
      DEFAULT:
        'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
      colors: 'background-color, border-color, color, fill, stroke',
      opacity: 'opacity',
      shadow: 'box-shadow',
      transform: 'transform',
      width: 'width',
      'max-height': 'max-height',
      'opacity-max-height': 'opacity, max-height',
    },
    transitionTimingFunction: {
      DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
      linear: 'linear',
      ease: 'ease',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    translate: (theme, { negative }) => ({
      ...theme('spacing'),
      ...negative(theme('spacing')),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      full: '100%',
      '-1/2': '-50%',
      '-1/3': '-33.333333%',
      '-2/3': '-66.666667%',
      '-1/4': '-25%',
      '-2/4': '-50%',
      '-3/4': '-75%',
      '-full': '-100%',
    }),
    width: (theme) => ({
      auto: 'auto',
      ...theme('spacing'),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.666667%',
      '2/6': '33.333333%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      '1/12': '8.333333%',
      '2/12': '16.666667%',
      '3/12': '25%',
      '4/12': '33.333333%',
      '5/12': '41.666667%',
      '6/12': '50%',
      '7/12': '58.333333%',
      '8/12': '66.666667%',
      '9/12': '75%',
      '10/12': '83.333333%',
      '11/12': '91.666667%',
      full: '100%',
      screen: '100vw',
      min: 'min-content',
      max: 'max-content',
    }),
    zIndex: {
      auto: 'auto',
      0: '0',
      10: '10',
      20: '20',
      30: '30',
      40: '40',
      50: '50',
      999: '999',
    },
  },
  variantOrder: [
    'first',
    'last',
    'odd',
    'even',
    'visited',
    'checked',
    'group-hover',
    'group-focus',
    'focus-within',
    'hover',
    'focus',
    'focus-visible',
    'active',
    'disabled',
  ],
  variants: {
    accessibility: ['responsive', 'focus-within', 'focus'],
    alignContent: ['responsive'],
    alignItems: ['responsive'],
    alignSelf: ['responsive'],
    animation: ['responsive'],
    appearance: ['responsive'],
    backdropBlur: ['responsive'],
    backdropFilter: ['responsive'],
    backgroundAttachment: ['responsive'],
    backgroundClip: ['responsive'],
    backgroundColor: ['responsive', 'dark', 'group-hover', 'focus-within', 'hover', 'focus'],
    backgroundImage: ['responsive', 'hover', 'focus', 'active'],
    backgroundOpacity: ['responsive', 'dark', 'group-hover', 'focus-within', 'hover', 'focus'],
    backgroundPosition: ['responsive'],
    backgroundRepeat: ['responsive'],
    backgroundSize: ['responsive'],
    borderCollapse: ['responsive'],
    borderColor: ['responsive', 'dark', 'group-hover', 'focus-within', 'hover', 'focus'],
    borderOpacity: ['responsive', 'dark', 'group-hover', 'focus-within', 'hover', 'focus'],
    borderRadius: ['responsive'],
    borderStyle: ['responsive'],
    borderWidth: ['responsive', 'focus', 'focus-within', 'last'],
    boxShadow: [
      'responsive',
      'group-hover',
      'group-focus',
      'focus-within',
      'hover',
      'focus',
      'active',
    ],
    boxSizing: ['responsive'],
    clear: ['responsive'],
    container: ['responsive'],
    cursor: ['responsive'],
    display: ['responsive', 'group-hover', 'group-focus'],
    divideColor: ['responsive', 'dark'],
    divideOpacity: ['responsive', 'dark'],
    divideStyle: ['responsive'],
    divideWidth: ['responsive'],
    fill: ['responsive'],
    flex: ['responsive'],
    flexDirection: ['responsive'],
    flexGrow: ['responsive'],
    flexShrink: ['responsive'],
    flexWrap: ['responsive'],
    float: ['responsive'],
    fontFamily: ['responsive'],
    fontSize: ['responsive'],
    fontSmoothing: ['responsive'],
    fontStyle: ['responsive'],
    fontVariantNumeric: ['responsive'],
    fontWeight: ['responsive'],
    gap: ['responsive'],
    gradientColorStops: ['responsive', 'dark', 'hover', 'focus'],
    gridAutoColumns: ['responsive'],
    gridAutoFlow: ['responsive'],
    gridAutoRows: ['responsive'],
    gridColumn: ['responsive'],
    gridColumnEnd: ['responsive'],
    gridColumnStart: ['responsive'],
    gridRow: ['responsive'],
    gridRowEnd: ['responsive'],
    gridRowStart: ['responsive'],
    gridTemplateColumns: ['responsive'],
    gridTemplateRows: ['responsive'],
    height: ['responsive'],
    inset: ['responsive'],
    justifyContent: ['responsive'],
    justifyItems: ['responsive'],
    justifySelf: ['responsive'],
    letterSpacing: ['responsive'],
    lineHeight: ['responsive'],
    listStylePosition: ['responsive'],
    listStyleType: ['responsive'],
    margin: ['responsive', 'last'],
    maxHeight: ['responsive', 'group-hover'],
    maxWidth: ['responsive'],
    minHeight: ['responsive'],
    minWidth: ['responsive'],
    objectFit: ['responsive'],
    objectPosition: ['responsive'],
    opacity: ['responsive', 'group-hover', 'focus-within', 'hover', 'focus'],
    order: ['responsive'],
    outline: ['responsive', 'focus-within', 'focus'],
    overflow: ['responsive'],
    overscrollBehavior: ['responsive'],
    padding: ['responsive'],
    placeContent: ['responsive'],
    placeItems: ['responsive'],
    placeSelf: ['responsive'],
    placeholderColor: ['responsive', 'dark', 'focus'],
    placeholderOpacity: ['responsive', 'dark', 'focus'],
    pointerEvents: ['responsive'],
    position: ['responsive'],
    resize: ['responsive'],
    ringColor: ['responsive', 'dark', 'focus-within', 'focus'],
    ringOffsetColor: ['responsive', 'dark', 'focus-within', 'focus'],
    ringOffsetWidth: ['responsive', 'focus-within', 'focus'],
    ringOpacity: ['responsive', 'dark', 'focus-within', 'focus'],
    ringWidth: ['responsive', 'focus-within', 'focus'],
    rotate: ['responsive', 'hover', 'focus'],
    scale: ['responsive', 'hover', 'focus'],
    skew: ['responsive', 'hover', 'focus'],
    space: ['responsive'],
    stroke: ['responsive'],
    strokeWidth: ['responsive'],
    tableLayout: ['responsive'],
    textAlign: ['responsive'],
    textColor: ['responsive', 'dark', 'group-hover', 'focus-within', 'hover', 'focus'],
    textDecoration: ['responsive', 'group-hover', 'focus-within', 'hover', 'focus'],
    textOpacity: ['responsive', 'dark', 'group-hover', 'focus-within', 'hover', 'focus'],
    textOverflow: ['responsive'],
    textTransform: ['responsive'],
    transform: ['responsive'],
    transformOrigin: ['responsive'],
    transitionDelay: ['responsive'],
    transitionDuration: ['responsive'],
    transitionProperty: ['responsive'],
    transitionTimingFunction: ['responsive'],
    translate: ['responsive', 'hover', 'focus'],
    userSelect: ['responsive'],
    verticalAlign: ['responsive'],
    visibility: ['responsive'],
    whitespace: ['responsive'],
    width: ['responsive'],
    wordBreak: ['responsive'],
    zIndex: ['responsive', 'focus-within', 'focus'],
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
