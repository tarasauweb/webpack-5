const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

conf = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
    },
    open: true,
    compress: true,
    port: 9000,
  },
  plugins: [
    new CleanWebpackPlugin(),
      
    new HtmlWebpackPlugin({
    title: 'New-App',
    filename: 'index.html',
    template: 'src/index.html'
  })],
  module: {
    rules: [
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
          },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread']
          }
        }
      },
    ],
  },
};


module.exports = (env , options) => {
    let isProd = options.mode ==='production'
    conf.devtool = isProd ? false : 'eval-cheap-module-source-map'
    return conf
}