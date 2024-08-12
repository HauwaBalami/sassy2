// $(document).ready(function () {

//   const endPoint = 'http://ecommerce.reworkstaging.name.ng/v2';
//   const registeredInfo = JSON.parse(localStorage.getItem('registered-info'));
//   const merchant_id = registeredInfo.id;

//   $('#js-shop').click( function(e){
//     e.preventDefault();

//     $.ajax({
//       url: `${endPoint}/products`,
//       method: 'GET',
//       data: {merchant_id:merchant_id},
//       success: function (data) {
//         if (Array.isArray(data)) {
//         const productContainer = $('.product-container');
//         productContainer.empty();
//         data.forEach(product => {
//           const productCard = `
//             <div class="product-card">
//               <img src="${product.image}" alt="${product.name}" />
//               <h2><a href="#">${product.name}</a></h2>
//               <div class="color-balls">
//                 <p>${product.price}</p>
//               </div>
//             </div>
//           `;
//           productContainer.append(productCard);
//         });
//         }else{
//         console.error('Unexpected response format:', data);
//       }
//       },
//       error: function (error) {
//         console.log('Error fetching products:', error);
//       }
//     });
//   })

// });

$(document).ready(function () {
  const endPoint = 'http://ecommerce.reworkstaging.name.ng/v2';

  const registeredInfo = JSON.parse(localStorage.getItem('registered-info'));
  const merchant_id = registeredInfo.id;

  function getProductOnShopPage(){
    $('.product-container').empty()
    $.ajax({
      url: `${endPoint}/products`,
      method: 'GET',
      data: { merchant_id: merchant_id },
      success: function (response) {
        console.log(response); // Log the response to inspect it
        let eachProduct = response.data
        eachProduct.forEach(function(p){
          $('.product-container').append(`
              <div class="product-card" data-id =${p.id}>
                <img src="${p.image}" alt="${p.title}" />
                <h2>${p.title}</h2>
                <div class="color-balls">
                  <p>£${p.price}</p>
                </div>
              </div>
          `)
        })
      },
      error: function (error) {
        console.log('Error fetching products:', error);
      }
    });
  }
  getProductOnShopPage()

  $(document).on('click', '.product-card', function(){
    let product_id = $(this).data('id')

    $.ajax({
      url: `${endPoint}/products/${product_id}`,
      method: 'GET',
      success: function(res){
        window.location.href = `product.html?id=${product_id}`
      },
      error: function(err){
        console.log(err);
      }
    })
    
    
  })



  // Alternative code for the shop page
  // $(document).on('click', '.product-card', function () {
  //   let productId = $(this).data('id');
  //   localStorage.setItem('product-info', JSON.stringify(productId));
  //   console.log(productId)


  //   $.ajax({
  //     url: `${endPoint}/products/${productId}`,
  //     method: 'GET',
  //     success: function (response) {
  //       console.log('Product details:', response);
  //       window.location.href = `product.html?id=${productId}`;
        

  //     },
  //     error: function (error) {
  //       console.error('Error fetching product details:', error);
  //       $('#product-details').html(`<p id="error">Error: ${error.statusText}</p><p>${error.responseText}</p>`);
  //     }
  //   });


  // });



});
