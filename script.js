$(document).ready(function(){
    



    let menuTimeout;

    $("#menu").hover(function() {
        // On mouse enter
        clearTimeout(menuTimeout); // Clear any existing timeout
        $(".overlay").addClass('block'); 
        $(".mega-menu").stop(true, true).slideDown(100, function(){
            $(".navigation").animate({ height: $(".navigation").height() + $(".mega-menu").outerHeight() }, 300);
        });
    }, function() {
        // On mouse leave
        menuTimeout = setTimeout(function() {
            $(".overlay").removeClass('block'); // Hide overlay
            $(".mega-menu").stop(true, true).slideUp(100, function(){
                $(".navigation").animate({ height: '50px' }, 300);
            });
        }, 300); // Adjust the delay as needed (300ms in this case)
    });

    // Also consider handling hover on the mega menu itself to prevent closing
    $(".mega-menu").hover(function() {
        clearTimeout(menuTimeout); // Clear timeout if mouse enters the mega menu
    }, function() {
        // Start the timeout when mouse leaves the mega menu
        menuTimeout = setTimeout(function() {
            $(".overlay").removeClass('block');
            $(".mega-menu").stop(true, true).slideUp(100, function(){
                $(".navigation").animate({ height: '50px' }, 300);
            });
        }, 300); // Adjust the delay as needed
    });
    
    
    
    
    
    // Slide down the mega menu on hover
    // $("#menu").hover(function(){
    //     // On mouse enter
    //     // $(".overlay").fadeIn(300); 
    //     $(".overlay").addClass('block'); 
    //     $(".mega-menu").stop(true, true).slideDown(100, function(){
    //         $(".navigation").animate({ height: $(".navigation").height() + $(".mega-menu").outerHeight() }, 300);
    //     });
    // }, function(){
    //     // On mouse leave
    //     // $(".overlay").fadeOut(300); // Hide overlay
    //     $(".overlay").removeClass('block'); // Hide overlay
    //     $(".mega-menu").stop(true, true).slideUp(100, function(){
    //         $(".navigation").animate({ height: '50px' }, 300);
    //     });
    // });

    



    $("#add-cart").click(function() {
        $("#sidebar").addClass("out");
        // $(".overlay").fadeIn(); // Optionally fade in overlay
    });

    $("#close-cart").click(function() {
        $("#sidebar").removeClass("out");
        $(".overlay").fadeOut(); // Optionally fade out overlay
    });

    
    
    
      













});
