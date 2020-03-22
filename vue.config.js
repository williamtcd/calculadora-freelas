module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/calculadora-freelas/'
    : '/',

  "transpileDependencies": [
    "vuetify"
  ]
}