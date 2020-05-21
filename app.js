var express = require('express');
var request = require('request');


var app = express();

app.set('view engine','ejs');

app.use(express.urlencoded({ extended: true }));
app.get('/',(req,res)=>{
    res.render('index',{short: '',msg:' '});
})

app.post('/',(req,res)=>{
    var url= req.body.url;
    var id = req.body.id;
    var data = {
        url,
        id 
    };
    const jsonstring = JSON.stringify(data);

    request ({
        url: "https://i1oqepnvgj.execute-api.us-east-1.amazonaws.com/prod/app",
        method: 'POST',
        body : jsonstring,
        headers : {
            'content-type': 'application/json'
        }
    } ,function (error, response, body){
        if(!error && response.statusCode == 200){
          console.log(body);

          res.render('index',{short:'https://i1oqepnvgj.execute-api.us-east-1.amazonaws.com/prod/'+ data.id,msg:''})
         }
         if(response.statusCode == 500){
            res.render('index',{msg: "Please Use Different Alias Name",short:''})
         }
      })
    })

    const PORT = process.env.PORT || 80;

    app.listen(PORT, console.log(`Server started on port ${PORT}`));