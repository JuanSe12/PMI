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
                <div class="grow collapsible-header  ">
                  <div class="row size-row">
                    <div class="col s10">
                      <div class="row">
                        <div class="col s4">
                          <img src="${Config.baseUrl() + arrayObject[indexClient].img}"
                        alt="" class="img-size ">
                        </div>
                        <div class="col s7">                        
                          <p class="title-client">${arrayObject[indexClient].name}</p>
                        </div>
                      </div>
                    </div>
                    <div class="col s2">
                      <a style="display:none;" href="#modal1" class="edit-buttom" id="editButtom${indexClient}"><i class="material-icons">edit</i></a>
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
                          <input disabled value="${arrayTypeClient[arrayObject[indexClient].clientType - 1].name}" id="type${indexClient}"  type="text" class="validate">
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
    $(`#editButtom${i}`).click(function (event) {
      let num = event.delegateTarget.id;
      let res = num.substring(10, num.length);
      sessionStorage.referenceId = (parseInt(res) + 1);
      addValAndOpenModal();
    })
  }
  $('#modal-open').click(function (event) {
    refresh();
  })
}

function addValAndOpenModal() {
  dataService.getAllClients().then(arrayObjectEdit => {
    let objectFilter = arrayObjectEdit[JSON.parse(sessionStorage.referenceId) - 1]
    $('#name').val(objectFilter.name);
    $('#typeClient').find("option[value=" + objectFilter.clientType + "]").prop("selected", true);
    $("#typeClient").formSelect();
    $('#sector').find("option[value=" + objectFilter.sector + "]").prop("selected", true);
    $("#sector").formSelect();
    $('#size').val(objectFilter.size);
    $('#nit').val(objectFilter.nit);
    toggleAndEditTitle();
    $('#modal1').modal('open');
  })
}

function toggleAndEditTitle() {
  $('#saveModal').hide();
  $('#editModal').show();
  $('#cardTitle').empty();
  $('#cardTitle').text('Editar un cliente');
}

function refresh(){
  $('#cardTitle').text('Registrar un cliente');
  $('#name').val("");
  $('#sector-holder').text('Sector');
  // $("#typeClient").formSelect();
  // $('#sector').find("option[value=" + objectFilter.sector + "]").prop("selected", true);
  // $("#sector").formSelect();
  $('#size').val("");
  $('#nit').val("");
  $('#saveModal').show();
  $('#editModal').hide();
}


function effectView() {
  $(document).ready(function () {
    $('select').formSelect();

    $(".collapsible").hover(function (i) {
      $(".edit-buttom").css("display", "block");
    }, function () {
      $(".edit-buttom").css("display", "none");
    });

    $('.edit-buttom').on("click", function (e) {
      e.stopPropagation();
    })
  });
}

