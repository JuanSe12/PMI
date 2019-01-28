import DataService from "../../services/data_service.js";
import init from "../../init.js";

Object.setPrototypeOf(init, {
    "inittest": function() {
        /*
        aqui va toda la logica para renderizar el html
         */
        hola();
    }
});

function hola(){
    console.log('holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
}
