var express = require('express');
var router = express.Router();

var cate_controller = require('../controller/cateCtrl');
router.post('/addTopCate', function(req, res, next) {

	cate_controller.addTop(req, res, next);

});
module.exports=router;