const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");
const siteHeader = document.querySelector(".site-header");
const navLinks = siteNav.querySelectorAll("a");

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
