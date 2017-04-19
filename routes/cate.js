var express = require('express');
var router = express.Router();

var cate_controller = require('../controller/cateCtrl');
router.post('/addTopCate', function(req, res, next) {

	cate_controller.addTop(req, res, next);

});

router.get('/allCate',function(req,res,next){
	
	cate_controller.select(req,res,next);
});

router.post('/addCate',function(req,res,next){
	cate_controller.add(req,res,next);
});
router.post('/updateCate',function(req,res,next){
	cate_controller.update(req,res,next);
});
router.get('/delCate',function(req,res,next){
	cate_controller.delete(req,res,next);
});

module.exports=router;