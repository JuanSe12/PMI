'use strict';

let business = {
    id:1,
    client: [{name:"Angular", img:"./angular.png", projectName: "Angular Project 1",estado:"Completo"},
    {name:"SAP", img:"./SAP.png", projectName: "SAP Project 1",estado: "Incompleto"},
    {name:"Default", img:"./default-image.png", projectName: "Default Project 1",estado: "Incompleto"}]   

}

class Data {

    constructor() {
    }


    fill() {
        var ul = document.getElementById("business-list");
        let template = "";

        for (let index = 0; index < business.client.length; index++) {
            let li = 
            `<li class="collection-item avatar">
            <div class="collapsible-header">
                <div class="col s12">
                    <div class="row">
                        <div class="col s2">
                            <img src="${business.client[index].img}" alt="" class="resize circle">
                        </div>
                        <div class="col s8">
                            <div>
                                <h4>${business.client[index].projectName} </h4>
                            </div>
                            <div>
                                ${business.client[index].name}
                            </div>
                        </div>
                        <div class="col s2 vertical">
                            <i>${business.client[index].estado}</i>                           
                        </div>
                    </div>
                </div>
            </div>
        </li>`;
           template += li;     
        }
        ul.innerHTML = template;
    }
}

var data = new Data();

data.fill();