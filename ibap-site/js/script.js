/* ==================================================
   MENU MOBILE
================================================== */

const menuToggle =
  document.querySelector(".menu-toggle");

const mainNav =
  document.querySelector(".main-nav");

const navigationLinks =
  document.querySelectorAll(".main-nav a");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen =
      mainNav.classList.toggle("open");

    document.body.classList.toggle(
      "menu-open",
      isOpen
    );

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuToggle.setAttribute(
      "aria-label",
      isOpen
        ? "Fechar menu"
        : "Abrir menu"
    );
  });

  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");

      document.body.classList.remove(
        "menu-open"
      );

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      menuToggle.setAttribute(
        "aria-label",
        "Abrir menu"
      );
    });
  });
}


/* ==================================================
   ANIMAÇÕES DE ENTRADA
================================================== */

const revealElements =
  document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(
            "visible"
          );

          observer.unobserve(
            entry.target
          );
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


/* ==================================================
   NAVEGAÇÃO ATIVA
================================================== */

const sections =
  document.querySelectorAll(
    "main section[id]"
  );

if ("IntersectionObserver" in window) {
  const navigationObserver =
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          navigationLinks.forEach(
            (link) => {
              const destination =
                link.getAttribute("href");

              link.classList.toggle(
                "active",
                destination ===
                  `#${entry.target.id}`
              );
            }
          );
        });
      },
      {
        rootMargin:
          "-40% 0px -52%"
      }
    );

  sections.forEach((section) => {
    navigationObserver.observe(section);
  });
}


/* ==================================================
   CONTADORES
================================================== */

const counters =
  document.querySelectorAll(".counter");

function animateCounter(counter) {
  const target =
    Number(counter.dataset.target);

  const suffix =
    counter.dataset.suffix || "";

  const duration = 1800;
  const startTime = performance.now();

  function updateCounter(currentTime) {
    const elapsed =
      currentTime - startTime;

    const progress =
      Math.min(
        elapsed / duration,
        1
      );

    const easedProgress =
      1 -
      Math.pow(
        1 - progress,
        3
      );

    const currentValue =
      Math.floor(
        target * easedProgress
      );

    counter.textContent =
      currentValue.toLocaleString(
        "pt-BR"
      ) + suffix;

    if (progress < 1) {
      requestAnimationFrame(
        updateCounter
      );
    }
  }

  requestAnimationFrame(updateCounter);
}

if ("IntersectionObserver" in window) {
  const counterObserver =
    new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          animateCounter(entry.target);

          observer.unobserve(
            entry.target
          );
        });
      },
      {
        threshold: 0.5
      }
    );

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });
} else {
  counters.forEach(animateCounter);
}

/* ==================================================
   CLIENTES E PARCEIROS
================================================== */

