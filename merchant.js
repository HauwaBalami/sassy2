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
                    alert('Created a category for a product Successfully');
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

               
                <h3>Products</h3>
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











<<<<<<< HEAD
        if (existingCategory.length > 0) {
            existingCategory.find('.category-name').text(category.name);
            existingCategory.find('.category-image').attr('src', category.image);
        } else {
            const categoryItem = `
                <div id="category-${category_id}" class="category-item">
                    <img class="category-image" src="${category.image}" alt="${category.name}">
                    <p class="category-name">${category.name}</p>
                    <button id="edit-btn" data-id="${category.id}" data-name="${category.name}" data-image="${category.image}">Edit</button>
                </div>
            `;
            categoryList.append(categoryItem);
        }
    }
    /*Delete a category******************************************************************************** */
      
    
    
    
=======
>>>>>>> 281e0e614ca1055409a57f82c16b53f3161b7232
})