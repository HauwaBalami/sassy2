$(document).ready(function() {

    const endPoint = 'http://ecommerce.reworkstaging.name.ng/v2';
    // let merchantId = JSON.parse(localStorage.getItem('registered-info')).id;
    // console.log('success',merchantId)
    $('#updateForm').submit(function(e){
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
                success: function(res) {
                    console.log(res);
                    $('#response').html(`<p>Merchant information updated successfully!</p><p>${JSON.stringify(res)}</p>`);
                },
                error: function(err) {
                    console.log(err);
                    $('#response').html(`<p>Error: ${err.statusText}</p><p>${err.responseText}</p>`);
                }
            });
        }
    })

    $('#open-modal').on('click', function(){
        $('#modal').show()
        // $('#add').hide()
    })
    $('#add').on('click', function(){
        $('#modal').hide()
    })

    $('#add-category').submit(function(e) {
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
                success: function(res) {
                    console.log(res);
                    alert('Created a category for a product Successfully');
                    console.log('Success', res);
                },
                error: function(err) {
                    console.log(err);
                }
            });
        }
    });

    // For the get categoreis
    $('#all-categories').click(function() {
        const registeredInfo = JSON.parse(localStorage.getItem('registered-info'));
        if (!registeredInfo || !registeredInfo.id) {
            alert('Merchant ID not found in localStorage.');
            return;
        }

        const merchant_id = registeredInfo.id;

        $.ajax({
            method: 'GET',
            url: `${endPoint}/categories?merchant_id=${merchant_id}`,
            success: function(res) {
                console.log(res);
                displayCategories(res);
            },
            error: function(err) {
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
                <div class = "cards">
                    <h3>${category.name}</h3>
                    <img src="${category.image}" alt="${category.name}" />
                      <div class="button" >
                        <button id="edit-btn" style="background-color: blue;">Edit</button>
                       <button id="delete-btn" style="background-color: red;">Del</button>
                    </div>
                </div>
            `);
        });
    }
    
    function openModal() {
        $('#open-update-modal').show();
    }

    function openModal() {
        $('#open-update-modal').show();
    }

    // Function to close the modal
    $('#update-category').click(function () {
        $('#open-update-modal').hide();
    });

    // Handle the edit button click
    $('#edit-btn').click(function () {
        var id = $(this).data('id');
        var name = $(this).data('name');
        var image = $(this).data('image');

        // Set the modal input values
        $('#name').val(name);
        $('#image').val(image);

        // Save the category id in localStorage
        localStorage.setItem('category-info', JSON.stringify({ id: id }));

        // Open the modal
        openModal();
    });
     // Handle the form submission
     $('#update-category-form').submit(function (e) {
        e.preventDefault();

        let categoryInfo = JSON.parse(localStorage.getItem('category-info'));
        const category_id = categoryInfo ? categoryInfo.id : null;

        if (!category_id) {
            alert('Category ID not found in localStorage.');
            return;
        }

        const name = $('#name').val();
        const image = $('#image').val();

        const formData = {
            name,
            image
        };

        let valid = true;
        if (formData.name === '') {
            valid = false;
            $('#name').addClass('error');
            $('#nameError').show();
        } else if (formData.image === '') {
            valid = false;
            $('#image').addClass('error');
            $('#imageError').show();
        }

        if (valid) {
            $.ajax({
                method: 'PUT',
                url: `${endPoint}/categories/${category_id}`,
                contentType: 'application/json',
                data: JSON.stringify(formData),
                success: function (res) {
                    alert('Category updated successfully');
                    appendOrUpdateCategory(res);
                    $('#open-update-modal').hide();  // Close the modal after success
                },
                error: function (err) {
                    alert('Failed to update category.');
                }
            });
        }
    });

    function appendOrUpdateCategory(category) {
        const categoryList = $('#category-list');
        const category_id = category.id;
        let existingCategory = $(`#category-${category_id}`);

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
      
    
    
    
})