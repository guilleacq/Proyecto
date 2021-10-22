function verifyProfileInfo()
{
    let isCorrect = true;
    let informacion;

    let nombre = document.getElementById("nombrecompletouser").value;
    let edad = document.getElementById("edaduser").value;
    let email = document.getElementById("emailuser").value;
    let telefono = document.getElementById("telefonouser").value;

    
    if (isNaN(telefono) || telefono.length == 0) //Si el telefono no es un numero...
    {
        alert("ERROR: Telefono incorrecto");
        isCorrect = false;
    }

    if (email.length == 0) //Si el email no es correcto
    {
        alert("ERROR: Email incorrecto");
        isCorrect = false;
    }

    if (!isNaN(nombre) || nombre.length == 0)
    {
        alert("ERROR: Nombre incorrecto");
        isCorrect = false; 
    }


    if (isCorrect) //Update information and hide form
    {
        informacion = {
            infoNombre: nombre,
            infoEdad: edad,
            infoEmail: email, //Diccionario de datos del usuario (una vez aceptados)
            infoTelefono: telefono
        };

        localStorage.setItem("infouser", JSON.stringify(informacion)); //Convierte el diccionario de datos a JSON y lo guarda en "infouser"
/*        //EN VEZ DE HACER ESTO, GENERAR UN JSON Y GUARDAR EL JSON EN LOCALSTORAGE
        localStorage.setItem('nombrecompletou', nombre); 
        localStorage.setItem('edadu', edad); 
        localStorage.setItem('emailu', email); // Guarda en memoria los campos ingresados por el usuario
        localStorage.setItem('telefonou', telefono); 

        */
    }
}

function getUserinfo()
{
    var info = JSON.parse(localStorage.getItem("infouser")); //Tomar diccionario del localstorage
    if (info == null) // Si todavia no cargó su informacion... (JSON vacío)
    {
        document.getElementById("finaldatos").style = "display: none;";
    }
    else {
        document.getElementById("loaded-nombre").innerHTML = `<b>${info["infoNombre"]}</b>`;
        document.getElementById("loaded-edad").innerHTML = info["infoEdad"]+" años";
        document.getElementById("loaded-email").innerHTML = info["infoEmail"];
        document.getElementById("loaded-telefono").innerHTML = info["infoTelefono"];

        document.getElementById("usercuestionario").style = "display: none;";
        document.getElementById("titulodatos").style = "display: none;";
    }

}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getUserinfo();

});

