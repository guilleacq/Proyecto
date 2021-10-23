let productosCarrito=[];




//Funcion que actualiza el subtotal cuando cambia la cantidad. precio (int), cantidad (int), subtotalId (id)
function updateProductoSubtotal(precio, cantidad, subtotalId, tipoMoneda){
    if (tipoMoneda == "USD")
        document.getElementById(subtotalId).innerHTML = cantidad*precio * 43;
    else
        document.getElementById(subtotalId).innerHTML = cantidad*precio;

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

    showTotal(); //Muestra el total despues de haber cargado los productos
    updateTotalPrice(); //actualiza el precio total


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
}

document.addEventListener("DOMContentLoaded", function(e){ //Cuando se carga la pagina.. carga el JSON
    getCarrito("https://japdevdep.github.io/ecommerce-api/cart/654.json")
    .then(respuesta=>{
        productosCarrito = respuesta.articles; //Guarda los articulos del carrito en productosCarrito
        showCarrito(); 
    })
})


