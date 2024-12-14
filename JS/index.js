// DON'T OPEN THE PROJECT WITH LIVE SERVER BECAUSE THE PATHNAME WILL BE CHANGE

if (window.location.pathname === "/Assignment-4-JS/") {
    // ===============================index.html================================= //
    console.log("LOGIN PAGE");
    var email = document.querySelector('#email');
    var password = document.querySelector('#password');
    var btnLogin = document.querySelector('#btnLogin');
    var nameSign = document.querySelector('#nameSign');
    var emailSign = document.querySelector('#emailSign');
    var passwordSign = document.querySelector('#passwordSign');
    var btnSign = document.querySelector('#btnSign');
    var createAccount = document.querySelector('#createAccount');
    var LoginToAccount = document.querySelector('#LoginToAccount');
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    var userInfo = [];

    if (localStorage.getItem('allUserInfo')) {
        userInfo = JSON.parse(localStorage.getItem("allUserInfo"));
    }

    createAccount.addEventListener('click', function () {
        document.querySelector('.login').classList.add('d-none');
        document.querySelector('.sign').classList.replace('d-none', 'd-block');
    });

    LoginToAccount.addEventListener('click', function () {
        document.querySelector('.sign').classList.add('d-none');
        document.querySelector('.login').classList.replace('d-none', 'd-block');
    });

   document.querySelector('#nameSign').addEventListener('input', function (e) {
    if (!usernameRegex.test(nameSign.value)) {
        nameSign.classList.add('is-invalid');
        nameSign.classList.remove('is-valid');
        if (btnSign.classList.contains('Sign-btn-first-in')) {
            btnSign.classList.remove('Sign-btn-first-in');
            btnSign.classList.add('Sign-btn-first-out');
        }
    } else {
        nameSign.classList.remove('is-invalid');
        nameSign.classList.add('is-valid');
        if (!btnSign.classList.contains('Sign-btn-first-in')) {
            btnSign.classList.add('Sign-btn-first-in');
            btnSign.classList.remove('Sign-btn-first-out');
        }
    }
});
document.querySelector('#emailSign').addEventListener('input', function (e) {
    if (!emailRegex.test(emailSign.value)) {
        emailSign.classList.add('is-invalid');
        emailSign.classList.remove('is-valid');
        btnSign.classList.remove('Sign-btn-second');
    } else {
        emailSign.classList.remove('is-invalid');
        emailSign.classList.add('is-valid');
        btnSign.classList.add('Sign-btn-second');
    }
});
document.querySelector('#passwordSign').addEventListener('input', function (e) {
    if (!passwordRegex.test(passwordSign.value)) {
        passwordSign.classList.add('is-invalid');
        passwordSign.classList.remove('is-valid');
        btnSign.classList.remove('Sign-btn-third');
    } else {
        passwordSign.classList.remove('is-invalid');
        passwordSign.classList.add('is-valid');
        btnSign.classList.add('Sign-btn-third');
    }
});

    btnSign.addEventListener('click', function () {
        signUp();
    });

    function signUp() {
        var errors = [];
        if (!usernameRegex.test(nameSign.value)) {
            errors.push("Username must be 3-20 characters long and can include letters, numbers, and underscores.");
        }

        if (!emailRegex.test(emailSign.value)) {
            errors.push("Invalid email format.");
        }

        if (!passwordRegex.test(passwordSign.value)) {
            errors.push("Password must be at least 8 characters long, contain letters and numbers.");
        }

        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        for (let i = 0; i < userInfo.length; i++) {
            if (userInfo[i].useremail === emailSign.value) {
                alert("User with this email already exists.");
                return;
            }
        }

        var user = {
            username: nameSign.value,
            useremail: emailSign.value,
            userpassword: passwordSign.value
        };

        userInfo.push(user);
        localStorage.setItem("allUserInfo", JSON.stringify(userInfo));
        alert("Account created successfully!");
        clearSignUp();
        localStorage.setItem('CurrentUser', user.username);
        window.location.href = "https://hossamgamaldwidar.github.io/Assignment-4-JS/welcompage.html";
    }

    function clearSignUp() {
        nameSign.value = "";
        emailSign.value = "";
        passwordSign.value = "";
    }

    btnLogin.addEventListener('click', function () {
        if (!email.value || !password.value) {
            alert("Please fill in all fields.");
            return;
        }
        if (login()) {
            alert("Login successful!");
            window.location.href = "https://hossamgamaldwidar.github.io/Assignment-4-JS/welcompage.html";
        } else {
            alert("Invalid email or password.");
        }
    });

    function login() {
        var useremaillogin = email.value;
        var userpasswordlogin = password.value;
        for (var i = 0; i < userInfo.length; i++) {
            if (userInfo[i].useremail === useremaillogin && userInfo[i].userpassword === userpasswordlogin) {
                localStorage.setItem('CurrentUser', userInfo[i].username);
                return true;
            }
        }
        return false;
    }

} else if (window.location.pathname.endsWith("welcompage.html")) {
    // ===============================welcompage================================= //
    console.log("WELCOME PAGE");
    var fakeLogoutBtn = document.querySelector('#fakeLogoutBtn');
    var logoutBtn = document.querySelector('#logoutBtn');
    var welcomeUser = document.querySelector('#welcomeUser');
    var goLogOut = document.querySelector('.goLogOut');
    welcomeUser.textContent = `Welcome ${localStorage.getItem('CurrentUser')}`;

     fakeLogoutBtn.addEventListener('click', function () {
    document.querySelector('#goLogOut').classList.remove('d-none')
    });
    
    logoutBtn.addEventListener('click', function () {
        localStorage.removeItem('CurrentUser');
        window.location.href = "https://hossamgamaldwidar.github.io/Assignment-4-JS/";
    });

} else {
    console.log("404 ERROR");
}
