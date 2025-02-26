

$(document).ready(function () {

    var selectedSize = '';

    $('.slider').slick({
        // arrows: true,
        // centerMode: true,
        dots: true,
        slidesToShow: 1,
        infinite: false,
        slidesToScroll: 1

    })
    $('#next').click(function() {
        $('.slider').slick('slickNext');
      });
  
      $('#previous').click(function() {
        $('.slider').slick('slickPrev');
      });

    /*CLICK FOR CART TO SLIDE OUT ON PAGE*/
    $("#add-cart").click(function () {
        // $("#sidebar").css({
        //     "right": "0px",
        // }

        // )
        $("#sidebar").addClass("right")
    })
    $("#close-cart").click(function () {
        // $("#sidebar").css({
        //     "right": "-400px"
        // })
        $("#sidebar").removeClass("right")

    })



    $(".color-selector1").click(function () {
        $(".absolute").show();
        $(".hide").hide();
    });

    $(".color-selector2").click(function () {
        $(".absolute").hide();
        $(".hide").show();
    });


    $("#xan").on('click', function () {
        $(".para").toggle()
    });
    $("#xan1").on('click', function () {
        $(".para1").toggle()
    });
    $("#xan2").on('click', function () {
        $(".para2").toggle()
    });
    $("#xan3").on('click', function () {
        $(".para3").toggle()
    });
    $("#xan4").on('click', function () {
        $(".para4").toggle()
    });
    $("#xan5").on('click', function () {
        $(".para5").toggle()
    });

    // Add to cart functionality

     // Function to load items from local storage
    function loadCartItems() {
        var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        $('.items-holder').empty(); // Clear existing items
        cartItems.forEach(function(item) {
            appendCartItem(item);
        });
    }

    // Function to save items to local storage
    function saveCartItems(cartItems) {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    // Function to append a cart item to the DOM
    function appendCartItem(item) {
        console.log(item)
        var cartItem = `
            <div class="scrollbar">
                <div class="cart-image-holder">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div>
                    <div class="items-spec">
                        <h4 style="margin: 0; margin-bottom: 2px;">${item.name}</h4>
                        <h5 style="margin: 0; margin-bottom: 2px;">${item.size}</h5>
                        <span>1 × <span>${item.price}</span></span>
                    </div>
                    <div>
                        <a href="#" class="remove-item">[REMOVE]</a>
                    </div>
                </div>
            </div>
        `;
        $('.items-holder').append(cartItem);
    }

    // Load cart items on page load
    loadCartItems();

    // $('.body-size li').on('click', function(){
    //     if(selectedSize === 14 || 16 || 18 ){
    //         $('.add-cart').hide()
    //         $('.js-register').show()    
    //     }else{
    //         $('.js-register').hide()
    //         $('.add-cart').show() 
    //     }

    // })

    $('.body-size li').click(function() {
        $('.body-size li').removeClass('selected');
        $(this).addClass('selected');
        selectedSize = $(this).data('size');

        if(selectedSize === '14' || selectedSize === '16' || selectedSize === '18' ){
            $('.add-cart').addClass('none')
            $('.js-register').removeClass('none')    
        }else{
            $('.js-register').removeClass('none')
            $('.add-cart').addClass('none') 
        }

       
        
        
    });


    $('#add-cart').click(function() {
        var productName = $(this).data('name');
        var productSize = $(this).data('size');
        var productPrice = $(this).data('price');
        var productImage = $(this).data('image');

        // if (!selectedSize || selectedSize === '14' ||  selectedSize === '16' || selectedSize === '18' ) {
        //     alert('Please select a size.');
        //     return;
        // }
       

        var newItem = {
            name: productName,
            size: productSize,
            price: productPrice,
            image: productImage
        };

        // Get existing items from local storage
        var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.push(newItem);
        saveCartItems(cartItems);

        // Append the new item to the DOM
        appendCartItem(newItem);
    });

    $('.items-holder').on('click', '.remove-item', function(e) {
        e.preventDefault();
        var index = $(this).closest('.scrollbar').index();

        // Remove item from local storage
        var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.splice(index, 1);
        saveCartItems(cartItems);

        // Remove item from the DOM
        $(this).closest('.scrollbar').remove();
    });

    $('#size-8').on('click', function(){
        let productSize = $('#size-8').val('')
    })




    //script for NAv//

    let menuTimeout;

    $("#menu").hover(function() {
        // On mouse enter
        clearTimeout(menuTimeout); // Clear any existing timeout
        $(".overlay").addClass('block'); 
        $(".mega-menu").stop(true, true).slideDown(100, function(){
            // $(".navigation").animate({ height: $(".navigation").height() + $(".mega-menu").outerHeight() }, 300);
        });
    }, function() {
        // On mouse leave
        menuTimeout = setTimeout(function() {
            $(".overlay").removeClass('block'); // Hide overlay
            $(".mega-menu").stop(true, true).slideUp(100, function(){
                // $(".navigation").animate({ height: '50px' }, 300);
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
                // $(".navigation").animate({ height: '50px' }, 300);
            });
        }, 300); // Adjust the delay as needed
    });
    
    



})
