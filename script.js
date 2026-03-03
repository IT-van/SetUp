/* ============================================================
   BUILDCRAFT — script.js
   Handles: header scroll, burger menu, sliders, form, nav
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {

  // ========================
  // FOOTER YEAR
  // ========================
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ========================
  // HEADER: scroll shadow
  // ========================
  const header = document.getElementById("header");

  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // run immediately on load

  // ========================
  // BURGER / MOBILE MENU
  // ========================
  const burger      = document.getElementById("burger");
  const mobileMenu  = document.getElementById("mobileMenu");
  const mobileLinks = mobileMenu.querySelectorAll(".mobile-menu__link, .mobile-menu__cta");

  function openMenu() {
    burger.classList.add("is-active");
    mobileMenu.classList.add("is-open");
    burger.setAttribute("aria-expanded", "true");
    mobileMenu.removeAttribute("aria-hidden");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    burger.classList.remove("is-active");
    mobileMenu.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  burger.addEventListener("click", () => {
    mobileMenu.classList.contains("is-open") ? closeMenu() : openMenu();
  });

  // Close on link click
  mobileLinks.forEach(link => link.addEventListener("click", closeMenu));

  // Close on Escape key
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && mobileMenu.classList.contains("is-open")) closeMenu();
  });

  // ========================
  // AOS ANIMATIONS
  // ========================
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 700,
      easing:   "ease-out-cubic",
      once:     true,
      offset:   60
    });
  }

  // ========================
  // PROJECTS SWIPER
  // ========================
  if (typeof Swiper !== "undefined") {

    new Swiper(".projects__swiper", {
      slidesPerView: 1.15,
      spaceBetween:  20,
      grabCursor:    true,
      pagination: {
        el:        ".projects__pagination",
        clickable: true
      },
      navigation: {
        nextEl: ".projects__btn-next",
        prevEl: ".projects__btn-prev"
      },
      breakpoints: {
        640:  { slidesPerView: 1.6, spaceBetween: 24 },
        900:  { slidesPerView: 2.4, spaceBetween: 28 },
        1200: { slidesPerView: 3,   spaceBetween: 32 }
      }
    });

    // ========================
    // TESTIMONIALS SWIPER
    // ========================
    new Swiper(".testimonials__swiper", {
      slidesPerView: 1,
      spaceBetween:  24,
      grabCursor:    true,
      loop:          true,
      autoplay: {
        delay:              5000,
        disableOnInteraction: false
      },
      pagination: {
        el:        ".testimonials__pagination",
        clickable: true
      },
      breakpoints: {
        640:  { slidesPerView: 1.5 },
        900:  { slidesPerView: 2   },
        1200: { slidesPerView: 2, spaceBetween: 32 }
      }
    });

  }

  // ========================
  // CONTACT FORM
  // ========================
  const form       = document.getElementById("contactForm");
  const successMsg = document.getElementById("formSuccess");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Highlight empty required fields
      const required = form.querySelectorAll("[required]");
      let valid = true;

      required.forEach(field => {
        field.style.borderColor = "";
        if (!field.value.trim()) {
          field.style.borderColor = "#e05a5a";
          valid = false;
        }
      });

      if (!valid) return;

      // Simulate async submission (replace with real fetch/API call)
      const submitBtn = form.querySelector("button[type=submit]");
      submitBtn.textContent = "Sending…";
      submitBtn.disabled    = true;

      setTimeout(() => {
        form.hidden       = true;
        successMsg.hidden = false;
      }, 1000);
    });

    // Clear error colour on input
    form.querySelectorAll("[required]").forEach(field => {
      field.addEventListener("input", () => field.style.borderColor = "");
    });
  }

  // ========================
  // SMOOTH SCROLL (fallback)
  // ========================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ========================
  // ACTIVE NAV HIGHLIGHT
  // ========================
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav__link");

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          const isActive = link.getAttribute("href") === "#" + entry.target.id;
          link.style.color = isActive ? "var(--clr-accent)" : "";
        });
      }
    });
  }, {
    rootMargin: "-30% 0px -60% 0px",
    threshold:  0
  });

  sections.forEach(s => sectionObserver.observe(s));

});