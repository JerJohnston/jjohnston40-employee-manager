/**
 *      NODE Build files with JS first
 *          - get them working test on command line
 *          - add the commonjs exports to the function
 * 
 *          ** pass email and the password auth with the user.json 
 *          ** read user.jsom
 *         
 */

 const fileService = require('./fileService');
 
 exports.validator = (credentials) => {
        const {email, password} = {...credentials}
        const users = fileService.getFileContents('../data/users.json');

        // server side validation for login
        
        const authUser = users.reduce((authObj, user)=> {

            if(user.email === email){
                authObj.validEmail = true;
            }

            if(user.password === password){
                authObj.validPassword = true;
            }

            if(authObj.validEmail === true && authObj.validPassword === true){
                authObj.user = user;
            }

            return authObj;

        }, {validEmail:false, validPassword:false, user:null});

        const validUser = authUser.user? {user:authUser.user} : formatErrors(authUser);
        return validUser
 }


 const formatErrors = function(authObj){
        let emailWarning = '';
        let passwordWarning = '';

        if(authObj.validEmail === false){
            emailWarning = "Email does not exist"
        }

        if(authObj.validPassword === false){
            passwordWarning = "Incorrect password"
        }

        return {user:null, emailWarning, passwordWarning};
 }
