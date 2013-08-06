
var overlay = require('ios-overlay');

var button = document.createElement('button');
button.innerHTML = 'Loading';

button.addEventListener('click', function() {
    overlay({ text: 'foo', duration: 2000});
});

button // =>

var button = document.createElement('button');
button.innerHTML = 'Success';

button.addEventListener('click', function() {
    overlay({ text: 'Success', icon: 'img/check.png', duration: 2000});
});

button // =>
