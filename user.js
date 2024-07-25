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
                        window.location.href = 'index.html';
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
        let user_id = user.id
        if (!user) {
            alert('User not found. Please login first.');
            return;
        }
        const formdata = {
            first_name: $('#updateFname').val(),
            last_name: $('#updateLname').val(),
            email: $('#updateEmail').val(),
            phone: $('#updatePHONE').val(),
            password: $('#updatePASSWORD').val(),
        };
        let valid = validateRegistration(formdata);
        if (valid) {
            $.ajax({
                url: `${BASE}/users/${user_id}`,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(formdata),
                headers: {
                    'Authorization': `Bearer ${user.token}`
                },
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

    // Change Password Form Submission
    // $('#changePasswordForm').on('submit', function (e) {
    //     e.preventDefault();
    //     const user = JSON.parse(localStorage.getItem('user'));
    //     let user_id = user.id
    //     if (!user) {
    //         alert('User not found. Please login first.');
    //         return;
    //     }
    //     const formdata = {
    //         current_password: $('#currentPassword').val(),
    //         new_password: $('#newPassword').val(),
    //     };
    //     let valid = validateChangePassword(formdata);
    //     if (valid) {
    //         $.ajax({
    //             url: `${BASE}/users/${user_id}/change-password`,
    //             method: 'PUT',
    //             contentType: 'application/json',
    //             data: JSON.stringify(formdata),
    //             headers: {
    //                 'Authorization': `Bearer ${user.token}`
    //             },
    //             success: function (res) {
    //                 console.log('success', res);
    //                 alert("Password changed successfully");
    //             },
    //             error: function (err) {
    //                 console.log('error', err);
    //                 alert("Error changing password. Please try again.");
    //             }
    //         });
    //     }
    // });

    // // Validation function for Change Password form
    // function validateChangePassword(formData) {
    //     let valid = true;

    //     let currentPassword = formData.current_password;
    //     let newPassword = formData.new_password;
    //     let confirmNewPassword = formData.confirm_password;
    //     let currentPassErr = $('#currentPassErr');
    //     let newPassErr = $('#newPassErr');
    

    //     if (currentPassword === "") {
    //         valid = false;
    //         currentPassErr.text("Please enter your current password");
    //     } else {
    //         currentPassErr.text("");
    //     }

    //     if (newPassword === "") {
    //         valid = false;
    //         newPassErr.text("Please enter your new password");
    //     } else if (newPassword.length < 8) {
    //         valid = false;
    //         newPassErr.text("Password must be at least 8 characters");
    //     } else {
    //         newPassErr.text("");
    //     }

    //     if (confirmNewPassword === "") {
    //         valid = false;
    //         confirmPassErr.text("Please confirm your new password");
    //     } else if (confirmNewPassword !== newPassword) {
    //         valid = false;
    //         confirmPassErr.text("Passwords do not match");
    //     } else {
    //         confirmPassErr.text("");
    //     }

    //     return valid;
    // }

    $('#changePasswordForm').on('submit', function(event) {
        event.preventDefault();
        
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            console.error('User not found in localStorage');
            alert("User not logged in");
            return;
        }
        
        let user_id = user.id;
        let token = user.token;

        if (!user_id || !token) {
            console.error('User ID or token is missing');
            alert("Invalid user data");
            return;
        }

        let formData = $(this).serializeArray();
        let formObject = {};
        $.each(formData, function(_, field) {
            formObject[field.name] = field.value;
        });

        if (validateChangePassword(formObject)) {
            let url = `${BASE}/users/${user_id}/change-password`;
            console.log('Making AJAX request to URL:', url);
            console.log('Authorization token:', token);

            $.ajax({
                url: url,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(formObject),
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                success: function (res) {
                    console.log('Success:', res);
                    alert("Password changed successfully");
                },
                error: function (err) {
                    console.error('Error:', err);
                    alert("Error changing password. Please try again.");
                }
            });
        } else {
            console.log('Form validation failed');
        }
    });

    function validateChangePassword(formData) {
        let valid = true;

        let currentPassword = formData.current_password;
        let newPassword = formData.new_password;
        let confirmNewPassword = formData.confirm_password;
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
        // } else if (newPassword.length < 8) {
        //     valid = false;
        //     newPassErr.text("Password must be at least 8 characters");
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






















































