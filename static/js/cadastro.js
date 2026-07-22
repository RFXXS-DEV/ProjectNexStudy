// Mostrar/esconder senha
const senha = document.getElementById("senha");
const olhoSenha = document.getElementById("olhoSenha");

if (olhoSenha) {
    olhoSenha.addEventListener("click", () => {

        if (senha.type === "password") {
            senha.type = "text";
            olhoSenha.src = "/static/icons/IconeOlhoAberto(Light).png";
        } else {
            senha.type = "password";
            olhoSenha.src = "/static/icons/IconeOlhoFechado(Light).png";
        }

    });
}


// Mostrar/esconder confirmar senha
const confirmarSenha = document.getElementById("confirmar_senha");
const olhoConfirmarSenha = document.getElementById("olhoConfirmarSenha");

if (olhoConfirmarSenha) {
    olhoConfirmarSenha.addEventListener("click", () => {

        if (confirmarSenha.type === "password") {
            confirmarSenha.type = "text";
            olhoConfirmarSenha.src = "/static/icons/IconeOlhoAberto(Light).png";
        } else {
            confirmarSenha.type = "password";
            olhoConfirmarSenha.src = "/static/icons/IconeOlhoFechado(Light).png";
        }

    });
}