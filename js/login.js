//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});



function verifyPassword() {  
    var username = document.getElementById("uname").value;
    var pw = document.getElementById("pswd").value;  
    //check empty password field  
    if(pw == "") {  
       document.getElementById("message").innerHTML = "[!] Ingrese la contraseña";  
       return false;  
    }  
     
   //minimum password length validation  
    if(pw.length < 8) {  
       document.getElementById("message").innerHTML = "[!] La contraseña no puede tener menos de 8 digitos";  
       return false;  
    }  
    
  //maximum length of password validation  
    if(pw.length > 24) {  
       document.getElementById("message").innerHTML = "[!] La contraseña no puede exceder 24 digitos";  
       return false;  
    }

    /*if (!((username == "gacquistapace" && pw == "guillermo1234") ||
    (username == "admin" && pw == "administrador") ||
    (username == "jap2021" && pw == "programar2021")))
    {
        document.getElementById("message").innerHTML = "[!] Usuario o contraseña incorrecta";
        return false;
    }

    */
}  