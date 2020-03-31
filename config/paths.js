const { resolve } = require('path');

const ROOT_PATH = resolve(__dirname, '../');
const PUBLIC_PATH = resolve(ROOT_PATH, 'public');
const SRC_PATH = resolve(ROOT_PATH, 'src');
const BUILD_PATH = resolve(ROOT_PATH, 'build');

module.exports = {
  ROOT_PATH,
  PUBLIC_PATH,
  SRC_PATH,
  BUILD_PATH
}