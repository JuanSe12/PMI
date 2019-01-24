import  DataService from "../../services/data_service.js";

DataService.getAllSofkianos()
.then(sofkianos =>{
    let template;
    var ul = document.getElementById("sofkianos-list");
    sofkianos.map(sofkiano=>{

        let tecnologhies= fillTecno(sofkiano);
        let skills = fillSkills(sofkiano);

        let li = 
        `<li class="collection-item avatar">
            <div class="collapsible-header"><img src="../../assets/images/person.png" 
            alt="" class="resize circle"> ${sofkiano.firtsName } ${sofkiano.lastName}</div>
           
            <div class="collapsible-body ">               
            <form class="col s12">
              <div class="row">
                <div class="input-field col s6">
                  <input disabled placeholder=${sofkiano.documentType } id="first_name" type="text" class="validate">
                  <label for="first_name" class="active">Document type</label>
                </div>
                <div class="input-field col s6">
                <input disabled placeholder=" ${sofkiano.documentNumber }" id="" type="text" class="validate">
                <label for="first_name" class="active">Document number</label>
                </div>      
              </div>           
              <p>Personal characteristics</p>
              `+ skills +`
              <p>Technologies</p>
                `+ tecnologhies +`
              <div class="row">
                <div class="input-field col s6">
                  <input disabled placeholder=${sofkiano.internalExperience } id="" type="text" class="validate">
                  <label for="first_name" class="active">Time experience in Sofka</label>
                </div>
                <div class="input-field col s6">
                <input disabled placeholder=" ${sofkiano.externalExperience }" id="" type="text" class="validate">
                <label for="first_name" class="active">External time experience </label>
                </div>      
              </div>  
            </form>                
            </div>
        </li>`;
       template += li;     
    })
    ul.innerHTML=template;
})




 function fillTecno(sofkiano){
        let tecnoTemplate= "";
        for (let j = 0; j < sofkiano.technologies.length; j++) {
            console.log(sofkiano.technologies[j].img);
            let tecnoChips =  
                `<div class="chips">                  
                    <div class="chip">                  
                        <img src="${sofkiano.technologies[j].img }" alt="no disponible"> 
                        ${sofkiano.technologies[j].name }
                    </div>
                </div> `;
                tecnoTemplate += tecnoChips;
        }
        return tecnoTemplate;
    }


function  fillSkills(sofkiano){
        let skillTemplate= "";
        for (let j = 0; j < sofkiano.feactures.length; j++) {
            let skillChips =  
                `<div class="chips">                  
                    <div class="chip">                                         
                        ${sofkiano.feactures[j] }
                    </div>
                </div> `;
                skillTemplate += skillChips;
        }
        return skillTemplate;
    }




