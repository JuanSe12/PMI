let DataService = {

    
    loadClient: function(){
        this.load('client.json',Client,'clients');
    },
    
    loadClientType: function(){
        this.load('client_type.json',ClientType,'clientTypes');
    },
    
    load: function(filename,constructor,variableName){
        let variables =[];
        this.loadJsonFromFile(filename)
            .then(jsonArray=>{ 
                jsonArray.forEach(item => {
                    variables.push(Object.cast(item, constructor));
                });
                this[variableName] = variables;
                console.log(this);
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


