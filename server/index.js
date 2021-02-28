// Allows us to access all of the methods and properties that are available to express.
        /**
         *  Web Server
         *      ---- javascript node
         *      ---- listen for http requests
         */
        require('dotenv').config();
        const express = require('express');
        const path = require('path');
        const PORT = process.env.PORT || 3000;
        const app = express();

        // Read HTTP POST Request Message Body
    
        app.use(express.urlencoded( {extended:true} ));
        app.use(express.json());

        // setting up static files to server 

        const options = {
            dotfiles: 'ignore',
            extensions: ['htm', 'html']
        }

        app.use(express.static(path.join(__dirname, '../public'), options));

        app.post('/login', (req, res)=> {
            console.log(req.body);
            res.send("login")
        })

      

        app.get('/api/v1/employees', (req, res)=>{
            res.send('EMPLOYEE MANAGER API');
        })

        // redirect to error page (last MIDDLE WARE)

        app.use((req, res)=>{
            res.sendFile(path.join(__dirname, '../public/404.html'));
        })
    
        app.listen(PORT, ()=>{
                console.log(`Server is running on http://localhost:${PORT}`)
        })