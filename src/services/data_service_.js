import ClientType from "../model/client_type.js";
import Client from "../model/client.js";
import Feature from "../model/feature.js";
import ProjectState from "../model/project_state.js";
import Project from "../model/project.js";
import Sofkiano from "../model/sofkiano.js";
import Technology from "../model/technology.js";
import Config from "../config/config.js"


const CLIENT_TYPE_FILENAME = 'client_type.json';
const CLIENT_FILENAME = 'client.json';
const FEATURES_FILENAME = 'feature.json';
const PROJECT_STATE_FILENAME = 'project_state.json';
const PROJECT_FILENAME = 'project.json';
const SOFKIANO_FILENAME = 'sofkiano.json';
const TECHNOLOGY_FILENAME = 'technology.json';


export default class DataService {

    static getAllClientTypes(){
        return this.load(CLIENT_TYPE_FILENAME,ClientType);
    }


    static getAllClients(){
        return this.load(CLIENT_FILENAME, Client);
    }


    static getAllFeatures(){
        return this.load(FEATURES_FILENAME, Feature);
    }


    static getAllProjectStates(){
        return this.load(PROJECT_STATE_FILENAME, ProjectState);
    }


    static getAllProjects(){
        return this.load(PROJECT_FILENAME, Project);
    }


    static getAllSofkianos(){
        return this.load(SOFKIANO_FILENAME, Sofkiano);
    }


    static getAllTechnologies(){
        return this.load(TECHNOLOGY_FILENAME, Technology);
    }
   

    static load(filename, constructor){
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
            $.getJSON(`${Config.baseUrl()}/src/data/${filename}`, function(json) {
                resolve(json)
            })
            .fail(function(){
                reject('error')
            })
        });
    }


    static getClientTypeByIds(ids){
        return this.loadByIds(CLIENT_TYPE_FILENAME, ClientType, ids)
    }


    static getClientByIds(ids){
        return this.loadByIds(CLIENT_FILENAME, Client, ids)
    }


    static getFeaturesByIds(ids){
        return this.loadByIds(FEATURES_FILENAME, Feature, ids)
    }


    static getProjectStateByIds(ids){
        return this.loadByIds(PROJECT_STATE_FILENAME, ProjectState, ids)
    }


    static getProjectByIds(ids){
        return this.loadByIds(PROJECT_FILENAME, Project, ids)
    }


    static getSofkianoByIds(ids){
        return this.loadByIds(SOFKIANO_FILENAME, Sofkiano, ids)
    }


    static getTechnologiesByIds(ids){
        return this.loadByIds(TECHNOLOGY_FILENAME, Technology, ids)
    }


    static loadByIds(filename, constructor, ids){
        ids.sort((a,b) =>{ 
            return a-b
        });
        let variables =[];
        return new Promise((resolve, reject) =>{
            DataService.loadJsonFromFile(filename)
            .then(jsonArray=>{
                let index = 0
                jsonArray.forEach(item => {
                    if( ids[index] === item.id ){
                        variables.push(Object.cast(item, constructor));
                        index++;
                    }
                });
                resolve(variables)
            })
            .catch(err =>{
                reject(err)
            });
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
