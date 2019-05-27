const {VueLoaderPlugin} = require('vue-loader')
const path = require('path')
const glob = require('glob')
const env = Object.assign({}, require('dotenv').config().parsed, {
  OSS_KEY: process.env.OSS_KEY,
  OSS_SECRET: process.env.OSS_SECRET,
  OSS_BUCKET: process.env.OSS_BUCKET,
  OSS_REGION: process.env.OSS_REGION
})

const demos = glob.sync('docs/!(basic).md')
const demoSections = demos.map(filePath => ({
  name: path.basename(filePath, '.md'),
  content: filePath
}))

module.exports = {
  styleguideDir: 'docs',
  pagePerSection: true,
  ribbon: {
    url: 'https://github.com/FEMessage/upload-to-ali'
  },
  sections: [
    {
      name: 'Components',
      components: 'src/*.vue',
      usageMode: 'expand'
    },
    {
      name: 'Demo',
      content: 'docs/basic.md',
      sections: demoSections
    }
  ],
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader']
        },
        {
          test: /\.styl(us)?$/,
          loaders: ['vue-style-loader', 'css-loader', 'stylus-loader']
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new (require('webpack')).DefinePlugin({
        'process.env': JSON.stringify(env)
      })
    ]
  }
}
