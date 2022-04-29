const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const AntdThemePlugin = require('antd-theme-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

/** @type {import('webpack').Configuration} */
module.exports = {
  target: 'web',
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? 'source-map' : 'inline-source-map',
  entry: {
    index: path.resolve(__dirname, 'src/index.js'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: ['node_modules'],
  },
  output: {
    filename: 'js/[name].[fullhash].js',
    chunkFilename: 'js/[name].[fullhash].js',
    hashDigestLength: 8,
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.(css|less)$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './src/index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve('public'),
        to: 'public'
      }],
    }),
    ...(isProd ? [
      new MiniCssExtractPlugin({
        filename: `css/[name].[fullhash].css`,
        chunkFilename: `css/[name].[fullhash].css`,
      }),
    ] : []),
    new AntdThemePlugin({
      indexFileName: 'index.html',
      antDir: path.resolve(__dirname, './node_modules/antd'),
      stylesDir: path.resolve(__dirname, './src/styles'),
      varFile: path.resolve(__dirname, './src/styles/_var.less'),
      mainLessFile: path.resolve(__dirname, './src/styles/global.less'),
      themeVariables: [
        '@primary-color'
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    allowedHosts: 'all',
    port: 3000,
  },
  optimization: isProd ? {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
    splitChunks: {
      cacheGroups: {
        defaultVendors: false,
        default: false
      },
    },
  } : undefined,
}
