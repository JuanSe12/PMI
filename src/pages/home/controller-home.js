'use strict';

let sofkiano = {
    id: 1,
    firtsName: "Pepito",
    lastName: "Perez",
    docType: "Cédula",
    docNumber: "100203",
    tecnos: [{name:"Angular", img:"../../assets/images/tecnologhies/angular.png"},{name:"CSS", img:"../../assets/images//tecnologhies/css.png"}]
}

let business = {
    id:1,
    client: [{name:"Alpina", img:"./angular.png", projectName: "alpinita"}]

}

class Data {

    constructor() {
    }


    fill() {
        var ul = document.getElementById("business-list");
        let template = "";

        for (let index = 0; index < 10; index++) {


            let businessdata= this.fillBusiness(index);            

            let li = 
            `<li class="collection-item avatar">
            <div class="collapsible-header">
                <div class="col s12">
                    <div class="row">
                        <div class="col s2">
                            <img src="./angular.png" alt="" class="resize circle">
                        </div>
                        <div class="col s8">
                            <div>
                                <h4>${business.client[0].projectName}</h4>
                            </div>
                            <div>
                                ${business.client[0].name }
                            </div>
                        </div>
                        <div class="col s2 vertical">
                            <i>Estado</i>                           
                        </div>
                    </div>
                </div>
            </div>
        </li>`;
           template += li;     
        }
        ul.innerHTML = template;
        
    }

    fillBusiness(index){
        let businessTemplate= "";
        for (let j = 0; j < business.client.length; j++) {
            /*let data =  
                `<div class="chips">                  
                    <div class="chip">
                        ${business.client[0].name }
                    </div>
                </div> `;
                businessTemplate += data;*/
                console.log(business.client[0].name);
        }
        return businessTemplate;
    }
}

var data = new Data();

data.fill();