module.exports = {
  plugins: [
    [
      'import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      }, 'for antd'
    ],
    '@babel/transform-runtime'
  ],
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ],
}
