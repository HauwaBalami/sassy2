$(document).ready(function() {

    const endPoint = 'http://ecommerce.reworkstaging.name.ng/v2';
    // let merchantId = JSON.parse(localStorage.getItem('registered-info'));
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
})