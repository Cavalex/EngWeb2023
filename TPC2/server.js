var http = require('http');
var meta = require('./auxx.js');
var url = require('url'); // já vem com o node.js
var fs = require('fs');

// tanto o cabeçalho como o res.end têm que estar dentro do readFile, que é a função de callback

var myServer = http.createServer(function (req, res) {
    console.log(req.method + " " + req.url + " " + meta.myDateTime())
    
    var pedido = url.parse(req.url, true)
    var pagina = "pag" + pedido.pathname.substring(1) + ".html"
    var dataset = "mapa.json"

    fs.readFile(dataset, function (err, data){
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        if(err){
            res.write("<p>ERRO na leitura da base de dados::" + err + "</p>")
        }
        else{
            data = JSON.parse(data)

            // store all distritos in an array
            var distritos = []
            for (var i = 0; i < data.cidades.length; i++){
                if (distritos.indexOf(data.cidades[i].distrito) == -1){
                    distritos.push(data.cidades[i].distrito)
                }
            }

            // sort ignoring the diacritics
            // https://www.jstips.co/en/javascript/sorting-strings-with-accented-characters/
            distritos.sort(function (a, b) {
                return a.localeCompare(b);
            });
              
            // send all distritos to the client´
            res.write("<p>Distritos:</p>")
            for (var i = 0; i < distritos.length; i++){
                res.write("<p>" + distritos[i] + "</p>")
            }









        }
        res.end(); // se tivesse fora saltava logo para o res.end antes de ler o ficheiro. agora que está dentro da callback, só depois da leitura é que envia o res.end
    })
})

// agora enviamos isto:
// http://localhost:7777/add?n1=17&n2=75

myServer.listen(7777);

console.log("Servidor à escuta na porta 7777...")
