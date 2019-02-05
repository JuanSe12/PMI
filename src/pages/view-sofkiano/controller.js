import DataService from "../../services/data_service.js";
import Config from "../../config/config.js";
import { update } from "./update_sofkiano.js";
import Sofkiano from "../../model/sofkiano.js";

let technologiesAvailable = [];
let featuresAvailable = [];
let sofkianoEdit = new Sofkiano();

function deleteItem(id, array){
    array.forEach((item,index) => {
        if(item === id){
            array.splice(index,1);
        }
    });
    return array;
}

export default async function fillSofkianoEdit(sofkiano){
    
    var TechnologiesContent = "";
    let featuresContent = "";
    let template = "";
    let technologies = "";
    let feature = "";

    technologiesAvailable = [];
    featuresAvailable = [];
    sofkianoEdit = new Sofkiano();
    sofkianoEdit = sofkiano;

    DataService.getAllFeatures().then(
        features => {
            features.forEach(feature =>{
                featuresAvailable.push(feature.id);
            })
            sofkianoEdit.feactures.forEach(idFeature => {
                featuresAvailable = deleteItem(idFeature,featuresAvailable)
            });
        }
    )

    DataService.getAllTechnologies().then(
        technologies => {
            technologies.forEach(technology =>{
                technologiesAvailable.push(technology.id);
            })
            
            sofkianoEdit.technologies.forEach(idTechnology => {
                technologiesAvailable = deleteItem(idTechnology,technologiesAvailable)
            });
        }
    )

    //////////////Features
    var features = await sofkiano.getFeatures();
    feature = fillFeatures(features);
    featuresContent = document.getElementById("sofkiano-features-list");
    featuresContent.innerHTML = feature;
    document.getElementById('add_modal_feature').addEventListener('click', function () {
        DataService.getFeaturesByIds(featuresAvailable).then(
            feature => {
                renderFeatures(feature);
            })
    });

    document.getElementById('add_featur').addEventListener('click', function () {
        let featurArray = document.getElementById("div_FeaturModal");
        let checkFeature = featurArray.getElementsByTagName('input');
        let arrayFeaturInput = [];
        for (var i = 0; i < checkFeature.length; i++) {
            if (checkFeature[i].checked) {
                featuresAvailable = deleteItem(parseInt(checkFeature[i].value), featuresAvailable)
                sofkianoEdit.feactures.push(parseInt(checkFeature[i].value))
            }
        }

        DataService.getFeaturesByIds(sofkianoEdit.feactures).then(
            feature => {
                featuresContent.innerHTML = fillFeatures(feature);
            }
        )
        setTimeout(function(){
            $('.icons-delete-featur').css("display","block");
        },300)

    });



    //////////////// Technologies

    var tech = await sofkiano.getTechnologies();
    technologies = fillTecno(tech);
    TechnologiesContent = document.getElementById("container-tech")
    TechnologiesContent.innerHTML = technologies;
    document.getElementById('add_tech').addEventListener('click', function () {
        DataService.getTechnologiesByIds(technologiesAvailable).then(
            technologies => {
                renderTech(technologies);
            }
        )
        
    });

    document.getElementById('add_technologies').addEventListener('click', function () {
        let technologiesArray = document.getElementById("div_techs");
        let checkTechnology = technologiesArray.getElementsByTagName('input');
        let arrayTechnologiesInput = [];

        for (var i = 0; i < checkTechnology.length; i++) {
            if (checkTechnology[i].checked) {
                technologiesAvailable = deleteItem(parseInt(checkTechnology[i].value), technologiesAvailable)
                sofkianoEdit.technologies.push(parseInt(checkTechnology[i].value))
            }
        }

        DataService.getTechnologiesByIds(sofkianoEdit.technologies).then(
            technologies => {
                TechnologiesContent.innerHTML = fillTecno(technologies);
            }
        )
        setTimeout(function(){
            $('.icons-delete').css("display","block");
        },300)

    });

    var sessionTech = await DataService.getAllTechnologies();
    var sessionFeatur = await DataService.getAllFeatures();
    editButton(sofkiano);
    update(sofkiano)
    sessionStorage.tec = JSON.stringify(sessionTech);
    sessionStorage.featur = JSON.stringify(sessionFeatur);

    document.getElementById('input-sofkiano-firstName').value = sofkiano.firtsName;
    document.getElementById('input-sofkiano-lastName').value = sofkiano.lastName;
    $('#input-sofkiano-typeDocument').find("option[value=" + sofkiano.documentType + "]").prop("selected", true);
    $("#input-sofkiano-typeDocument").formSelect();
    document.getElementById('input-sofkiano-numberDocument').value = sofkiano.documentNumber;
    document.getElementById('input-sofkiano-experience-time-sofka').value = sofkiano.internalExperience;
    document.getElementById('input-sofkiano-external-experience-time').value = sofkiano.externalExperience;
}


