/**
 * UserController
 *
 * @description :: Server-side logic for managing user
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  create: function (req, res) {
    if (req.body.password !== req.body.confirmPassword) {
      return res.json(401, {err: 'Password doesn\'t match, What a shame!'});
    }
    User.create(req.body).exec(function (err, user) {
      if (err) {
        return res.json(err.status, {err: err});
      }
      // If user created successfuly we return user and token as response
      if (user) {
        // NOTE: payload is { id: user.id}
        res.json(200, {user: user, token: jwToken.issue({id: user.id})});
      }
    });
  },
  me: function(req, res){
    if (!req.param('id')) {
      return res.json(404, {err: "user id not available"});
    }
    User.findOne({
     where : {id : req.param('id')}
    }).exec((err,user)=> {
      if(err) return res.json(404, {err: "user not found"});
      return res.json(200, {user: user});
    })
  }
};
