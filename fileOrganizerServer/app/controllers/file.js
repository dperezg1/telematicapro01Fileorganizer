/**
 * Created by USER on 28/07/2017.
 */

var mongoose = require('mongoose'),
  File = mongoose.model('File');

module.exports = {
  createFile: function (req, res) {
   
    res.header("Content-Type", "application/json");
    var file = new File({
      title: req.body.title,
      type:req.body.type,
      size: req.body.size,
      owner_username: req.body.owner_username,
      year:req.body.year,
      visibility: req.body.visibility,
      shared_with: req.body.shared_with
    });

    console.log(file);

    file.save(function (err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      // send OK
      return res.status(200).send("guardado con exito");
    })
  },
  deleteFile: function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-Type", "application/json");
    File.findByIdAndRemove({_id:req.body._id}, function (err) {
      if (!err) {
        res.status(200).send("archivo eliminado");
      } else {
        res.status(500).send(err);
      }
    });
  },


  getAllFiles: function(req, res){
    File.find({visibility: "public", year: new RegExp("2017")},function(err, files){
      if(!err) {
	console.log(res)
        res.status(200).send(files);
      }else{
        res.status(500).send(err);
      }
    });
  },

  fileSharedWith: function (req,res) {
    File.find({shared_with: {$elemMatch: {username: req.body.username}}},function(err,files){
      if(!err) {
        return res.status(200).send(files)
      }else{
        return res.status(500).send(err);
      }
    })
  },
  getMyFiles: function(req, res){
    File.find({owner_username: req.body.username},function(err, files){
      if(!err) {
        res.status(200).send(files);
      }else{
        res.status(500).send(err);
      }
    });
  },
  shareFileWith:function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-Type", "application/json");
    File.findByIdAndUpdate({_id:req.body._id}, {$push: { 'shared_with' :{ username: req.body.username} }},{upsert:true}
    , function (err) {
      if (err) {
        res.send(err).status(500);
      } else {
        res.send("").status(200);
      }
    });
  },
  searchFile: function (req,res) {
    File.find({_id:req.body.id},function(err,file){
      if(!err) {
        return res.status(200).send(file)
      }else{
        return res.status(500).send(err);
      }
    })
  },

  searchFileByTitle: function (req,res) {
    File.find({title:new RegExp(req.body.title,"i"),owner_username:req.body.username},function(err,files){
      if(!err) {
        return res.status(200).send(files)
      }else{
        return res.status(500).send(err);
      }
    })
  },


  updateFile:function(req,res) {
          File.findByIdAndUpdate({_id:req.body._id},req.body,{new:true},function (err,file) {
      if(err){
        res.send(err).status(500);
      }else{
        res.send("archivo modificado bien").status(200);

      }

    });
  }
};
