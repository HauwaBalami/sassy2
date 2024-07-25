
$(document).ready(function(){
    const endPoint = 'http://ecommerce.reworkstaging.name.ng/v2';

    $('#regForm').submit(function(e){
        e.preventDefault()

        let formData = {
            first_name: $('#first_name').val(),
            last_name: $('#last_name').val(),
            email: $('#email').val(),
            phone: $('#phone').val(),
            password: $('#password').val(),
            store_name: $('#store_name').val(),
            descp: $('#descp').val(),
            icon: $('#icon').val(),
            banner: $('#banner').val(),
            phones: $('#phones').val()
        }
        
            $('#first_name').removeClass('error');
            $('#first_nameError').hide();
            $('#last_name').removeClass('error');
            $('#last_nameError').hide();
            $('#email').removeClass('error');
            $('#emailError').hide();
            $('#phone').removeClass('error');
            $('#phoneError').hide();
            $('#store_name').removeClass('error');
            $('#storeError').hide();
            $('#password').removeClass('error');
            $('#passwordError').hide();
            $('#confirmPass').removeClass('error');
            $('#re_passwordError').hide();
            $('#lengthError').hide();
            
            // var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i
            let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            let confirmPass = $('#confirmPass').val();
            let valid = true;

            if (formData.first_name === '') {
                valid = false;
                $('#first_name').addClass('error');
                $('#first_nameError').show();
            }else if(formData.last_name === ''){
                valid  = false;
                $('#last_name').addClass('error');
                $('#last_nameError').show()
            }else if(formData.email === ''){
                valid = false;
                $('#email').addClass('error')
                $('#emailError').show()
            }else if(!pattern.test(formData.email)){
                valid = false;
                $('#email').addClass('error');
                $('#emailError').text('Invalid email format').show();
            }else if(formData.phone === ''){
                valid = false;
                $('#phone').addClass('error')
                $('#phoneError').show()
            }else if(formData.password === ''){
                valid = false;
                $('#password').addClass('error')
                $('#passwordError').show()
            }else if(formData.password.length < 8){
                valid = false;
                $('#password').addClass('error')
                $('#lengthError').text("Password length is less than 8").show()
            }else if (confirmPass === ''){
                valid = false;
                $('#confirmPass').addClass('error');
                $('#re_passwordError').show();
            }else if(formData.store_name === ''){
                valid = false;
                $('#store_name').addClass('error');
                $('#storeError').show();
            }else if (confirmPass != formData.password){
                valid = false;
                $('#confirmPass').addClass('error');
                $('#re_passwordError').text("Password doesn't match").show();
            }else{
                valid = true;
                $.ajax({
                    method:'POST',
                    url:`${endPoint}/merchants`,
                    contentType: 'application/json',
                    data:JSON.stringify(formData),
                    success: function(res){
                        console.log(res)
                        // localStorage.setItem('formData', res);
                        alert('Registered Successfully');
                        window.location.href='login.html';
                        console.log('Success',res)
                        
                    },
                    error: function(err){
                        console.log(err)
                    }
                })
                
            }
        
    })
})