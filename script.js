$(document).ready(function(){
    // Slide down the mega menu on hover
    $(".menu li").hover(function(){
        if($(this).has("#menu").length) {
            $(".mega-menu").stop(true, true).slideDown();
        }
    }, function(){
        if($(this).has("#menu").length) {
            $(".mega-menu").stop(true, true).slideUp();
        }
    });

    $("#menu").hover(function(){
        // On mouse enter
        $(".mega-menu").stop(true, true).slideDown(300, function(){
            $(".navigation").animate({ height: $(".navigation").height() + $(".mega-menu").outerHeight() }, 300);
        });
    }, function(){
        // On mouse leave
        $(".mega-menu").stop(true, true).slideUp(300, function(){
            $(".navigation").animate({ height: '50px' }, 300);
        });
    });
});

