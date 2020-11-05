const path = require("path");

module.exports = {
  entry: [
    "./js/util.js",
    "./js/debounce.js",
    "./js/preview.js",
    "./js/pictures-rendering.js",
    "./js/pictures-filters.js",
    "./js/gallery.js",
    "./js/upload.js",
    "./js/upload-form-status-message.js",
    "./js/upload-form-image-settings.js",
    "./js/upload-form-validity.js",
    "./js/picture.js",
    "./js/load.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
