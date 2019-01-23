const path = './pages/menu/'

function initialRender(){
    let menu = document.getElementById('menu');
    menu.innerHTML=`<object type="text/html" data="${path}template.html" ></object>`;
};