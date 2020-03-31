## webpack-react-setup

webpack 4 + babel 7 + react 16 多页面环境配置，以下是相关配置记录。

### 优化Loader

优化 Loader 的文件搜索范围

最常用的应该就是 `babel-loader` 了。

`include` 只在 src 目录下查找。

`exclude` 排除的路径。 node_modules下面使用的代码都是编译过的，无需再去处理一遍。

对于 `babel-loader` 来说，通过设置 `cacheDirectory` 为 `true` ，我们可以将 Babel 编译过的文件缓存起来，下次只需要编译更改过的代码文件即可，这样可以大幅度加快打包时间。

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: resolve('src'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-transform-runtime'
            ]
          }
        }
      }
    ]
  }
}
```



### 压缩代码

`drop_console`  配置是否移除代码中的 `console.log` 

`splitChunks`  用于分割公共类库，减少重复打包

`concatenateModules` 开启Scope Hoisting

> Scope Hoisting 会分析出模块之间的依赖关系，尽可能的把打包出来的模块合并到一个函数中去。

```javascript
module.exports = {
  optimization: {
    minimizer: [
      new TerserPlugin({
        exclude: /node_modules/,
        sourceMap: true,
        terserOptions: {
          compress: {
            drop_console: true
          },
          ie8: false
        },
      })
    ],
    splitChunks: {
      chunks: 'initial',
      automaticNameDelimiter: '.',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: 1
        },
        commons: {
          name: 'commons',
          chunks: "initial",
          minChunks: 2
        }
      }
    },
    runtimeChunk: {
      name: 'runtime'
    },
    concatenateModules: true,
  },
}
```



### 本地图片处理

使用 `require` 引入图片，需要在 `url-loader` 配置开启 `CommonJS` 写法。

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'assets/images/[name].[hash:8].[ext]',
            esModule: false
          }
        }
      }
    ]
  }
}
```



### 其他

`resolve.extensions`：用来表明文件后缀列表，默认查找顺序是 `['.js', '.json']`，如果你的导入文件没有添加后缀就会按照这个顺序查找文件。我们应该尽可能减少后缀列表长度，然后将出现频率高的后缀排在前面。