var Button = require('../button/')
  , template = require('./search-form.html.hbs')
  , $ = require('jquery-browserify')

var SearchForm = function (opts) {
  this.opts = opts || {}
  this.$el = this.opts.el || $('body')
}

SearchForm.prototype.context = function () {
  return {
    label: this.opts.label || 'Search'
  }
}

SearchForm.prototype.render = function () {
  var self = this
    , data = this.context()
    , button = new Button({
        label: 'search'
      , action: function () {
          self.$el.trigger('search')
        }
      })

  this.$el.append(template(data))
  this.$el.addClass('search-form')
  this.$el.find('.button-target').replaceWith(button.render())
}

module.exports = SearchForm


