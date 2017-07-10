const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const bp = require('body-parser');
const app = express();
const port = 5000;
app.use(function(req, res, next) {
//set headers to allow cross origin request.
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var dir = __dirname + '/files';
if (!path.existsSync(dir)) {
    fs.mkdirSync(dir, 0744);
}
app.use('/files',express.static(path.join(__dirname, 'files')));
app.use('/assets',express.static(path.join(__dirname, 'assets')));
app.use('/',express.static(path.join(__dirname, 'view')));
app.use(fileUpload());
app.use(bp.json());
app.use(bp.urlencoded({extended: true}));
app.use('/api',require('./routes/routes'));
app.get('/',function(req,res){
	res.set('Content-type', 'text/html');
    fs.readFile('view/index.html',function(err,data){
        res.send(data);
    })
        //res.sendFile(path.join(__dirname,'view/index.html'));
});
app.listen(port,function(){
    console.log('Now Listening for request on port '+port);
});
