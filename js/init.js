const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  loadUsername();
});


function loadUsername()
{
  var div = document.getElementsByName('menu-top');
  var nombreUsuario = localStorage.getItem('username');
  var nombreUsuarioTexto = nombreUsuario.slice(0, 10);

  if (nombreUsuario.length > 10)
  {
    div[0].innerHTML += `<div class="dropdown show">
    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      `+nombreUsuarioTexto+`...
    </a>
  
    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
      <a class="dropdown-item" href="cart.html">Ver mi carrito</a>
      <a class="dropdown-item" href="my-profile.html">Mi perfil</a>
      <a class="dropdown-item" href="index.html" onclick="localStorage.clear();">Cerrar sesión</a>
    </div>
  </div>`;
  }
  else
  {
    div[0].innerHTML += `<div class="dropdown show">
    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      `+nombreUsuarioTexto+`
    </a>
  
    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
      <a class="dropdown-item" href="cart.html">Ver mi carrito</a>
      <a class="dropdown-item" href="my-profile.html">Mi perfil</a>
      <a class="dropdown-item" href="index.html" onclick="localStorage.clear();">Cerrar sesión</a>
    </div>
  </div>`;

  }


}


/* Original code for username top right

  if (nombreUsuario.length > 10)
  {
    div[0].innerHTML += `<div onclick="location.href='my-profile.html';" style="cursor: pointer;" class="user-nav"><i class="bi bi-person"></i><a class="py-2 d-none d-md-inline-block" href="#">`+nombreUsuarioTexto+'...'+`</a></div>`;
  }
  else
  {
    div[0].innerHTML += `<div onclick="location.href='my-profile.html';" style="cursor: pointer;" class="user-nav"><i class="bi bi-person"></i><a class="py-2 d-none d-md-inline-block" href="#">`+nombreUsuarioTexto+`</a></div>`;
  }
  */