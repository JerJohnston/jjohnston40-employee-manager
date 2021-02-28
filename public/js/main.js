window.addEventListener('load', function(e){
        
    // client side validation

    // reference variables

    const signupForm = document.querySelector('#signup');
    const loginForm = document.querySelector('#login');
    let errorMsg = document.querySelector('.signup-err')


    // sign up form validation

    function validateSignup(){
        const inputName = document.querySelector('#name')
        const inputEmail = document.querySelector('#email')
        const inputPassword = document.querySelector('#password')

        

        signupForm.addEventListener('click', function(e){

            e.preventDefault();
            
            if(inputName.value == '' || inputEmail.value == '' || inputPassword.value == ''){

                errorMsg.classList.remove('hide-err')
                errorMsg.innerHTML = 'All fields must be filled out'
                
            }
        })
    }


    //  login form validation

    function validateLogin(){
        const inputEmail = document.querySelector('#lgnEmail');
        const inputPassword = document.querySelector('#lgnPassword');

        loginForm.addEventListener('click', function(e){

            if(inputEmail == '' || inputPassword == ''){
                errorMsg.classList.remove('hide-err')
                errorMsg.innerHTML = 'All fields must be filled out'
            }
        })
    }

    validateSignup();

    validateLogin();
})