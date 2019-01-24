'use strict';

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

        /*sofkianos.forEach(sofkiano => {
            sofkiano.lastName
        });*/ 

        for (var i = 0; i < 10; i++) {
            let li = 
            `<li class="collection-item avatar">
                <div class="collapsible-header responsiveText"><img src="../../assets/images/person.png" alt="" class="resize circle">First</div>
                <div class="collapsible-body responsiveText">${sofkiano.firtsName } ${sofkiano.lastName}</div>
            </li>`;
           template += li;     
        }
        ul.innerHTML = template;
        
    }

}

var data = new Data();

data.fill();
