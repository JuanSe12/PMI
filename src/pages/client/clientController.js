'use strict';

import dataService from '../../services/data_service.js';
import crudService from '../../services/crudService.js';
import Config from "../../config/config.js";

export default async function fillClient() {
  let arrayObject = [];
  let arrayTypeClient = [];
  try {
    arrayObject = await dataService.getAllClients();
    arrayTypeClient = await dataService.getAllClientTypes();
  } catch (error) {
    console.log(error)
  }
  var ul = document.getElementById("client-list");
  let template = "";
  for (let indexClient = 0; indexClient < arrayObject.length; indexClient++) {
    let li =
      `<li class="collection-item avatar">
                <div class="collapsible-header modify-header">
                  <div class="row size-row">
                    <div class="col s10">
                      <div class="row">
                        <div class="col s4">
                        <img src="${Config.baseUrl() + arrayObject[indexClient].img}" alt="" class="img-size ">                        </div>
                        <div class="col s7">
                          <p class="title-client">${arrayObject[indexClient].name}</p>
                        </div>
                      </div>
                    </div>
                    <div class="col s2">
                      <a style="display:none;" class="edit-buttom" id="editButtom${indexClient}"><i class="material-icons">edit</i></a>
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
                          <input disabled value="${arrayTypeClient[arrayObject[indexClient].clientType-1].name}" id="type${indexClient}"  type="text" class="validate">
                          <label class="active title-input">Tipo de cliente</label>
                        </div>
                      </div>
                      <div class="row form-input">
                        <div class="input-field col s6">
                          <input disabled value="${arrayObject[indexClient].size}" id="size${indexClient}" type="text" class="validate">
                          <label class="active title-input">Tamaño de la empresa</label>
                        </div>
                        <div class="selectViewInformation input-field col s6">
                          <select disabled id="sector${indexClient}">
                            <option value="Publico" selected>Público</option>
                            <option value="Privado">Privado</option>
                          </select>
                          <label class="title-input">Sector</label>
                        </div>
                        <div class="selectEdit input-field col s6">
                          <select id="sectorEdit${indexClient}">
                            <option value="Publico">Público</option>
                            <option value="Privado">Privado</option>
                          </select>
                          <label class="title-input">Sector</label>
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
  effectView();
  addEvent(arrayObject);

}

function addEvent(arrayObject) {
  for (var i = 0; i < arrayObject.length; i++) {
    $(`#sector${i}`).val(arrayObject[i].sector);
    $(`#sectorEdit${i}`).val(arrayObject[i].sector);
    $(`#editButtom${i}`).click(function (event) {
      let num = event.delegateTarget.id;
      let res = num.substring(10, num.length);
      toggle(res);
    })
    $(`#btnSave${i}`).click(function (event) {
      let idBtnSave = event.delegateTarget.id;
      let position = idBtnSave.substring(7, idBtnSave.length);
      let num = 1;
      crudService(position, arrayObject, num).then(response => {
        if (response.message == "Se edito el dato con éxito") {
          disabledInput(position);
          alert(response.message);
        } else {
          alert(response.message);
        }
      });
    })
  }
}

function effectView() {
  $(document).ready(function () {
    $('select').formSelect();

    $(".collapsible").hover(function (i) {
      $(".edit-buttom").css("display", "block");
    }, function () {
      $(".edit-buttom").css("display", "none");
    });


  });
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
    $(".selectViewInformation").css("display", "none");
    $(".selectEdit").css("display", "block");
  } else {
    document.getElementById(`btnSave${num}`).style.display = "none";
    disabledInput(num);
  }
}

function disabledInput(num) {
  document.getElementById(`nit${num}`).disabled = true;
  document.getElementById(`type${num}`).disabled = true;
  document.getElementById(`size${num}`).disabled = true;
  document.getElementById(`btnSave${num}`).style.display = "none";
  $(".selectViewInformation").css("display", "block");
  $(".selectEdit").css("display", "none");
}