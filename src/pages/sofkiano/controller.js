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
        var div = document.getElementById("sofkianos-list");
        let template = "";

        /*sofkianos.forEach(sofkiano => {
            sofkiano.lastName
        });*/

        for (var i = 0; i < 10; i++) {
            let li = 
            `<li class="collection-item avatar">
                <div class="collapsible-header"><img src="../../public/images/yuna.JPG" alt="" class="circle">First</div>
                <div class="collapsible-body">${sofkiano.firtsName } ${sofkiano.lastName}</div>
            </li>`;
           template += li;     
        }
        div.innerHTML = template;
        
    }

    creatingElements() {
        let li = document.createElement("LI");
        let div1 = document.createElement("DIV");
        let div2 = document.createElement("DIV");
        let img = document.createElement("IMG");
        let span = document.createElement("SPAN");
        let divInfo = document.createElement("div");
        let pName = document.createElement("p");
        let pDocType = document.createElement("p");
        let pDocNumber = document.createElement("p");
        let pFeature = document.createElement("p");
        let pTecno = document.createElement("p");
        return [li, div1, div2, img, span, divInfo, pName, pDocType, pDocNumber, pFeature, pTecno];
    }


}

var data = new Data();

data.fill();
