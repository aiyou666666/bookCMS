var pool=require('../conf/conn');
var user_model=require('../model/userModel');
//向前台返回json
var callback=function(res,ret){
	if (typeof ret ==='undefined') {
		res.json({
			code:'-1',
			msg:'操作失败'
		});
		
	} else{
		res.json(ret);
	}
	
};
module.exports={
	add:function(req,res){
		console.log("11111");
		pool.getConnection(function(err,connection){
			//获取参数
			var param=req.query || req.params;
			connection.query(user_model.insert,[param.name,param.age],function(err,result){
				 if (result) {
				 	result={
				 		code:200,
				 		msg:'成功增加一条数据'
				 	};
				 	
				 }
				 callback(res,result);
				 connection.release();
			});
			
			
		});
		
	}
	
	
}
