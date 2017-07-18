var app = app || {};
app.main = {
    carousel: function () {
        var $carousel = $('.carousel-wrap');
        if ($carousel.length > 0) {
            var wW = $(window).width(),
                xRadius, yRadius;


            if (wW > 1440) {
                xRadius = 490;
                yRadius = 125;
            } else if (wW > 1280) {
                xRadius = 340;
                yRadius = 100;
            } else if (wW > 1180) {
                xRadius = 320;
                yRadius = 100;
            } else if (wW > 1024) {
                xRadius = 320;
                yRadius = 100;
            } else if (wW > 900) {
                xRadius = 280;
                yRadius = 90;
            } else if (wW > 760) {
                xRadius = 220;
                yRadius = 60;
            } else {
                xRadius = 180;
                yRadius = 60;
            }

            var renderedFlag = true;
            $("#carousel").Cloud9Carousel( {
                buttonLeft: $("#buttons > .left"),
                buttonRight: $("#buttons > .right"),
                speed: 6,
                autoPlay: 0,
                farScale: 0.94,
                bringToFront: true,
                xRadius: xRadius,
                yRadius: yRadius,
                onRendered: function( carousel ) {
                    if (renderedFlag) {
                        var $currItem = $('.cloud9-item.current'),
                            title = $currItem.attr('data-title'),
                            linkText = $currItem.attr('data-link-text'),
                            url = $currItem.attr('data-url'),
                            text = $currItem.attr('data-text');
                        $('.jsItemTitle').html(title);
                        $('.jsItemLink').attr('href', url).html(linkText);
                        $('.jsItemText').html(text);

                        $('.jsItemInfo').addClass('visible');
                        renderedFlag = false;
                    }
                },
                onAnimationFinished: function (e) {
                    $('.jsItemInfo').removeClass('visible');
                    setTimeout(function () {
                        var $currItem = $('.cloud9-item.current'),
                            title = $currItem.attr('data-title'),
                            linkText = $currItem.attr('data-link-text'),
                            url = $currItem.attr('data-url'),
                            text = $currItem.attr('data-text');
                        $('.jsItemTitle').html(title);
                        $('.jsItemLink').attr('href', url).html(linkText);
                        $('.jsItemText').html(text);

                        $('.jsItemInfo').addClass('visible');
                    }, 10);

                },
                onAnimationStart: function (e) {

                }
            } );
        }
    },
    carouselSwipe: function () {
        var $carousel = $('.carousel-wrap');
        if ($carousel.length > 0) {
            var carouselEl = document.getElementById('carousel');
            var hammertime = new Hammer(carouselEl);
            hammertime.on('swipe', function(ev) {
                if (ev.direction == 4) {
                    $("#carousel").data("carousel").go(-1);
                }
                if (ev.direction == 2) {
                    $("#carousel").data("carousel").go(1);
                }
            });
        }
    }
};
app.init = function () {
    app.main.carousel();
    app.main.carouselSwipe();
};
$(window).on('resize', function () {
    app.main.carousel();
});

$(document).ready(function () {
    app.init();
});