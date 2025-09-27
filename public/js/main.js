(function($) {
    "use strict";

    $('.kidba-user-menu-toggle').on('click', function() {
        if ($('.kidba-header-user-box').hasClass('show')) {
            $('.kidba-header-user-box').removeClass('show');
        } else {
            $('.kidba-header-user-box').addClass('show');
        }
    });

    window.kidba = window.kidba || {};
    var windowOn = $(window);
    windowOn.on('load', function() {
        $("#loading").fadeOut(500);
    });

    $(document).ready(function() {
        $('#mobile-menu').meanmenu({
            meanMenuContainer: '.mobile-menu',
            meanScreenWidth: "991",
            meanExpand: ['+'],
        });
        //=======================================================================
        // Modal Video / Video Popup Plugin Initialize
        //=======================================================================
        $(".video-btn, .blog-video-btn").modalVideo();
        //=======================================================================
        // Odometer / Counter Plugin Initialize
        //=======================================================================
        $('.odometer').appear(function(e) {
            var odo = $(".odometer");
            odo.each(function() {
                var countNumber = $(this).attr("data-count");
                $(this).html(countNumber);
            });
        });
        // data - background
        $("[data-background]").each(function() {
            $(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
        })

        $("[data-bg-color]").each(function() {
            $(this).css("background-color", $(this).attr("data-bg-color"))
        })


        //range slider activation
        $("#shop-slider-range").slider({
            range: true,
            min: 0,
            max: 500,
            values: [75, 300],
            slide: function(event, ui) {
                $("#shop-amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
            },
        });
        //=======================================================================
        // Slider / Swiper Plugin Initialize
        //=======================================================================
        if (jQuery(".slider-active").length > 0) {
            let sliderActive1 = '.slider-active';
            var slider_single = $(this).find('.swiper-slide');
            var autoplay_prop = slider_single.data('enable-autoplay');
            let sliderInit1 = new Swiper(sliderActive1, {
                // Optional parameters
                slidesPerView: 1,
                slidesPerColumn: 1,
                paginationClickable: true,
                loop: true,
                // If we need pagination
                autoplay: autoplay_prop,
                pagination: {
                    el: '.swiper-paginations',
                    // dynamicBullets: true,
                    clickable: true,
                },

                // Navigation arrows
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },

                a11y: false
            });

            function animated_swiper(selector, init) {
                let animated = function animated() {
                    $(selector + ' [data-animation]').each(function() {
                        let anim = $(this).data('animation');
                        let delay = $(this).data('delay');
                        let duration = $(this).data('duration');

                        $(this).removeClass('anim' + anim)
                            .addClass(anim + ' animated')
                            .css({
                                webkitAnimationDelay: delay,
                                animationDelay: delay,
                                webkitAnimationDuration: duration,
                                animationDuration: duration
                            })
                            .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                                $(this).removeClass(anim + ' animated');
                            });
                    });
                };
                animated();
                // Make animated when slide change
                init.on('slideChange', function() {
                    $(sliderActive1 + ' [data-animation]').removeClass('animated');
                });
                init.on('slideChange', animated);
            }

            animated_swiper(sliderActive1, sliderInit1);
        }

        //=======================================================================
        // Gallery Image Popup
        //=======================================================================
        $('.gallery-popup').magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            closeBtnInside: false,
            fixedContentPos: true,
            mainClass: 'mfp-no-margins mfp-with-zoom',
            image: {
                verticalFit: true
            },
            zoom: {
                enabled: true,
                duration: 400
            }
        });

        //=======================================================================
        // Testmonial Slider
        //=======================================================================
        $('.clients').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.client-feedback',
        });
        $('.client-feedback').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            asNavFor: '.clients',
            dots: true,
            arrows: false,
            vertical: true,
            verticalSwiping: true,
        });

        //=======================================================================
        // Nice Select
        //=======================================================================
        $('.course__sort-inner select, .panel-body .form-group select, .woocommerce div.product form.cart .variations select, .blog-sidebar-box.widget_archive select, .blog-sidebar-box.widget_categories select, section.blog-sidebar-box.widget_text .textwidget select, .footer-card select, .wp-block-categories-dropdown.wp-block-categories select, .wp-block-archives-dropdown select').niceSelect();

        //=======================================================================
        // Partner logo Slider
        //=======================================================================
        $('.partner-slider').slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            arrows: false,
            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                }
            }, {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                }
            }, {
                breakpoint: 575,
                settings: {
                    slidesToShow: 2,
                }
            }, ],
        });

        //=======================================================================
        // Shop details image Slider
        //=======================================================================
        $('.shop-details-lg-images').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.shop-details-sm-images',
        });
        $('.shop-details-sm-images').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: '.shop-details-lg-images',
            dots: false,
            arrows: true,
            autoplay: false,
            centerMode: true,
            centerPadding: '0',
            focusOnSelect: true,
            prevArrow: '<button class="shop-slick-prev"><i class="icofont-thin-left"></i></button>',
            nextArrow: '<button class="shop-slick-next"><i class="icofont-thin-right"></i></button>'
        });

        //=======================================================================
        // Jquery ui datepicker
        //=======================================================================
        $("#datepicker").datepicker();

        // product quantity
        $('.quantity').each(function() {
            var spinner = jQuery(this),
                input = spinner.find('input[type="number"]'),
                btnUp = spinner.find('.quantity-up'),
                btnDown = spinner.find('.quantity-down'),
                min = input.attr('min'),
                max = input.attr('max');
            max = max ? max : false;

            btnUp.on('click', function(e) {
                var oldValue = parseFloat(input.val());
                if (max == false) {
                    var newVal = oldValue + 1;
                } else if (oldValue >= max) {
                    var newVal = oldValue;
                } else {
                    var newVal = oldValue + 1;
                }
                spinner.find("input").val(newVal);
                spinner.find("input").trigger("change");
            });

            btnDown.on('click', function() {
                var oldValue = parseFloat(input.val());
                if (oldValue <= min) {
                    var newVal = oldValue;
                } else {
                    var newVal = oldValue - 1;
                }
                spinner.find("input").val(newVal);
                spinner.find("input").trigger("change");
            });

        });
        //=======================================================================
        // Blog page image Slider
        //=======================================================================
        $('.blog-image-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<button class="blog-slider-btn"><i class="icofont-caret-left"></i></button>',
            nextArrow: '<button class="blog-slider-btn btn-next"><i class="icofont-caret-right"></i></button>',
        });
    });
    $('.navbar-toggler').on('click', function() {
        $('.kidba-menu-sidebar').addClass('sidebar-open');
        $('.body-overlay').addClass('overlay-open');
    });
    $('.sidebar__close-btn, .body-overlay').on('click', function() {
        $('.kidba-menu-sidebar').removeClass('sidebar-open');
        $('.body-overlay').removeClass('overlay-open');
    });
    // if cart added show popup
    $('body').on('added_to_cart', function(args) {
        $('.product-add-cart-success-alert').append('<span clas="status">Product Added Successfully!</span>');
        setTimeout(() => {
            $('.product-add-cart-success-alert span').hide(300);
        }, 5000);
    });

    // menu-last class
    // $('.header-style-1 .navbar-nav > li.nav-item').slice(-4).addClass('menu-last');

    var CB_Blog = function($scope, $) {
        $scope.find('.blog-slider').each(function() {
            // Blog Slider
            $('.blog-slider').slick({
                dots: false,
                infinite: true,
                speed: 1000,
                autoplay: true,
                autoplaySpeed: 2000,
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: false,
                responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        arrows: false,
                    }
                }, {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        arrows: false,
                    }
                }, {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                    }
                }, ]
            });
        })
    }
    var CB_Testimonial = function($scope, $) {
        $scope.find('.feedback-slider').each(function() {
            // Feedback Slider
            $('.feedback-slider').slick({
                dots: false,
                infinite: true,
                speed: 1000,
                autoplay: true,
                autoplaySpeed: 2000,
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: false,
                responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        arrows: false,
                    }
                }, {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                    }
                }, {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                    }
                }, ]
            });
        })
    }
    var CB_CounterUp = function($scope, $) {
        $(".video-play-button a").modalVideo();
    }
    var CB_Course_Category = function($scope, $) {
        $scope.find('.category-slider').each(function() {
            // Category Slider
            $('.category-slider').slick({
                dots: false,
                infinite: true,
                speed: 1000,
                autoplay: true,
                autoplaySpeed: 2000,
                slidesToShow: 4,
                slidesToScroll: 1,
                arrows: true,
                prevArrow: '<i class="prev-arrow fa fa-long-arrow-left"></i>',
                nextArrow: '<i class="next-arrow fa fa-long-arrow-right"></i>',
                responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        arrows: false,
                    }
                }, {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        arrows: false,
                    }
                }, {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                    }
                }, ]
            });

            // Course Details Tab
            $(".tab-accordion ul li").on('click', function() {
                var tabClass = $(this).attr("class");
                $(this).addClass("active").siblings().removeClass("active");
                $("." + tabClass + "-content").addClass("active").siblings().removeClass("active");
            });
        });
    }
    const CB_Hero = function($scope, $) {
        $scope.find('[data-background]').each(function() {
            // data - background
            $("[data-background]").each(function() {
                $(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
            })
        })
        $scope.find('.play-button').each(function() {
            $('.play-button').magnificPopup({
                type: 'iframe'
            });
        })
    }
    const CB_About = function($scope, $) {
        $scope.find('.video-play-button a').each(function() {
            $('.video-play-button a').magnificPopup({
                type: 'iframe'
            });
        })
    }
    $(window).on('elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction('frontend/element_ready/tp-testimonial.default', CB_Testimonial);
        elementorFrontend.hooks.addAction('frontend/element_ready/tp-blog.default', CB_Blog);
        elementorFrontend.hooks.addAction('frontend/element_ready/tp-course-category.default', CB_Course_Category);
        elementorFrontend.hooks.addAction('frontend/element_ready/tp-counter-up.default', CB_CounterUp);
        elementorFrontend.hooks.addAction('frontend/element_ready/tp-hero.default', CB_Hero);
        elementorFrontend.hooks.addAction('frontend/element_ready/tp-about.default', CB_About);
    });
})(jQuery);