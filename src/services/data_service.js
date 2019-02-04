import ClientType from "../model/client_type.js";
import Client from "../model/client.js";
import Feature from "../model/feature.js";
import ProjectState from "../model/project_state.js";
import Project from "../model/project.js";
import Sofkiano from "../model/sofkiano.js";
import Technology from "../model/technology.js";
import Config from "../config/config.js"
import SofkianoProfile from "../model/sofkiano_profile.js";


const CLIENT_TYPE_FILENAME = 'client_type.json';
const CLIENT_FILENAME = 'client.json';
const FEATURES_FILENAME = 'feature.json';
const PROJECT_STATE_FILENAME = 'project_state.json';
const PROJECT_FILENAME = 'project.json';
const SOFKIANO_PROFILE_FILENAME = 'sofkiano_profile.json';
const SOFKIANO_FILENAME = 'sofkiano.json';
const TECHNOLOGY_FILENAME = 'technology.json';



let localStorage = window.localStorage


export default class DataService {

    static getAllClientTypes(){
        return load(CLIENT_TYPE_FILENAME,ClientType);
    }


    static getAllClients(){
        return load(CLIENT_FILENAME, Client);
    }


    static getAllFeatures(){
        return load(FEATURES_FILENAME, Feature);
    }


    static getAllProjectStates(){
        return load(PROJECT_STATE_FILENAME, ProjectState);
    }


    static getAllProjects(){
        return load(PROJECT_FILENAME, Project);
    }


    static getAllSofkianoProfiles(){
        return load(SOFKIANO_PROFILE_FILENAME, SofkianoProfile);
    }


    static getAllSofkianos(){
        return load(SOFKIANO_FILENAME, Sofkiano);
    }


    static getAllTechnologies(){
        return load(TECHNOLOGY_FILENAME, Technology);
    }


    static getClientTypeByIds(ids){
        return loadByIds(CLIENT_TYPE_FILENAME, ClientType, ids)
    }


    static getClientByIds(ids){
        return loadByIds(CLIENT_FILENAME, Client, ids)
    }


    static getFeaturesByIds(ids){
        return loadByIds(FEATURES_FILENAME, Feature, ids)
    }

    static getProjectSofkianoByIds(ids){
        return loadByIds(PROJECT_FILENAME, Project, ids)
    }


    static getProjectStateByIds(ids){
        return loadByIds(PROJECT_STATE_FILENAME, ProjectState, ids)
    }


    static getProjectByIds(ids){
        return loadByIds(PROJECT_FILENAME, Project, ids)
    }


    static getSofkianoProfileByIds(ids){
        return loadByIds(SOFKIANO_PROFILE_FILENAME, SofkianoProfile, ids)
    }


    static getSofkianoByIds(ids){
        return loadByIds(SOFKIANO_FILENAME, Sofkiano, ids)
    }


    static getTechnologiesByIds(ids){
        return loadByIds(TECHNOLOGY_FILENAME, Technology, ids)
    }


    static save(model){
        if(model instanceof ClientType){
            return saveNewOrEditModel(CLIENT_TYPE_FILENAME, ClientType, model)
        }
        else if(model instanceof Client){
            return saveNewOrEditModel(CLIENT_FILENAME, Client, model)
        }
        else if(model instanceof Feature){
            return saveNewOrEditModel(FEATURES_FILENAME, Feature, model)
        }
        else if(model instanceof ProjectState){
            return saveNewOrEditModel(PROJECT_STATE_FILENAME, ProjectState, model)
        }
        else if(model instanceof Project){
            return saveNewOrEditModel(PROJECT_FILENAME, Project, model)
        }
        else if(model instanceof SofkianoProfile){
            return saveNewOrEditModel(SOFKIANO_PROFILE_FILENAME, SofkianoProfile, model)
        }
        else if(model instanceof Sofkiano){
            return saveNewOrEditModel(SOFKIANO_FILENAME, Sofkiano, model)
        }
        else if(model instanceof Technology){
            return saveNewOrEditModel(TECHNOLOGY_FILENAME, Technology, model)
        }
    }


