exports.getSportsDistribution = function(data){
    var sports = {}
    for(let i = 0; i < data.length; i++){
        for(let j = 0; j < data[i].desportos.length; j++){
            var sport = data[i].desportos[j].toString()
            if(sport in sports){
                sports[sport]++
            }
            else{
                sports[sport] = 1
            }
        }
    }

    // Create items array
    var sportsSorted = Object.keys(sports).map(function(key) {
        return [key, sports[key]];
    });
    
    // Sort the array based on the second element
    sportsSorted.sort(function(first, second) {
        return second[1] - first[1];
    });
  
    return sportsSorted
}

exports.getTop10Professions = function(data){
    var professions = {}
    for(let i = 0; i < data.length; i++){
        var profession = data[i].profissao.toString()
        if(profession in professions){
            professions[profession]++
        }
        else{
            professions[profession] = 1
        }
    }

    // Create items array
    var professionsSorted = Object.keys(professions).map(function(key) {
        return [key, professions[key]];
    });
    
    // Sort the array based on the second element
    professionsSorted.sort(function(first, second) {
        return second[1] - first[1];
    });
  
    return professionsSorted.slice(0,10)
}
