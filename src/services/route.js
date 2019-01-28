'use strict';
import Config from "../config/config.js"
import init from "../init.js"

const ID_CONTAINER = 'container';
const ID_MENU_CONTAINER = 'menu';

export default class Route{
    static routeTo(path){
        
        getElementAndRender(path);
    }

    static renderMenu(){
        getElementAndRender('menu',ID_MENU_CONTAINER);
    }
}

function getElementAndRender(path, idElement=ID_CONTAINER){
<<<<<<< HEAD
    let file = `${Config.baseUrl()}/src/pages/${path}/template.html`;
  
     $(`#${idElement}`).load(file);       
    
     
     
    
}



=======
    let file = `${Config.baseUrl()}/src/pages/${path}/template.html`
    $(`#${idElement}`).load(file);

    try {
        init[`init${path}`]();
    } catch (error) {
        console.log(error);
    }
    
}
>>>>>>> b508ed2bd7d791d5999f82b894588f948d71b467
