'use strict';
class Data {

    constructor() {

    }

    fill() {

        let ul = document.getElementById("myList");
        for (var i = 0; i < 10; i++) {

            let [li, div1, div2, img, span, divInfo, pName, pDocType, pDocNumber, pFeature, pTecno] = 
                this.creatingElements();

            li.setAttribute("class", "collection-item avatar");

            img.setAttribute("class", "circle ");
            img.setAttribute("src", "../../assets/images/person.png ");
            img.setAttribute("alt", "Not avaible");


            div1.setAttribute("class", "collapsible-header");
            div2.setAttribute("class", "collapsible-body");
            divInfo.setAttribute("class", "sofkiano-info");
            span.setAttribute("class","tittle");
            span.appendChild(document.createTextNode("Names"));

            div1.appendChild(img);
            div1.appendChild(span);
           // span.appendChild(document.createTextNode("Lorem ipsum dolor sit amet."));
            // div2.appendChild(span);
            div2.appendChild(divInfo);

            
           
            divInfo.appendChild(pDocType);
            pDocType.appendChild(document.createTextNode("Document type"));
            divInfo.appendChild(pDocNumber);
            pDocNumber.appendChild(document.createTextNode("Document number"));

            li.appendChild(div1);
            li.appendChild(div2);
            ul.appendChild(li);

        }
    }

    creatingElements() {
        let li = document.createElement("LI");
        let div1 = document.createElement("DIV");
        let div2 = document.createElement("DIV");
        let img = document.createElement("IMG");
        let span = document.createElement("SPAN");
        let divInfo = document.createElement("div");
        let pName = document.createElement("p");
        let pDocType = document.createElement("p");
        let pDocNumber = document.createElement("p");
        let pFeature = document.createElement("p");
        let pTecno = document.createElement("p");
        return [li, div1, div2, img, span, divInfo, pName, pDocType, pDocNumber, pFeature, pTecno];
    }


}

var data = new Data();

data.fill();
