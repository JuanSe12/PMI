'use strict';

import dataService from './data_service.js';
import Client from "../model/client.js";
import Project from "../model/project.js";
import Sofkiano from "../model/sofkiano.js";

export default async function (arrayObject, defineModel) {
    let objectEdit = '';
    switch (defineModel) {
        case 1:
            objectEdit = new Client(
                arrayObject.id,
                arrayObject.name,
                arrayObject.nit,
                arrayObject.size,
                arrayObject.sector,
                arrayObject.typeClient,
                arrayObject.img
            )
            break;
        case 2:
            objectEdit = new Sofkiano(
                arrayObject.id,
                arrayObject.firtsName,
                arrayObject.lastName,
                arrayObject.img,
                arrayObject.documentType,
                arrayObject.documentNumber,
                arrayObject.externalExperience,
                arrayObject.internalExperience,
                arrayObject.feactures,
                arrayObject.technologies
            )
            break;
        case 3:
            objectEdit = new Project(
                arrayObject.id,
                arrayObject.name,
                arrayObject.description,
                arrayObject.state,
                arrayObject.client,
                arrayObject.dateInit,
                arrayObject.dateFinish,
                arrayObject.technologies,
                arrayObject.sofkianos
            )
            break;
        default:
            break;
    }
    let response = await dataService.save(objectEdit)
    if (typeof (response.id) != undefined) {

        return { message: 'Se edito el dato con éxito', switch: 1 };
    } else {
        return { message: 'Fallo al editarse el dato', switch: 2 };
    }
}
