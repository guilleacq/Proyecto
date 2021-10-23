const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
const checkbox = document.getElementById("chk"); //dark theme checkbox
var darkMode = localStorage.getItem("modoOscuro");

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
  if (localStorage.getItem("modoOscuro") == 'enabled')
  {
    document.body.classList.add("dark");
  }
  else
  {
    document.body.classList.remove("dark");
  }



});

function isEmail(emailAddr)
{
    var emailsArray = emailAddr.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
    return (emailsArray != null && emailsArray.length);
}

function loadUsername()
{
  var nav = document.getElementsByClassName('elementsnav');
  var nombreUsuario = localStorage.getItem('username');
  var nombreUsuarioTexto = nombreUsuario.slice(0, 10);

  if (nombreUsuario.length > 10)
  {
    nav[0].innerHTML += `<li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    `+nombreUsuarioTexto+"..."+`
    </a>
    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
    <a class="dropdown-item" href="my-profile.html"><i class="bi bi-person" style="padding-right: 5px"></i>Mi perfil</a>
    <a class="dropdown-item" href="cart.html"><i class="bi bi-cart" style="padding-right: 5px";></i> Ver mi carrito</a>
    <a class="dropdown-item" href="index.html" onclick="localStorage.clear();"><i class="bi bi-door-open" style="padding-right: 5px"></i> </i>Cerrar sesión</a>
    </div>
    </li>`;

  }
  else
  {
  nav[0].innerHTML += `<li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    `+nombreUsuarioTexto+`
    </a>
    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
    <a class="dropdown-item" href="my-profile.html"><i class="bi bi-person" style="padding-right: 5px"></i>Mi perfil</a>
    <a class="dropdown-item" href="cart.html"><i class="bi bi-cart" style="padding-right: 5px";></i> Ver mi carrito</a>
    <a class="dropdown-item" href="index.html" onclick="localStorage.clear();"><i class="bi bi-door-open" style="padding-right: 5px"></i> </i>Cerrar sesión</a>
    </div>
    </li>`;
    
        /*OLD CODE
    
    nav[0].innerHTML += `<div class="dropdown show">
    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      `+nombreUsuarioTexto+`
    </a>
  
    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
      <a class="dropdown-item" href="cart.html"><i class="bi bi-cart" style="padding-right: 5px";></i> Ver mi carrito</a>
      <a class="dropdown-item" href="my-profile.html"><i class="bi bi-person" style="padding-right: 5px"></i>Mi perfil</a>
      <a class="dropdown-item" href="index.html" onclick="localStorage.clear();"><i class="bi bi-door-open" style="padding-right: 5px"></i> </i>Cerrar sesión</a>
    </div>
  </div>`;*/
  }


  checkbox.addEventListener('change', () => 
  { //Change website theme
    if (darkMode)
    {
      document.body.classList.remove("dark");
      darkMode = null;
    }
    else
    {
      document.body.classList.add("dark");
      darkMode = 'enabled';
    }

    localStorage.setItem("modoOscuro", darkMode);

  }); 


}