    static delete(model){
        if(model instanceof ClientType){
            return deleteModel(CLIENT_TYPE_FILENAME, ClientType, model)
        }
        else if(model instanceof Client){
            return deleteModel(CLIENT_FILENAME, Client, model)
        }
        else if(model instanceof Feature){
            return deleteModel(FEATURES_FILENAME, Feature, model)
        }
        else if(model instanceof ProjectState){
            return deleteModel(PROJECT_STATE_FILENAME, ProjectState, model)
        }
        else if(model instanceof Project){
            return deleteModel(PROJECT_FILENAME, Project, model)
        }
        else if(model instanceof SofkianoProfile){
            return deleteModel(SOFKIANO_PROFILE_FILENAME, SofkianoProfile, model)
        }
        else if(model instanceof Sofkiano){
            return deleteModel(SOFKIANO_FILENAME, Sofkiano, model)
        }
        else if(model instanceof Technology){
            return deleteModel(TECHNOLOGY_FILENAME, Technology, model)
        }
    }
 
}


function load(filename, constructor){
    let variables =[];
    return new Promise((resolve, reject) =>{
        loadJsonFromFileOrLocalStorage(filename)
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


function loadJsonFromFileOrLocalStorage(filename){
    return new Promise((resolve, reject) =>{
        if(dataIsLocalStorage(filename)){
            let json = JSON.parse(localStorage.getItem(filename))
            setTimeout(()=>{
                console.log("hola juan"+json);
                resolve(json)
            },50)
        }
        else{
            
            $.getJSON(`${Config.baseUrl()}/src/data/${filename}`, function(json) {
                //saveLocalStorage(filename,json);
                resolve(json)
            })
            .fail(function(){
                reject('error')
            })
        }
    });
}


function dataIsLocalStorage(filename){
    return localStorage.getItem(filename) ? true : false;
}


function loadByIds(filename, constructor, ids){
    ids.sort((a,b) =>{ 
        return a-b
    });
    let variables =[];
    return new Promise((resolve, reject) =>{
        loadJsonFromFileOrLocalStorage(filename)
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


function saveNewOrEditModel(filename,constructor, instance){
    return new Promise((resolve, reject) =>{
        load(filename, constructor).then(
            models =>{
                let client = models.find(o => o.id === instance.id)

                if(client){
                    let index = getIndex(client.id, models);
                    instance.id = client.id;
                    try {
                        models.splice(index, 1, instance)
                        saveLocalStorage(filename, models)
                        resolve(instance)                            
                    } catch (error) {
                        reject(error)
                    }
                }
                else{
                                   
                    
                    let id = getLastId(models)
                    instance.id = id + 1;
                    try {
                        models.push(instance)
                        saveLocalStorage(filename, models)
                        resolve(instance)                  
                    } catch (error) {
                        reject(error)
                    }  
                }
            }
        )
        .catch(err=>{
            reject(err)
        })
    });
}


function getLastId(models){
    let id = 0;
    models.forEach(model => {
        id < model.id ? id = model.id : id;
    });
    return id;
}


function getIndex(id,models){
    let i = 0
    models.forEach((model,index) => {
        model.id === id ? i = index : i;
    });
    return i;
}


function saveLocalStorage(filename ,data){
    localStorage.setItem(filename, JSON.stringify(data));
}


function deleteModel(filename,constructor, instance){
    return new Promise((resolve, reject) =>{
        load(filename, constructor).then(
            models =>{
                let model = models.find(object => object.id === instance.id)

                if(model){
                    let index = getIndex(model.id, models);
                    try {
                        models.splice(index, 1)
                        saveLocalStorage(filename, models)
                        resolve(model)                            
                    } catch (error) {
                        reject(error)
                    }
                }
            }
        )
        .catch(err=>{
            reject(err)
        })
    });
}


Object.cast = function cast(rawObj, constructor)
{
    var obj = new constructor();
    for(var i in rawObj)
        obj[i] = rawObj[i];
    return obj;
}



