'use strict';
import  DataService from "../../services/data_service.js";

let sofkiano = {
    id: 1,
    firtsName: "pepito",
    lastName: "perez"
}

class Data {

    constructor() {
    }


    fill() {
        var ul = document.getElementById("sofkianos-list");
        let template = "";
        DataService.getAllSofkianos().then(sofkiano=>{
            console.log(sofkiano);
        })
        /*sofkianos.forEach(sofkiano => {
            sofkiano.lastName
        });*/ 

        for (var i = 0; i < 10; i++) {
            let li = 
            `<li class="collection-item avatar">
                <div class="collapsible-header"><img src="../../assets/images/person.png" alt="" class="resize circle fixing"><div class="responsiveText fixing marginText">${sofkiano.firtsName } ${sofkiano.lastName}</div></div>
                <div class="collapsible-body responsiveText">Showing</div>
            </li>`;
           template += li;     
        }
        ul.innerHTML = template;
        
    }

}

var data = new Data();

data.fill();
