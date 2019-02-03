const validateFieldsForMessage=()=>{    
 
    $("#firstname").blur(function () {
        if ($("#firstname").val() === "") {
           M.toast({ html: 'Ingrese los nombres del Sofkiano' });
        }
     });   
    $("#last_name").blur(function () {
        if ($("#last_name").val() === "") {
           M.toast({ html: 'Ingrese los apellidos' });
        }
     });
    
     $("#number_document").blur(function () {
        if ($("#number_document").val() === "") {
           M.toast({ html: 'Ingrese el documento de identidad' });
        }
     });

     $("#experience_time_sofka").blur(function () {
        if ($("#experience_time_sofka").val() === "") {
           M.toast({ html: 'Ingrese los meses de experiencia en Sofka' });
        }
     });

     $("#external_experience_time").blur(function () {
        if ($("#external_experience_time").val() === "") {
           M.toast({ html: 'Ingrese los meses de experiencia en empresas externas' });
        }
     });

}
 validateFieldsForMessage();
