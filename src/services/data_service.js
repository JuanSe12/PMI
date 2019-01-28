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

let localStorage = window.localStorage

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
            DataService.loadJsonFromFileOrLocalStorage(filename)
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

    
    static loadJsonFromFileOrLocalStorage(filename){
        return new Promise((resolve, reject) =>{
            if(this.dataIsLocalStorage(filename)){
                let json = JSON.parse(localStorage.getItem(filename))
                resolve(json)
            }
            else{
                $.getJSON(`${Config.baseUrl()}/src/data/${filename}`, function(json) {
                    DataService.saveLocalStorage(filename,json);
                    resolve(json)
                })
                .fail(function(){
                    reject('error')
                })
            }
        });
    }


    static dataIsLocalStorage(filename){
        return localStorage.getItem(filename) ? true : false;
    }


    static saveLocalStorage(filename ,data){
        localStorage.setItem(filename, JSON.stringify(data));
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


    static save(model){
        if(model instanceof ClientType){
            this.saveNewOrEditModel(CLIENT_TYPE_FILENAME, ClientType, model)
        }
        else if(model instanceof Client){
            this.saveNewOrEditModel(CLIENT_FILENAME, Client, model)
        }
        else if(model instanceof Feature){
            this.saveNewOrEditModel(FEATURES_FILENAME, Feature, model)
        }
        else if(model instanceof ProjectState){
            this.saveNewOrEditModel(PROJECT_STATE_FILENAME, ProjectState, model)
        }
        else if(model instanceof Project){
            this.saveNewOrEditModel(PROJECT_FILENAME, Project, model)
        }
        else if(model instanceof Sofkiano){
            this.saveNewOrEditModel(SOFKIANO_FILENAME, Sofkiano, model)
        }
        else if(model instanceof Technology){
            this.saveNewOrEditModel(TECHNOLOGY_FILENAME, Technology, model)
        }
    }


    static saveNewOrEditModel(filename,constructor, instance){
        this.load(filename, constructor).then(
            models =>{
                let client = models.find(o => o.id === instance.id)

                if(client){
                    let index = this.getIndex(client.id, models);
                    instance.id = client.id;
                    models.splice(index,1,instance)
                }
                else{
                    let id = DataService.getLastId(models)
                    instance.id = id + 1;
                    models.push(instance)
                }

                DataService.saveLocalStorage(filename,models)
            }
        )
    }


    static getLastId(models){
        let id = 0;
        models.forEach(model => {
            id < model.id ? id = model.id : id = id;
        });
        return id;
    }


    static getIndex(id,models){
        let i = 0
        models.forEach((model,index) => {
            model.id === id ? i = index : i = i;
        });
        return i;
    }
    
    
}

Object.cast = function cast(rawObj, constructor)
{
    var obj = new constructor();
    for(var i in rawObj)
        obj[i] = rawObj[i];
    return obj;
}



