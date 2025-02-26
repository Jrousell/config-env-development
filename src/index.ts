import {WebpackConfigWithMetadata, get} from '@easy-webpack/core'
const DefinePlugin = require('webpack/lib/DefinePlugin')

/**
 * @param exclude add paths to packages that have problems with their sourcemaps
 */
export = function development({devtool = 'inline-source-map'} = {}) {
  return function development(this: WebpackConfigWithMetadata): WebpackConfigWithMetadata {
    return {
      devtool,
      // devtool: 'eval',
      // devtool: 'cheap-module-source-map',
      // devtool: 'eval-source-map',
      /**
       * Options affecting the output of the compilation.
       *
       * See: http://webpack.github.io/docs/configuration.html#output
       */
      output: {

        /**
         * Specifies the name of each output file on disk.
         * IMPORTANT: You must not specify an absolute path here!
         *
         * See: http://webpack.github.io/docs/configuration.html#output-filename
         */
        filename: '[name].bundle.js',

        /**
         * The filename of the SourceMaps for the JavaScript files.
         * They are inside the output.path directory.
         *
         * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
         */
        sourceMapFilename: '[name].bundle.map',

        /** The filename of non-entry chunks as relative path
         * inside the output.path directory.
         *
         * See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
         */
        chunkFilename: '[id].chunk.js'

      },

      /**
       * Webpack Development Server configuration
       * Description: The webpack-dev-server is a little node.js Express server.
       * The server emits information about the compilation state to the client,
       * which reacts to those events.
       *
       * See: https://webpack.github.io/docs/webpack-dev-server.html
       */
      devServer: {
        port: parseInt(this.metadata.port),
        host: this.metadata.host,
        historyApiFallback: true,
        watchOptions: {
          aggregateTimeout: 300,
          poll: 1000
        }
      },
      plugins: [
        new DefinePlugin({
          '__DEV__': true,
          'ENV': JSON.stringify(this.metadata.ENV),
          'HMR': this.metadata.HMR,
          'process.env': {
            'ENV': JSON.stringify(this.metadata.ENV),
            'NODE_ENV': JSON.stringify(this.metadata.ENV),
            'HMR': this.metadata.HMR,
            'WEBPACK_HOST': JSON.stringify(this.metadata.host),
            'WEBPACK_PORT': JSON.stringify(this.metadata.port)
          }
        })
      ].concat(get(this, 'plugins', []))
    }
  }
}
