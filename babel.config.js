module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@src': './src',
        '@controllers': './src/controllers',
      },
    }],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
  ],
}
