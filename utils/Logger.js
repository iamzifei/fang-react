'use strict'

// First, checks if it isn't implemented yet.
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
  /*
   usage: log('This is a test for {0} from {1}', 'A', 'B')
   output: 'This is a test for A from B'
   */
  static log() {
    if (DEBUG) {
      var args = Array.prototype.slice.call(arguments);
      var output = args[0].replace(/{(\d+)}/g, function(match, number) {
        var index = parseInt(number) + 1;
        return typeof args[index] != 'undefined' ? args[index] : match;
      });
      console.log(output);
    }
  }

  static logObject(obj) {
    if (DEBUG) {
      return console.log(obj);
    }
  }
}

module.exports = Logger;
