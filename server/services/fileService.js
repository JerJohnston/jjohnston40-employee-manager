/**
 * Service to read and write files
 */

 const fs = require('fs');
const { get } = require('https');
 const path = require('path');

 const getFileContents = (filePath) => {
     let contentFilePath = fs.readFileSync(path.join(__dirname, filePath));
     contentFilePath = JSON.parse(contentFilePath);
     return contentFilePath;
 }

 const writeFileContents = (filePath, data) => {
    let contentFile = fs.readFileSync(path.join(__dirname, filePath));
    contentFile = JSON.parse(contentFile);
    contentFile.push(data);
    contentFile = JSON.stringify(contentFile);
    fs.writeFileSync(path.join(__dirname, filePath), contentFile);
 }


