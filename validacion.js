let usuario = document.getElementById("usuario");
let mensaje = document.getElementById("mensaje");
let password = document.getElementById("password");
let formulario = document.getElementById("formulario");
let contadorPassword = document.getElementById("contadorPassword");
let mensajeFormulario = document.getElementById("mensajeFormulario");
let intentosFallidos = 0;
let bloqueado = false;




usuario.addEventListener("input", function () {

    let valor = this.value;

    if (/[^a-zA-Z\-_.]/.test(valor)) {
        this.style.border = "2px solid red";
        mensaje.textContent = "El texto que esta tratando de agregar no es valido";
        mensaje.style.color = "red";
    } 
    else if (valor.length < 3) {
        this.style.border = "2px solid red";
        mensaje.textContent = "El usuario  debe tener mínimo 3 caracteres";
        mensaje.style.color = "red";
    } 
    else {
        this.style.border = "2px solid green";
        mensaje.textContent = "Usuario válido";
        mensaje.style.color = "green";
    }

    this.value = valor.replace(/[^a-zA-Z\-_.]/g, '');
});


let mensajePassword = document.getElementById("mensajePassword");

password.addEventListener("input", function (text) {

    let valor = this.value;

     contadorPassword.textContent = valor.length;

    if (!validarFortaleza(valor)) {
        this.style.border = "2px solid red";
        mensajePassword.textContent = "La contraseña no es segura. Debe tener mínimo 10 caracteres, mayúscula, minúscula, número y símbolo."
        mensajePassword.style.color = "red";
    } 
    else {
        this.style.border = "2px solid green";
        mensajePassword.textContent = "Contraseña es segura";
        mensajePassword.style.color = "green";
    }

}); 
 

formulario.addEventListener("submit", function (event) {

    event.preventDefault();

    if (bloqueado) return;

    let usuarioValor = usuario.value;
    let passwordValor = password.value;

    let usuarioValido = validarUsuarioFinal(usuarioValor);
    let passwordValida = validarFortaleza(passwordValor);

    if (usuarioValido && passwordValida) {

        mensajeFormulario.textContent = "Formulario enviado correctamente ✅";
        mensajeFormulario.style.color = "green";

        formulario.reset();
        contadorPassword.textContent = 0;

        intentosFallidos = 0;

    } else {

        intentosFallidos++;

        mensajeFormulario.textContent = "Datos incorrectos. Intento " + intentosFallidos + " de 3.";
        mensajeFormulario.style.color = "red";

        if (!usuarioValido) {
            mensaje.textContent = "Usuario inválido. Debe tener exactamente 3 letras.";
            mensaje.style.color = "red";
        }

        if (intentosFallidos >= 3) {
            bloquearFormulario();
        }
    }
});


function bloquearFormulario() {

    bloqueado = true;

    usuario.disabled = true;
    password.disabled = true;

    let segundos = 30;

    mensajeFormulario.style.color = "red";
    mensajeFormulario.textContent = "Formulario bloqueado. Intenta nuevamente en " + segundos + " segundos.";

    let cuentaRegresiva = setInterval(function () {

        segundos--;

        mensajeFormulario.textContent = "Formulario bloqueado. Intenta nuevamente en " + segundos + " segundos.";

        if (segundos <= 0) {

            clearInterval(cuentaRegresiva);

            usuario.disabled = false;
            password.disabled = false;

            bloqueado = false;
            intentosFallidos = 0;

            mensajeFormulario.textContent = "Puedes intentar nuevamente.";
            mensajeFormulario.style.color = "green";
        }

    }, 1000);
}




function validarFortaleza(password) {
    let tieneMayuscula = /[A-Z]/.test(password);
    let tieneMinuscula = /[a-z]/.test(password);
    let tieneNumero = /[0-9]/.test(password);
    let tieneEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    let tieneLongitud = password.length >= 10;

    return tieneMayuscula && 
           tieneMinuscula && 
           tieneNumero && 
           tieneEspecial && 
           tieneLongitud;
}

function validarUsuarioFinal(usuario) {

    let soloLetras = /^[a-zA-Z]+$/.test(usuario);
    let longitudExacta = usuario.length === 3;

    return soloLetras && longitudExacta;
}

