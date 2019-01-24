import  DataService from "../../services/data_service.js";

DataService.getAllSofkianos()
.then(sofkianos =>{
    console.log(sofkianos);
    let template;
    var ul = document.getElementById("sofkianos-list");
    sofkianos.map(sofkiano=>{
        let li = 
        `<li class="collection-item avatar">
            <div class="collapsible-header"><img src="../../assets/images/person.png" alt="" class="resize circle fixing"><div class="responsiveText fixing marginText">${sofkiano.firtsName } ${sofkiano.lastName}</div></div>
            <div class="collapsible-body responsiveText">Showing</div>
        </li>`;
        template += li; 
    })
    ul.innerHTML=template;
})


