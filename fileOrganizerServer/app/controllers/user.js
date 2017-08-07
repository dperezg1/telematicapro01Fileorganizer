var mongoose = require('mongoose'),
  passport = require('passport'),
  User= mongoose.model('User'),
File = mongoose.model('File');

module.exports = {


  deleteUser: function (req, res) {
    //res.header("Access-Control-Allow-Origin", "localhost/");
    res.header("Content-Type", "application/json");
    User.findOneAndRemove({username:req.body.username}, function (err) {
      if (!err) {
        res.status(200).send();
      } else {
        res.status(500).send(err);
      }
    });
  },


  getAllUsers : function(req, res){
    User.find(function(err, users){
      if(!err) {
        res.status(200).send(users);
      }else{
        res.status(500).send(err);
      }
    });
  },

deleteUserAndFiles: function (req, res) {
    req.logout();
    User.findOneAndRemove({username:req.body.username}, function (err) {
      if (!err) {
        res.status(200).send();
      } else {
        res.status(500).send(err);
      }
    });

    File.deleteMany({owner_username:req.body.username}, function (err) {
      if (!err) {
        res.status(200).send("archivo eliminado");
      } else {
        res.status(500).send(err);
      }
    });
  },


  searchUser: function (req,res) {
    User.findOne({username:req.body.username},function(err,user){
      if(!err) {
        if(user){
          return res.status(200).send('true');
        }else{
          return res.status(201).send('false');
        }
      }else{
        return res.status(500).send(err);
      }
    })
  },

  //passport

  logout : function (req,res) {
    req.logout();
    res.send('Logout exitoso');
  },

  postLogin : function (req,res,next) {
    passport.authenticate('local',function (err,user,info) {
      if(err){
        next(err);
      }
      if(!user){
        return res.status(400).send('Usuario o contraseña no validos');
      }
      req.logIn(user,function (err) {
        if(err){
          next(err);
        }
        res.send('Login exitoso');
      })
    })(req,res,next);
  },

  postSignup : function(req,res,next){
    var user = new User({
      username: req.body.username,
      password: req.body.password
    });
    User.findOne({username: req.body.username},function (err,usuarioExistente) {
      if(usuarioExistente){
        return res.status(400).send('Este username ya esta registrado');
      }
      user.save(function (err) {
        if(err){
          next(err);
        }
        req.logIn(user,function (err) {
          if(err){
            next(err);
          }
          res.send('Usuario creado exitosamente');
        })
      })
    })
  },

  updateUser:function(req,res) {
   
      User.findOneAndUpdate({username:req.body.username},req.body,{new:true},function (err) {
      if(err){
        res.send(err).status(500);
        console.log(err);
      }else{
        res.send("password Modificadas").status(200);

      }

    });
  }
};
