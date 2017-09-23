var multiparty = require('multiparty');
var fs = require('fs');
var mv = require('mv');

module.exports = function(app, target)
{
  app.get('/', function(req, res){
    fs.readFile(__dirname+'/../Html/index.html', 'utf-8', function(error, data){
      if(error){
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.end('500 Internal Server '+error);
      }else{
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      }
    });
  });

  app.post('/upload', function(req, res){
    console.log(req.body);
    // console.log(req.body.age);
    // console.log(req.body.crime);
    var form = new multiparty.Form();
    form.on('file', function(name,file){
      var tmp_path = file.path;
      var target_path = __dirname + '/../Image_In/' + 'Test.jpg';
      mv(tmp_path, target_path, function(err){
        console.log(err);
      });
    });
    form.parse(req, function(err, fields, files){
      res.json('file Uploaded');
    });
  });

  app.post('/API', function(req, res){
    res.end('대상 추가: /insertTarget\n대상 삭제: /deleteTarget\n대상 목록: /showSavedTargets');
  });

  app.post('/insertTarget', function(req, res){
    var newTarget = new target();

    newTarget.name = req.body.name;
    newTarget.age = req.body.age;
    newTarget.crime = req.body.crime;
    newTarget.imagePath = req.body.imagePath;

    newTarget.save(function(err){
      if(err){
        console.log('While Saveing Error>> ', err);
        res.end('0');
        //res.json({result: 0});
        return;
      }
      console.log('Inserted New Target!');
      res.end('1');
      //res.json({result: 1});
    });
  });

  app.post('/deleteTarget', function(req, res){ //수정 ID로 삭제
    target.remove({_id: req.body._id}, function(err, output){
      if(err){
        return res.status(500).end('0');
      }
      res.end('1');
    });
  });

  app.get('/showSavedTargets', function(req, res){
    target.find(function(err, list){
      if(err){
        console.log('While ShowTargets DB_Error>> ', err);
        return res.status(500).send({error: 'Database Failure'});
      }
      res.json(list);
    });
  });

  // app.post("/searchTarget", function(req, res){
  //   target.find({number: req.body.number}, function(err, list){
  //     if(err){
  //       return res.status(500).send({error: 'Database Failure'});
  //     }
  //     res.json(list);
  //   });
  // });

  // app.post('/updateTarget', function(req, res){
  //   target.find({number: req.body.number}, function(req, Target){
  //     if(err){
  //       return res.status(500).json({error: 'Failed to update'});
  //     }
  //
  //     if(req.body.name){
  //       target.name = req.body.name;
  //     }
  //     if(req.body.age){
  //       target.age = req.body.age;
  //     }
  //     if(req.body.imagePath){
  //       target.imagePath = req.body.imagePath;
  //     }
  //
  //     target.save(function(err){
  //       if(err){
  //         res.status(500).json({error: 'Failed to update'});
  //       }
  //       res.json({message: 'target updated'});
  //     });
  //   });
  // });

};
