const express = require('express');
const router = express.Router();
const $sql = require('sequelize');
const item = require('../models/item');
router.get('/',function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    item.findAll().then((data)=>{

            res.json(data);
    }).catch((err)=>{
            res.statusCode = 404;
            res.json(err);
    });
});
router.get('/:id',function(req,res,next){
	
    item.findById(req.params.id).then((data)=>{
            res.statusCode = data ?200: 404;
            res.json(data);
    }).catch((err)=>{
            res.statusCode = 404;
            res.json(err);
    });
});



router.post('/',function(req,res,next){
    if(req.body && req.files && req.files['file']){
        if(req.files['file'].mimetype.split('/')[0] === 'image'){
            req.body['file'] = req.files['file'].name;
            req.files['file'].mv('files/'+req.files['file'].name,function(err){
                if(err){
                    res.status(500).json({error: 'could not upload file, try again'});
                }
            });
         item.create(req.body).then(function(data){
                res.statusCode =  201;
                res.json(data);
            }).catch($sql.ValidationError,function(err){
                res.status(410).json(err);
            })
            .catch(function(err){
            res.status(410).json(err);
        });
    }else{
            res.status(410).json({error: 'Please Upload a valid image'});
        }
    }else{
        res.status(410).json({error: "Please Upload an image"});
    }
});

router.put('/:id',function(req,res,next){
	
    if(req.files && req.files['file']){
        if(req.files['file'].mimetype.split('/')[0] === 'image'){
             req.body['file'] = req.files['file'].name;
             req.files['file'].mv('files/'+req.files['file'].name,function(err){
                if(err){
                    res.status(500).json({error: 'could not upload file, try again'});
                }
        });
    }
    }
    item.update(req.body,{where: {id:req.params.id}}).then((data)=>{
        item.findById(req.params.id).then((data)=>{
            res.json(data);
        })
    }).catch($sql.ValidationError,function(err){
                res.status(410).json(err);
    }).catch((err)=>{
        res.json(err);
    });
});


router.delete('/:id',function(req,res,next){
	
    item.destroy({where: {id: req.params.id}}).then((data)=>{
        res.statusCode = 210;
        res.json(data);
    }).catch((err)=>{
        res.json(err);
    })
});


module.exports = router;

