
/*
 * GET users listing.
 */

var mysql = require('mysql');

var dbconn = mysql.createConnection( {
	host:'127.0.0.1',
	user:'root',
	password:'',
	database:'test'
});

exports.list = function(req, res){
	dbconn.query('SELECT yyyymmdd, service_unit_layer, service_unit, pv, click FROM GR_S_SHOPBOX_DAILY ORDER BY yyyymmdd DESC', function(err, result) {
			if(err) throw err;
			res.render('users', {result: result});
	});
};
