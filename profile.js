$(document).ready(function() {

    const endPoint = 'http://ecommerce.reworkstaging.name.ng/v2';
    // let merchantId = JSON.parse(localStorage.getItem('registered-info'));
    // console.log('success',merchantId)
    $('#updateForm').submit(function(e){
        e.preventDefault()

        const registeredInfo = JSON.parse(localStorage.getItem('registered-info'));
        
        const merchantId = registeredInfo.id
        
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
                url: `${endPoint}/merchants/${merchantId}`,
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

   /*Change Password Code*/
    // Open the modal
    $('#openModalBtn').on('click', function() {
        $('#passwordModal').show();
    });

    // Close the modal
    $('.close').on('click', function() {
        $('#passwordModal').hide();
    });

    // Close the modal if user clicks outside of the modal
    $(window).on('click', function(event) {
        if (event.target.id === 'passwordModal') {
            $('#passwordModal').hide();
        }
    });

    // Handle form submission
    $('#change-password-form').submit(function(e) {
        e.preventDefault();

        let merchantInfo = JSON.parse(localStorage.getItem('registered-info'));
        if (!merchantInfo || !merchantInfo.id) {
            alert('Merchant ID not found in localStorage.');
            return;
        }

        const merchantId = merchantInfo.id;
        const oldPassword = $('#old_password').val().trim();
        const newPassword = $('#new_password').val().trim();

        if (!oldPassword || !newPassword) {
            alert('Both old and new passwords are required.');
            return;
        }

        const formData = {
            old_password: oldPassword,
            new_password: newPassword
        };

        $.ajax({
            method: 'PUT',
            url: `${endPoint}/merchants/${merchantId}/change-passwd`,
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(res) {
                console.log(res);
                $('#response').html('<p id="success">Password changed successfully!</p>');
            },
            error: function(err) {
                console.log(err);
                $('#response').html(`<p id="error">Error: ${err.statusText}</p><p>${err.responseText}</p>`);
            }
        });
    });

})