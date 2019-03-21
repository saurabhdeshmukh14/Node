
    
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var http = require('http');
var rs;
MongoClient.connect(url,function(err,db){
    if(err) throw err;
    var dbo = db.db("itcdb");
   // var myobj = [{name: "ITC Infotech", address: "COX Town"},{name: "IBM", address: "Bangalore"},{name: "Infosys", address: "Mysore"}];

    dbo.collection("customers").find({},{projection:{_id:0}}).toArray(function(err,result){
        if(err) throw err;
        console.log(result);
         rs = result;
        db.close();
    });
});




http.createServer(function(req,res){
    
        res.writeHead(200,{'Content-Type': 'text/html'});
        var htmlText = '';
        htmlText += '<html> <body>';   
        // htmlText += '<ul>'         //List View Open
        // for ( var key in rs ) {        
        // htmlText += '<li> Name: ' + rs[key].name + ' Address: ' + rs[key].address +'</li>';
        //  }
        // htmlText += '</ul>';  // List View Close
       
        htmlText += '<table><tr><th>Name</th><th>Address</th></tr>'    //Table View Open
        // for ( const id in rs ) {
        //    htmlText += '<tr><td>' + rs[id].name + '</td><td>' + rs[id].address +'</td></tr>'
                                
        // }
        rs.forEach(function(data){
            htmlText += '<tr><td>' + data.name + '</td><td>' + data.address +'</td></tr>'
        });
        htmlText += '</table>';               //Table View Close
        htmlText += '</body> </html> ';
        res.write(htmlText);
        return res.end();
    
}).listen(1010);
