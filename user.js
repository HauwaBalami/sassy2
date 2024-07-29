$(document).ready(function () {






    const BASE = 'http://ecommerce.reworkstaging.name.ng/v2';

    // Show/Hide Change Password Form
    $('#showChangePassword').click(function () {
        $('#changePasswordForm').toggle();
    });

    // Show/Hide Update Registration Form
    $('#showUpdateRegistration').click(function () {
        $('#updateRegistrationForm').toggle();
    });

    // Login Form Submission
    $('#login').on('submit', function (e) {
        e.preventDefault();
        const formData = {
            email: $('#email').val(),
            password: $('#password').val(),
        };
        let valid = validateLogin(formData);
        if (valid) {
            $.ajax({
                url: `${BASE}/users/login`,
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(formData),
                success: function (res) {
                    console.log('success', res);
                    if (res) {
                        localStorage.setItem('user', JSON.stringify(res)); // Store user information
                        window.location.href = 'shop.html';
                        console.log(localStorage)
                    }
                },
                error: function (err) {
                    console.log('error', err);
                }
            });
        }
    });

    // Validation function for Login form
    function validateLogin(formData) {
        let valid = true;
        let email = formData.email;
        let password = formData.password;
        let Eerror = $('#emailErr');
        let Perror = $('#passErr');
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (email === "") {
            valid = false;
            Eerror.text("Please enter your email");
        } else if (!emailRegex.test(email)) {
            valid = false;
            Eerror.text("Please enter a valid email");
        } else {
            Eerror.text("");
        }

        if (password === "") {
            valid = false;
            Perror.text("Please enter your password");
        } else if (password.length < 8) {
            valid = false;
            Perror.text("Password must be at least 8 characters");
        } else {
            Perror.text("");
        }

        return valid;
    }

    // Registration Form Submission
    $('#register').on('submit', function (e) {
        e.preventDefault();
        const formdata = {
            first_name: $('#Fname').val(),
            last_name: $('#Lname').val(),
            email: $('#Email').val(),
            phone: $('#PHONE').val(),
            password: $('#PASSWORD').val(),
        };
        let valid = validateRegistration(formdata);
        if (valid) {
            $.ajax({
                url: `${BASE}/users`,
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(formdata),
                success: function (res) {
                    console.log('success', res);
                    if (res) {
                        localStorage.setItem('user', JSON.stringify(res)); // Store user information
                        alert("Registered successfully");
                    }
                },
                error: function (err) {
                    console.log('error', err);
                }
            });
        }
    });

    // Validation function for Registration form
    function validateRegistration(formdata) {
        let valid = true;

        let first_name = formdata.first_name;
        let last_name = formdata.last_name;
        let email = formdata.email;
        let phone = formdata.phone;
        let password = formdata.password;
        let Ferr = $('#Ferror');
        let Lerr = $('#Lerror');
        let Err = $('#Eerror');
        let perr = $('#Perror');
        let passy = $('#Passerror');
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (first_name === "") {
            valid = false;
            Ferr.text("Please enter your first name");
        } else {
            Ferr.text("");
        }
        if (last_name === "") {
            valid = false;
            Lerr.text("Please enter your last name");
        } else {
            Lerr.text("");
        }
        if (email === "") {
            valid = false;
            Err.text("Please enter your email");
        } else if (!emailRegex.test(email)) {
            valid = false;
            Err.text("Please enter a valid email");
        } else {
            Err.text("");
        }
        if (phone === "") {
            valid = false;
            perr.text("Please enter your phone number");
        } else {
            perr.text("");
        }
        if (password === "") {
            valid = false;
            passy.text("Please enter your password");
        } else {
            passy.text("");
        }

        return valid;
    }

    // Update Registration Form Submission
    $('#updateRegistrationForm').on('submit', function (e) {
        e.preventDefault();
        
        const user = JSON.parse(localStorage.getItem('user'));
        const BASE = 'http://ecommerce.reworkstaging.name.ng/v2';
        let user_id = user.id;

        
        
        const formdata = {
            first_name: $('#updateFname').val(),
            last_name: $('#updateLname').val(),
            email: $('#updateEmail').val(),
            phone: $('#updatePHONE').val(),
    
        };

       
    
        function validateRegistration(formdata) {
            let valid = true;
            let updateferr = $('#updateFerror');
            let updatelerr = $('#updateLerror');
            let updateemail = $('#updateEerror');
            let updatephone = $('#updatePerror');
    
            if (formdata.first_name === "") {
                updateferr.text("Please enter your first name");
                valid = false;
            } else {
                updateferr.text("");
            }
            
            if (formdata.last_name === "") {
                updatelerr.text("Please enter your last name");
                valid = false;
            } else {
                updatelerr.text("");
            }
            
            if (formdata.email === "") {
                updateemail.text("Please enter your email");
                valid = false;
            } else {
                updateemail.text("");
            }
            
            if (formdata.phone === "") {
                updatephone.text("Please enter your phone number");
                valid = false;
            } else {
                updatephone.text("");
            }
    
            return valid;
        }
    
        let valid = validateRegistration(formdata);
        
        if (valid) {
            $.ajax({
                url: `${BASE}/users/${user_id}`,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(formdata),
                success: function (res) {
                    console.log('success', res);
                    if (res) {
                        alert("Updated successfully");
                        localStorage.setItem('user', JSON.stringify(res.data)); // Update stored user information
                    }
                },
                error: function (err) {
                    console.log('error', err);
                }
            });
        }
    });
   

    $('#changePasswordForm').on('submit', function(event) {
        event.preventDefault();
        const BASE = 'http://ecommerce.reworkstaging.name.ng/v2';
        let loggeduser = JSON.parse(localStorage.getItem('user'))
        let user_id = loggeduser.id
    
        const formData = {
            old_password: $('#currentPassword').val(),
            new_password: $('#newPassword').val(),
            
        }
    
        function validateChangePassword(formData) {
            let valid = true;
            
            let currentPassword = formData.old_password;
            let newPassword = formData.new_password;
            let currentPassErr = $('#currentPassErr');
            let newPassErr = $('#newPassErr');
            
            
            if (currentPassword === "") {
                valid = false;
                currentPassErr.text("Please enter your current password");
            } else {
                currentPassErr.text("");
            }
            
            if (newPassword === "") {
                valid = false;
                newPassErr.text("Please enter your new password");
            } else {
                newPassErr.text("");
            }
            
           
            
            return valid;
        }
    
        if (validateChangePassword(formData)) {
            console.log(formData);
            $.ajax({
                url: `${BASE}/users/${user_id}/change-passwd`,
                method: "PUT",
                data: formData,
                success: function(res) {
                    if (res) {
                        alert('Password changed successfully');
                        console.log(res);
                    }
                    window.location.href = 'user.html';
                },
                error: function(err) {
                    console.log('error', err);
                }
            });
        }
    });
    
    
    
    
    
    
    

    
    
    

    let menuTimeout;


    
    $("#menu").hover(function () {
        // On mouse enter
        clearTimeout(menuTimeout); // Clear any existing timeout
        $(".overlay").addClass('block');
        
        $(".mega-menu").stop(true, true).slideDown(100, function () {
            // $(".navigation").animate({ height: $(".navigation").height() + $(".mega-menu").outerHeight() }, 300);
        });
    }, function () {
        // On mouse leave
        menuTimeout = setTimeout(function () {
            $(".overlay").removeClass('block'); // Hide overlay
            $(".mega-menu").stop(true, true).slideUp(100, function () {
                // $(".navigation").animate({ height: '50px' }, 300);
            });
        }, 300); // Adjust the delay as needed (300ms in this case)
    });

    // Also consider handling hover on the mega menu itself to prevent closing
    $(".mega-menu").hover(function () {
        clearTimeout(menuTimeout); // Clear timeout if mouse enters the mega menu
    }, function () {
        // Start the timeout when mouse leaves the mega menu
        menuTimeout = setTimeout(function () {
            $(".overlay").removeClass('block');
            $(".mega-menu").stop(true, true).slideUp(100, function () {
                // $(".navigation").animate({ height: '50px' }, 300);
            });
        }, 300); // Adjust the delay as needed
    });









 });






















































