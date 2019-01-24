import BasicInformation from "./basic_information.js";

export default class Technology extends BasicInformation{

    constructor(id, name, description, icon){
        super(id, name, description);
        this.icon = icon;
    }  

}