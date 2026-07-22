const senha = document.getElementById("senha");
const olho = document.getElementById("olhoSenha");

olho.addEventListener("click", () => {

    if (senha.type === "password") {
        senha.type = "text";

        // troca o ícone para olho aberto
        olho.src = "/static/icons/IconeOlhoAberto(Light).png";

    } else {
        senha.type = "password";

        // volta para olho fechado
        olho.src = "/static/icons/IconeOlhoFechado(Light).png";
    }

});