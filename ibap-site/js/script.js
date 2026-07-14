const projetos = [
  ["CAPACITAÇÃO", "Oficinas para artesãos parceria Fenig-IBAP", "Apoio à formação, gestão e comercialização de produtos artesanais."],
  ["PARCERIA", "Parceria Fenig-IBAP fortalece o Programa Municipal de Artesanato", "Ações integradas para valorização do artesanato e geração de renda."],
  ["DESENVOLVIMENTO", "Oficinas para artesãos parceria Fenig-IBAP", "Consultorias e oficinas que promovem inovação e competitividade."],
  ["GESTÃO PÚBLICA", "Parceria Fenig-IBAP fortalece o Programa Municipal de Artesanato", "Assistência técnica especializada para gestão municipal."]
];

const servicos = [
  "Centros Integrados de Atendimento ao Cidadão",
  "Gestão Integrada para Resultados",
  "Desenvolvimento e Governança",
  "Gestão de Pessoas",
  "Gestão Social e Ambiental",
  "Tecnologia da Informação e Comunicação",
  "Processos Seletivos",
  "Mobilidade Urbana",
  "Comunicação",
  "Soluções personalizadas"
];

const cursos = [
  ["🚗", "CNH", "Formação completa para habilitação com qualidade e segurança."],
  ["📈", "Empreendedorismo", "Desenvolva habilidades para empreender e inovar no mercado."],
  ["💰", "Educação Financeira", "Aprenda a gerir suas finanças pessoais e alcançar objetivos."],
  ["🛡️", "Saúde e Segurança", "Cursos voltados para ambientes mais seguros e saudáveis."]
];

const clientes = [
  "Prefeitura Rio", "ALERJ", "Espírito Santo", "Eletrobras", "INB", "DETRAN.RJ",
  "INEA", "CET-Rio", "IASES", "Rio de Janeiro", "Eletronuclear", "FUMASA",
  "Fiocruz", "Faça Fácil", "BR Transporte", "SENAC", "SEGER", "Rio Poupa Tempo",
  "PRODERJ", "Petrobras", "FURNAS", "CIO-RJ", "INC", "PRODEST"
];

function renderProjetos() {
  const container = document.querySelector("#projetos-grid");
  if (!container) return;

  container.innerHTML = projetos
    .map(([categoria, titulo, descricao]) => `
      <article class="card">
        <div class="card-img">
          <span>${categoria}</span>
        </div>
        <h3>${titulo}</h3>
        <p>${descricao}</p>
        <a href="#projetos">Saiba mais →</a>
      </article>
    `)
    .join("");
}

function renderServicos() {
  const container = document.querySelector("#servicos-list");
  if (!container) return;

  container.innerHTML = servicos
    .map((servico) => `
      <div class="service-item">
        <span aria-hidden="true">◎</span>
        <p>${servico}</p>
      </div>
    `)
    .join("");
}

function renderCursos() {
  const container = document.querySelector("#cursos-grid");
  if (!container) return;

  container.innerHTML = cursos
    .map(([icone, titulo, descricao]) => `
      <article class="course-card">
        <div class="course-icon" aria-hidden="true">${icone}</div>
        <div>
          <h3>${titulo}</h3>
          <p>${descricao}</p>
        </div>
        <span aria-hidden="true">→</span>
      </article>
    `)
    .join("");
}

function renderClientes() {
  const container = document.querySelector("#clientes-grid");
  if (!container) return;

  container.innerHTML = clientes
    .map((cliente) => `<div class="logo-card">${cliente}</div>`)
    .join("");
}

function setupMobileMenu() {
  const button = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".main-nav");

  if (!button || !menu) return;

  const closeMenu = () => {
    menu.classList.remove("open");
    document.body.classList.remove("menu-open");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Abrir menu");
  };

  button.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    document.body.classList.toggle("menu-open", isOpen);
    button.setAttribute("aria-expanded", String(isOpen));
    button.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1000) closeMenu();
  });
}

function setupActiveNavigation() {
  const links = [...document.querySelectorAll('.main-nav a[href^="#"]')];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!links.length || !sections.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visibleEntry) return;

      links.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${visibleEntry.target.id}`;
        link.classList.toggle("active", isActive);
      });
    },
    {
      rootMargin: "-20% 0px -65% 0px",
      threshold: [0.05, 0.2, 0.5]
    }
  );

  sections.forEach((section) => observer.observe(section));
}

function updateCurrentYear() {
  const year = document.querySelector("#current-year");
  if (year) year.textContent = new Date().getFullYear();
}

function initializeSite() {
  renderProjetos();
  renderServicos();
  renderCursos();
  renderClientes();
  setupMobileMenu();
  setupActiveNavigation();
  updateCurrentYear();
}

document.addEventListener("DOMContentLoaded", initializeSite);