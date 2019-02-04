'use strict';

function renderSofkianos(data) {
    let div_SofkiModal = document.getElementById("div_SofkiModal");
    let sofkiano = "";

    data.forEach((item, index) => {

        index % 2 == 0 ? sofkiano += '<div class="row">' : sofkiano += "";
        sofkiano += `<div class="col s6"><label class="mov_check"><input type="checkbox" class="filled-in" name="technology${item.id}" id="technology${item.id}" value=${item.id}><span>${item.firtsName}</span></label></div>`;
        (index + 1) % 2 == 0 ? sofkiano += '</div>' : sofkiano += "";
    });
    div_SofkiModal.innerHTML = sofkiano;
}

function renderClient(data) {
    let div_clientModal = document.getElementById("div_clientModal");
    let client = "";

    data.forEach((item, index) => {

        index % 2 == 0 ? client += '<div class="row">' : client += "";
        client += `<div class="col s6"><label class="mov_check"><input type="radio" class="filled-in" name="clientModal" id="clientModal${item.id}" value=${item.id}><span>${item.name}</span></label></div>`;
        (index + 1) % 2 == 0 ? client += '</div>' : client += "";
    });
    div_clientModal.innerHTML = client;
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

export {
    renderSofkianos,
    renderClient,
    renderTech
}