const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const navigationLinks = document.querySelectorAll(".main-nav a");

function closeMobileMenu() {
  if (!menuToggle || !mainNav) {
    return;
  }

  mainNav.classList.remove("open");
  document.body.classList.remove("menu-open");

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");

    document.body.classList.toggle("menu-open", isOpen);

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Fechar menu" : "Abrir menu"
    );
  });

  navigationLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });
}

/* ANIMAÇÕES AO ROLAR A PÁGINA */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -40px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

/* LINK ATIVO DA NAVBAR */

const pageSections = document.querySelectorAll(
  "main section[id]"
);

if ("IntersectionObserver" in window) {
  const navigationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        navigationLinks.forEach((link) => {
          const destination = link.getAttribute("href");

          link.classList.toggle(
            "active",
            destination === `#${entry.target.id}`
          );
        });
      });
    },
    {
      rootMargin: "-40% 0px -52%"
    }
  );

  pageSections.forEach((section) => {
    navigationObserver.observe(section);
  });
}

/* MODAL DE REFLEXÃO */

const reflectionTexts = [
  "Quando algo começa pequeno, é fácil imaginar que sempre estará sob controle. Observar frequência e impacto ajuda a perceber mudanças.",

  "A vontade de recuperar uma perda pode gerar novas decisões impulsivas. Parar e estabelecer um limite é uma forma de proteção.",

  "Conhecimento não elimina o acaso. Mesmo com estatísticas, existem fatores imprevisíveis que mudam qualquer resultado.",

  "Adiar decisões financeiras pode aumentar ansiedade e custos. Pequenos passos agora costumam ser melhores que grandes promessas depois."
];

const reflectionModal = document.querySelector(
  "#reflection-modal"
);

const modalText = document.querySelector("#modal-text");

const thoughtCards = document.querySelectorAll(
  ".thought-card"
);

const closeModalButton = document.querySelector(
  ".modal-close"
);

const confirmModalButton = document.querySelector(
  ".modal-button"
);

function openReflectionModal(index) {
  if (!reflectionModal || !modalText) {
    return;
  }

  modalText.textContent =
    reflectionTexts[index] || reflectionTexts[0];

  if (typeof reflectionModal.showModal === "function") {
    reflectionModal.showModal();
  } else {
    reflectionModal.setAttribute("open", "");
  }
}

function closeReflectionModal() {
  if (!reflectionModal) {
    return;
  }

  if (
    typeof reflectionModal.close === "function" &&
    reflectionModal.open
  ) {
    reflectionModal.close();
  } else {
    reflectionModal.removeAttribute("open");
  }
}

thoughtCards.forEach((card, index) => {
  card.addEventListener("click", () => {
    const reflectionIndex = Number(
      card.dataset.reflection ?? index
    );

    openReflectionModal(reflectionIndex);
  });
});

closeModalButton?.addEventListener(
  "click",
  closeReflectionModal
);

confirmModalButton?.addEventListener(
  "click",
  closeReflectionModal
);

reflectionModal?.addEventListener("click", (event) => {
  const modalPosition =
    reflectionModal.getBoundingClientRect();

  const clickedOutside =
    event.clientX < modalPosition.left ||
    event.clientX > modalPosition.right ||
    event.clientY < modalPosition.top ||
    event.clientY > modalPosition.bottom;

  if (clickedOutside) {
    closeReflectionModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeReflectionModal();
  }
});

/* NEWSLETTER DEMONSTRATIVA */

const newsletterForm = document.querySelector(
  ".newsletter-form"
);

newsletterForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const input = newsletterForm.querySelector("input");
  const button = newsletterForm.querySelector("button");

  if (!input || !button) {
    return;
  }

  input.value = "";
  input.placeholder = "Cadastro realizado!";
  input.disabled = true;

  button.innerHTML = '<i data-lucide="check"></i>';
  button.setAttribute(
    "aria-label",
    "E-mail cadastrado"
  );

  if (window.lucide) {
    window.lucide.createIcons();
  }

  window.setTimeout(() => {
    input.disabled = false;
    input.placeholder = "seu@email.com";

    button.innerHTML = '<i data-lucide="send"></i>';
    button.setAttribute(
      "aria-label",
      "Cadastrar e-mail"
    );

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, 3000);
});

/* ANO AUTOMÁTICO */

const currentYear = document.querySelector(
  "#current-year"
);

if (currentYear) {
  currentYear.textContent =
    new Date().getFullYear();
}

/* INICIALIZAÇÃO DOS ÍCONES */

function initializeIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initializeIcons
  );
} else {
  initializeIcons();
}