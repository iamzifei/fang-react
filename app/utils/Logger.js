'use strict'

// First, checks if it isn't implemented yet.
// "{0} is dead, but {1} is alive! {0} {2}".format("ASP", "ASP.NET")
if (!String.prototype.format) {
  console.log("polyfilling String.prototype.format()");
  String.prototype.format = function () {
    var args = [].slice.call(arguments);
    return this.replace(/(\{\d+\})/g, function (a){
      return args[+(a.substr(1,a.length-2))||0];
    });
  };
}

const DEBUG = true;

class Logger {
  static log(pattern, ...parameters) {
    if (DEBUG) {
      return console.log(pattern.format(parameters));
    }
  }
}

module.exports = Logger;
