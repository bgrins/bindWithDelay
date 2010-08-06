/* 
bindWithDelay jQuery plugin
Author: Brian Grinstead
http://github.com/bgrins/bindWithDelay
Open source code under MIT license: http://www.opensource.org/licenses/mit-license.php

Usage: 
	See http://api.jquery.com/bind/
	.bindWithDelay( eventType, [ eventData ], handler(eventObject), timeout )

Examples:
	$("#foo").bindWithDelay("click", function(e) { }, 100);
	$(window).bindWithDelay("resize", { optional: "eventData" }, callback, 1000);
*/

(function($) {
$.fn.bindWithDelay = function( type, data, fn, timeout ) {
	var wait = null;
	var that = this;
	
	if ( $.isFunction( data ) ) {
		timeout = fn;
		fn = data;
		data = undefined;
	}
		
	var cb = function(e) {
		clearTimeout(wait);
		var cachedEvent = $.extend({}, e);
		
		wait = setTimeout(function() {
			fn.apply(that, [cachedEvent]);
		}, timeout);
	}
	
	return this.bind(type, data, cb);
}
})(jQuery);
