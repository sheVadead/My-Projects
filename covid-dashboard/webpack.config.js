const path = require('path');

const conf = {
  entry: ['@babel/polyfill', './script.js'],
  devtool: 'eval-source-map',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
    publicPath: 'dist/',
  },
  devServer: {
    overlay: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
    ],
  },
};

module.exports = (env, options) => {
  const production = options.mode === 'production';
  conf.devtool = production ? false : 'eval-source-map';
  return conf;
};
