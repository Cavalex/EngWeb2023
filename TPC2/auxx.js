// aqui tamos a criar um módulo que vamos usar noutro ficheiro
// é preciso o export para aceder à informação for deste ficheiro

exports.myDateTime = function () {
    var d = new Date().toISOString().substring(0, 16); // converte a data para uma coisa que se consegue ler
    return d;
}

exports.myName = function() {
    return "John Doe";
}

exports.turma = "EngWeb2023::TP1"
