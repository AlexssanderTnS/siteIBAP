const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const navigationLinks = document.querySelectorAll(".main-nav a");
const revealElements = document.querySelectorAll(".reveal");
const pageSections = document.querySelectorAll("main section[id]");
const thoughtCards = document.querySelectorAll(".thought-card.flip-card");
const newsletterForm = document.querySelector(".newsletter-form");
const currentYear = document.querySelector("#current-year");
const statisticNumbers = document.querySelectorAll(".stat-number");

function createHeaderFlowBar() {
  const header = document.querySelector(".header");
  if (!header || header.querySelector(".header-flow-bar")) return;

  const style = document.createElement("style");
  style.textContent = `
    .header-flow-bar {
      position: absolute;
      left: 0;
      right: 0;
      bottom: -1px;
      height: 4px;
      overflow: hidden;
      pointer-events: none;
      z-index: 60;
    }

    .header-flow-bar::before {
      content: "";
      position: absolute;
      inset: 0;
      width: 220%;
      background: linear-gradient(
        90deg,
        #45e0ba 0%,
        #18c6d6 20%,
        #0b73df 40%,
        #8e69ef 60%,
        #ff8c2a 80%,
        #ffca3a 100%
      );
      background-size: 50% 100%;
      animation: header-flow 6s linear infinite;
      filter: saturate(1.12);
    }

    @keyframes header-flow {
      from {
        transform: translateX(-50%);
      }

      to {
        transform: translateX(0);
      }
    }

    @media (min-width: 1600px) {
      .header-flow-bar {
        height: 5px;
      }
    }

    @media (max-width: 680px) {
      .header-flow-bar {
        height: 3px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .header-flow-bar::before {
        animation: none;
        transform: none;
      }
    }
  `;

  const flowBar = document.createElement("div");
  flowBar.className = "header-flow-bar";
  flowBar.setAttribute("aria-hidden", "true");

  document.head.appendChild(style);
  header.appendChild(flowBar);
}

function closeMobileMenu() {
  if (!menuToggle || !mainNav) return;

  mainNav.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
}

function toggleMobileMenu() {
  if (!menuToggle || !mainNav) return;

  const isOpen = mainNav.classList.toggle("open");
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
}

function initializeMenu() {
  if (!menuToggle || !mainNav) return;

  menuToggle.addEventListener("click", toggleMobileMenu);
  navigationLinks.forEach((link) => link.addEventListener("click", closeMobileMenu));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMobileMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMobileMenu();
  });
}

function initializeReveal() {
  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("visible"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -32px"
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

function initializeActiveNavigation() {
  if (!("IntersectionObserver" in window)) return;

  const navigationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navigationLinks.forEach((link) => {
          const destination = link.getAttribute("href");
          link.classList.toggle("active", destination === `#${entry.target.id}`);
        });
      });
    },
    {
      rootMargin: "-38% 0px -54%"
    }
  );

  pageSections.forEach((section) => navigationObserver.observe(section));
}

function setThoughtCardState(card, isFlipped) {
  card.classList.toggle("is-flipped", isFlipped);
  card.setAttribute("aria-pressed", String(isFlipped));
}

function initializeThoughtCards() {
  thoughtCards.forEach((card) => {
    card.addEventListener("click", () => {
      const willFlip = !card.classList.contains("is-flipped");

      thoughtCards.forEach((otherCard) => {
        if (otherCard !== card) setThoughtCardState(otherCard, false);
      });

      setThoughtCardState(card, willFlip);
    });
  });
}

function initializeNewsletter() {
  if (!newsletterForm) return;

  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const input = newsletterForm.querySelector("input");
    const button = newsletterForm.querySelector("button");

    if (!input || !button) return;

    input.value = "";
    input.placeholder = "Cadastro realizado!";
    input.disabled = true;
    button.innerHTML = '<i data-lucide="check"></i>';
    button.setAttribute("aria-label", "E-mail cadastrado");
    initializeIcons();

    window.setTimeout(() => {
      input.disabled = false;
      input.placeholder = "seu@email.com";
      button.innerHTML = '<i data-lucide="send"></i>';
      button.setAttribute("aria-label", "Cadastrar e-mail");
      initializeIcons();
    }, 3000);
  });
}

function initializeYear() {
  if (currentYear) currentYear.textContent = new Date().getFullYear();
}

function initializeIcons() {
  if (window.lucide) window.lucide.createIcons();
}

function formatStatisticValue(element, value) {
  const prefix = element.dataset.prefix || "";
  const suffix = element.dataset.suffix || "";
  const decimals = Number(element.dataset.decimals || 0);
  const formattedValue = value.toLocaleString("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });

  return `${prefix}${formattedValue}${suffix}`;
}

function animateStatistic(element) {
  if (element.dataset.animated === "true") return;

  const target = Number(element.dataset.target);
  if (!Number.isFinite(target)) return;

  element.dataset.animated = "true";
  const duration = 1800;
  const startTime = performance.now();

  function updateNumber(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = target * easedProgress;

    element.textContent = formatStatisticValue(element, currentValue);

    if (progress < 1) requestAnimationFrame(updateNumber);
  }

  requestAnimationFrame(updateNumber);
}

function initializeStatistics() {
  if (!statisticNumbers.length) return;

  if (!("IntersectionObserver" in window)) {
    statisticNumbers.forEach(animateStatistic);
    return;
  }

  const statisticObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateStatistic(entry.target);
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.35
    }
  );

  statisticNumbers.forEach((number) => statisticObserver.observe(number));
}

function initializePage() {
  createHeaderFlowBar();
  initializeMenu();
  initializeReveal();
  initializeActiveNavigation();
  initializeThoughtCards();
  initializeNewsletter();
  initializeYear();
  initializeStatistics();
  initializeIcons();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializePage);
} else {
  initializePage();
}
