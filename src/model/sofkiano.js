class Sofkiano{
    constructor(id, firtsName, lastName, documentType, documentNumber, 
        externalExperience, internalExperience, feactures, thechnologies){
        this.id = id;
        this.firtsName = firtsName;
        this.lastName = lastName;
        this.documentType = documentType;
        this.documentNumber = documentNumber;
        this.externalExperience = externalExperience;
        this.internalExperience = internalExperience;
        this.feactures = feactures;
        this.thechnologies = thechnologies;
    }
    getFeatures(){
        let feactures = []
        this.feactures.forEach(feature => {
            //TODO: get features from JSON features
            feactures.push()
        });
        return feactures;
    }
}