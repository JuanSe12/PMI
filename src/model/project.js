import DataService from "../services/data_service.js";

export default class Project{
    constructor(id, name, description, state, client, technologies, sofkianos){
        this.id = id;
        this.name = name;
        this.description = description;
        this.state = state;
        this.client = client;
        this.technologies = technologies
        this.sofkianos = sofkianos
    }


    getState(){
        return DataService.getProjectStateByIds(new Array(this.state));
    }


    getClient(){
        return DataService.getClientByIds(new Array(this.client));
    }


    getSofkianos(){
        return DataService.getSofkianoByIds(this.sofkianos);
    }


    getTechnologies(){
        return DataService.getTechnologiesByIds(this.technologies)
    }

}