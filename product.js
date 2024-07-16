// let myNumber = [2,4,9,8,10,12,14,20,1,3]
// let evenNumbers = myNumber.filter(function(number){
//     return number % 2 === 1
// })
// console.log(evenNumbers)    
// let myObject = {id:1,name:'mark',age:25,city:'jos',address:{street:'Lagos street',houseNumber:'No.2',landmark:'beside the church'}}
// console.log(myObject)

$(document).ready(function(){
    $('.slider').slick({
        // arrows: true,
        // centerMode: true,
        dots: true,
        slidesToShow: 1,
        infinite: false,
        slidesToScroll: 1

    })

    /*CLICK FOR CART TO SLIDE OUT ON PAGE*/
    $("#add-cart").click(function(){
        // $("#sidebar").css({
        //     "right": "0px",
        // }

        // )
        $("#sidebar").addClass("right")
    })
    $("#close-cart").click(function(){
        // $("#sidebar").css({
        //     "right": "-400px"
        // })
        $("#sidebar").removeClass("right")
        
    })



    $(".color-selector1").click(function() {
        $(".absolute").show();
        $(".hide").hide();
    });

    $(".color-selector2").click(function() {
        $(".absolute").hide();
        $(".hide").show();
    });
   

    $("#xan").on('click',function(){
        $(".para").toggle()
    });
    $("#xan1").on('click',function(){
        $(".para1").toggle()
    });
    $("#xan2").on('click',function(){
        $(".para2").toggle()
    });
    $("#xan3").on('click',function(){
        $(".para3").toggle()
    });
    $("#xan4").on('click',function(){
        $(".para4").toggle()
    });
    $("#xan5").on('click',function(){
        $(".para5").toggle()
    });
    
    
    
    
    
      
})
