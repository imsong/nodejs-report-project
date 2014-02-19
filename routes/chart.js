
var pool = require('../lib/db-pool');

exports.daumtop = function(req, res){
  console.log(req.session.rocksea);
 
  pool.acquire(function(err, db) {
    if (err) {
      return res.end("CONNECTION error: " + err);
    }
 
	var sql = 
	"select date_format(a.yyyymmdd, '%Y-%m-%d') yyyymmdd, a.service_unit, a.pv, a.uv, a.click, b.pv m_pv, b.uv m_uv, b.click m_click \n"+
	"from ( \n"+
	"		select yyyymmdd, service_unit, service_unit_layer, pv, uv, visit, click \n"+
	"		from SR_S_SHOPBOX_DAILY \n"+
	"		WHERE service_unit = 'DAUM' \n"+
	"		and service_unit_layer = 'PC_TOP' \n"+
	"	) a\n"+
	"join (\n"+
	"		select yyyymmdd, service_unit, service_unit_layer, pv, uv, visit, click\n"+
	"		from SR_S_SHOPBOX_DAILY\n"+
	"		WHERE service_unit = 'DAUM'\n"+
	"		and service_unit_layer = 'M_TOP'\n"+
	"	) b\n"+
	"on a.yyyymmdd = b.yyyymmdd\n"+
	"where a.service_unit = b.service_unit";

    db.query(sql,[],function(err, results, columns) {
        pool.release(db);
 
        if (err) {
          return res.end("QUERY ERROR: " + err);
        }
        res.render('daumtop-chart', { results : results });
    });
  });
};

exports.natetop = function(req, res){
  console.log(req.session.rocksea);
 
  pool.acquire(function(err, db) {
    if (err) {
      return res.end("CONNECTION error: " + err);
    }
 
	var sql = 
	"select date_format(a.yyyymmdd, '%Y-%m-%d') yyyymmdd, a.service_unit, a.click, b.click m_click \n"+
	"from ( \n"+
	"		select yyyymmdd, service_unit, service_unit_layer, click \n"+
	"		from SR_S_SHOPBOX_DAILY \n"+
	"		WHERE service_unit = 'NATE' \n"+
	"		and service_unit_layer = 'PC_TOP' \n"+
	"	) a\n"+
	"join (\n"+
	"		select yyyymmdd, service_unit, service_unit_layer, click\n"+
	"		from SR_S_SHOPBOX_DAILY\n"+
	"		WHERE service_unit = 'NATE'\n"+
	"		and service_unit_layer = 'M_TOP'\n"+
	"	) b\n"+
	"on a.yyyymmdd = b.yyyymmdd\n"+
	"where a.service_unit = b.service_unit";

    db.query(sql,[],function(err, results, columns) {
        pool.release(db);
 
        if (err) {
          return res.end("QUERY ERROR: " + err);
        }
        res.render('natetop-chart', { results : results });
    });
  });
};

exports.shophow = function(req, res){
  console.log(req.session.rocksea);

  pool.acquire(function(err, db) {
    if (err) {
      return res.end("CONNECTION error: " + err);
    }

    var sql =
    "select date_format(a.yyyymmdd, '%Y-%m-%d') yyyymmdd, a.service_unit, a.pv, a.uv, b.pv m_pv, b.uv m_uv \n"+
    "from ( \n"+
    "       select yyyymmdd, service_unit, service_unit_layer, pv, uv \n"+
    "       from SR_S_SHOPHOW_DAILY \n"+
    "       WHERE service_unit = 'SHOPHOW' \n"+
    "       and service_unit_layer = 'PC' \n"+
    "   ) a\n"+
    "join (\n"+
    "       select yyyymmdd, service_unit, service_unit_layer, pv, uv\n"+
    "       from SR_S_SHOPHOW_DAILY\n"+
    "       WHERE service_unit = 'SHOPHOW'\n"+
    "       and service_unit_layer = 'MOBILE'\n"+
    "   ) b\n"+
    "on a.yyyymmdd = b.yyyymmdd\n"+
    "where a.service_unit = b.service_unit";

    db.query(sql,[],function(err, results, columns) {
        pool.release(db);

        if (err) {
          return res.end("QUERY ERROR: " + err);
        }
        res.render('shophow-chart', { results : results });
    });
  });
};
