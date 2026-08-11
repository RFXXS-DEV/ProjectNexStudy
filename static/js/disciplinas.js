const listaDisciplinas = document.getElementById("lista-disciplinas");
const botaoNovaDisciplina = document.getElementById("botao-nova-disciplina");
const modalNovaDisciplina = document.getElementById("modal-nova-disciplina");
const formularioNovaDisciplina = document.getElementById("formulario-nova-disciplina");
const botaoFecharModal = document.getElementById("botao-fechar-modal");
const botaoCancelarDisciplina = document.getElementById("botao-cancelar-disciplina");
const campoNomeDisciplina = document.getElementById("nome-disciplina");
const erroNomeDisciplina = document.getElementById("erro-nome-disciplina");
const chaveDisciplinas = "nexstudy-disciplinas";
const chaveDisciplinasExcluidas = "nexstudy-disciplinas-excluidas";

const classesCores = {
    azul: "bg-blue-500",
    verde: "bg-green-500",
    roxo: "bg-purple-500",
    amarelo: "bg-yellow-400",
    vermelho: "bg-red-500",
    laranja: "bg-orange-500",
    marrom: "bg-amber-800"
};

function obterCartoesDisciplinas() {
    return document.querySelectorAll("[data-cartao-disciplina]");
}

function atualizarCartaoDisciplina(cartao, deveAbrir) {
    const botaoDetalhes = cartao.querySelector(".botao-detalhes");
    const idDetalhes = botaoDetalhes?.getAttribute("aria-controls");
    const detalhesDisciplina = idDetalhes ? document.getElementById(idDetalhes) : null;

    if (!botaoDetalhes || !detalhesDisciplina) return;

    detalhesDisciplina.classList.toggle("hidden", !deveAbrir);
    botaoDetalhes.setAttribute("aria-expanded", String(deveAbrir));
    botaoDetalhes.textContent = deveAbrir ? "Ocultar detalhes" : "Ver detalhes";

    cartao.classList.toggle("border-2", deveAbrir);
    cartao.classList.toggle("border-[#288352]", deveAbrir);
    cartao.classList.toggle("shadow-md", deveAbrir);
    cartao.classList.toggle("border", !deveAbrir);
    cartao.classList.toggle("border-gray-200", !deveAbrir);
    cartao.classList.toggle("dark:border-[#242529]", !deveAbrir);
}

function fecharTodosDetalhes() {
    obterCartoesDisciplinas().forEach((cartao) => atualizarCartaoDisciplina(cartao, false));
}

function escaparHtml(texto) {
    const elemento = document.createElement("span");
    elemento.textContent = texto;
    return elemento.innerHTML;
}

function criarIdentificadorDisciplina(nome) {
    const nomeNormalizado = nome
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    return `${nomeNormalizado || "disciplina"}-${Date.now()}`;
}

function criarCartaoDisciplina(disciplina) {
    const cartao = document.createElement("article");
    const nomeSeguro = escaparHtml(disciplina.nome);
    const classeCor = classesCores[disciplina.cor] || classesCores.azul;

    cartao.dataset.cartaoDisciplina = "";
    cartao.dataset.disciplinaCriada = disciplina.id;
    cartao.className = "rounded-2xl border border-gray-200 bg-gray-50 shadow-sm transition hover:bg-white hover:shadow-md dark:border-[#242529] dark:bg-[#0d0d0f] dark:hover:bg-[#1a1a1d]";
    cartao.innerHTML = `
        <div class="h-3 rounded-t-2xl ${classeCor}"></div>
        <div class="p-5">
            <div class="flex items-center justify-between gap-4">
                <div class="min-w-0">
                    <h2 class="truncate text-2xl font-bold text-gray-800 dark:text-[#f2f3f5]">${nomeSeguro}</h2>
                    <p class="mt-1 text-gray-500 dark:text-[#b5bac1]">Disciplina adicionada recentemente.</p>
                </div>
                <div class="flex shrink-0 items-center gap-2">
                    <button type="button" class="botao-detalhes font-semibold text-[#288352] hover:underline"
                        aria-expanded="false" aria-controls="detalhes-${disciplina.id}">Ver detalhes</button>
                    <button type="button" class="botao-excluir-disciplina rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30"
                        aria-label="Excluir ${nomeSeguro}" title="Excluir disciplina">
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-9 0h12" />
                        </svg>
                    </button>
                </div>
            </div>
            <div id="detalhes-${disciplina.id}" class="detalhes-disciplina hidden pt-4">
                <div class="mb-4 grid grid-cols-4 gap-3">
                    ${[1, 2, 3, 4].map((numero) => `
                        <div>
                            <label for="${disciplina.id}-nota-${numero}" class="text-sm text-gray-500 dark:text-[#b5bac1]">Nota ${numero}</label>
                            <input id="${disciplina.id}-nota-${numero}" type="text" inputmode="decimal" placeholder="-"
                                class="mt-2 h-11 w-full rounded-xl border border-gray-300 text-center font-semibold outline-none focus:ring-2 focus:ring-[#66D279] dark:border-[#242529] dark:bg-[#111214] dark:text-[#f2f3f5]">
                        </div>`).join("")}
                </div>
                <div class="grid grid-cols-3 gap-3">
                    <div class="rounded-xl bg-green-50 p-3 dark:bg-[#0d0d0f]"><p class="text-sm text-gray-500 dark:text-[#b5bac1]">Média</p><h3 class="text-xl font-bold text-[#288352]">-</h3></div>
                    <div class="rounded-xl bg-blue-50 p-3 dark:bg-[#252f3d]"><p class="text-sm text-gray-500 dark:text-[#b5bac1]">Horas</p><h3 class="text-xl font-bold text-blue-600">0h</h3></div>
                    <div class="rounded-xl bg-orange-50 p-3 dark:bg-[#3b3027]"><p class="text-sm text-gray-500 dark:text-[#b5bac1]">Pomodoros</p><h3 class="text-xl font-bold text-orange-500">0</h3></div>
                </div>
            </div>
        </div>`;

    return cartao;
}

