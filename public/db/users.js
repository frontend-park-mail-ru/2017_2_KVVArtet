var records = [];
var i=0;

exports.findById = function(id, cb) {
    process.nextTick(function() {
        var idx = id - 1;
        if (records[idx]) {
            cb(null, records[idx]);
        } else {
            cb(new Error('User ' + id + ' does not exist'));
        }
    });
}

exports.findByUsername = function(username, cb) {
    process.nextTick(function() {
        for (var i = 0, len = records.length; i < len; i++) {
            var record = records[i];
            if (record.username === username) {
                return cb(null, record);
            }
        }
        return cb(null, null);
    });
}


  exports.registration = function (req, res) {
      // retrieve user posted data from the body
      const user = req.body;
      if (records.length === 0) {
          records.push({
              id:++i,
              username: user.username,
              password: user.password,
               email: user.email
          });
          console.log(records[0].username);

          res.redirect("/secret");

      }
      else {
          for (let i = 0; i !== records.length; ++i) {
              console.log(records[i].username);
              if (records[i].username === user.username) {
                  console.log(records[i].username);
                  return res.render('register');
              }
          }
          records.push({
              id:++i,
              username: user.username,
              password: user.password
              // email: user.email
          });
          res.redirect("/secret");

      }
  }