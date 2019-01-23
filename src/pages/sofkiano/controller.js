'use strict';
class Data{

    constructor(){

    }

    fill(){
        
        let ul=document.getElementById("myList");    
        for(var i=0;i<10;i++){
            
            let [li,div1,div2,img,pan]=this.creatingElements();        
    
            li.setAttribute("class","collection-item avatar");
       
            img.setAttribute("class","circle");
            img.setAttribute("src", "../../public/images/yuna.JPG");
            img.setAttribute("alt","Not avaible")
    
            div1.setAttribute("class","collapsible-header");
            div2.setAttribute("class","collapsible-body");
           
       
            div1.appendChild(img);
            div1.appendChild(document.createTextNode("Hola"));
          
            pan.appendChild(document.createTextNode("Lorem ipsum dolor sit amet."));
            div2.appendChild(pan);
           
            li.appendChild(div1);
            li.appendChild(div2);
       
            ul.appendChild(li);
    
        }        
    }

    creatingElements(){
        let li=document.createElement("LI");
        let div1=document.createElement("DIV");
        let div2=document.createElement("DIV");
        let img=document.createElement("IMG");
        let pan=document.createElement("SPAN");
        return [li,div1,div2,img,pan];
    }


}

var data=new Data();

data.fill();
