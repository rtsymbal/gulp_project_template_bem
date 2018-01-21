$(function() {
    $.fn.yarp = function(options) {
        var options = options || {};

        this.options = {
            colors: ['gray'],       // Array. Colors to be used randomly
            duration: 750           // Integer. Duration of the ripple animation
        };

        this.options = $.extend({}, this.options, options);

        $(this).each(function(i, e) {

            // No overflow for the selected set of elements
            $(e).css({
                overflow: 'hidden'
            });

            $(e).on('click', function(ev) {
                // Create the ripple element
                var ripple = $('<div></div>').appendTo($(e));

                // Set some initial CSS
                ripple.css({
                    width: 1,
                    height: 1,
                    borderRadius: '50%',
                    opacity: .3,
                    background: this.options.colors[Math.floor(Math.random() * this.options.colors.length)],
                    top: ev.clientY - ($(e).offset().top - $(window).scrollTop()),
                    left: ev.clientX - ($(e).offset().left - $(window).scrollLeft()),
                    position: 'absolute'
                });

                setTimeout(function() {
                    ripple.css({
                        transform: 'scale(1000)',
                        opacity: 0,
                        transition: 'all ' + this.options.duration + 'ms linear'
                    });
                }.bind(this), 0);

                // Remove ripple after it finished animating
                setTimeout(function() {
                    ripple.remove();
                }, this.options.duration);

            }.bind(this));
        }.bind(this));
    };

    $('.rt-button').yarp({
      colors: ['white'],
      duration: 1200
    });
});