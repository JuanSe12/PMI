module.exports = {
  mode: 'development',
  entry: {
    controller:"./src/pages/menu/controller.js",
    controller: "./src/pages/home/controller.js"
  },          
    output: {
    filename: './bundle.js',
  },
};