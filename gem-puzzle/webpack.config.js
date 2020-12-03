const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
module.exports = (env, options) => {
    const isProduction = options.mode === 'produciton';

    const config = {
        mode: isProduction ? 'production':'development',
        devtool: isProduction ? '' : 'source-map',
        watch: !isProduction,
        entry: ['./src/index.js', './src/render.js', './src/gameRules.js', './src/style.scss'],
        output: {
            path: path.join(__dirname, '/dist'),
            filename: 'script.js'
        },
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                          presets: ['@babel/preset-env']
                        }
                      }          
                },
                {
                    test: /\.scss$/,
                    use: [
                      
                        MiniCssExtractPlugin.loader,'css-loader','sass-loader'
                          
                    ]
                        
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    use: [
                      {
                        loader: 'file-loader',
                        options: {
                          outputPath: 'img/'
                        }
                      },
                      
                    ],
                  },
                  {
                    test:/\.mp3$/i,
                    use: [{
                      loader: 'file-loader',
                      options: {
                        outputPath: 'audio/'
                      }
                    }]
                  },
                  {
                    test: /\.css$/i,
                    use: ['css-loader'],
                  },
                  {
                    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                      {
                        loader: 'file-loader',
                        options: {
                          name: '[name].[ext]',
                          outputPath: 'fonts/'
                      }
                    }
                    ]
                  }              
            ]
        },
        plugins: [
            // new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './src/index.html'
            }),
            new ESLintPlugin(),
            new MiniCssExtractPlugin({
                filename: 'style.css'
            }),
            new CopyPlugin({
              patterns: [
                { from: "./src/audio", to: "audio" },
                { from: "./src/img", to: "img" }
              ],
            }),
        ]
    }
    
    return config;
}
