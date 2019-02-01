import dataService from '../../services/data_service.js';
import crudService from '../../services/crudService.js';
import Config from "../../config/config.js";
import Route from "../../services/route.js";
import Client from '../../model/client.js';

let controller;

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


  renderClients(arrayObject) {
    var ul = document.getElementById("client-list");
    let template = "";
    for (let indexClient = 0; indexClient < arrayObject.length; indexClient++) {
      let li =
        `<li class="collection-item avatar">
                  <div class="collapsible-header modify-header grow">
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
                        <a style="display:none;" class="edit-buttom" id="editButtom${indexClient}"><i class="material-icons">edit</i></a>
                      </div>
                    </div>
                  </div>
                  <div class="collapsible-body ">
                    <div class="row">
                      <div class="col s12">
                        <div class="row form-input">
                          <div class="input-field col s6">
                            <input disabled value="${arrayObject[indexClient].nit}" 
                              id="nit${indexClient}" type="number" class="validate" required>
                            <label class="active title-input">Nit</label>
                          </div>
                          <div class="input-field col s6">
                            <input value="${JSON.parse(sessionStorage.arrayObjectTypeClient)[arrayObject[indexClient].clientType - 1].name}" 
                              id="type${indexClient}"  type="text" class="validate" disabled required>
                            <label class="active title-input">Tipo de cliente</label>
                          </div>
                        </div>
                        <div class="row form-input">
                          <div class="input-field col s6">
                            <input disabled value="${arrayObject[indexClient].size}" 
                              id="size${indexClient}" type="number" class="validate" required>
                            <label class="active title-input">Tamaño de la empresa</label>
                          </div>
                          <div class="input-field col s6">
                            <input disabled value="${arrayObject[indexClient].sector}" 
                              id="sectorView${indexClient}" type="text" class="validate" required>
                            <label class="active title-input">Sector</label>
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
}

let editClient = function (event) {
  let objectEdit = {
    id: JSON.parse(sessionStorage.objectFilter).id,
    name: $('#name').val(),
    nit: $('#nit').val(),
    size: $('#size').val(),
    sector: $("#sector").val(),
    typeClient: $("#typeClient").val(),
    img: JSON.parse(sessionStorage.objectFilter).img
  }
  crudService(objectEdit, 1).then(data => {
    if (data.switch == 1) {
      M.toast({ html: `${data.message}` });
      Route.routeTo('client');
    } else {
      M.toast({ html: `${data.message}` });
      Route.routeTo('client');
    }
  });
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
  
    validateTypeClient();
    saveClient();
}

function validateTypeClient(){
  $('#typeClientDiv').click(function (event) {
    alert('asd');
  });
}

function saveClient(array){
  $('#saveModal').click(function (event) {
    if(validateFields()){
      alert("Llenar campos Vacios");
      refresh();
    }
    else{
    let client = new Client(
      0,
      $('#name').val(),
      parseInt($('#nit').val()),
      parseInt($('#size').val()),
      $("#sector").val(),
      parseInt($("#typeClient").val()),
      "/src/assets/images/clients/default-client.jpg"
    );
    dataService.save(client).then( client =>{
       Route.routeTo('client');
       console.log(client);
    },error => {
      console.log(error);
    })
  
  }
}
)};

function validateFields(){
  return $('#name').val()==="" || $('#nit').val()=== "" || $('#size').val()==="" || $("#sector").val()==="" || $("#typeClient").val()==="" ? true:false;
}

function addValSelectViewInformation(position, arrayObject) {
  for (var index = 0; index < arrayObject.length; index++) {
    $(`#sector${position}`).find("option[value=" + arrayObject[index].sector + "]").prop("selected", true);
    $(`#sector${position}`).formSelect();
  }
  $('#modal-open').click(function (event) {
    refresh();
  })
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

function toggleAndEditTitle() {
  $('#saveModal').hide();
  $('#editModal').show();
  $('#cardTitle').empty();
  $('#cardTitle').text('Editar un cliente');
}

function refresh() {
  $('#cardTitle').text('Registrar un cliente');
  $('#name').val("");
  $('#sector-holder').text('Sector');
  $("#typeClient").formSelect();
  $('#typeClient').find("option[value=" + 0 + "]").prop("selected", true);
  $("#typeClient").formSelect();
  $('#sector').find("option[value=" + 0 + "]").prop("selected", true);
  $("#sector").formSelect();
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

