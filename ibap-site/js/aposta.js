const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const navigationLinks = document.querySelectorAll(".main-nav a");
const revealElements = document.querySelectorAll(".reveal");
const pageSections = document.querySelectorAll("main section[id]");
const thoughtCards = document.querySelectorAll(".thought-card.flip-card");
const newsletterForm = document.querySelector(".newsletter-form");
const currentYear = document.querySelector("#current-year");
const statisticNumbers = document.querySelectorAll(".stat-number");

function closeMobileMenu() {
  if (!menuToggle || !mainNav) {
    return;
  }

  mainNav.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
}

function toggleMobileMenu() {
  if (!menuToggle || !mainNav) {
    return;
  }

  const isOpen = mainNav.classList.toggle("open");
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
}

function setThoughtCardState(card, isFlipped) {
  card.classList.toggle("is-flipped", isFlipped);
  card.setAttribute("aria-pressed", String(isFlipped));
}

function closeOtherThoughtCards(selectedCard) {
  thoughtCards.forEach((card) => {
    if (card !== selectedCard) {
      setThoughtCardState(card, false);
    }
  });
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
  if (element.dataset.animated === "true") {
    return;
  }

  const target = Number(element.dataset.target);

  if (!Number.isFinite(target)) {
    return;
  }

  element.dataset.animated = "true";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    element.textContent = formatStatisticValue(element, target);
    return;
  }

  const duration = 1800;
  const startTime = performance.now();

  function updateNumber(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = target * easedProgress;

    element.textContent = formatStatisticValue(element, currentValue);

    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    }
  }

  requestAnimationFrame(updateNumber);
}

function initializeReveal() {
  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("visible"));
    return;
  }

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
      threshold: 0.12,
      rootMargin: "0px 0px -32px"
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

function initializeNavigationObserver() {
  if (!("IntersectionObserver" in window)) {
    return;
  }

  const navigationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

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

function initializeStatistics() {
  if (!("IntersectionObserver" in window)) {
    statisticNumbers.forEach(animateStatistic);
    return;
  }

  const statisticObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

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

function initializeIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", toggleMobileMenu);

  navigationLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("click", (event) => {
    if (!mainNav.classList.contains("open")) {
      return;
    }

    if (!mainNav.contains(event.target) && !menuToggle.contains(event.target)) {
      closeMobileMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMobileMenu();
    }
  });
}

thoughtCards.forEach((card) => {
  card.addEventListener("click", () => {
    const willFlip = !card.classList.contains("is-flipped");
    closeOtherThoughtCards(card);
    setThoughtCardState(card, willFlip);
  });
});

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

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

function initializePage() {
  initializeReveal();
  initializeNavigationObserver();
  initializeStatistics();
  initializeIcons();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializePage);
} else {
  initializePage();
}
