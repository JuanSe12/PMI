import DataService from "../../services/data_service.js";
import Sofkiano from "../../model/sofkiano.js";


export default function DOMsaveSofkiano() {
    let buttonModal = document.getElementById('data_form_button');
    buttonModal.addEventListener('click', function () {
        DataService.getAllFeatures()
        .then(features => {
            renderFeatures(features);
        });
        
        DataService.getAllTechnologies()
        .then(technologies => {
            rendertechnologies(technologies);
        });
    });

    let buttonSave = document.getElementById('save_sofkiano');
    buttonSave.addEventListener('click', function () {
        //console.log("data");
        let firstName = document.getElementById('firstname').value;
        let lastName = document.getElementById('last_name').value;
        let typeDocument = document.getElementById('type_document').value;
        let numberDocument = document.getElementById('number_document').value;
        let experienceTimeSofka = document.getElementById('experience_time_sofka').value;
        let externalExperienceTime = document.getElementById('external_experience_time').value;
        //console.log(firstName, lastName, typeDocument, numberDocument, experienceTimeSofka, externalExperienceTime);
        let features_array = document.getElementById(`div_features`);
        let checkFeature = features_array.getElementsByTagName(`input`);
        //console.log(checkFeature);
        let arrayFeaturesDiv = [];
        for (var i = 0; i < checkFeature.length; i++) { 
            if(checkFeature[i].checked){
                arrayFeaturesDiv.push(parseInt(checkFeature[i].value));
            }
        } 
        let technologies_array = document.getElementById(`div_technologies`);
        let checkTechnology = technologies_array.getElementsByTagName(`input`);
        //console.log(checkTechnology);
        let arrayTechnologiesDiv = [];
        for (var i = 0; i < checkTechnology.length; i++) { 
            if(checkTechnology[i].checked){
                arrayTechnologiesDiv.push(parseInt(checkTechnology[i].value));
            }
        } 
        //console.log(arrayTechnologiesDiv);
        let sofkianoSave = new Sofkiano(0, firstName, lastName, "/src/assets/images/sofkianos/non-profile.png", [], [],typeDocument, numberDocument, externalExperienceTime, experienceTimeSofka, arrayFeaturesDiv, arrayTechnologiesDiv)
        DataService.save(sofkianoSave).then(
            sofkiano =>{
                document.getElementById('modal1').removeAttribute("style");
                document.getElementsByClassName('modal-overlay')[0].removeAttribute("style");
                M.toast({html: 'Se guardo Con Exito el Sofkiano!', outDuration: 300});
                
            }
        )
        .catch(
            error =>{
                console.log(error);
                M.toast({html: 'Error en Registro', classes: 'orange rounded', outDuration: 300});
            }
        )
    });
}

function renderFeatures(data){
    let div_features = document.getElementById('div_features');
    let features = "";
    data.forEach((item, index) => {
        index%2 == 0? features += '<div class="row">': features += "";
        features += `<div class="col s6"><label class="mov_check"><input type="checkbox" class="filled-in" name="feature${item.id}" id="feature${item.id}" value=${item.id}><span>${item.name}</span></label></div>`;
        (index+1)%2 == 0 ? features += '</div>': features += "";
    });
    div_features.innerHTML = features;
}

function rendertechnologies(data){
    let div_technologies = document.getElementById('div_technologies');
    let technologies = "";
    data.forEach((item, index) => {
        index%2 == 0? technologies += '<div class="row">': technologies += "";
        technologies += `<div class="col s6"><label class="mov_check"><input type="checkbox" class="filled-in" name="technology${item.id}" id="technology${item.id}" value=${item.id}><span>${item.name}</span></label></div>`;
        (index+1)%2 == 0 ? technologies += '</div>': technologies += "";
    });
    div_technologies.innerHTML = technologies;

}