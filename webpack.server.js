const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    server: './src/server/index.ts',
    app: './src/server/app-export.ts',  
  },
  target: 'node',
  externals: [
    nodeExternals({ allowlist: [
        /^(?!express$|^fs$|^path$|^dotenv$)/ 
      ]
    })
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.build.json',
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ['css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: 'css-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
