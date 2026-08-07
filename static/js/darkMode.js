const pagina = document.documentElement;
const botaoTema = document.getElementById("botao-tema");
const iconeTema = document.getElementById("icone-tema");

function atualizarTema() {
    const modoEscuro = pagina.classList.contains("dark");

    if (iconeTema) {
        iconeTema.src = modoEscuro
            ? iconeTema.dataset.lightMode
            : iconeTema.dataset.darkMode;
    }

    if (botaoTema) {
        botaoTema.setAttribute("aria-pressed", String(modoEscuro));
        botaoTema.setAttribute(
            "aria-label",
            modoEscuro
                ? "Ativar modo claro"
                : "Ativar modo escuro"
        );
    }
}

const temaSalvo = localStorage.getItem("theme");
const sistemaEscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (temaSalvo === "dark" || (!temaSalvo && sistemaEscuro)) {
    pagina.classList.add("dark");
}

atualizarTema();

botaoTema?.addEventListener("click", () => {
    pagina.classList.toggle("dark");

    const modoEscuro = pagina.classList.contains("dark");

    localStorage.setItem(
        "theme",
        modoEscuro ? "dark" : "light"
    );

    atualizarTema();
});

window.addEventListener("storage", (evento) => {
    if (evento.key !== "theme") return;

    pagina.classList.toggle("dark", evento.newValue === "dark");
    atualizarTema();
});
