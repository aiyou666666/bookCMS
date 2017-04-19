var pool = require('../conf/conn');
var cate_model = require('../model/cateModel');

var callback = function(res, ret) {
	if(typeof ret === 'undefined') {
		res.json({
			code: '-1',
			msg: '操作失败'
		});

	} else {
		res.json(ret);
	}

};

module.exports = {
	addTop: function(req, res) {
		pool.getConnection(function(err, connection) {
			var data = req.body['items[]'];
			if(typeof data == 'string') {
				connection.query(cate_model.insert, [data, 0], function(err, result) {
					var result = {
						code: 200,
						msg: '插入成功'
					}
					callback(res, result);
					connection.release(); //释放连接

				});

			} else {
				for(var i = 0; i < data.length; i++) {
					var name = data[i];
					connection.query(cate_model.insert, [name, 0], function(err, result) {

					});

					if(i == (data.length - 1)) {
						var result = {
							code: 200,
							msg: '插入成功'
						};
						callback(res, result);
						connection.release();

					} else {
						continue;
					}

				}

			}

		});
	},
	select: function(req, res) {
		pool.getConnection(function(err, connection) {

			connection.query(cate_model.select, [], function(err, result) {
				if(result) {
					result = {
						code: 200,
						res: result,
						msg: '查询成功'
					};
				}
				callback(res, result);
				connection.release();

			});

		});

	},
	add: function(req, res) {
		pool.getConnection(function(err, connection) {

			connection.query(cate_model.insert, [req.body.name, req.body.pid], function(err, result) {

				if(result) {
					result = {
						code: 200,
						id: result.insertId,
						msg: "添加成功"
					}
				};
				callback(res,result);
				connection.release();

			});

		});
	},
	update:function(req,res){
		pool.getConnection(function(err,connection){
			connection.query(cate_controller.update,[req.body.name,req.body.id],function(err,result){
				if (result) {
					result={
						code:200,
						msg:'更新成功'
					};
				}
			callback(res,result);
			connection.release();
			});
		});
		
	},
	delete:function(req,res){
		pool.getConnection(function(err,connection){
			var param=req.query || req.params;
			connection.query(cate_model.delete,[param.id],function(err,result){
				if (result) {
					result={
						code:200,
						msg:'删除成功'
					}
					
				}
				callback(res,result);
				connection.release();
				
			});
		});
		
	}

}