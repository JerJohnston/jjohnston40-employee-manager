// Allows us to access all of the methods and properties that are available to express.
        /**
         *  Web Server
         *      ---- javascript node
         *      ---- listen for http requests
         */
        require('dotenv').config();
        const express = require('express');

        // import path utilities
        const path = require('path');
        const cors = require('cors');
        const cookieSession = require('cookie-session');
        const { body, validationResult } = require('express-validator');
        const { v4: uuidv4 } = require('uuid');
        // sign up and login service Middle Ware

    

        const fileService = require('./services/fileService');
        


        const loginService = require('./services/loginService');
        const app = express();

        const PORT = process.env.PORT || 3000;

        app.use(cors());

        // Read HTTP POST Request Message Body
    
        app.use(express.urlencoded( {extended:true} ));
        app.use(express.json());

        // Session Middleware

        app.use(cookieSession({
            name:"SESSION",
            keys:["-?,^(Op65-ow1v(D1grNm2mh!=;k=D", "Bc@9Hpu/g:4%Xz?iy^&>FZ2`IMy|(d"]
        }));

        app.set('view engine', 'ejs');
        app.set('views' , path.join(__dirname, './views'));

        // setting up static files to server 

        const options = {
            dotfiles: 'ignore',
            extensions: ['htm', 'html']
        }

        app.use(express.static(path.join(__dirname, '../public'), options));

        // MIDDLEWARE for POST Signup Service

        app.post('/signup', 

        // express-validator validation
        
        body('name').isLength({ min:3}),
        body('email').isEmail(),
        body('password').isLength({ min:8 }),
        (req, res) => {
            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
            }

            fileService.writeFileContents('../data/users.json', {name:req.body.name, email:req.body.email, password:req.body.password, id:uuidv4()});
            res.redirect('/login')
                
        });

        // MIDDLEWARE For POST Login Service

        app.get('/dashboard', (req, res) => {
            if(req.session.isValid){
                res.render('dashboard');
            }else {
                res.redirect('/login')
            } 
        })

        app.get('/login', (req, res) => {
            res.render('login', {
                passwordWarning:"", 
                emailWarning: "", 
                email:"", 
                password:""});
        })

        app.post('/login', (req, res)=> {
            const credentials = {
                email:req.body.email,
                password:req.body.password
            }

            // validation for login

            const isValidUser = loginService.validator(credentials);

                if(isValidUser.user !== null){

                    if(!req.session.isValid){
                        req.session.isValid = true;
                    }
                    res.redirect('dashboard');

                } else if (isValidUser.user === null){

                    res.render('login', {
                        emailWarning:isValidUser.emailWarning, 
                        passwordWarning:isValidUser.passwordWarning,
                        email:req.body.email,
                        password:req.body.password
                    });
                }

        })

      

        app.get('/api/v1/employees', (req, res)=>{
            res.send('EMPLOYEE MANAGER API');
            
        })

       
        
        app.get('/server/data/users.json', function(req, res){
            res.json('users.json')
        })

        // bonus challenge

        // redirect to error page (last MIDDLE WARE)

        app.use((req, res)=>{
            res.sendFile(path.join(__dirname, '../public/404.html'));
        })
    
        app.listen(PORT, ()=>{
                console.log(`Server is running on http://localhost:${PORT}`)
        })