function carregarDisciplinasSalvas() {
    try {
        const disciplinasSalvas = JSON.parse(localStorage.getItem(chaveDisciplinas)) || [];
        disciplinasSalvas.forEach((disciplina) => listaDisciplinas.appendChild(criarCartaoDisciplina(disciplina)));
    } catch {
        localStorage.removeItem(chaveDisciplinas);
    }
}

function carregarDisciplinasExcluidas() {
    let disciplinasExcluidas = [];

    try {
        disciplinasExcluidas = JSON.parse(localStorage.getItem(chaveDisciplinasExcluidas)) || [];
    } catch {
        localStorage.removeItem(chaveDisciplinasExcluidas);
    }

    disciplinasExcluidas.forEach((idDisciplina) => {
        document.querySelector(`[data-disciplina-id="${idDisciplina}"]`)?.remove();
    });
}

function excluirDisciplina(cartao) {
    const nomeDisciplina = cartao.querySelector("h2")?.textContent.trim() || "esta disciplina";
    if (!window.confirm(`Deseja realmente excluir ${nomeDisciplina}?`)) return;

    const idDisciplinaCriada = cartao.dataset.disciplinaCriada;
    const idDisciplinaPadrao = cartao.dataset.disciplinaId;

    if (idDisciplinaCriada) {
        const disciplinasSalvas = JSON.parse(localStorage.getItem(chaveDisciplinas)) || [];
        const disciplinasAtualizadas = disciplinasSalvas.filter((disciplina) => disciplina.id !== idDisciplinaCriada);
        localStorage.setItem(chaveDisciplinas, JSON.stringify(disciplinasAtualizadas));
    } else if (idDisciplinaPadrao) {
        const disciplinasExcluidas = JSON.parse(localStorage.getItem(chaveDisciplinasExcluidas)) || [];
        if (!disciplinasExcluidas.includes(idDisciplinaPadrao)) disciplinasExcluidas.push(idDisciplinaPadrao);
        localStorage.setItem(chaveDisciplinasExcluidas, JSON.stringify(disciplinasExcluidas));
    }

    cartao.remove();
}

function salvarDisciplina(disciplina) {
    const disciplinasSalvas = JSON.parse(localStorage.getItem(chaveDisciplinas)) || [];
    disciplinasSalvas.push(disciplina);
    localStorage.setItem(chaveDisciplinas, JSON.stringify(disciplinasSalvas));
}

function abrirModalNovaDisciplina() {
    erroNomeDisciplina.classList.add("hidden");
    campoNomeDisciplina.removeAttribute("aria-invalid");
    modalNovaDisciplina.showModal();
    campoNomeDisciplina.focus();
}

function fecharModalNovaDisciplina() {
    modalNovaDisciplina.close();
    formularioNovaDisciplina.reset();
    erroNomeDisciplina.classList.add("hidden");
}

listaDisciplinas.addEventListener("click", (evento) => {
    const botaoExcluir = evento.target.closest(".botao-excluir-disciplina");
    if (botaoExcluir) {
        excluirDisciplina(botaoExcluir.closest("[data-cartao-disciplina]"));
        return;
    }

    const botaoDetalhes = evento.target.closest(".botao-detalhes");
    if (!botaoDetalhes) return;

    const cartaoSelecionado = botaoDetalhes.closest("[data-cartao-disciplina]");
    const estaAberto = botaoDetalhes.getAttribute("aria-expanded") === "true";

    obterCartoesDisciplinas().forEach((cartao) => {
        atualizarCartaoDisciplina(cartao, cartao === cartaoSelecionado && !estaAberto);
    });
});

formularioNovaDisciplina.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = campoNomeDisciplina.value.trim();
    const cor = new FormData(formularioNovaDisciplina).get("corDisciplina");

    if (nome.length < 2) {
        erroNomeDisciplina.textContent = "Digite um nome com pelo menos 2 caracteres.";
        erroNomeDisciplina.classList.remove("hidden");
        campoNomeDisciplina.setAttribute("aria-invalid", "true");
        campoNomeDisciplina.focus();
        return;
    }

    const disciplina = { id: criarIdentificadorDisciplina(nome), nome, cor };
    fecharTodosDetalhes();
    listaDisciplinas.appendChild(criarCartaoDisciplina(disciplina));
    salvarDisciplina(disciplina);
    fecharModalNovaDisciplina();
});

botaoNovaDisciplina.addEventListener("click", abrirModalNovaDisciplina);
botaoFecharModal.addEventListener("click", fecharModalNovaDisciplina);
botaoCancelarDisciplina.addEventListener("click", fecharModalNovaDisciplina);

modalNovaDisciplina.addEventListener("click", (evento) => {
    if (evento.target === modalNovaDisciplina) fecharModalNovaDisciplina();
});

carregarDisciplinasExcluidas();
carregarDisciplinasSalvas();
