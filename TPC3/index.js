// alunos_server.js
// RPCW2023: 2023-03-05
// by jcr

var http = require('http')
var axios = require('axios')
var pages = require('./pages.js')
var static = require('./static.js')
var aux = require('./auxx.js')

// create a function that counts the number of people of each gender given a dataset
function countGender(pessoas){
    var count = {
        "M": 0,
        "F": 0,
        "O": 0
    }
}

// Server creation
var alunosServer = http.createServer(function (req, res) {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                if(req.url == "/"){
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write(pages.genMainPage(d))
                    res.end()
                }
                else if((req.url == "/pessoas")){
                    axios.get("http://localhost:3000/pessoas")
                        .then(response => {
                            var pessoas = response.data
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(pages.genPeoplePage(pessoas, d))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de pessoas... Erro: " + erro)
                            res.end()
                        })
                }
                else if((req.url == "/pessoasOrdenadas")){
                    axios.get("http://localhost:3000/pessoas?_sort=nome")
                        .then(response => {
                            var pessoas = response.data
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(pages.genPeoplePage(pessoas, d))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de pessoas... Erro: " + erro)
                            res.end()
                        })
                }
                else if((req.url == "/pessoasFeminino")){
                    axios.get("http://localhost:3000/pessoas?sexo=feminino")
                        .then(response => {
                            var pessoas = response.data
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(pages.genPeoplePage(pessoas, d))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de pessoas... Erro: " + erro)
                            res.end()
                        })
                }
                else if((req.url == "/pessoasMasculino")){
                    axios.get("http://localhost:3000/pessoas?sexo=masculino")
                        .then(response => {
                            var pessoas = response.data
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(pages.genPeoplePage(pessoas, d))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de pessoas... Erro: " + erro)
                            res.end()
                        })
                }
                else if((req.url == "/pessoasOutro")){
                    axios.get("http://localhost:3000/pessoas?sexo=outro")
                        .then(response => {
                            var pessoas = response.data
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(pages.genPeoplePage(pessoas, d))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de pessoas... Erro: " + erro)
                            res.end()
                        })
                }
                else if((req.url == "/distribuicao/sexo")){ // UGLY as hell, but it works for now
                    var nFemale = 0;
                    var nMale = 0;
                    var nOther = 0;
                    axios.get("http://localhost:3000/pessoas?sexo=feminino").then(response => {
                        nFemale = response.data.length
                        axios.get("http://localhost:3000/pessoas?sexo=masculino").then(response => {
                            nMale = response.data.length
                            axios.get("http://localhost:3000/pessoas?sexo=outro").then(response => {
                                nOther = response.data.length

                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write(pages.genGenderDistributionPage(nFemale, nMale, nOther, d))
                                res.end()
                            })
                        })
                    })
                }
                else if((req.url == "/distribuicao/desporto")){ // the same method won't work for the work distribution page...
                    axios.get("http://localhost:3000/pessoas")
                        .then(response => {
                            var pessoas = response.data
                            var sports = aux.getSportsDistribution(pessoas)
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(pages.genSportsDistributionPage(sports, d))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de pessoas... Erro: " + erro)
                            res.end()
                        })
                }
                else if((req.url == "/top10/profissoes")){
                    axios.get("http://localhost:3000/pessoas")
                        .then(response => {
                            var pessoas = response.data
                            var prof = aux.getTop10Professions(pessoas)
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(pages.genTop10ProfessionsPage(prof, d))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de pessoas... Erro: " + erro)
                            res.end()
                        })
                }
                else if(/\/pessoas\/(p)[0-9]+$/i.test(req.url)){
                    var idPessoa = req.url.split("/")[2]
                    axios.get("http://localhost:3000/pessoas/" + idPessoa)
                        .then( response => {
                            let p = response.data
                            // console.log(a) // funciona...
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(pages.genPersonPage(p, d)) // p -> pessoas, d -> data
                            res.end()
                        })
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write("<p>" + req.method + " " + req.url + " unsupported on this server.</p>")
                    res.end()
                }
                break
            /* case "POST":
                if(req.url == '/alunos/registo'){ // tem de ser a mesma rota que fez o registo
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    // res.write(studentFormPage(d))
                    res.end('<p>Yet to be done... </p>')
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write('<p>Unsupported POST request: ' + req.url + '</p>')
                    res.write('<p><a href="/">Return</a></p>')
                    res.end()
                }
                break */
            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " unsupported in this server.</p>")
                res.end()
        }
    }
    
})

alunosServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})



