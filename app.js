var express = require('express');
var request = require('request');


var app = express();

app.use('/public', express.static('public'));
app.use(express.json({
    limit: '1mb'
}));
app.set('view engine', 'ejs');


app.use(express.urlencoded({
    extended: true
}));


app.get('/', (req, res) => {
    res.render('index', {
        short: '',
        msg: ' '
    });
})

app.post('/', (req, res) => {
    var error = '';
    var msg = '';
    var short = '';
    var url = req.body.url;
    var ids = req.body.ids;
    var data = {
        url,
        id: ids
    };
    const jsonstring = JSON.stringify(data);
    request({
        url: "https://i1oqepnvgj.execute-api.us-east-1.amazonaws.com/prod/app",
        method: 'POST',
        body: jsonstring,
        headers: {
            'content-type': 'application/json'
        }
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            short = 'https://i1oqepnvgj.execute-api.us-east-1.amazonaws.com/prod/' + data.id;
            res.render('index', {
                short,
                msg
            })
        }
        if (response.statusCode != 200) {
            msg = "Please Use Different Alias Name";
            res.render('index', {
                msg,
                short
            })
        }
    })

})


app.get('*', function (req, res) {

    res.status(404).redirect('public/404.html')

});
const PORT = process.env.PORT || 80;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
