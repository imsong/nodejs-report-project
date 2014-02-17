
/*
 * GET home page.
 */

exports.first= function(req, res){
    connection.query('SELECT 1 FROM dual', req.body, 
        function (err, result) {
            if (err) throw err;
            res.render('chart', { title : result });
        }
    );
  //res.render('chart', { title: 'Express' });
};
