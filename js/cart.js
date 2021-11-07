let productosCarrito=[];

//Funcion que valida si es posible realizar una compra (todos los campos fueron completados)
function validatePurchase()
{
    let numTarjeta = document.getElementById("tipoTarjeta").value.length;
    let fechaVenc = document.getElementById("fechaVenc").value.length;
    let cvc = document.getElementById("cvc").value.length;
    let calle = document.getElementById("nombreCalle").value.length;
    let numero = document.getElementById("numeroCasa").value.length;
    let esquina = document.getElementById("nombreEsquina").value.length;

    if (numTarjeta > 0 && fechaVenc > 0 && cvc > 0 && calle > 0 && numero > 0 && esquina > 0)
        return true;
    else
    {
        alert("ERROR: Campos incompletos");
        return false;
    }

}



//Funcion que actualiza el subtotal cuando cambia la cantidad. precio (int), cantidad (int), subtotalId (id)
function updateProductoSubtotal(precio, cantidad, subtotalId, tipoMoneda){

    if (tipoMoneda == "USD")
    {
        document.getElementById(subtotalId).innerHTML = cantidad*precio * 43;
    }

    else
    {
        document.getElementById(subtotalId).innerHTML = cantidad*precio;
    }

    updatePrecioFinal();
    updateTotalPrice();
}

function showTotal()
{
    let htmlToAppend = "";
    htmlToAppend += `
    <tr>    
    <td></td>
    <td class="align-middle"></td>
    <td class="align-middle"></td>
    <td class="align-middle"></td>
    <td class="align-middle tabletext"><b>Total</b> <p id="total"> </p></td>
    </tr>`


    document.getElementById("carrito").innerHTML += htmlToAppend;
}


function showCarrito(){ //Muestra el carrito cargando elemento por elemento desde el JSON
    let htmlToAppend = "";
    let id = 0;
    let subtotalPrice; 
    
    for(let article of productosCarrito){ //Carga elemento por elemento

        if (article.currency == "USD")
            subtotalPrice = parseInt(article.unitCost) * parseInt(article.count) * 43; //Hace el calculo del subtotal inicial para usd
        else 
            subtotalPrice = parseInt(article.unitCost) * parseInt(article.count); //Hace el calculo del subtotal inicial para pesos
    
        document.getElementById("precioTotalSubtotal").innerHTML = subtotalPrice;

        htmlToAppend += `
        <tr>
        <td><img src="${article.src}" class = "img-fluid tabletext" style ="max-width:50px!important"></td>
        <td class="align-middle tabletext">${article.name}</td>
        <td class="align-middle tabletext">${article.currency} ${article.unitCost}</td>
        <td class="align-middle tabletext"><input type="number" style="width: 50px;" min ="1" onchange="updateProductoSubtotal(this.value, ${article.unitCost}, ${id}, '${article.currency}');" value=${article.count}></td>
        <td class="subt align-middle tabletext" id="${id}">${subtotalPrice}</td>
        </tr>`
        id++;              
                       
       
    }
    document.getElementById("carrito").innerHTML += htmlToAppend;

    updatePrecioFinal();
    showTotal(); //Muestra el total despues de haber cargado los productos
    updateTotalPrice(); //actualiza el precio total



}

function updatePrecioFinal() //Funcion que actualiza el precio final (al final de la pagina)
{
    const envios = document.querySelectorAll('input[name="shippingType"]'); //toma todos los radio de tipo shipping
            let selectedValue;
            for (const envio of envios) { 
                if (envio.checked) { //Se fija para cada tipo de envio si uno esta seleccionado y guarda su valor
                    selectedValue = envio.value;
                    break;
                }
            }

    document.getElementById("precioTotalEnvio").innerHTML = parseInt(document.getElementById("precioTotalSubtotal").innerHTML) * parseFloat(selectedValue); //calcula el añadido del tipo de envio
    document.getElementById("precioTotalTotal").innerHTML = parseInt(document.getElementById("precioTotalEnvio").innerHTML) + parseInt(document.getElementById("precioTotalSubtotal").innerHTML); //calcula el precio final

}



function getCarrito(url){
    
    return fetch(url)
    .then(respuesta=>{
        return respuesta.json();
    })
    
}

function updateTotalPrice()
{
    let sum = 0;
    let subtotals = document.getElementsByClassName("subt");

    for (let sub of subtotals)
    {
        sum += parseInt(sub.innerHTML);
    }

    document.getElementById("total").innerHTML = sum;
    document.getElementById("precioTotalSubtotal").innerHTML = sum;
}



document.addEventListener("DOMContentLoaded", function(e){ //Cuando se carga la pagina.. carga el JSON
    getCarrito("https://japdevdep.github.io/ecommerce-api/cart/654.json")
    .then(respuesta=>{
        productosCarrito = respuesta.articles; //Guarda los articulos del carrito en productosCarrito
        updatePrecioFinal();
        showCarrito(); 
    })
})

$('input[type=radio][name="shippingType"]').change(function() { //Si cambia el boton radio seleccionado
    updatePrecioFinal();
});


