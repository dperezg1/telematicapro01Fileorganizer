var express = require('express'),
  router = express.Router(),
  passportConfig = require ('../../config/passport');
  users = require('../controllers/user');
  files = require('../controllers/file');

  module.exports = function(app){
  	app.use('/', router);
  };


// user

 router.post('/user', users.deleteUserAndFiles);
  router.get('/getUsers', users.getAllUsers);
  router.post('/searchUser', users.searchUser);
  router.post('/updateUser',users.updateUser);


//passport

router.post('/signup',users.postSignup);
router.post('/login',users.postLogin);
router.get('/logout',passportConfig.estaAutenticado, users.logout);
router.get('/userInfo', passportConfig.estaAutenticado, function (req,res) {
  res.json(req.user);
});




//file

  router.post('/file', files.createFile);
	router.post('/deleteFile', files.deleteFile);
  router.get('/file', files.getAllFiles);
  router.post('/sharedWithMe', files.fileSharedWith);
  router.post('/getFiles', files.getMyFiles);
  router.post('/shareFileWith', files.shareFileWith);
  router.post('/searchFile', files.searchFile);
router.post('/updateFile',files.updateFile);
router.post('/search',files.searchFileByTitle);
