'use strict';

import dataService from '../../services/data_service.js';

class Data {

  constructor() {
    this.fill();
  }

  fill() {
    dataService.getAllClients().then(data => {
      var ul = document.getElementById("client-list");
      let template = "";
      this.addSessionStorage(data);
      for (let indexClient = 0; indexClient < data.length; indexClient++) {
        let li =
          `<li class="collection-item avatar">
                <div class="collapsible-header modify-header"><div class="row size-row">
                  <div class="col s10">
                  <div class="row">
                    <div class="col s5">
                      <img src="./src/assets/images/person.png" 
                    alt="" class="img-size circle">
                    </div>
                    <div class="col s7">
                      <p class="title-client">${data[indexClient].name}</p>
                    </div>
                  </div>
                  </div>
                  <div class="col s2">
                    <a class="edit-buttom" id="editButtom${indexClient}"><i class="fas fa-edit"></i></a>
                  </div>
                </div>
                </div>
               
                <div class="collapsible-body ">               
                  <div class="row">
                    <div class="col s12">
                      <div class="row form-input">
                        <div class="input-field col s6">
                          <input disabled value="${data[indexClient].nit}" id="nit${indexClient}" type="text" class="validate">
                          <label class="active title-input">Nit</label>
                        </div>
                        <div class="input-field col s6">
                        <input disabled value="${data[indexClient].clientType}" id="type${indexClient}" type="text" class="validate">
                        <label class="active title-input">Type</label>
                        </div>      
                      </div>           
                      <div class="row form-input">
                        <div class="input-field col s6">
                          <input disabled value="${data[indexClient].size}" id="size${indexClient}" type="text" class="validate">
                          <label class="active title-input">Size</label>
                        </div>
                        <div class="input-field col s6">
                        <input disabled value="${data[indexClient].sector}" id="sector${indexClient}" type="text" class="validate">
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
      this.eventOnClick();
    });
  }

  addSessionStorage(data) {
    sessionStorage.data = JSON.stringify(data);
    var data3 = JSON.parse(sessionStorage.data);
    console.log(data3);
  }

  eventOnClick() {
    document.getElementById("editButtom").addEventListener('click', function () {
      document.getElementById('nit').disabled = false;
      document.getElementById('type').disabled = false;
      document.getElementById('size').disabled = false;
      document.getElementById('sector').disabled = false;
    });
  }

}
new Data();


