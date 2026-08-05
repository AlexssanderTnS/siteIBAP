const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const navigationLinks = document.querySelectorAll(".main-nav a");
const revealElements = document.querySelectorAll(".reveal");
const pageSections = document.querySelectorAll("main section[id]");
const thoughtCards = document.querySelectorAll(".thought-card.flip-card");
const newsletterForm = document.querySelector(".newsletter-form");
const currentYear = document.querySelector("#current-year");
const statisticNumbers = document.querySelectorAll(".stat-number");
const header = document.querySelector(".header");
const reducedMotionQuery = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

let scrollFrame = null;
let lastFocusedElement = null;
let lockedScrollPosition = 0;
let isScrollLocked = false;

function loadResponsiveFixes() {
  const stylesheets = [
    {
      selector: 'link[data-aposta-fixes="true"]',
      href: "/ibap-site/css/aposta-fixes.css",
      datasetKey: "apostaFixes"
    },
    {
      selector: 'link[data-aposta-layout-final="true"]',
      href: "/ibap-site/css/aposta-layout-final.css",
      datasetKey: "apostaLayoutFinal"
    }
  ];

  stylesheets.forEach(({ selector, href, datasetKey }) => {
    if (document.querySelector(selector)) {
      return;
    }

    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = href;
    stylesheet.dataset[datasetKey] = "true";

    document.head.appendChild(stylesheet);
  });
}

function normalizeInternalNavigation() {
  const replacements = new Map([
    ["#", "#inicio"],
    ["#jornada", "#sobre-curso"],
    ["#blog", "#radar-apostas"]
  ]);

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    const currentHref = link.getAttribute("href");
    const replacement = replacements.get(currentHref);

    if (replacement) {
      link.setAttribute("href", replacement);
    }
  });
}

function normalizeAssetPaths() {
  const pathCorrections = new Map([
    [
      "ibap-site/assets/images/Icon.png",
      "/ibap-site/assets/images/Icon.png"
    ],
    [
      "ibap-site/assets/images/LogoIBAPead.png",
      "/ibap-site/assets/images/LogoIBAPead.png"
    ],
    [
      "ibap-site/assets/images/nexo.png",
      "/ibap-site/assets/images/nexo.png"
    ],
    [
      "ibap-site/assets/images/caio1.png",
      "/ibap-site/assets/images/caio1.png"
    ]
  ]);

  document.querySelectorAll("img[src], link[href]").forEach((element) => {
    const attribute = element.tagName === "LINK" ? "href" : "src";
    const currentPath = element.getAttribute(attribute);
    const correctedPath = pathCorrections.get(currentPath);

    if (correctedPath) {
      element.setAttribute(attribute, correctedPath);
    }
  });
}

function removeUnusedModal() {
  document.querySelector("#reflection-modal")?.remove();
}

function createScrollProgressBar() {
  if (!header || header.querySelector(".scroll-progress-track")) {
    return;
  }

  const track = document.createElement("div");
  track.className = "scroll-progress-track";
  track.setAttribute("aria-hidden", "true");

  const bar = document.createElement("div");
  bar.className = "scroll-progress-bar";

  track.appendChild(bar);
  header.appendChild(track);
}

function createMenuBackdrop() {
  if (document.querySelector(".menu-backdrop")) {
    return;
  }

  const backdrop = document.createElement("div");
  backdrop.className = "menu-backdrop";
  backdrop.setAttribute("aria-hidden", "true");
  backdrop.addEventListener("click", closeMobileMenu);

  document.body.appendChild(backdrop);
}

function updateHeaderHeight() {
  if (!header) {
    return;
  }

  document.documentElement.style.setProperty(
    "--header-height",
    `${header.offsetHeight}px`
  );
}

function updateScrollProgress() {
  scrollFrame = null;

  const documentHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress =
    documentHeight > 0
      ? window.scrollY / documentHeight
      : 0;

  const clampedProgress = Math.min(
    Math.max(progress, 0),
    1
  );

  document.documentElement.style.setProperty(
    "--scroll-progress",
    clampedProgress.toFixed(4)
  );
}

function requestScrollProgressUpdate() {
  if (scrollFrame !== null) {
    return;
  }

  scrollFrame = window.requestAnimationFrame(
    updateScrollProgress
  );
}

