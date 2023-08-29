

// WEBPACK 5 OVERRIDE POSTS:
// https://www.npmjs.com/package/react-app-rewired
// https://thecodersblog.com/polyfill-node-core-modules-webpack-5
// https://forum.moralis.io/t/solved-breaking-change-webpack-5-used-to-include-polyfills-for-node-js-core-modules-by-default/6875/13

// npm install react-app-rewired --save-dev


const webpack = require('webpack');
module.exports = function override(config, env) {
    //do stuff with the webpack config...

    config.resolve.fallback = {
        url: require.resolve('url'),
        assert: require.resolve('assert'),
        crypto: require.resolve('crypto-browserify'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify/browser'),
        buffer: require.resolve('buffer'),
        stream: require.resolve('stream-browserify'),
    };
    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    );

    return config;
}

// const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

// module.exports = function override(config, env) {
//   // do stuff with the webpack config...

//   config.resolve.fallback = { "util": false }
//   config.resolve.fallback = { "buffer": false }
//   config.resolve.fallback = { "crypto": false }
//   config.resolve.fallback = { "crypto": false }

//   config.plugins.push(new NodePolyfillPlugin())
//   return config
// }


// module.exports = {
//     // ... other webpack config
//   resolve : {
//     fallback: {
//           // Use can only include required modules. Also install the package.
//           // for example: npm install --save-dev assert
//           url: require.resolve('url'),
//           fs: require.resolve('fs'),
//           assert: require.resolve('assert'),
//           crypto: require.resolve('crypto-browserify'),
//           http: require.resolve('stream-http'),
//           https: require.resolve('https-browserify'),
//           os: require.resolve('os-browserify/browser'),
//           buffer: require.resolve('buffer'),
//           stream: require.resolve('stream-browserify'),
//       }
//     },
//     plugins: [
//       new webpack.ProvidePlugin({
//           process: 'process/browser',
//           Buffer: ['buffer', 'Buffer'],
//       })
//     ]
// }
  