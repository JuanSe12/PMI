let DataService = {
    
    loadClientType: function(){
        let clientTypes =[];
        this.loadJsonFromFile('client_type.json')
        .then(clientTypesJson=>{ 
            clientTypesJson.forEach(type => {
                clientTypes.push(Object.cast(type, ClientType));
            });
            this.clientTypes = clientTypes;
        });
    },
    
    
    loadJsonFromFile: function(filename){
        return new Promise((resolve, reject) =>{
            $.getJSON(`./src/data/${filename}`, function(json) {
                resolve(json)
            })
            .fail(function(){
                reject('error')
            })
        });
    }
    
}

Object.cast = function cast(rawObj, constructor)
{
    var obj = new constructor();
    for(var i in rawObj)
        obj[i] = rawObj[i];
    return obj;
}
