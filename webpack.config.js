module.exports = {
  mode: 'development',
  entry: {
    controller:"./src/pages/menu/controller.js",
    controller: "./src/pages/home/controller.js",
    controller: "./src/pages/view-project/view-project-controller.js"
  },          
    output: {
    filename: './bundle.js',
  },
};