(function () {
    $("#name").blur(function () {
  if ($("#name").val() === "") {
     M.toast({ html: 'Ingrese el nombre' });
  }
});

  $("#size").blur(function () {
     if ($("#size").val() === "") {
        M.toast({ html: 'Ingrese el tamaño de la empresa' });
     }
  });

  $("#nit").blur(function () {
     if ($("#nit").val() === "") {
        M.toast({ html: 'Ingrese el nit' });
     }
  });
   
 }());

