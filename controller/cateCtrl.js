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
//递归处理数据成标准格式
function recursiveData(data, pid) {
	var result = [],
		temp;
	for(var i in data) {
		if(data[i].pid == pid) {
			result.push(data[i]);
			temp = recursiveData(data, data[i].id);
			if(temp.length > 0) {
				data[i].children = temp;
			}
		}
	}
	return result;
}

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
	}
}