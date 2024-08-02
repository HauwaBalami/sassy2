$(document).ready(function() {
    const endPoint = 'http://ecommerce.reworkstaging.name.ng/v2';
    
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
        if (!categoryInfo || categoryInfo.length === 0) {
            alert("Category info not found. Please select a category first.");
            return;
        }
        const category_id = categoryInfo[categoryInfo.length - 1];

        // const category_id = categoryInfo.id;
        // const category_id = categoryInfo.id;
        console.log("Category ID:",category_id)
        // Debugging: Log the category_id to console
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
                console.log('Product created successfully:', response);
                $('#result').html('<p id="success">Product created successfully!</p>');
            },
            error: function(error) {
                console.error('Error creating product:', error);
                $('#result').html(`<p id="error">Error: ${error.statusText}</p><p>${error.responseText}</p>`);
            }
        });
    });
});
