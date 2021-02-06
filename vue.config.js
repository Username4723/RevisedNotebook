module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Red5684'
        return args
      })
  },
  configureWebpack: {
    module: {
      rules: [{
        test: /\.md$/,
        use: [
          {
            loader: "html-loader"
          },
          {
            loader: "markdown-loader",
            options: {
                /* your options here */
            }
          }
        ]
      }]
    }
  }
}
