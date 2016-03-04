'use strict'

// First, checks if it isn't implemented yet.
// "{0} is dead, but {1} is alive! {0} {2}".format("ASP", "ASP.NET")
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
        ;
    });
  };
}

const DEBUG = true;

class Logger {
  static log(pattern, ...parameters) {
    if (DEBUG) {
      return console.log(pattern.format(parameters)); //ToDo: there is a bug here, {0} {1} not working
    }
  }

  static logObject(obj) {
    if (DEBUG) {
      return console.log(obj);
    }
  }
}

module.exports = Logger;
