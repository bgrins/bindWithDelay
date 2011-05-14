/* 
bindWithDelay jQuery plugin
Author: Brian Grinstead
MIT license: http://www.opensource.org/licenses/mit-license.php

http://github.com/bgrins/bindWithDelay
http://briangrinstead.com/files/bindWithDelay

Usage: 
	See http://api.jquery.com/bind/
	.bindWithDelay( eventType, [ eventData ], handler(eventObject), timeout, throttle )

Examples:
	$("#foo").bindWithDelay("click", function(e) { }, 100);
	$(window).bindWithDelay("resize", { optional: "eventData" }, callback, 1000);
	$(window).bindWithDelay("resize", callback, 1000, true);
*/

(function($) {
$.fn.bindWithDelay = function( type, data, fn, timeout, throttle ) {
	var wait = null;
	var that = this;
	
	if ( $.isFunction( data ) ) {
		throttle = timeout;
		timeout = fn;
		fn = data;
		data = undefined;
	}
	
	function cb() {
		var e = $.extend(true, { }, arguments[0]);
		var throttler = function() {
			wait = null;
			fn.apply(that, [e]);
		};
		
		if (!throttle) { clearTimeout(wait); }
		if (!throttle || !wait) { wait = setTimeout(throttler, timeout); }
	}
	
	return this.bind(type, data, cb);
}
})(jQuery);
