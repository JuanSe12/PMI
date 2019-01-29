import DataService from "../services/data_service.js";

export default class Sofkiano{
    constructor(id, firtsName, lastName, img, documentType, documentNumber, 
        externalExperience, internalExperience, feactures, technologies){
        this.id = id;
        this.firtsName = firtsName;
        this.lastName = lastName;
        this.img = img;
        this.documentType = documentType;
        this.documentNumber = documentNumber;
        this.externalExperience = externalExperience;
        this.internalExperience = internalExperience;
        this.feactures = feactures;
        this.technologies = technologies;
    }


    getFeatures(){
       return DataService.getFeaturesByIds(this.feactures);
    }


    getTechnologies(){
        return DataService.getTechnologiesByIds(this.technologies);
    }
}