const clients = [
  {
    name: "ALERJ",
    image: "ibap-site/assets/images/clientes/alerj.png"
  },
  {
    name: "CRO-RJ",
    image: "ibap-site/assets/images/clientes/crorj-logo-ibap.png"
  },
  {
    name: "DETRAN-RJ",
    image: "ibap-site/assets/images/clientes/detran.png"
  },
  {
    name: "Eletrobras",
    image: "ibap-site/assets/images/clientes/eletrobras.png"
  },
  {
    name: "Faca-facil",
    image: "ibap-site/assets/images/clientes/faca-facil.png"
  },
  {
    name:"Fiocruz",
    image:"/ibap-site/assets/images/clientes/fiocruz.png"
  },
  {
    name:"Funasa",
    image:"/ibap-site/assets/images/clientes/funasa.png"
  },
  {
    name:"Furnas",
    image:"/ibap-site/assets/images/clientes/furnas-logo-ibap.png"
  },
  {
    name:"Furnas Eletrobras",
    image:"/ibap-site/assets/images/clientes/furnas.png"
  },
  {
    name:"Gov Espirito Santo",
    image:"/ibap-site/assets/images/clientes/gov-esperito-santo.png"
  },
  {
    name:"Gov Rio 2",
    image:"/ibap-site/assets/images/clientes/gov-rio-2.png"
  },
  {
    name:"Gov Saude",
    image:"/ibap-site/assets/images/clientes/gov-saude.png"
  },
  {
    name:"Iases",
    image:"/ibap-site/assets/images/clientes/iases.png"
  },
  {
    name:"Ijsn",
    image:"/ibap-site/assets/images/clientes/ijsn.png"
  },
  {
    name:"Fiocruz",
    image:"/ibap-site/assets/images/clientes/imprensa-oficiales.png"
  },
  {
    name:"INB",
    image:"/ibap-site/assets/images/clientes/inb.png"
  },
  {
    name:"INC COREL",
    image:"/ibap-site/assets/images/clientes/inc-corel.jpg"
  },
  {
    name:"INMETRO",
    image:"/ibap-site/assets/images/clientes/inmetro.png"
  },
  {
    name:"Jucerja",
    image:"/ibap-site/assets/images/clientes/jucerja.png"
  },
  {
    name:"Niteroi",
    image:"/ibap-site/assets/images/clientes/niteroi.png"
  },
  {
    name:"Petrobras",
    image:"/ibap-site/assets/images/clientes/petrobras-dist.png"
  },
  {
    name:"Poupa-Tempo",
    image:"/ibap-site/assets/images/clientes/popua-tempo-rio.png"
  },
  {
    name:"Proderj",
    image:"/ibap-site/assets/images/clientes/proderj.png"
  },
  {
    name:"Prodest",
    image:"/ibap-site/assets/images/clientes/prodest.png"
  },
  {
    name:"Seger",
    image:"/ibap-site/assets/images/clientes/seger.png"
  },
  {
    name:"Senac",
    image:"/ibap-site/assets/images/clientes/senac.png"
  },
  {
    name:"Transpetro",
    image:"/ibap-site/assets/images/clientes/transpetro.png"
  },
  {
    name:"UFRJ",
    image:"/ibap-site/assets/images/clientes/ufrj.png"
  }
];

const clientsTrack =
  document.querySelector("#clients-track");

function createClientCard(client, isClone = false) {
  const card =
    document.createElement("article");

  card.className = "client-logo-card";

  if (isClone) {
    card.setAttribute(
      "aria-hidden",
      "true"
    );
  }

  const image =
    document.createElement("img");

  image.src = client.image;
  image.alt = isClone
    ? ""
    : client.name;

  image.loading = "lazy";
  image.decoding = "async";

  image.addEventListener(
    "error",
    () => {
      image.remove();

      card.classList.add(
        "client-logo-card-error"
      );

      const fallback =
        document.createElement("span");

      fallback.className =
        "client-logo-fallback";

      fallback.textContent =
        client.name;

      card.appendChild(fallback);

      console.error(
        `Imagem não encontrada: ${client.image}`
      );
    },
    {
      once: true
    }
  );

  card.appendChild(image);

  return card;
}

function fillClientTrack(track, clientList) {
  if (!track) {
    return;
  }

  const fragment =
    document.createDocumentFragment();

  clientList.forEach((client) => {
    fragment.appendChild(
      createClientCard(
        client,
        false
      )
    );
  });

  clientList.forEach((client) => {
    fragment.appendChild(
      createClientCard(
        client,
        true
      )
    );
  });

  track.replaceChildren(fragment);
}

function initializeClientsCarousel() {
  if (!clientsTrack) {
    console.error(
      "O elemento do carrossel não foi encontrado."
    );

    return;
  }

  if (clients.length === 0) {
    console.warn(
      "Nenhum cliente foi cadastrado."
    );

    return;
  }

  fillClientTrack(
    clientsTrack,
    clients
  );
}


/* ==================================================
   NEWSLETTER
================================================== */

const newsletterForm =
  document.querySelector(".newsletter");

newsletterForm?.addEventListener(
  "submit",
  (event) => {
    event.preventDefault();

    const input =
      newsletterForm.querySelector(
        "input"
      );

    const button =
      newsletterForm.querySelector(
        "button"
      );

    if (!input || !button) {
      return;
    }

    input.value = "";

    input.placeholder =
      "Cadastro realizado!";

    button.innerHTML =
      '<i data-lucide="check"></i>';

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
);


/* ==================================================
   ANO ATUAL
================================================== */

const currentYear =
  document.querySelector(
    "#current-year"
  );

if (currentYear) {
  currentYear.textContent =
    new Date().getFullYear();
}


/* ==================================================
   INICIALIZAÇÃO
================================================== */

function initializePage() {
  initializeClientsCarousel();

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

if (
  document.readyState === "loading"
) {
  document.addEventListener(
    "DOMContentLoaded",
    initializePage
  );
} else {
  initializePage();
}