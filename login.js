$(document).ready(function () {
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


    // login and registration





    // Show/Hide Change Password Form






    const BASE = 'http://ecommerce.reworkstaging.name.ng/v2';
    let user_id = JSON.parse(localStorage.getItem())

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
        }

        let valid = Validate(formData);

        if (valid) {
            $.ajax({
                url: `${BASE}/users/login`,
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(formData), // Convert formData to a JSON string
                success: function (res) {
                    console.log('success', res);
                    if (res) {
                        window.location.href = 'index.html';
                    }
                },
                error: function (err) {
                    console.log('error', err);
                }
            });
        }

        function Validate(formData) {
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
    });



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

        let valid = Validate(formdata);

        if (valid) {
            $.ajax({
                url: `${BASE}/users`,
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(formdata),
                success: function (res) {
                    if (res) {
                        alert("registered successfully");
                    }
                    console.log('success', res);
                },
                error: function (err) {
                    console.log('error', err);
                }
            });
        }

        function Validate(formdata) {
            let valid = true;

            let first_name = formdata.first;
            let last_name = formdata.last;
            let email = formdata.mail;
            let phone = formdata.number;
            let password = formdata.pass;
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
                // } else if (!emailRegex.test(email)) {
                //     valid = false;
                //     Err.text("Please enter a valid email");
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
    });
    // Update Registration Form Submission
    $('#updateRegistrationForm').on('submit', function (e) {
        e.preventDefault();
        const BASE = 'http://ecommerce.reworkstaging.name.ng/v2';
    
        let user = JSON.parse(localStorage.getItem('user'));
        let user_id =user.id
        if (!user) {
            alert("User is not logged in.");
            return;
        }
    
        const formData = {
            first_name: $('#updateFname').val(),
            last_name: $('#updateLname').val(),
            email: $('#updateEmail').val(),
            phone: $('#updatePHONE').val(),
            password: $('#updatePASSWORD').val(),
        };
    
        let valid = Validate(formData);
    
        if (valid) {
            $.ajax({
                url: `${BASE}/users/${user_id}`,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(formData),
                success: function (response) {
                    alert("Registration updated successfully!");
                    localStorage.setItem('user', JSON.stringify(response));
                },
                error: function (error) {
                    alert("Update failed: " + error.responseJSON.message);
                }
            });
        }
    
        function Validate(formData) {
            let valid = true;
    
            let first_name = formData.first_name;
            let last_name = formData.last_name;
            let email = formData.email;
            let phone = formData.phone;
            let password = formData.password;
            let Ferr = $('#updateFerror');
            let Lerr = $('#updateLerror');
            let Err = $('#updateEerror');
            let perr = $('#updatePerror');
            let passy = $('#updatePasserror');
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
            } else if (password.length < 8) {
                valid = false;
                passy.text("Password must be at least 8 characters");
            } else {
                passy.text("");
            }
    
            return valid;
        }
    
    
    
    
    
    
    
        
    });
    

    // Change Password Form Submission
    $('#changePasswordForm').on('submit', function (e) {
        e.preventDefault();
        const BASE = 'http://ecommerce.reworkstaging.name.ng/v2';
        let user = JSON.parse(localStorage.getItem('user'));
        let user_id =user.id
        if (!user) {
            alert("User is not logged in.");
            return;
        }
    
        const formData = {
            old_password: $('#currentPassword').val(),
            new_password: $('#newPassword').val(),
            confirm_new_password: $('#confirmNewPassword').val(),
        };
    
        let valid = Validate(formData);
    
        if (valid) {
            $.ajax({
                url: `${BASE}/users/${user_id}/change-passwd`,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({
                    old_password: formData.old_password,
                    new_password: formData.new_password
                }),
                success: function (response) {
                    alert("Password changed successfully!");
                },
                error: function (error) {
                    alert("Password change failed: " + error.responseJSON.message);
                }
            });
        }
    
        function Validate(formData) {
            let valid = true;
    
            let currentPassword = formData.old_password;
            let newPassword = formData.new_password;
            let confirmNewPassword = formData.confirm_new_password;
            let currentPassErr = $('#currentPassErr');
            let newPassErr = $('#newPassErr');
            let confirmPassErr = $('#confirmPassErr');
    
            if (currentPassword === "") {
                valid = false;
                currentPassErr.text("Please enter your current password");
            } else {
                currentPassErr.text("");
            }
    
            if (newPassword === "") {
                valid = false;
                newPassErr.text("Please enter your new password");
            } else if (newPassword.length < 8) {
                valid = false;
                newPassErr.text("Password must be at least 8 characters");
            } else {
                newPassErr.text("");
            }
    
            if (confirmNewPassword === "") {
                valid = false;
                confirmPassErr.text("Please confirm your new password");
            } else if (confirmNewPassword !== newPassword) {
                valid = false;
                confirmPassErr.text("Passwords do not match");
            } else {
                confirmPassErr.text("");
            }
    
            return valid;
        }
    });
    
});

















