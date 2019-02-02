'use strict';

import dataService from '../../services/data_service.js';
import crudService from '../../services/crudService.js';
import {
    validateTypeClientPerson,
    validateFieldsByMessage,
    validateFields
} from './validationClient.js';
import Client from '../../model/client.js';
import Route from "../../services/route.js";

function editClient(event) {
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
            setTimeout(function () {
                let element = document.getElementById('clientes_titulo');
                element.style.cssText = 'margin-top: -4% !important; position: fixed;color:white;';
            }, 100);
        } else {
            M.toast({ html: `${data.message}` });
            Route.routeTo('client');
            setTimeout(function () {
                let element = document.getElementById('clientes_titulo');
                element.style.cssText = 'margin-top: -4% !important; position: fixed;color:white;';
            }, 100);
        }
    });
}

function saveClient() {
    $('#saveModal').click(function (event) {

        if (validateFields()) {
            M.toast({ html: 'El registro no pudo ser ingresado, Faltan datos' });
        }
        else {
            let client = new Client(
                0,
                $('#name').val(),
                parseInt($('#nit').val()),
                parseInt($('#size').val()),
                $("#sector").val(),
                parseInt($("#typeClient").val()),
                "/src/assets/images/clients/default-client.jpg"
            );
            dataService.save(client).then(client => {
                Route.routeTo('client');
                setTimeout(function () {
                    let element = document.getElementById('clientes_titulo');
                    element.style.cssText = 'margin-top: -4% !important; position: fixed;color:white;';
                }, 100);
            }, error => {
                console.log(error);
            });

        }
    });
}

function domDeleteClient(clients) {
    let btns = [];
    clients.forEach(client => {
        let btn = document.getElementById(`btn-client-delete-${client.id}`);
        btn.addEventListener('click', function (event) {
            dataService.delete(client).then(
                clientDelete => {
                    M.toast(
                        {
                            html: `Se eliminó con exito ${clientDelete.name}!`,
                            outDuration: 300
                        })
                    Route.routeTo('client');
                }
            )
                .catch(error => alert('is no delete', error))
        })
        btns.push(btn);
    });
}

export {
    editClient,
    saveClient,
    domDeleteClient
}