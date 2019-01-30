'use strict';

import dataService from './data_service.js';
import Client from "../model/client.js";
import Project from "../model/project.js";
import Sofkiano from "../model/sofkiano.js";

export default async function (arrayObject, defineModel) {
    let arrayValue = Object.values(arrayObject[num]);
    let objectEdit = '';
    switch (defineModel) {
        case 1:
            objectEdit = new Client(
                arrayValue[0],
                arrayValue[1],
                arrayValue[2],
                arrayValue[3],
                arrayValue[4],
                arrayValue[5],
                arrayValue[6]
            )
            break;
        case 2:
            objectEdit = new Sofkiano(
                arrayValue[0],
                arrayValue[1],
                arrayValue[2],
                arrayValue[3],
                arrayValue[4],
                arrayValue[5],
                arrayValue[6],
                arrayValue[7],
                arrayValue[8],
            )
            break;
        case 3:
            objectEdit = new Project(
                arrayValue[0],
                arrayValue[1],
                arrayValue[2],
                arrayValue[3],
                arrayValue[4],
                arrayValue[5],
                arrayValue[6],
                arrayValue[7],
                arrayValue[8],
            )
            break;
        default:
            break;
    }
    let response = await dataService.save(objectEdit)
    if (typeof (response.id) != undefined) {
        return { message: 'Se edito el dato con éxito' };
    } else {
        return { message: 'Fallo al editarse el dato' };
    }
}
