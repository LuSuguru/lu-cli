module.exports = function (api) {
  api.cache(true)

  return {
    plugins: [
      [
        "@babel/plugin-proposal-decorators",
        {
          legacy: true
        }
      ],
      [
        "@babel/plugin-proposal-class-properties",
        {
          loose: true
        }
      ],
      [
        "@babel/plugin-transform-runtime",
        {
          helpers: false,
        }
      ],
      "@babel/plugin-proposal-optional-chaining",
      "@babel/plugin-syntax-dynamic-import"
    ],
    presets: [
      [
        "@babel/env",
        {
          targets: {
            ie: 9
          },
          modules: false,
          useBuiltIns: "usage"
        }
      ],
      "@babel/react"
    ]
  }
}
