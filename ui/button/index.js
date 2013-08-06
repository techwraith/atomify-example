var $ = require('jquery-browserify')
  , _ = require('lodash')

var Button = function (opts) {
  if (!opts) opts = {}
  this.action = opts.action || function () {};
  this.label = opts.label || 'submit';
}

Button.prototype.render = function () {
  var template = "<button>"+this.label+"</button>"
  this.$el = $(template)
  this.$el.on('click', _.bind(this.action, this))
  return this.$el
}

module.exports = Button
