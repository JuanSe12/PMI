import DataService from "../../services/data_service.js";
import Search from "../../services/filter_service.js"

let inputFilter = document.getElementById('input-filter');
let interval;
let oldValue = "";

inputFilter.addEventListener('focus',event =>{    
    interval = setInterval(function(){
        search();
    },500);
});

inputFilter.addEventListener('blur',event =>{    
    search();
    clearInterval(interval);
    inputFilter.value = "";
    console.log('intervalFinish')
});

function search(){
    let value = inputFilter.value
    if(oldValue !== value){
        oldValue = value
        DataService.getAllProjects().then(
            projects => {
                console.log(Search(projects, value))
            }
        )
    }
    
}