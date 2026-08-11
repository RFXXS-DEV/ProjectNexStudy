const formularioLogin = document.getElementById("formulario-login");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const erroEmail = document.getElementById("erro-email");
const erroSenha = document.getElementById("erro-senha");
const olhoSenha = document.getElementById("olhoSenha");
const iconeOlhoSenha = document.getElementById("iconeOlhoSenha");
const recuperarSenha = document.getElementById("recuperar-senha");
const botaoEntrar = document.getElementById("botao-entrar");
const statusLogin = document.getElementById("status-login");

const iconeOlhoFechado = "/static/icons/IconeOlhoFechado(Light).png";
const iconeOlhoAberto = "/static/icons/IconeOlhoAberto(Light).png";
const classesCampoInvalido = ["border-red-500", "focus:border-red-500", "focus:ring-red-500/15"];

function mostrarErro(campo, elementoErro, mensagem) {
    elementoErro.textContent = mensagem;
    elementoErro.classList.remove("hidden");
    campo.setAttribute("aria-invalid", "true");
    campo.classList.add(...classesCampoInvalido);
}

function limparErro(campo, elementoErro) {
    elementoErro.textContent = "";
    elementoErro.classList.add("hidden");
    campo.removeAttribute("aria-invalid");
    campo.classList.remove(...classesCampoInvalido);
}

function validarEmail() {
    email.value = email.value.trim().toLowerCase();

    if (!email.value || !email.validity.valid) {
        mostrarErro(email, erroEmail, "Digite um e-mail válido.");
        return false;
    }

    limparErro(email, erroEmail);
    return true;
}

function validarSenha() {
    if (!senha.value.trim()) {
        mostrarErro(senha, erroSenha, "Digite sua senha.");
        return false;
    }

    limparErro(senha, erroSenha);
    return true;
}

olhoSenha.addEventListener("click", () => {
    const deveMostrar = senha.type === "password";

    senha.type = deveMostrar ? "text" : "password";
    iconeOlhoSenha.src = deveMostrar ? iconeOlhoAberto : iconeOlhoFechado;
    olhoSenha.setAttribute("aria-pressed", String(deveMostrar));
    olhoSenha.setAttribute("aria-label", deveMostrar ? "Ocultar senha" : "Mostrar senha");
});

const validacoes = new Map([
    [email, [validarEmail, erroEmail]],
    [senha, [validarSenha, erroSenha]]
]);

validacoes.forEach(([validar, elementoErro], campo) => {
    campo.addEventListener("blur", validar);
    campo.addEventListener("input", () => {
        statusLogin.classList.add("hidden");
        if (!elementoErro.classList.contains("hidden")) validar();
    });
});

recuperarSenha.addEventListener("click", (evento) => {
    evento.preventDefault();
    statusLogin.textContent = "A recuperação de senha será adicionada em uma próxima versão.";
    statusLogin.classList.remove("hidden");
});

formularioLogin.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const resultados = [validarEmail(), validarSenha()];
    const primeiroCampoInvalido = formularioLogin.querySelector('[aria-invalid="true"]');

    if (resultados.includes(false)) {
        primeiroCampoInvalido?.focus();
        return;
    }

    botaoEntrar.disabled = true;
    botaoEntrar.textContent = "Login pronto";
    statusLogin.textContent = "Dados válidos. O formulário está pronto para ser conectado ao backend.";
    statusLogin.classList.remove("hidden");

    window.setTimeout(() => {
        botaoEntrar.disabled = false;
        botaoEntrar.textContent = "Entrar";
    }, 1000);
});
