const formularioCadastro = document.getElementById("formulario-cadastro");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const confirmarSenha = document.getElementById("confirmar_senha");

const erroNome = document.getElementById("erro-nome");
const erroEmail = document.getElementById("erro-email");
const erroSenha = document.getElementById("erro-senha");
const erroConfirmarSenha = document.getElementById("erro-confirmar-senha");

const olhoSenha = document.getElementById("olhoSenha");
const iconeOlhoSenha = document.getElementById("iconeOlhoSenha");
const olhoConfirmarSenha = document.getElementById("olhoConfirmarSenha");
const iconeOlhoConfirmarSenha = document.getElementById("iconeOlhoConfirmarSenha");
const botaoCadastrar = document.getElementById("botao-cadastrar");
const statusCadastro = document.getElementById("status-cadastro");

const iconeOlhoFechado = "/static/icons/IconeOlhoFechado(Light).png";
const iconeOlhoAberto = "/static/icons/IconeOlhoAberto(Light).png";
const classesCampoInvalido = ["border-red-500", "focus:border-red-500", "focus:ring-red-500/15"];

function configurarVisibilidadeSenha(campo, botao, icone, descricao) {
    botao.addEventListener("click", () => {
        const deveMostrar = campo.type === "password";
        campo.type = deveMostrar ? "text" : "password";
        icone.src = deveMostrar ? iconeOlhoAberto : iconeOlhoFechado;
        botao.setAttribute("aria-pressed", String(deveMostrar));
        botao.setAttribute("aria-label", `${deveMostrar ? "Ocultar" : "Mostrar"} ${descricao}`);
    });
}

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

function validarNome() {
    nome.value = nome.value.trim().replace(/\s+/g, " ");

    if (nome.value.length < 2 || !/[A-Za-zÀ-ÿ]/.test(nome.value)) {
        mostrarErro(nome, erroNome, "Digite um nome válido com pelo menos 2 caracteres.");
        return false;
    }

    limparErro(nome, erroNome);
    return true;
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
    const temTamanhoMinimo = senha.value.length >= 8;
    const temLetra = /[A-Za-zÀ-ÿ]/.test(senha.value);
    const temNumero = /\d/.test(senha.value);

    if (!temTamanhoMinimo || !temLetra || !temNumero) {
        mostrarErro(senha, erroSenha, "A senha deve ter pelo menos 8 caracteres, uma letra e um número.");
        return false;
    }

    limparErro(senha, erroSenha);
    return true;
}

function validarConfirmacaoSenha() {
    if (senha.value !== confirmarSenha.value) {
        mostrarErro(confirmarSenha, erroConfirmarSenha, "As senhas não são iguais.");
        return false;
    }

    limparErro(confirmarSenha, erroConfirmarSenha);
    return true;
}

configurarVisibilidadeSenha(senha, olhoSenha, iconeOlhoSenha, "senha");
configurarVisibilidadeSenha(confirmarSenha, olhoConfirmarSenha, iconeOlhoConfirmarSenha, "confirmação de senha");

const validacoes = new Map([
    [nome, [validarNome, erroNome]],
    [email, [validarEmail, erroEmail]],
    [senha, [validarSenha, erroSenha]],
    [confirmarSenha, [validarConfirmacaoSenha, erroConfirmarSenha]]
]);

validacoes.forEach(([validar, elementoErro], campo) => {
    campo.addEventListener("blur", validar);
    campo.addEventListener("input", () => {
        statusCadastro.classList.add("hidden");
        if (!elementoErro.classList.contains("hidden")) validar();
    });
});

formularioCadastro.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const resultados = [validarNome(), validarEmail(), validarSenha(), validarConfirmacaoSenha()];
    const primeiroCampoInvalido = formularioCadastro.querySelector('[aria-invalid="true"]');

    if (resultados.includes(false)) {
        primeiroCampoInvalido?.focus();
        return;
    }

    botaoCadastrar.disabled = true;
    botaoCadastrar.textContent = "Cadastro pronto";
    statusCadastro.textContent = "Dados válidos. O formulário está pronto para ser conectado ao backend.";
    statusCadastro.classList.remove("hidden");

    window.setTimeout(() => {
        botaoCadastrar.disabled = false;
        botaoCadastrar.textContent = "Criar conta";
    }, 1000);
});