function lockPageScroll() {
  if (isScrollLocked) {
    return;
  }

  lockedScrollPosition = window.scrollY;
  isScrollLocked = true;

  document.body.style.position = "fixed";
  document.body.style.top = `-${lockedScrollPosition}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";

  document.body.classList.add("menu-open");
}

function unlockPageScroll() {
  if (!isScrollLocked) {
    document.body.classList.remove("menu-open");
    return;
  }

  document.body.classList.remove("menu-open");

  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";

  isScrollLocked = false;

  window.scrollTo({
    top: lockedScrollPosition,
    left: 0,
    behavior: "auto"
  });

  requestScrollProgressUpdate();
}

function closeMobileMenu({
  restoreFocus = false
} = {}) {
  if (!menuToggle || !mainNav) {
    return;
  }

  const wasOpen =
    mainNav.classList.contains("open");

  mainNav.classList.remove("open");

  menuToggle.setAttribute(
    "aria-expanded",
    "false"
  );

  menuToggle.setAttribute(
    "aria-label",
    "Abrir menu"
  );

  if (wasOpen || isScrollLocked) {
    unlockPageScroll();
  }

  if (
    restoreFocus &&
    lastFocusedElement instanceof HTMLElement
  ) {
    lastFocusedElement.focus({
      preventScroll: true
    });
  }
}

function toggleMobileMenu() {
  if (!menuToggle || !mainNav) {
    return;
  }

  const isOpen =
    !mainNav.classList.contains("open");

  if (isOpen) {
    lastFocusedElement =
      document.activeElement;

    lockPageScroll();
  } else {
    unlockPageScroll();
  }

  mainNav.classList.toggle(
    "open",
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

  if (isOpen) {
    window.requestAnimationFrame(() => {
      mainNav
        .querySelector("a")
        ?.focus({
          preventScroll: true
        });
    });
  }
}

function handleMenuFocusTrap(event) {
  if (
    event.key !== "Tab" ||
    !mainNav?.classList.contains("open")
  ) {
    return;
  }

  const focusableElements = [
    menuToggle,
    ...mainNav.querySelectorAll("a")
  ].filter(Boolean);

  const firstElement =
    focusableElements[0];

  const lastElement =
    focusableElements[
      focusableElements.length - 1
    ];

  if (
    event.shiftKey &&
    document.activeElement === firstElement
  ) {
    event.preventDefault();
    lastElement.focus({
      preventScroll: true
    });
  } else if (
    !event.shiftKey &&
    document.activeElement === lastElement
  ) {
    event.preventDefault();
    firstElement.focus({
      preventScroll: true
    });
  }
}

function setThoughtCardState(
  card,
  isFlipped
) {
  card.classList.toggle(
    "is-flipped",
    isFlipped
  );

  card.setAttribute(
    "aria-pressed",
    String(isFlipped)
  );
}

function closeOtherThoughtCards(
  selectedCard
) {
  thoughtCards.forEach((card) => {
    if (card !== selectedCard) {
      setThoughtCardState(
        card,
        false
      );
    }
  });
}

function formatStatisticValue(
  element,
  value
) {
  const prefix =
    element.dataset.prefix || "";

  const suffix =
    element.dataset.suffix || "";

  const decimals = Number(
    element.dataset.decimals || 0
  );

  const formattedValue =
    value.toLocaleString("pt-BR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });

  return `${prefix}${formattedValue}${suffix}`;
}

function animateStatistic(element) {
  if (
    element.dataset.animated === "true"
  ) {
    return;
  }

  const target = Number(
    element.dataset.target
  );

  if (!Number.isFinite(target)) {
    return;
  }

  element.dataset.animated = "true";

  if (reducedMotionQuery.matches) {
    element.textContent =
      formatStatisticValue(
        element,
        target
      );

    return;
  }

  const duration = 1800;
  const startTime = performance.now();

  function updateNumber(currentTime) {
    const elapsed =
      currentTime - startTime;

    const progress = Math.min(
      elapsed / duration,
      1
    );

    const easedProgress =
      1 - Math.pow(1 - progress, 3);

    const currentValue =
      target * easedProgress;

    element.textContent =
      formatStatisticValue(
        element,
        currentValue
      );

    if (progress < 1) {
      requestAnimationFrame(
        updateNumber
      );
    }
  }

  requestAnimationFrame(
    updateNumber
  );
}

function initializeReveal() {
  if (
    reducedMotionQuery.matches ||
    !("IntersectionObserver" in window)
  ) {
    revealElements.forEach(
      (element) =>
        element.classList.add("visible")
    );

    return;
  }

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
        threshold: 0.08,
        rootMargin: "0px 0px -24px"
      }
    );

  revealElements.forEach(
    (element) =>
      revealObserver.observe(element)
  );
}

function setActiveNavigation(
  sectionId
) {
  navigationLinks.forEach((link) => {
    const isActive =
      link.getAttribute("href") ===
      `#${sectionId}`;

    link.classList.toggle(
      "active",
      isActive
    );

    if (isActive) {
      link.setAttribute(
        "aria-current",
        "page"
      );
    } else {
      link.removeAttribute(
        "aria-current"
      );
    }
  });
}

