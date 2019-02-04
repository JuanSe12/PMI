import dataService from '../../services/data_service.js';
import config from "../../config/config.js";
import { validateTypeClientPerson, validateFieldsByMessage, validateFields,fillFieldsValidation } from './validation_client.js';
import { editClient, saveClient, domDeleteClient } from './crud.js';
import { refresh, toggleAndEditTitle, effectView } from './event.js';

var controller = {};

export default controller = {
  async fillClient() {
    let arrayObject = [];
    let arrayObjectTypeClient = [];
    try {
      arrayObject = await dataService.getAllClients();
      arrayObjectTypeClient = await dataService.getAllClientTypes();
    } catch (error) {
      console.log(error)
    }
    sessionStorage.arrayObjectTypeClient = JSON.stringify(arrayObjectTypeClient);
    this.renderClients(arrayObject);
  },

  renderClients(clients) {


    if (clients.length == 0) {
      M.toast({ html: 'No existe un Cliente con ese nombre' });
    }
    else {
      var ul = document.getElementById("client-list");
      let template = "";
      clients.forEach((client, indexClient) => {
        let li =
          `<li class="collection-item avatar">
                  <div class="collapsible-header modify-header grow">
                    <div class="row size-row">
                      <div class="col s10">
                        <div class="row">
                          <div class="col s4">
                            <img src="${config.baseUrl()}${client.img}"
                          alt="" class="img-size ">
                          </div>
                          <div class="col s7">                        
                            <p class="title-client">${client.name}</p>
                          </div>
                        </div>
                      </div>
                      <div class="col s2">
                        <a style="display:none;" class="edit-buttom" id="editButtom${indexClient}">
                          <i class="material-icons">edit</i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="collapsible-body ">
                    <div class="row">
                      <div class="col s12">
                        <div class="row form-input">
                          <div class="input-field col s6">
                            <input disabled value="${client.nit}" 
                              id="nit${indexClient}" type="number" class="validate" required>
                            <label class="active title-input">Nit</label>
                          </div>
                          <div class="input-field col s6">
                            <input value="${JSON.parse(sessionStorage.arrayObjectTypeClient)
          [client.clientType - 1].name}" 
                              id="type${indexClient}"  type="text" class="validate" disabled required>
                            <label class="active title-input">Tipo de cliente</label>
                          </div>
                        </div>
                        <div class="row form-input">
                          <div class="input-field col s6">
                            <input disabled value="${client.size}" 
                              id="size${indexClient}" type="number" class="validate" required>
                            <label class="active title-input">Tamaño de la empresa</label>
                          </div>
                          <div class="input-field col s6">
                            <input disabled value="${client.sector}" 
                              id="sectorView${indexClient}" type="text" class="validate" required>
                            <label class="active title-input">Sector</label>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col offset-s10 s2">
                            <a id="btn-client-delete-${client.id}" 
                            class="waves-effect waves-light btn red">
                              <i class="material-icons left">delete</i>
                              Eliminar
                            </a>                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </li>`;
        template += li;
      });

      ul.innerHTML = template;
      effectView();
      addEvent(clients);
      domDeleteClient(clients);
      validateTypeClientPerson();
      validateFieldsByMessage();
      fillFieldsValidation();
    }
  }
}

function addValAndOpenModal() {
  dataService.getAllClients().then(arrayObjectEdit => {
    let objectFilter = arrayObjectEdit[JSON.parse(sessionStorage.referenceId) - 1]
    sessionStorage.objectFilter = JSON.stringify(objectFilter);
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

function addEvent(arrayObject) {
  for (var i = 0; i < arrayObject.length; i++) {
    $(`#editButtom${i}`).click(function (event) {
      let num = event.delegateTarget.id;
      let res = num.substring(10, num.length);
      sessionStorage.referenceId = (parseInt(res) + 1);
      addValAndOpenModal();
    })
    addValSelectViewInformation(i, arrayObject);
  }
  $('#editModal').click(function (event) {
    editClient();
  })
  saveClient();
}

function addValSelectViewInformation(position, arrayObject) {
  for (var index = 0; index < arrayObject.length; index++) {
    $(`#sector${position}`).find("option[value=" + arrayObject[index].sector + "]")
      .prop("selected", true);
    $(`#sector${position}`).formSelect();
  }
  $('#modal-open').click(function (event) {
    refresh();
  })
}

