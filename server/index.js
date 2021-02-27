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

        console.log(process.env.PORT);
    
  

        // setting up static files to server 

        const options = {
            dotfiles: 'ignore',
            extensions: ['htm', 'html']
        }

        app.use(express.static(path.join(__dirname, '../public'), options));


        // MIDDLE WARE

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