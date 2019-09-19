
/*
1. Función que muestra y esconde la sección para hacer comentarios 
   al hacer click el botón 'Escribe una reseña'. 
   on click!
   (5 puntos)
*/
function ShowIt(){
   var obj = document.getElementById("seccion_comentario");
   if(obj.style.display == "block")
      obj.style.display = "none";
   else
      obj.style.display = "block";
};





/*
2. Cargar los comentarios de el archivo comentarios.xml o bien de 
  https://tc2026daw.github.io/instrucciones/misc/comentarios.xml 
  (función ajax, 25 puntos)
*/
$(document).ready(function () {

  loadDoc()

  var obj = document.getElementById("error_comment");
  obj.style.display = "none";
  
})

function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this);
    }
  };
  xhttp.open("GET", "https://tc2026daw.github.io/instrucciones/misc/comentarios.xml ", true);
  xhttp.send();
}

function myFunction(xml) {
  var i;
  var xmlDoc = xml.responseXML;
  var list = $("#seccion_reviews").append('<div></div>');
  var x = xmlDoc.getElementsByTagName("comment");


  $.each(x, function (i, item) {

      list.append("<br>")
      list.append("<h1>" + x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue + "</h1>");
      list.append("<div class=\"stars\">");
      
      var n;

      var estrellas = x[i].getElementsByTagName("stars")[0].childNodes[0].nodeValue
      for (n = 0; n < estrellas; n++) {
        list.append("<span class=\"fa fa-star checked\"></span>");
      } 
      
      var j;
      for (j = 0; j < 5 - estrellas; j++) {
        list.append("<span class=\"fa fa-star\"></span>");

      }
      list.append("<br>")
      list.append("<span>" + x[i].getElementsByTagName("text")[0].childNodes[0].nodeValue + "</span>")
      list.append("</div>") 


  })

}

/*
3. Funcion que apendiza el nuevo comentario al darle click a PUBLICAR
  on click!
  (función, 35 puntos)
*/

NuevoComentario = function() {
  var validate = true;
  var nombre = document.getElementById("nombre").value; //Obtenemos Texto
  var email = document.getElementById("email").value; //Obtenemos Texto
  var comentario = $('#comentario').text(); //Obtenemos Texto
  if(nombre == "" || email == "" || comentario == ""){
    validate = false;
  }

  if(validate) {

    var list = $("#seccion_reviews").append('<div></div>');

    list.append("<br>")
      list.append("<h1>" + nombre + "</h1>");
      list.append("<div class=\"stars\">");
      
      var n;

      var estrellas = $('input[name=rating]:checked').val(); 
      for (n = 0; n < estrellas; n++) {
        list.append("<span class=\"fa fa-star checked\"></span>");
      } 
      
      var j;
      for (j = 0; j < 5 - estrellas; j++) {
        list.append("<span class=\"fa fa-star\"></span>");

      }

      list.append("<br>")
      list.append("<span>" + comentario + "</span>")
      list.append("</div>") 
  document.getElementById("nombre").value = ""; //Elimina tarea seleccionada
  document.getElementById("email").value = ""; //Elimina tarea seleccionada
  var obj = document.getElementById("error_comment");
    obj.style.display = "none";
  $("#comentario").empty();
	} else {
    alert("LLene todos los camps antes de continuar");
    var obj = document.getElementById("error_comment");
    obj.style.display = "block";
	}
  
}

/*
4. Funcion que limpia el nombre, el email y el div "#comentarios" al darle
   click en "btn-limpiar" con leyenda de "CANCELAR"
   on click!
  (5 puntos)

  
*/
Borrar = function() {
  document.getElementById("nombre").value = ""; //Elimina tarea seleccionada
  document.getElementById("email").value = ""; //Elimina tarea seleccionada
  $("#comentario").empty();
}


/*
Funcion que recibe un numero de stars y regresa los 5 spans 
que simbolizan las estrellas del rating. por ejemplo:
let stars = 3;
let html = getStarsSpans(stars);

html = '
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>
'
*/
function getStarsSpans(stars) {
  let new_html = '';
  for( let i = 0; i < stars; i++) {
    new_html += `
      <span class="fa fa-star checked"></span>
    `;
  }

  for ( let i = 0; i < 5 - stars; i++ ) {
    new_html += `
      <span class="fa fa-star"></span>
    `;
  }

  return new_html;
}
