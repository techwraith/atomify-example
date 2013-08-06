var overlay = require('ios-overlay')
  , SearchForm  = require('./search-form/')

window.search = new SearchForm({
  el: $('#search-target')
, label: 'Search this site:'
})

search.$el.on('search', function () {

  var searchOverlay = overlay({text: 'searching'})

  setTimeout(function () {

    searchOverlay.update({text: 'Done'})

    setTimeout(function () {
      searchOverlay.hide()
    }, 300)

  }, 1000)
})

search.render()
