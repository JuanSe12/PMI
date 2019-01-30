import DataService from "../../services/data_service.js";
import Search from "../../services/filter_service.js"
import sofkianoController from "../sofkiano/controller.js";
import projectController from "../project/controller.js";
import clientController from "../client/clientController.js"


let thiscontext;


export default function(context){
    thiscontext = context;
};

let inputFilter = document.getElementById('search');
let interval;
let oldValue = "";

inputFilter.addEventListener('focus',event =>{    
    interval = setInterval(function(){
        searchAndRender();
    },500);
});

inputFilter.addEventListener('blur',event =>{    
    searchAndRender();
    clearInterval(interval);
    inputFilter.value = "";
    console.log('intervalFinish')
});

function searchAndRender(){
    let value = inputFilter.value
    if(oldValue !== value){
        oldValue = value;

        switch (thiscontext) {
            case 'sofkiano':
                DataService.getAllSofkianos().then(
                    sofkianos => {
                        sofkianoController.renderSofkianos(Search(sofkianos, value))
                    }
                )
                break;

            case 'project':
                DataService.getAllProjects().then(
                    projects => {
                        projectController.renderProject(Search(projects, value))
                    }
                )
                break;

            case 'client':
                DataService.getAllClients().then(
                    clients => {
                        clientController.renderClients(Search(clients, value))
                    }
                )
                break;
                
            default:
                break;
        }
    }
    
}