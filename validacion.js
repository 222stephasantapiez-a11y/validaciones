let usuario = document.getElementById("usuario");
let mensaje = document.getElementById("mensaje");
let password = document.getElementById("password");


usuario.addEventListener("input", function () {

    let valor = this.value;

    if (/[^a-zA-Z]/.test(valor)) {
        this.style.border = "2px solid red";
        mensaje.textContent = "El texto que esta tratando de agregar no es valido";
        mensaje.style.color = "red";
    } 
    else if (valor === "") {
        this.style.border = "2px solid red";
        mensaje.textContent = "Campo obligatorio";
        mensaje.style.color = "red";
    } 
    else {
        this.style.border = "2px solid green";
        mensaje.textContent = "Usuario válido";
        mensaje.style.color = "green";
    }

    this.value = valor.replace(/[^a-zA-Z]/g, '');
});

let mensajePassword = document.getElementById("mensajePassword");

password.addEventListener("input", function () {

    let valor = this.value;

    if (valor.length < 10) {
        this.style.border = "2px solid red";
        mensajePassword.textContent = "La contraseña debe tener mínimo 10 caracteres";
        mensajePassword.style.color = "red";
    } 
    else {
        this.style.border = "2px solid green";
        mensajePassword.textContent = "Contraseña válida";
        mensajePassword.style.color = "green";
    }

});

