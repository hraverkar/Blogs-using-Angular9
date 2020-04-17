const express = require('express');
const app = express();
const csp = require('express-csp-header');

app.use(express.static(__dirname +'/dist/harshalblog'));
app.listen(process.env.PORT || 8080);

app.get('/*', function(req,res){
  res.sendFile(path.join(__dirname + 'dist/harshalblog/index.html'));
});


app.use(csp({
    policies: {
        'default-src': [csp.NONE],
        'img-src': [csp.SELF],
    }
}));

console.log("PortOpen");
