var mainColor = "blue"
var bgColor = "light-grey"

headerTemplate = function(){
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" type="text/css" href="w3.css"/>
        <title>TPC3 - Listar Pessoas</title>
    </head>
    <body style="min-height:100vh; display:flex; flex-direction:column;" class="w3-${bgColor}">
        <div class="w3-card-4">
            <header class="w3-container w3-cell-row w3-${mainColor}">
                <div class= "w3-container w3-cell w3-center">
                    <h3><input type="button" class="w3-button" value="Previous page" onclick="history.back()"></h3>
                </div>

                <div class="w3-container w3-cell w3-center">
                    <h1>TPC3 - Listar Pessoas</h1>
                </div>

                <div class= "w3-container w3-cell w3-center">
                    <h3><input type="button" class="w3-button" value="Next Page" onclick="history.forward()"></h3>
                </div>
            </header>
        </div>
        <div style="padding-bottom: 20px;width: 100%"></div>
    `
}

footerTemplate = function(date){
    return `
        <div style="padding-top: 20px;width: 100%"></div>
        <footer style="margin-top: auto; width:100%;" class="w3-container w3-${mainColor}">
            <h5>Generated in EngWeb2023 ${date}</h5>
        </footer>
    </body>
    </html>
    `
}

exports.genMainPage = function(date){
    var pagHTML = headerTemplate()
    pagHTML += `
        <div class="w3-container w3-content">
            <div class="w3-panel w3-white w3-card w3-display-container w3-round-xxlarge w3-border w3-center">
                <h2 class="w3-text-blue"><b><a href="http://localhost:7777/pessoas">Ver lista de pessoas</a></b></h2>
                <p>Lista com todas as pessoas presentes no dataset que o professor disponibilizou. A lista não está ordenada.</p>
            </div>
            
            <div class="w3-panel w3-white w3-card w3-display-container w3-round-xxlarge w3-border w3-center">
                <h2 class="w3-text-blue"><b><a href="http://localhost:7777/pessoasOrdenadas">Ver lista de pessoas ordenadas</a></b></h2>
                <p>Lista com todas as pessoas presentes no dataset que o professor disponibilizou. A lista está ordenada por ordem alabética do nome de cada pessoa.</p>
            </div>
            
            <div class="w3-panel w3-white w3-card w3-display-container w3-round-xxlarge w3-border w3-center">
                <h2 class="w3-text-blue"><b><a href="http://localhost:7777/distribuicao/sexo">Distribuição por sexo</a></b></h2>
                <p>Distribuição de todas as pessoas do dataset pelo seu sexo.</p>
            </div>

            <div class="w3-panel w3-white w3-card w3-display-container w3-round-xxlarge w3-border w3-center">
                <h2 class="w3-text-blue"><b><a href="http://localhost:7777/distribuicao/desporto">Distribuição por desporto</a></b></h2>
                <p>Distribuição de todas as pessoas do dataset pelo(s) desporto(s) que praticam.</p>
            </div>

            <div class="w3-panel w3-white w3-card w3-display-container w3-round-xxlarge w3-border w3-center">
                <h2 class="w3-text-blue"><b><a href="http://localhost:7777/top10/profissoes">Top 10 Profissões</a></b></h2>
                <p>As 10 profissões mais comuns presentes no dataset.</p>
            </div>
        </div>
    `
    pagHTML += footerTemplate(date)
    return pagHTML
}

exports.genPeoplePage = function(lista, data){
    var pagHTML = headerTemplate()
    pagHTML += `   
            <div class="w3-container">
                <table class="w3-table-all">
                <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Idade</th>
                    <th>Sexo</th>
                    <th>Cidade</th>
                </tr>
    `
    for(let i = 0; i < lista.length; i++){ // ver let vs var
        pagHTML += `
            <tr>
                <td>${lista[i].id}</td>
                <td><a href="http://localhost:7777/pessoas/${lista[i].id}">${lista[i].nome}</a></td>
                <td>${lista[i].idade}</td>
                <td>${lista[i].sexo}</td>
                <td>${lista[i].morada.cidade}</td> 
            </tr>
        `
    }
    pagHTML += `
            </table>
            </div>
    `
    pagHTML += footerTemplate(data)
    return pagHTML
}

exports.genPersonPage = function(pessoa, data){
    var pagHTML = headerTemplate()
    pagHTML += `
            <div class="w3-container">
                <table class="w3-table-all">
                <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Idade</th>
                    <th>Sexo</th>
                    <th>Cidade</th>
                </tr>
            <tr>
                <td>${pessoa.id}</td>
                <td>${pessoa.nome}</td>
                <td>${pessoa.idade}</td>
                <td>${pessoa.sexo}</td>
                <td>${pessoa.morada.cidade}</td> 
            </tr>
            </table>
            </div>
    `
    pagHTML += footerTemplate(data)
    return pagHTML
}

exports.genGenderDistributionPage = function(nFemale, nMale, nOther, d){
    var pagHTML = headerTemplate()
    pagHTML += `
        <div class="w3-container">
            <div class="w3-panel w3-white w3-card w3-display-container w3-round-xxlarge w3-border w3-center">
                <h2 class="w3-text-blue"><b>Sexo</b></h2>
                <p><a href="http://localhost:7777/pessoasFeminino">Feminino: ${nFemale}</a></p>
                <p><a href="http://localhost:7777/pessoasMasculino">Masculino: ${nMale}</a></p>
                <p><a href="http://localhost:7777/pessoasOutro">Outro: ${nOther}</a></p>
            </div>
        </div>
    `
    pagHTML += footerTemplate(d)
    return pagHTML
}

exports.genSportsDistributionPage = function(sports, d){
    var pagHTML = headerTemplate()
    pagHTML += `
        <div class="w3-container">
            <div class="w3-panel w3-white w3-card w3-display-container w3-round-xxlarge w3-border w3-center">
                <h2 class="w3-text-blue"><b>Desportos</b></h2>
    `
    for(let i = 0; i < sports.length; i++){
        pagHTML += `
            <p>${sports[i][0]}: ${sports[i][1]}</p>
        `
    }
    pagHTML += `
            </div>
        </div>
    `
    pagHTML += footerTemplate(d)
    return pagHTML
}

exports.genTop10ProfessionsPage = function(professions, d){
    var pagHTML = headerTemplate()
    pagHTML += `
        <div class="w3-container">
            <div class="w3-panel w3-white w3-card w3-display-container w3-round-xxlarge w3-border w3-center">
                <h2 class="w3-text-blue"><b>Profissões</b></h2>
    `
    for(let i = 0; i < professions.length; i++){
        pagHTML += `
            <p>${professions[i][0]}: ${professions[i][1]}</p>
        `
    }
    pagHTML += `
            </div>
        </div>
    `
    pagHTML += footerTemplate(d)
    return pagHTML
}
