$(document).ready(function(){
    // Slide down the mega menu on hover
    $("#menu").hover(function(){
        // On mouse enter
        $(".overlay").fadeIn(300); // Show overlay
        $(".mega-menu").stop(true, true).slideDown(300, function(){
            $(".navigation").animate({ height: $(".navigation").height() + $(".mega-menu").outerHeight() }, 300);
        });
    }, function(){
        // On mouse leave
        $(".overlay").fadeOut(300); // Hide overlay
        $(".mega-menu").stop(true, true).slideUp(300, function(){
            $(".navigation").animate({ height: '50px' }, 300);
        });
    });

    // Hide overlay and mega-menu if clicked outside
    $(document).on('click', function(event) {
        if (!$(event.target).closest('.mega-menu, #menu').length) {
            $(".overlay").fadeOut(300); // Hide overlay
            $(".mega-menu").slideUp(300, function(){
                $(".navigation").animate({ height: '50px' }, 300);
            });
        }
    });
});