function editButton(sofkiano) {
    $('#editDocument').click(function (event) {
        document.getElementById('input-sofkiano-firstName').disabled = false;
        document.getElementById('input-sofkiano-lastName').disabled = false;
        $('#input-sofkiano-typeDocument').prop("disabled", false);
        $('select').formSelect();
        document.getElementById('input-sofkiano-numberDocument').disabled = false;
        document.getElementById('input-sofkiano-experience-time-sofka').disabled = false;
        document.getElementById('input-sofkiano-external-experience-time').disabled = false;
        $(".view-edit").css("display", "inline-block");
        $(".icons-delete").css("display", "block");
        $(".icons-delete-featur").css("display", "block");
        $(".icons-delete-featur").css("margin-top", "-2%");
    })
}

function renderFeatures(data) {
    let div_FeaturModal = document.getElementById("div_FeaturModal");
    let feature = "";

    data.forEach((item, index) => {

        index % 2 == 0 ? feature += '<div class="row">' : feature += "";
        feature += `<div class="col s6"><label class="mov_check"><input type="checkbox" class="filled-in" name="technology${item.id}" id="technology${item.id}" value=${item.id}><span>${item.name}</span></label></div>`;
        (index + 1) % 2 == 0 ? feature += '</div>' : feature += "";
    });
    div_FeaturModal.innerHTML = feature;
}

function renderTech(data) {
    let div_tech = document.getElementById("div_techs");
    let techs = "";

    data.forEach((item, index) => {

        index % 2 == 0 ? techs += '<div class="row">' : techs += "";
        techs += `<div class="col s6"><label class="mov_check"><input type="checkbox" class="filled-in" name="technology${item.id}" id="technology${item.id}" value=${item.id}><span>${item.name}</span></label></div>`;
        (index + 1) % 2 == 0 ? techs += '</div>' : techs += "";
    });
    div_tech.innerHTML = techs;
}

function deleteIcon(index, projects) {
    $(document).ready(function () {
        $(`#icons-delete-view${index}`).click(function (event) {
            $(`#chip-tech${index}`).remove();
            sofkianoEdit.technologies = deleteItem(index, sofkianoEdit.technologies)
            technologiesAvailable.push(index);
            //console.log(sofkianoEdit);
        })
    })

}

function deleteIconFeatur(index, features) {
    $(document).ready(function () {
        $(`#icons-delete-view-featur${index}`).click(function (event) {
            $(`#chip-featur${index}`).remove();
            sofkianoEdit.feactures = deleteItem(index, sofkianoEdit.feactures)
            featuresAvailable.push(index)
            //console.log(features);
        })
    })

}

function fillTecno(technologies) {
    let tecnoTemplate = "";
    for (let index = 0; index < technologies.length; index++) {
        let tecno = 
        `<div class="chips-div" id="chip-tech${technologies[index].id}">
            <div class="content-elements">
            <a href=# id="icons-delete-view${technologies[index].id}"><i class="close material-icons icons-delete" >close</i></a>
            <img src="${Config.baseUrl() + technologies[index].icon}" alt="">
            </div>
            <p>${technologies[index].name}</p>
        </div>`;
        tecnoTemplate += tecno;
        //debugger;
        deleteIcon(technologies[index].id, technologies);

    }
    return tecnoTemplate;
}

function fillFeatures(feature) {
    let featureTemplate = "";
    for (let index = 0; index < feature.length; index++) {
        let featureList = `<div class="chips-div" id="chip-featur${feature[index].id}">
        <div class="content-elements">
        <a href=# id="icons-delete-view-featur${feature[index].id}"><i class="close material-icons icons-delete-featur" >close</i></a>
        </div>
        <p>${feature[index].name}</p>
        </div>`;
        //console.log(featureList);
        featureTemplate += featureList;

        deleteIconFeatur(feature[index].id, feature);
    }
    return featureTemplate;
}