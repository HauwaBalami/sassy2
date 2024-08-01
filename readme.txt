

$(document).ready(function() {
    const endPoint = 'http://ecommerce.reworkstaging.name.ng/v2';
    
    // Log local storage content
    console.log("Local Storage Content:", localStorage);

    // Create a category
    $('#create-category').submit(function(event) {
        event.preventDefault();

        let formData = {
            name: $('#category-name').val(),
            description: $('#category-description').val()
        };

        $.ajax({
            method: 'POST',
            url: `${endPoint}/categories`,
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(res) {
                console.log('Category creation response:', res);

                let categoryInfo = JSON.parse(localStorage.getItem('category-info')) || [];
                categoryInfo.push(res);
                localStorage.setItem('category-info', JSON.stringify(categoryInfo));
                
                alert('Created a category for a product successfully');
            },
            error: function(err) {
                console.log('Error creating category:', err);
            }
        });
    });

    //////////////////////This is a snippet of the create product "POST" API//////////////////////////////


    $(document).ready(function() {
    const endPoint = 'http://ecommerce.reworkstaging.name.ng/v2';

    $('#product-form').submit(function(event) {
        event.preventDefault();

        // Retrieve merchant info from localStorage
        const registeredInfo = JSON.parse(localStorage.getItem('registered-info'));
        if (!registeredInfo || !registeredInfo.id) {
            alert("Merchant info not found. Please register or login first.");
            return;
        }
        const merchant_id = registeredInfo.id;
        console.log("Merchant ID:", merchant_id);

        // Retrieve category info from localStorage
        let categoryInfo = JSON.parse(localStorage.getItem('category-info'));
        if (!categoryInfo || !categoryInfo.id) {
            alert("Category info not found or invalid. Please create or select a category first.");
            return;
        }
        const category_id = categoryInfo.id;
        console.log("Category ID:", category_id);

        // Prepare product data
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
                        { name: "Season", value: "Winter, Summer, Spring, Autumn" },
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
                localStorage.setItem('product-info', JSON.stringify(response));
                console.log('Product created successfully:', response);
                $('#result').html('<p id="success">Product created successfully!</p>');

                // Clear form fields
                $('#product-form')[0].reset();

                // Fetch updated product list or any other necessary data
                fetchUpdatedProductList();
            },
            error: function(error) {
                console.error('Error creating product:', error);
                $('#result').html(`<p id="error">Error: ${error.statusText}</p><p>${error.responseText}</p>`);
            }
        });
    });

    // Function to fetch the updated product list
    function fetchUpdatedProductList() {
        $.ajax({
            url: `${endPoint}/products`,
            method: 'GET',
            success: function(response) {
                console.log('Updated product list:', response);
                // Update the UI with the new product list
                // For example: renderProductList(response);
            },
            error: function(error) {
                console.error('Error fetching updated product list:', error);
            }
        });
    }
});

