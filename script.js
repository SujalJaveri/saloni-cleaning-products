const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");
const siteHeader = document.querySelector(".site-header");
const navLinks = siteNav.querySelectorAll("a");
const revealTargets = document.querySelectorAll(
  ".hero-copy, .hero-visual, .section-head, .product-card, .feature-card, .about-visual, .about-copy, .detail-card, .detail-note, .mini-card, .page-copy, .page-visual, .contact-card"
);

function closeMenu() {
  menuToggle.classList.remove("active");
  siteNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}

function toggleMenu() {
  const isOpen = siteNav.classList.toggle("open");
  menuToggle.classList.toggle("active", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
}

menuToggle.addEventListener("click", toggleMenu);

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (siteNav.classList.contains("open")) {
      closeMenu();
    }
  });
});

document.addEventListener("click", (event) => {
  const clickedInsideNav = siteNav.contains(event.target);
  const clickedToggle = menuToggle.contains(event.target);

  if (!clickedInsideNav && !clickedToggle && siteNav.classList.contains("open")) {
    closeMenu();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 760) {
    closeMenu();
  }
});

window.addEventListener("scroll", () => {
  siteHeader.classList.toggle("scrolled", window.scrollY > 16);
});

revealTargets.forEach((element, index) => {
  element.classList.add("reveal");
  element.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 90}ms`);
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealTargets.forEach((element) => revealObserver.observe(element));
} else {
  revealTargets.forEach((element) => element.classList.add("reveal-visible"));
}
