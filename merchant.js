$(document).ready(function () {

    const endPoint = 'http://ecommerce.reworkstaging.name.ng/v2';
    // let merchantId = JSON.parse(localStorage.getItem('registered-info')).id;
    // console.log('success',merchantId)
   
    $('#updateForm').submit(function (e) {
        e.preventDefault()

        let merchantId = JSON.parse(localStorage.getItem('registered-info'));
        let formData = {
            first_name: $('#first_name').val(),
            last_name: $('#last_name').val(),
            email: $('#email').val(),
            phone: $('#phone').val(),
            store_name: $('#store_name').val(),
            descp: $('#descp').val(),
            icon: $('#icon').val(),
            banner: $('#banner').val(),
            state: $('#state').val(),
            district: $('#district').val(),
            social_media: {
                x: $('#x').val(),
                face_book: $('#face_book').val(),
                instagram: $('#instagram').val()
            },
            phones: $('#phones').val().split(',').map(phone => phone.trim()) // Convert to array
        };

        $('.error').removeClass('error');
        $('.error-message').hide();

        let valid = true;

        if (valid) {
            $.ajax({
                method: 'PUT',
                url: `${endPoint}/merchants/:${merchantId}`,
                contentType: 'application/json',
                data: JSON.stringify(formData),
                success: function (res) {
                    console.log(res);
                    $('#response').html(`<p>Merchant information updated successfully!</p><p>${JSON.stringify(res)}</p>`);
                },
                error: function (err) {
                    console.log(err);
                    $('#response').html(`<p>Error: ${err.statusText}</p><p>${err.responseText}</p>`);
                }
            });
        }
    })

    $('#open-modal').on('click', function () {
        $('#modal').show()
        // $('#add').hide()
    })
    $('#add').on('click', function () {
        $('#modal').hide()
    })

    
    $('#add-category').submit(function (e) {
        e.preventDefault();

        const registeredInfo = JSON.parse(localStorage.getItem('registered-info'));
        if (!registeredInfo || !registeredInfo.id) {
            alert('Merchant ID not found in localStorage.');
            return;
        }

        const merchant_id = registeredInfo.id;
        let name = $('#name').val();
        let image = $('#image').val();

        let formData = {
            merchant_id,
            name,
            image
        };

        $('#name').removeClass('error');
        $('#nameError').hide();
        $('#image').removeClass('error');
        $('#imageError').hide();

        let valid = true; // Initialize valid variable

        if (formData.name === '') {
            valid = false;
            $('#name').addClass('error');
            $('#nameError').show();
        } else if (formData.image === '') {
            valid = false;
            $('#image').addClass('error');
            $('#imageError').show();
        } else {
            $.ajax({
                method: 'POST',
                url: `${endPoint}/categories`,
                contentType: 'application/json',
                data: JSON.stringify(formData),
                success: function (res) {
                    console.log(res);
                    // localStorage.setItem('category-info', JSON.stringify(categoryInfo))
                    // localStorage.setItem('categoryInfo', JSON.stringify(res))
                    alert('Created a category for a product Successfully');
                    localStorage.setItem('category-info', JSON.stringify(res))
                    console.log('Success', res);
                },
                error: function (err) {
                    console.log(err);
                }
            });
        }
    });

    

    // For the get categoreis
    $('#all-categories').click(function () {
        let categoryInfo = JSON.parse(localStorage.getItem('category-info'));
        const registeredInfo = JSON.parse(localStorage.getItem('registered-info'));
        if (!registeredInfo || !registeredInfo.id) {
            alert('Merchant ID not found in localStorage.');
            return;
        }

        const merchant_id = registeredInfo.id;

        $.ajax({
            method: 'GET',
            url: `${endPoint}/categories?merchant_id=${merchant_id}`,
            success: function (res) {
                console.log(res);
                displayCategories(res);
                // let categoryInfo = JSON.parse(localStorage.getItem('category-info'));
                console.log(categoryInfo)
            },
            error: function (err) {
                console.log(err);
                alert('Failed to fetch categories.');
            }
        });
    });

    function displayCategories(categories) {
        const categoriesList = $('.cart');
        categoriesList.empty();
        categories.forEach(category => {
            categoriesList.append(`
               <div class="cards">

               
                <h3>${category.name}</h3>
                <div class="dropdown">
                    <span class="dots-icon">⋮</span>
                    <div class="dropdown-menu">
                        <button class="edit-btn">Edit</button>
                        <button class="delete-btn">Delete</button>
                    </div>
                </div>
                <img src="${category.image}" alt="${category.name}" />
                
             </div>
            `);
        });
    }

    /************************************Delete a category*************************************************************/
    // $(document).on('click', '.delete-btn', function() {
       
    //     const categoryInfo = JSON.parse(localStorage.getItem('category-info'));
    //     category_id = categoryInfo.id

    //     if (category_id) {
    //         deleteCategory(category_id);
    //     } else {
    //         console.error('Category ID is undefined');
    //     }
    // });

    // function deleteCategory(category_id) {
    //     $.ajax({
    //         url: `${endPoint}/categories/${category_id}`,
    //         method: 'DELETE',
    //         success: function(response) {
    //             console.log('Category deleted:', response);
                // Remove the category item from the list
                // Assuming the category-id is unique and mapped to each category element
                // $(`#categories-list li:contains(${category_id})`).remove();
                // $(`.cards li:contains(${category_id})`).remove();
                

            // },
    //         error: function(jqXHR, textStatus, errorThrown) {
    //             console.error('Error deleting category:', jqXHR);
    //             $('#category-error').html(`
    //                 <p id="error">Error: ${jqXHR.statusText}</p>
    //                 <p>Status: ${jqXHR.status}</p>
    //                 <p>Response Text: ${jqXHR.responseText}</p>
    //                 <p>Error Thrown: ${errorThrown}</p>
    //             `);
    //         }
    //     });
    // }



    // Toggle dropdown menu
    $(document).on('click', '.dots-icon', function (event) {
        event.stopPropagation(); // Prevent the event from bubbling up to the window click event
        $(this).next('.dropdown-menu').toggle(); // Toggle visibility of the dropdown menu
    });

    // Handle edit and delete actions
    $('.dropdown-menu').on('click', '.edit-btn', function () {
        alert('Edit button clicked');
    });

    $('.dropdown-menu').on('click', '.delete-btn', function () {
        alert('Delete button clicked');
    });

    // Close dropdown if clicked outside
    $(window).on('click', function () {
        $('.dropdown-menu').hide(); // Hide dropdown menu
    });



    /********************************************PRODUCT CREATION SCRIPT***************************************************/
    $("#nigeria").click(function() {
        $("#nigText").text("Nigeria");
    });
    $("#ghana").click(function() {
        $("#ghaText").text("Ghana");
    });
    $("#egypt").click(function() {
        $("#egyText").text("Egypt");
    });

    $('#product-form').submit(function(event) {
        event.preventDefault();
        
        // Retrieve merchant info from localStorage
        const registeredInfo = JSON.parse(localStorage.getItem('registered-info'));
        
        const merchant_id = registeredInfo.id;
        console.log("Merchant ID:", merchant_id);

        // Retrieve category info from localStorage
        let categoryInfo = JSON.parse(localStorage.getItem('category-info'));
        
        const category_id = categoryInfo.id;

       
        console.log("Category ID:", category_id);

        const productData = {
            title: $('#title').val(),
            descp: $('#descp').val(),
            price: parseFloat($('#price').val()),
            brand: $('#brand').val(),
            quantity: parseInt($('#quantity').val()),
            images: [$('#images').val()],
            currency: $('#currency').val(),
            min_qty: parseInt($('#min_qty').val()),
            max_qty: parseInt($('#max_qty').val()),
            discount: 0,
            discount_expiration: "",
            has_refund_policy: false,
            has_discount: false,
            has_shipment: true,
            has_variation: true,
            shipping_locations: [$("#nigText").text(), $("#ghaText").text(), $("#egyText").text()],
            attrib: [
                {
                    type: "Other",
                    content: [
                        { name: "Place of Origin", value: "Fujian, China" },
                        { name: "Brand Name", value: "Ts-013" },
                        { name: "Midsole Material", value: "PVC" },
                        { name: "Season", value: "Winter, Summer, Spring, Autumm" },
                        { name: "Gender", value: "Men" }
                    ]
                },
                {
                    type: "Supply Ability",
                    content: [
                        { name: "Supply Ability", value: "1000 Box/Boxes per Month" }
                    ]
                }
            ],
            variations: [
                {
                    type: "color",
                    text: "Color",
                    content: [
                        {
                            display: [{ type: "image", value: $('#color1').val() }],
                            text: $('#color1-text').val()
                        },
                        {
                            display: [{ type: "image", value: $('#color2').val() }],
                            text: $('#color2-text').val()
                        },
                        {
                            display: [{ type: "image", value: $('#color3').val() }],
                            text: $('#color3-text').val()
                        }
                    ]
                },
                {
                    type: "size",
                    text: "EUR Size",
                    content: [
                        {
                            display: [
                                { type: "image", value: $('#images').val() },
                                { type: "text", value: "39" }
                            ],
                            text: parseFloat($('#size39').val())
                        },
                        {
                            display: [{ type: "text", value: "40" }],
                            text: parseFloat($('#size40').val())
                        },
                        {
                            display: [{ type: "text", value: "41" }],
                            text: parseFloat($('#size41').val())
                        },
                        {
                            display: [{ type: "text", value: "42" }],
                            text: parseFloat($('#size42').val())
                        },
                        {
                            display: [{ type: "text", value: "43" }],
                            text: parseFloat($('#size43').val())
                        }
                    ]
                }
            ],
            category_id: category_id,
            merchant_id: merchant_id
        };

        $.ajax({
            url: `${endPoint}/products`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(productData),
            success: function(response) {
                alert("Product created successfully");
                localStorage.setItem('product-info', JSON.stringify(response))
               
                console.log('Product created successfully:', response);
                $('#result').html('<p id="success">Product created successfully!</p>');

                $('#product-form')[0].reset();

                // Fetch updated product list for the merchant and category
                fetchProductsByMerchantAndCategory(merchant_id, category_id);
                fetchProductsByMerchant(merchant_id);
            },
            error: function(error) {
                console.error('Error creating product:', error);
                $('#result').html(`<p id="error">Error: ${error.statusText}</p><p>${error.responseText}</p>`);
            }
        });


        
    });
    
    /*GET ALL PRODUCTS FOR A PARTICULAR MERCHANT & BELONGING TO A PARTICULAR CATEGORY*/
    $('#all-products').click(function () {
        const registeredInfo = JSON.parse(localStorage.getItem('registered-info'));
        const merchant_id = registeredInfo.id;
        let categoryInfo = JSON.parse(localStorage.getItem('category-info'))
        const category_id = categoryInfo.id
        fetchProductsByMerchantAndCategory(merchant_id, category_id); 
    });
    function fetchProductsByMerchantAndCategory(merchant_id, category_id){
        $.ajax({
            method: 'GET',
            url: `${endPoint}/products`,
            data: {merchant_id , category_id},
            success: function (response) {
                console.log('Products for the merchant and category:', response);
                
                if (response && response.data) {
                    renderProductList(response.data);
                } else {
                    console.error('Invalid response format:', response);
                }

                
                
            },
            error: function (err) {
                console.log(err);
                alert('Error fetching products.');
            }
        });
    }
    function renderProductList(products) {   
        $('#product-list').empty();
        products.forEach(product => {
            $('#product-list').append(`
                <div class="product-item" data-id=${product.id}>
                    <img src="${product.images}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <p>Price:£${product.price}</>
                    <button class="delete-product" data-id="${product.id}">Delete</button>
                </div>
            `);
        });
    }



    /*GET ALL PRODUCT FOR A PARTICULAR MERCHANT */
    $('#all-merchant-products').click(function() {
        // Retrieve merchant info from localStorage
        const registeredInfo = JSON.parse(localStorage.getItem('registered-info'));
        const merchant_id = registeredInfo.id;
        // Fetch products for the merchant
        fetchProductsByMerchant(merchant_id);
    });
    
    // Function to fetch products by merchant
    function fetchProductsByMerchant(merchant_id) {
        $.ajax({
            url: `${endPoint}/products`,
            method: 'GET',
            data: {
                merchant_id: merchant_id
            },
            success: function(response) {
                console.log('Products for the merchant:', response);
                
                // Extract the array of products from the response
                if (response && response.data) {
                    renderProductListMerchant(response.data);
                } else {
                    console.error('Invalid response format:', response);
                }
            },
            error: function(error) {
                console.error('Error fetching products:', error);
            }
        });
    }

    // Function to render product list in the UI
    function renderProductListMerchant(products) {
       
        $('#product-list1').empty();
        products.forEach(product => {
            $('#product-list1').append(`
                <div class="product-item1" data-id=${product.id}>
                    <h3>${product.title}</h3>
                    <p>${product.descp}</p>
                    <p>Price: ${product.price}</p>
                    <p>Brand: ${product.brand}</p>
                    <p>Quantity: ${product.quantity}</p>
                    <img src="${product.images}" alt="${product.title}">   
                </div>
            `);
        });
    }



    $(document).on('click', '.product-card', function() {
        let productId = $(this).data('id');
        if (productId) {
            localStorage.setItem('product-info', JSON.stringify({ id: productId }));
            window.location.href = 'product.html';
        } else {
            console.error('Product ID is undefined');
        }
    });
    
    const productInfo = JSON.parse(localStorage.getItem('product-info'));

    if (productInfo && productInfo.id) {
        fetchProductDetails(productInfo.id);
    } else {
        console.error('Product ID is not found in localStorage');
    }


    function fetchProductDetails(productId) {
        $.ajax({
            url: `${endPoint}/products/${productId}`,
            method: 'GET',
            success: function(response) {
                console.log('Product details:', response);
                renderProductDetails(response);
            },
            error: function(error) {
                console.error('Error fetching product details:', error);
                $('#product-details').html(`<p id="error">Error: ${error.statusText}</p><p>${error.responseText}</p>`);
            }
        });
    }

    function renderProductDetails(product) {
        $('#product-details').html(`
           <div class ="product-card" data-id = ${product.id}>
                <img src="${product.images}" alt="${product.title}" style="width: 30%;">  
               <h3>${product.title}</h3>
               <p>Description: ${product.descp}</p>
               <p>Price: £${product.price}</p> 
               `)
        }



    

   /*Product Deletion API Call*/
   $(document).on('click', '.delete-product', function() {
    let productId = $(this).data('id');
    if (productId) {
        deleteProduct(productId);
    } else {
        console.error('Product ID is undefined');
    }
    });

    function deleteProduct(productId) {
        $.ajax({
            method: 'DELETE',
            url: `${endPoint}/products/${productId}`,
            success: function(response) {
            console.log('Product deleted:', response);
            // Remove the product item from the DOM
            $(`.product-item[data-id=${productId}]`).remove();
            },
            error: function(err) {
            console.error('Error deleting product:', err);
            alert('Error deleting product.');
            }
        });
    }

    

    
 
})




/* <p>Variations: ${product.variations.map(var => `<p>${var.type}: ${var.content.map(c => `${c.text}`).join(', ')}</p>`).join('')}</p> */