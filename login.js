
$(document).ready(function () {
    const endPoint = 'http://ecommerce.reworkstaging.name.ng/v2';

    $('#loginForm').submit(function (e) {
        e.preventDefault()

        // let formData = {
        //     // name: $('#name').val(),
        //     email: $('#email-login').val().trim(),
        //     pass: $('#password-login').val().trim(),
        // }

        $('#email').removeClass('error');
        $('#emailError').hide();
        $('#password').removeClass('error');
        $('#passwordError').hide();
        
        let email = $('#email').val().trim()
        let password = $('#password').val().trim()

        let valid = true;
        // Validate fields
        // var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i
        let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            valid = false;
            $('#email').addClass('error');
            $('#emailError').show();
        }else if(!pattern.test(email )){
            valid = false;
            $('#email').addClass('error');
            $('#emailError').text('Invalid email format').show();
        } else if (password === '') {
            valid = false;
            $('#password').addClass('error');
            $('#passwordError').show();
        }

        
        if (valid) {
            // valid = true;
            let formData = {
                email: email,
                password: password,
            }
            console.log(formData)
            $.ajax({
                method: 'POST',
                url: `${endPoint}/merchants/login`,
                data: formData,
                success: function (res) {
                    if (res.code === 404) {
                        $('#none').show()
                    }
                    else {
                        alert('Login Successfully');
                        localStorage.setItem('registered-info',JSON.stringify(res))
                        window.location.href = 'merchant.html';
                    }

                    console.log('Success', res)
                },
                error: function (err) {
                    console.log(err)
                }
            })

        }

    })
})


