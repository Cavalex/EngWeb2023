var http = require('http');
var meta = require('./auxx.js');
var url = require('url');
var fs = require('fs');

var myServer = http.createServer(function (req, res) {
    console.log(req.method + " " + req.url + " " + meta.myDateTime())
    var cssFile = fs.readFileSync("styles.css") // MILAGRE!!!!!!
    switch (req.url){ // this is made to send the css to the browser
        case "/styles.css" :
            res.writeHead(200, {"Content-Type": "text/css"});
            res.write(cssFile);
            res.end()
            break;
        /* 
        default :    
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(htmlFile); 
        */
    }
    
    var q = url.parse(req.url, true) // or just "pedido" instead of "q"
    // var pagina = "pag" + pedido.pathname.substring(1) + ".html"
    var dataset = "mapa.json"

    fs.readFile(dataset, function (err, data){
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        if(err){
            res.write("<p>ERROR when reading database::" + err + "</p>")
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
            
            // PÁGINA PRINCIPAL ------------------------------------------------------------------------------------------------------

            if(q.pathname == "" || q.pathname == "/distritos" || q.pathname == "/") {
                res.write(`
                <html>
                <head>
                    <meta charset="utf-8">
                    <title>Mapa Virtual</title>
                    <link rel="stylesheet" href="styles.css">
                </head>
                <body>
                    <h1 class="title">TPC2 - Mapa Virtual</h1>
                `)

                for (var i = 0; i < distritos.length; i++){
                    if(i == 0){
                        res.write(`
                            <div class="organizer">
                        `)
                    }
                    
                    res.write("<div class=\"distritos-container\">")
                    res.write("<p class=\"sub-title\">" + distritos[i] + ":</p>")
                    for (var j = 0; j < data.cidades.length; j++){
                        if (data.cidades[j].distrito == distritos[i]){
                            res.write("<p><a href=\"http://localhost:7777/" + data.cidades[j].id + "\">" + data.cidades[j].nome + "</a></p>")
                        }
                    }
                    res.write("</div>")

                    if((i+1) % 5 == 0 && i != 0 && i != distritos.length-1){ // on the 5th one it will close the div and open a new one
                        res.write(`
                            </div>
                            <div class="organizer">
                        `)
                    }
                    else if(i == distritos.length-1){
                        res.write(`
                            </div>
                        `)
                    }
                }

                res.write(`
                    <div class="bottom-spacer"></div>
                </body>
                </html>

                `)
            }
            else if(q.pathname[1] == "c") { // if it's a city id
                // check if pathname is a city id
                var id = q.pathname.substring(1)
                var cidade = data.cidades.find(x => x.id == id)
                if(cidade == undefined){
                    res.write("<p class=\"sub-title\">ERROR: Cidade não encontrada</p>")
                }
                else{
                    res.write(`
                    <html>
                    <head>
                        <meta charset="utf-8">
                        <title>Mapa Virtual</title>
                        <link rel="stylesheet" href="styles.css">
                    </head>
                    <body>
                        <h1 class="title">TPC2 - Mapa Virtual</h1>
                        <div class="info-container">
                    `)

                    var id = q.pathname.substring(1)
                    var cidade;
                    for (var i = 0; i < data.cidades.length; i++){
                        if (data.cidades[i].id == id){
                            cidade = data.cidades[i]
                        }
                    }
                    res.write("<p class=\"sub-title\">" + cidade.nome + ":</p>")
                    res.write("<p>Distrito: <a href=\"http://localhost:7777/distritos\">" + cidade.distrito + "</a></p>") // probably should use an empty url instead of distritos...
                    res.write("<p>População: " + cidade.população + "</p>")
                    res.write("<p>Descrição: " + cidade.descrição + "</p>")

                    res.write(`
                        </div>
                        <div class="bottom-spacer"></div>
                    </body>
                    </html>

                    `)
                }
            }
        }
        res.end()
    })
})

// http://localhost:7777

myServer.listen(7777);

console.log("Servidor à escuta na porta 7777...")
