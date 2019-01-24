'use strict';

let sofkiano = {
    id: 1,
    firtsName: "Pepito",
    lastName: "Perez",
    docType: "Cédula",
    docNumber: "100203",
    skills: ["Genial","Mucho más genial","Amable","Liderazgo","Buena actitud","blabla"],
    tecnos: [{name:"Angular", img:"../../assets/images/tecnologhies/angular.png"},{name:"CSS", img:"../../assets/images//tecnologhies/css.png"}]
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

        for (let indexSofkiano = 0; indexSofkiano < 10; indexSofkiano++) {


            let tecnologhies= this.fillTecno(indexSofkiano);
            let skills = this.fillSkills(indexSofkiano);

            let li = 
            `<li class="collection-item avatar">
                <div class="collapsible-header"><img src="../../assets/images/person.png" 
                alt="" class="resize circle"> ${sofkiano.firtsName } ${sofkiano.lastName}</div>
               
                <div class="collapsible-body ">               
                <form class="col s12">
                  <div class="row">
                    <div class="input-field col s6">
                      <input disabled placeholder=${sofkiano.docType } id="first_name" type="text" class="validate">
                      <label for="first_name">Document type</label>
                    </div>
                    <div class="input-field col s6">
                    <input disabled placeholder=" ${sofkiano.docNumber }" id="" type="text" class="validate">
                    <label for="first_name">Document number</label>
                    </div>      
                  </div>           
                  <p>Personal characteristics</p>
                  `+ skills +`
                  <p>Technologies</p>
                    `+ tecnologhies +`
                  <div class="row">
                    <div class="input-field col s6">
                      <input disabled placeholder=${sofkiano.docType } id="" type="text" class="validate">
                      <label for="first_name">Time experience in Sofka</label>
                    </div>
                    <div class="input-field col s6">
                    <input disabled placeholder=" ${sofkiano.docNumber }" id="" type="text" class="validate">
                    <label for="first_name">External time experience </label>
                    </div>      
                  </div>  
                </form>                
                </div>
            </li>`;
           template += li;     
        }
        ul.innerHTML = template;
        
    }

    fillTecno(indexSofkiano){
        let tecnoTemplate= "";
        for (let j = 0; j < sofkiano.tecnos.length; j++) {
            let tecnoChips =  
                `<div class="chips">                  
                    <div class="chip">                  
                        <img src="${sofkiano.tecnos[j].img }" alt=""> 
                        ${sofkiano.tecnos[j].name }
                    </div>
                </div> `;
                tecnoTemplate += tecnoChips;
        }
        return tecnoTemplate;
    }

    fillSkills(indexSofkiano){
        let skillTemplate= "";
        for (let j = 0; j < sofkiano.skills.length; j++) {
            let skillChips =  
                `<div class="chips">                  
                    <div class="chip">                                         
                        ${sofkiano.skills[j] }
                    </div>
                </div> `;
                skillTemplate += skillChips;
        }
        return skillTemplate;
    }

}

var data = new Data();

data.fill();
