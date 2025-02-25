module.exports = {
  presets: [
    ['@babel/preset-env', { 
      modules: false,
      targets: {
        browsers: ['last 2 versions', 'not dead']
      }
    }],
    ['@babel/preset-react', { 
      runtime: 'automatic'
    }]
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    'babel-plugin-styled-components',
    process.env.NODE_ENV !== 'production' && 'react-refresh/babel'
  ].filter(Boolean)
}; 