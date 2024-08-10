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

  $('#js-shop').click(function (e) {
    e.preventDefault(); // Prevent default action if it's a link

    $.ajax({
      url: `${endPoint}/products`,
      method: 'GET',
      data: { merchant_id: merchant_id },
      success: function (response) {
        console.log(response); // Log the response to inspect it

        if (response && Array.isArray(response.data)) {
          const productContainer = $('.product-container');
          productContainer.empty(); // Clear previous content
          response.data.forEach(product => {
            const productCard = `
              <div class="product-card" data-id =${product.id}>
                <img src="${product.image}" alt="${product.title}" />
                <h2><a class="view-product-details" href="product.html">${product.title}</a></h2>
                <div class="color-balls">
                  <p>£${product.price}</p>
                </div>
              </div>
            `;
            productContainer.append(productCard);
          });
        } else {
          console.error('Unexpected response format:', response);
        }
      },
      error: function (error) {
        console.log('Error fetching products:', error);
      }
    });
  });



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
