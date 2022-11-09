var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//CONECTING DB// APP CONFI
mongoose.connect('mongodb+srv://Khoa21donga:Khoa21dongaKhoa21dongaKhoa21donga@cluster0.o9ivn6p.mongodb.net/test2?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false 
});

// collection table
let lopSchema = mongoose.Schema({
  EnableFCM: {
    type: String,
  },
  Avatar: {
    type: String,
  },
  Banner: {
    type: String,
  },
  IsGetNotification: {
    type: String,
  },
  IsVerified: {
    type: String,
  },
  IsGetOpen: {
    type: String,
  }
});
let lop = mongoose.model('lop', lopSchema); 

/* GET home page. */
router.get('/', function(req, res, next) {
  lop.find({}, (Error, data)=>{
      console.log('Custommer3', data);
      res.render('index', {lops:data} );
  });
  });
// fomr add
router.get('/form-add', function(req, res, next){
  res.render('form-add', {});
}); 
  router.post('/add',function(req, res, next){
    lop.create(req.body);
    res.redirect('/');
});
// form update
router.get('/form-update/:id',function(req, res, next){
  console.log(req.body);
  lop.findById(req.params.id,(error,data)=>{  
    res.render('form-update',{lops:data});
  });
});

router.post('/update',function(req, res, next){
  lop.findByIdAndUpdate(req.body.id, req.body, (Error, data )=>{
    res.redirect('/');
  });
});

// delete
router.get('/form-delete/:id',function(req, res, next){
  lop.findByIdAndDelete(req.params.id,(Error,data)=>{
    res.redirect('/');
  });
});

module.exports = router;
