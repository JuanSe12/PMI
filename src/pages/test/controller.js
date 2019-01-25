import DataService from "../../services/data_service.js"

DataService.getAllSofkianos().then(
    data => {
        data.forEach(sofkiano => {
            sofkiano.getTechnologies().then(
                (thechnologies) =>{
                    console.log(thechnologies)
                }
            )
        });
        
    }
)