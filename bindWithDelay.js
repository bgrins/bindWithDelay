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
    $("#foo").bindWithDelay("click", '.bar', callback, 1000, true);
    $(window).bindWithDelay("resize", { optional: "eventData" }, callback, 1000);
    $(window).bindWithDelay("resize", callback, 1000, true);
*/

(function($) {

$.fn.bindWithDelay = function( type, selector, data, fn, timeout, throttle ) {

    if ( $.isFunction( selector ) ) {
        throttle = fn;
        timeout = data;
        fn = selector;
        data = undefined;
        selector = undefined;
    } else if ( $.isFunction( data ) ) {
        throttle = timeout;
        timeout = fn;
        fn = data;
        if ( typeof selector === "string" ) {
            data = undefined;
        } else {
            data = selector;
            selector = undefined;
        }
    }

    // Allow delayed function to be removed with fn in unbind function
    fn.guid = fn.guid || ($.guid && $.guid++);

    // Bind each separately so that each element has its own delay
    return this.each(function() {

        var wait = null;

        function cb() {
            var e = $.extend(true, { }, arguments[0]);
            var ctx = this;
            var throttler = function() {
                wait = null;
                fn.apply(ctx, [e]);
            };

            if (!throttle) { clearTimeout(wait); wait = null; }
            if (!wait) { wait = setTimeout(throttler, timeout); }
        }

        cb.guid = fn.guid;

        if (selector) {
            $(this).on(type, selector, data, cb);
        } else {
            $(this).on(type, data, cb);
        }

    });
};

})(jQuery);
