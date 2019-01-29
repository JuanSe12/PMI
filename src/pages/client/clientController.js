'use strict';

import dataService from '../../services/data_service.js';
import clientModel from '../../model/client.js';

export default async function fillClient() {
  let arrayObject = [];
  try {
    arrayObject = await dataService.getAllClients();
  } catch (error) {
    console.log(error)
  }
  var ul = document.getElementById("client-list");
  let template = "";
  for (let indexClient = 0; indexClient < arrayObject.length; indexClient++) {
    debugger;
    let li =
      `<li class="collection-item avatar">
                <div class="collapsible-header modify-header">
                  <div class="row size-row">
                    <div class="col s10">
                      <div class="row">
                        <div class="col s5">
                          <img src="./src/assets/images/person.png"
                        alt="" class="img-size circle">
                        </div>
                        <div class="col s7">
                        
                          <p class="title-client">${arrayObject[indexClient].name}</p>
                        </div>
                      </div>
                    </div>
                    <div class="col s2">
                      <a class="edit-buttom" id="editButtom${indexClient}"><i class="material-icons">edit</i></i></a>
                    </div>
                  </div>
                </div>

                <div class="collapsible-body ">
                  <div class="row">
                    <div class="col s12">
                      <div class="row form-input">
                        <div class="input-field col s6">
                          <input disabled value="${arrayObject[indexClient].nit}" id="nit${indexClient}" type="text" class="validate">
                          <label class="active title-input">Nit</label>
                        </div>
                        <div class="input-field col s6">
                        <input disabled value="${arrayObject[indexClient].clientType}" id="type${indexClient}" type="text" class="validate">
                        <label class="active title-input">Type</label>
                        </div>
                      </div>
                      <div class="row form-input">
                        <div class="input-field col s6">
                          <input disabled value="${arrayObject[indexClient].size}" id="size${indexClient}" type="text" class="validate">
                          <label class="active title-input">Size</label>
                        </div>
                        <div class="input-field col s6">
                        <input disabled value="${arrayObject[indexClient].sector}" id="sector${indexClient}" type="text" class="validate">
                        <label class="active title-input">Sector</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col s12">
                      <button style="display:none;" class="testclient waves-effect waves-light btn" id="btnSave${indexClient}">Guardar</button>
                    </div>
                  </div>
                </div>
            </li>`;
    template += li;
  }
  ul.innerHTML = template;

  for (var i = 0; i < arrayObject.length; i++) {
    $(`#editButtom${i}`).click(function (event) {
      let num = event.delegateTarget.id;
      let res = num.substring(10, num.length);
      toggle(res);
    })
    $(`#btnSave${i}`).click(function (event) {
      let num = event.delegateTarget.id;
      let res = num.substring(7, num.length);
      editData(res, arrayObject);
    })
  }
}

/*function addSessionStorage(data) {
  if(!localStorage.data){
    localStorage.data = JSON.stringify(data);
  }
  let arrayObject = JSON.parse(localStorage);
  return arrayObject;
}*/

async function editData(num, arrayObject) {
  debugger;
  let objectEdit = new clientModel(
    arrayObject[num].id,
    arrayObject[num].name,
    document.getElementById(`nit${num}`).value,
    document.getElementById(`size${num}`).value,
    document.getElementById(`sector${num}`).value,
    parseInt(document.getElementById(`type${num}`).value)
  )

  var prueba = await dataService.save(objectEdit);
  //arrayObject[num] = objectEdit;
  //localStorage.data = JSON.stringify(data);
  disabledInput(num);
}

function toggle(num) {
  document.getElementById(`btnSave${num}`).style.display = "block";
  let id = {
    nit: "nit" + num,
    type: "type" + num,
    size: "size" + num,
    sector: "sector" + num
  }
  if (document.getElementById(id.nit).disabled) {

    document.getElementById(id.nit).disabled = false;
    document.getElementById(id.type).disabled = false;
    document.getElementById(id.size).disabled = false;
    document.getElementById(id.sector).disabled = false;
  } else {
    document.getElementById(`btnSave${num}`).style.display = "none";
    disabledInput(num);
  }
}



function disabledInput(num) {
  document.getElementById(`nit${num}`).disabled = true;
  document.getElementById(`type${num}`).disabled = true;
  document.getElementById(`size${num}`).disabled = true;
  document.getElementById(`sector${num}`).disabled = true;
}