function initializeNavigationObserver() {
  if (
    !("IntersectionObserver" in window)
  ) {
    return;
  }

  const navigationObserver =
    new IntersectionObserver(
      (entries) => {
        const visibleEntry =
          entries
            .filter(
              (entry) =>
                entry.isIntersecting
            )
            .sort(
              (a, b) =>
                b.intersectionRatio -
                a.intersectionRatio
            )[0];

        if (visibleEntry) {
          setActiveNavigation(
            visibleEntry.target.id
          );
        }
      },
      {
        rootMargin:
          "-32% 0px -58%",
        threshold: [
          0.01,
          0.15,
          0.3
        ]
      }
    );

  pageSections.forEach(
    (section) =>
      navigationObserver.observe(
        section
      )
  );
}

function initializeStatistics() {
  if (
    !("IntersectionObserver" in window)
  ) {
    statisticNumbers.forEach(
      animateStatistic
    );

    return;
  }

  const statisticObserver =
    new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          animateStatistic(
            entry.target
          );

          observer.unobserve(
            entry.target
          );
        });
      },
      {
        threshold: 0.25
      }
    );

  statisticNumbers.forEach(
    (number) =>
      statisticObserver.observe(
        number
      )
  );
}

function initializeIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function initializeAnchorScrolling() {
  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {
      link.addEventListener(
        "click",
        (event) => {
          const destination =
            link.getAttribute("href");

          const target =
            destination
              ? document.querySelector(
                  destination
                )
              : null;

          if (!target) {
            event.preventDefault();
            return;
          }

          event.preventDefault();

          const menuWasOpen =
            mainNav?.classList.contains(
              "open"
            );

          closeMobileMenu();

          const performScroll = () => {
            target.scrollIntoView({
              behavior:
                reducedMotionQuery.matches
                  ? "auto"
                  : "smooth",
              block: "start"
            });

            window.history.replaceState(
              null,
              "",
              destination
            );
          };

          if (menuWasOpen) {
            window.requestAnimationFrame(
              () => {
                window.requestAnimationFrame(
                  performScroll
                );
              }
            );
          } else {
            performScroll();
          }
        }
      );
    });
}

function initializeMenu() {
  if (!menuToggle || !mainNav) {
    return;
  }

  menuToggle.addEventListener(
    "click",
    toggleMobileMenu
  );

  document.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key === "Escape" &&
        mainNav.classList.contains(
          "open"
        )
      ) {
        closeMobileMenu({
          restoreFocus: true
        });
      }

      handleMenuFocusTrap(event);
    }
  );

  window.addEventListener(
    "resize",
    () => {
      updateHeaderHeight();

      if (window.innerWidth > 900) {
        closeMobileMenu();
      }

      requestScrollProgressUpdate();
    }
  );
}

function initializeThoughtCards() {
  thoughtCards.forEach((card) => {
    card.addEventListener(
      "click",
      () => {
        const willFlip =
          !card.classList.contains(
            "is-flipped"
          );

        closeOtherThoughtCards(card);

        setThoughtCardState(
          card,
          willFlip
        );
      }
    );
  });
}

function initializeNewsletter() {
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
      input.disabled = true;

      button.disabled = true;
      button.innerHTML =
        '<i data-lucide="check"></i>';

      button.setAttribute(
        "aria-label",
        "E-mail cadastrado"
      );

      initializeIcons();

      window.setTimeout(() => {
        input.disabled = false;
        button.disabled = false;

        input.placeholder =
          "seu@email.com";

        button.innerHTML =
          '<i data-lucide="send"></i>';

        button.setAttribute(
          "aria-label",
          "Cadastrar e-mail"
        );

        initializeIcons();
      }, 3000);
    }
  );
}

function initializePage() {
  loadResponsiveFixes();
  normalizeInternalNavigation();
  normalizeAssetPaths();
  removeUnusedModal();
  createScrollProgressBar();
  createMenuBackdrop();
  updateHeaderHeight();
  initializeMenu();
  initializeAnchorScrolling();
  initializeThoughtCards();
  initializeNewsletter();
  initializeReveal();
  initializeNavigationObserver();
  initializeStatistics();
  initializeIcons();
  updateScrollProgress();

  if (currentYear) {
    currentYear.textContent =
      new Date().getFullYear();
  }

  window.addEventListener(
    "scroll",
    requestScrollProgressUpdate,
    {
      passive: true
    }
  );

  window.addEventListener(
    "load",
    () => {
      updateHeaderHeight();
      updateScrollProgress();
    }
  );
}

if (
  document.readyState === "loading"
) {
  document.addEventListener(
    "DOMContentLoaded",
    initializePage,
    {
      once: true
    }
  );
} else {
  initializePage();
}