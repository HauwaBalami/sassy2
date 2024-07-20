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
    // $('#login').on('submit', function (e) {
    //     e.preventDefault();

    //     let email = $('#email').val();
    //     let password = $('#password').val();
    //     let Eerror = $('#emailErr');
    //     let Perror = $('#passErr'); // Corrected reference to #passErr
    //     const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    //     if (email === "") {
    //         Eerror.text("Please enter your email");
    //     } else if (!emailRegex.test(email)) { // Fixed condition
    //         Eerror.text("Please enter a valid email");
    //     } else {
    //         Eerror.text("");
    //     }

    //     if (password === "") {
    //         Perror.text("Please enter your password");
    //     } else if (password.length < 8) {
    //         Perror.text("Password must be at least 8 characters");
    //     } else {
    //         Perror.text("");
    //     }
    // });


    // $('#register').on('submit',function (e){
    //     e.preventDefault();
    //     let first = $('#Fname').val();
    //     let last = $('#Lname').val();
    //     let mail = $('#Email').val();
    //     let number =$('#PHONE').val();
    //     let pass = $('#PASSWORD').val();
    //     let Ferr = $('#Ferror');
    //     let Lerr = $('#Lerror');
    //     let Err = $('#Eerror');
    //     let perr = $('#Perror');
    //     let passy= $('#Passerror');

    //     if (first === ""){
    //         Ferr.text("Please enter your first name");
    //     }else{
    //         Ferr.text("");
    //     }
    //     if (last ===""){
    //         Lerr.text("Please enter your last name");
    //     }else{
    //         Lerr.text("");
    //     }
    //     if (mail === ""){
    //         Err.text("Please enter your email");
    //     } else if (!emailRegex.test(email)) { // Fixed condition
    //         Err.text("Please enter a valid email");
    //     } else {
    //         Err.text("");
    //     }

    //     if (number === ""){
    //         perr.text("Please enter your phone number");
    //     }else{
    //         perr.text("");
    //     }
    //     if (pass === ""){
    //          passy.text("please enter your password")
    //     }else{
    //         passy.text("");
    //     }

        


    // })




    // Show/Hide Change Password Form

    




    const BASE = 'http://ecommerce.reworkstaging.name.ng/v2';

    // Show/Hide Change Password Form
    $('#showChangePassword').click(function() {
        $('#changePasswordForm').toggle();
    });
    
    // Show/Hide Update Registration Form
    $('#showUpdateRegistration').click(function() {
        $('#updateRegistrationForm').toggle();
    });
    
    // Login Form Submission
    $('#login').on('submit', function(e) {
        e.preventDefault();
        let email = $('#email').val();
        let password = $('#password').val();
        let Eerror = $('#emailErr');
        let Perror = $('#passErr');
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    
        if (email === "") {
            Eerror.text("Please enter your email");
        } else if (!emailRegex.test(email)) {
            Eerror.text("Please enter a valid email");
        } else {
            Eerror.text("");
        }
    
        if (password === "") {
            Perror.text("Please enter your password");
        } else if (password.length < 8) {
            Perror.text("Password must be at least 8 characters");
        } else {
            Perror.text("");
        }
    
        if (Eerror.text() === "" && Perror.text() === "") {
            $.ajax({
                url: `${BASE}/users/login`,
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ email: email, password: password }),
                success: function(response) {
                    window.location.href='index.html'
                    localStorage.setItem('user_id', response.user_id); // Save user_id for further actions
                },
                error: function(error) {
                    alert("Login failed: " + error.responseJSON.message);
                }
            });
        }
    });
    
    // Registration Form Submission
    $('#register').on('submit', function(e) {
        e.preventDefault();
        let first = $('#Fname').val();
        let last = $('#Lname').val();
        let mail = $('#Email').val();
        let number = $('#PHONE').val();
        let pass = $('#PASSWORD').val();
        let Ferr = $('#Ferror');
        let Lerr = $('#Lerror');
        let Err = $('#Eerror');
        let perr = $('#Perror');
        let passy = $('#Passerror');
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    
        if (first === "") {
            Ferr.text("Please enter your first name");
        } else {
            Ferr.text("");
        }
        if (last === "") {
            Lerr.text("Please enter your last name");
        } else {
            Lerr.text("");
        }
        if (mail === "") {
            Err.text("Please enter your email");
        } else if (!emailRegex.test(mail)) {
            Err.text("Please enter a valid email");
        } else {
            Err.text("");
        }
        if (number === "") {
            perr.text("Please enter your phone number");
        } else {
            perr.text("");
        }
        if (pass === "") {
            passy.text("Please enter your password");
        } else {
            passy.text("");
        }
    
        if (Ferr.text() === "" && Lerr.text() === "" && Err.text() === "" && perr.text() === "" && passy.text() === "") {
            $.ajax({
                url: `${BASE}/users`,
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    first_name: first,
                    last_name: last,
                    email: mail,
                    phone: number,
                    password: pass
                }),
                success: function(response) {
                    alert("Registration successful!");
                    localStorage.setItem('user_id', response.user_id); // Save user_id for further actions
                },
                error: function(error) {
                    alert("Registration failed: " + error.responseJSON.message);
                }
            });
        }
    });
    
    // Update Registration Form Submission
    $('#updateRegistrationForm').on('submit', function(e) {
        e.preventDefault();
        let userId = localStorage.getItem('user_id');
        if (!userId) {
            alert("User is not logged in.");
            return;
        }
        let first = $('#updateFname').val();
        let last = $('#updateLname').val();
        let mail = $('#updateEmail').val();
        let number = $('#updatePHONE').val();
        let pass = $('#updatePASSWORD').val();
        let Ferr = $('#updateFerror');
        let Lerr = $('#updateLerror');
        let Err = $('#updateEerror');
        let perr = $('#updatePerror');
        let passy = $('#updatePasserror');
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    
        if (first === "") {
            Ferr.text("Please enter your first name");
        } else {
            Ferr.text("");
        }
        if (last === "") {
            Lerr.text("Please enter your last name");
        } else {
            Lerr.text("");
        }
        if (mail === "") {
            Err.text("Please enter your email");
        } else if (!emailRegex.test(mail)) {
            Err.text("Please enter a valid email");
        } else {
            Err.text("");
        }
        if (number === "") {
            perr.text("Please enter your phone number");
        } else {
            perr.text("");
        }
    
        if (Ferr.text() === "" && Lerr.text() === "" && Err.text() === "" && perr.text() === "") {
            $.ajax({
                url: `${BASE}/users/${userId}`,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({
                    first_name: first,
                    last_name: last,
                    email: mail,
                    phone: number,
                    password: pass
                }),
                success: function(response) {
                    alert("Registration updated successfully!");
                },
                error: function(error) {
                    alert("Update failed: " + error.responseJSON.message);
                }
            });
        }
    });
    
    // Change Password Form Submission
    $('#changePasswordForm').on('submit', function(e) {
        e.preventDefault();
        let userId = localStorage.getItem('user_id');
        if (!userId) {
            alert("User is not logged in.");
            return;
        }
        let currentPassword = $('#currentPassword').val();
        let newPassword = $('#newPassword').val();
        let confirmNewPassword = $('#confirmNewPassword').val();
        let currentPassErr = $('#currentPassErr');
        let newPassErr = $('#newPassErr');
        let confirmPassErr = $('#confirmPassErr');
    
        if (currentPassword === "") {
            currentPassErr.text("Please enter your current password");
        } else {
            currentPassErr.text("");
        }
    
        if (newPassword === "") {
            newPassErr.text("Please enter your new password");
        } else if (newPassword.length < 8) {
            newPassErr.text("Password must be at least 8 characters");
        } else {
            newPassErr.text("");
        }
    
        if (confirmNewPassword === "") {
            confirmPassErr.text("Please confirm your new password");
        } else if (confirmNewPassword !== newPassword) {
            confirmPassErr.text("Passwords do not match");
        } else {
            confirmPassErr.text("");
        }
    
        if (currentPassErr.text() === "" && newPassErr.text() === "" && confirmPassErr.text() === "") {
            $.ajax({
                url: `${BASE}/users/${userId}/change-passwd`,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({
                    old_password: currentPassword,
                    new_password: newPassword
                }),
                success: function(response) {
                    alert("Password changed successfully!");
                },
                error: function(error) {
                    alert("Password change failed: " + error.responseJSON.message);
                }
            });
        }
    });
    
});

    















