import Route from "./services/route.js";
import DataService from "./services/data_service.js"

Route.renderMenu();
Route.routeTo('project');

document.getElementById('input-filter').onchange = function(event){
    console.log(this.value)

    DataService.getAllSofkianos().then(
        sofkianos => {
            let datos = new Set()
            sofkianos.forEach(sofkiano => {
                
            });
        }
    )

}
