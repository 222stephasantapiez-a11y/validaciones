let usuario = document.getElementById("usuario");

usuario.addEventListener("input", function(e){
this.value = this.value.replace(/[^a-zA-Z]/g, '');
this.border = "2px solid"
if(this.value == ""){
    this.style.borderColor = "red"
} else {
    this.style.borderColor = "green"
    this.nextElementSibling && (this.nextElementSibling.textContent = 'Nombre válido');
    this.nextElementSibling && (this.nextElementSibling.style.color = 'green');
}
});