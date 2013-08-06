var xtend = require('xtend');

var iosOverlay = function(params) {

	var overlayDOM;
	var noop = function() {};
	var defaults = {
		onbeforeshow: noop,
		onshow: noop,
		onbeforehide: noop,
		onhide: noop,
		text: '',
		icon: null,
		spinner: null,
		duration: null,
		id: null
	};

	// setup overlay settings
	var settings = xtend(defaults, params);

	var handleAnim = function(anim) {
		destroy();
		settings.onhide();
	};

	// IIFE
	var create = (function() {

		// initial DOM creation and event binding
		overlayDOM = document.createElement('div');
		overlayDOM.className = 'ios-overlay';
		overlayDOM.innerHTML += '<span class="title">' + settings.text + '</span>';

		if (params.icon) {
			if (typeof params.icon == 'string') {
				overlayDOM.innerHTML += '<img src="' + params.icon + '">';
			} else {
				overlayDOM.appendChild(params.icon);
			}
		} else if (params.spinner) {
			overlayDOM.appendChild(params.spinner.el);
		}

		document.body.appendChild(overlayDOM);

		settings.onbeforeshow();

		// browser glitch so we can properly fade in
		setTimeout(function() {
			overlayDOM.className += ' show';
		}, 10);

		if (settings.duration) {
			setTimeout(function() {
				hide();
			},settings.duration);
		}

	})();

	var hide = function() {
		// pre-callback
		settings.onbeforehide();
		// fade out

		overlayDOM.className = overlayDOM.className.replace('show','hide');
		overlayDOM.addEventListener('webkitTransitionEnd', handleAnim, false);
		overlayDOM.addEventListener('msTransitionEnd', handleAnim, false);
		overlayDOM.addEventListener('oTransitionEnd', handleAnim, false);
		overlayDOM.addEventListener('transitionend', handleAnim, false);
	};

	var destroy = function() {
		document.body.removeChild(overlayDOM);
	};

	var update = function(params) {
		if (params.text) {
			overlayDOM.getElementsByTagName('span')[0].innerHTML = params.text;
		}
		if (params.icon) {
			if (settings.spinner) {
				settings.spinner.el.parentNode.removeChild(settings.spinner.el);
			}
			overlayDOM.innerHTML += '<img src="' + params.icon + '">';
		}
	};

	return {
		hide: hide,
		destroy: destroy,
		update: update
	};
};

module.exports = iosOverlay;
