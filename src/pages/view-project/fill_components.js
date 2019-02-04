'use strict';

import Config from '../../config/config.js';
import {deleteIcon, deleteIconSofki} from './delete_icon.js'

function fillTecno(technologies) {
    let tecnoTemplate = "";
    for (let index = 0; index < technologies.length; index++) {
        let tecno =
            `<div class="chips-div" id="chip-tech${technologies[index].id}">
            <div class="content-elements">
            <a href=# id="icons-delete-view${technologies[index].id}"><i class="close material-icons icons-delete" >close</i></a>
            <img src="${Config.baseUrl() + technologies[index].icon}" alt="">
            </div>
            <p>${technologies[index].name}</p>
        </div>`;
        tecnoTemplate += tecno;
        deleteIcon(technologies[index].id, technologies);

    }
    return tecnoTemplate;
}

function fillSofkianos(sofkiano) {
    let sofkianoTemplate = "";
    for (let index = 0; index < sofkiano.length; index++) {
        let sofkianoList = `<div class="chips-div" id="chip-sofki${sofkiano[index].id}">
        <div class="content-elements">
        <a href=# id="icons-delete-view-sofki${sofkiano[index].id}"><i class="close material-icons icons-delete-sofki" >close</i></a>
        <img src="${Config.baseUrl() + sofkiano[index].img}" alt="">
        </div>
        <p>${sofkiano[index].firtsName}</p>
        </div>`;
        sofkianoTemplate += sofkianoList;

        deleteIconSofki(sofkiano[index].id, sofkiano);
    }
    return sofkianoTemplate;
}

export {
    fillSofkianos,
    fillTecno
}