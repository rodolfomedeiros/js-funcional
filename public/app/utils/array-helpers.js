if (!Array.prototype.$flatMap) {
  Array.prototype.$flatMap = function (cb) {
    return this.map(cb).reduce((array, param) => array.concat(param), []);
  }
}