document.getElementById('search').style.display = 'none';
document.getElementById('close_search').style.display = 'none';
let open_search_button = document.getElementById('open_search');
open_search_button.addEventListener('click', function () {
    document.getElementById('open_search').style.display = 'none';
    document.getElementById('search').style.display = 'block';
    document.getElementById('close_search').style.display = 'block';
});

let close_search_button = document.getElementById('close_search');
close_search_button.addEventListener('click', function () {
    document.getElementById('close_search').style.display = 'none';
    document.getElementById('search').style.display = 'none';
    document.getElementById('open_search').style.display = 'block';
});

function take_url(url){
    if(url == 'localhost'){
        let element = document.getElementById('proyectos_titulo');
        element.style.cssText = 'margin-top: -4% !important; position: fixed;color:white;';
    }
    else if(url == 'project'){
        setTimeout(function(){
            let element = document.getElementById('proyectos_titulo');
            element.style.cssText = 'margin-top: -4% !important; position: fixed;color:white;';
        }, 100);
    }
    else if(url == 'client'){
        setTimeout(function(){
            let element = document.getElementById('clientes_titulo');
            element.style.cssText = 'margin-top: -4% !important; position: fixed;color:white;';
        }, 100);
    }
    else if(url == 'sofkiano'){
        setTimeout(function(){
            let element = document.getElementById('sofkianos_titulo');
            element.style.cssText = 'margin-top: -4% !important; position: fixed;color:white;';
        }, 100);
    }
}