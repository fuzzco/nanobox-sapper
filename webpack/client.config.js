const webpack = require('webpack');
const config = require('sapper/webpack/config.js');
const sass = require('node-sass');

const mode = process.env.NODE_ENV;
const isDev = mode === 'development';

module.exports = {
	entry: config.client.entry(),
	output: config.client.output(),
	resolve: {
		extensions: ['.js', '.json', '.html'],
		mainFields: ['svelte', 'module', 'browser', 'main']
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				use: {
					loader: 'svelte-loader',
					options: {
						hydratable: true,
						hotReload: true,
						style: ({ content, attributes }) => {
              if (attributes.type !== "text/scss") return;
              return new Promise((fulfil, reject) => {
                sass.render(
                  {
                    data: content,
                    includePaths: ['routes'],
                    sourceMap: true,
                    importer: function(url, prev) {
                      return { file: url };
                    },
                    outFile: "x" // this is necessary, but is ignored
	                },
	                (err, result) => {
                    if (err) return reject(err);
                    fulfil({
                      code: result.css.toString(),
                      map: result.map
                    });
                  }
                );
              });
            }
					}
				}
			}
		]
	},
	mode,
	plugins: [
		isDev && new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.browser': true,
			'process.env.NODE_ENV': JSON.stringify(mode)
		}),
	].filter(Boolean),
	devtool: isDev && 'inline-source-map'
};
