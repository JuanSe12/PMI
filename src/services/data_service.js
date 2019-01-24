import ClientType from "../model/client_type.js";
import Client from "../model/client.js";
import Feature from "../model/feature.js";
import ProjectState from "../model/project_state.js";
import Project from "../model/project.js";
import Sofkiano from "../model/sofkiano.js";
import Technology from "../model/technology.js";

export default class DataService {

    static getAllClientTypes(){
        return this.load('client_type.json',ClientType);
    }


    static getAllClients(){
        return this.load('client.json', Client);
    }


    static getAllFeatures(){
        return this.load('feature.json', Feature);
    }


    static getAllProjectStates(){
        return this.load('project_state.json', ProjectState);
    }


    static getAllProjects(){
        return this.load('project.json', Project);
    }


    static getAllSofkianos(){
        return this.load('sofkiano.json', Sofkiano);
    }


    static getAllTechnologies(){
        return this.load('technology.json', Technology);
    }


    static load(filename,constructor){
        let variables =[];
        return new Promise((resolve, reject) =>{
            DataService.loadJsonFromFile(filename)
            .then(jsonArray=>{ 
                jsonArray.forEach(item => {
                    variables.push(Object.cast(item, constructor));
                });
                resolve(variables)
            })
            .catch(err =>{
                reject(err)
            });
        });
    }
    

    static loadJsonFromFile(filename){
        return new Promise((resolve, reject) =>{
            $.getJSON(`http://localhost/src/data/${filename}`, function(json) {
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



