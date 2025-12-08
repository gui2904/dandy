// Wrap everything so it runs after the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // ===== BOOKING MODAL =====
  let calendlyInitialized = false;
  const openBtns = document.querySelectorAll(".open-booking");
  const modal    = document.getElementById("bookingModal");
  const closeBtn = document.querySelector(".booking-close");

  function initCalendlyWidget() {
    if (calendlyInitialized) return;

    // Calendly script may not be ready yet – retry until it is.
    if (!window.Calendly) {
      setTimeout(initCalendlyWidget, 150);
      return;
    }

    Calendly.initInlineWidget({
      url: "https://calendly.com/winniepaws2323/new-meeting?hide_gdpr_banner=1&background_color=f2cdc5&text_color=5b5b5b&primary_color=808e5d",
      parentElement: document.getElementById("calendly-inline-container"),
      prefill: {},
      utm: {}
    });

    calendlyInitialized = true;
  }

  if (modal && closeBtn && openBtns.length > 0) {
    // open modal
    openBtns.forEach(btn => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        modal.classList.add("show");
        document.body.style.overflow = "hidden";

        // always call the safe initializer
        initCalendlyWidget();
      });
    });

    // close modal by X
    closeBtn.addEventListener("click", function () {
      modal.classList.remove("show");
      document.body.style.overflow = "";
    });

    // close modal by clicking outside the card
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.classList.remove("show");
        document.body.style.overflow = "";
      }
    });
  }

  // ===== NAV / HEADER / HAMBURGER =====
  const body      = document.body;
  const header    = document.querySelector("header");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks  = document.querySelectorAll(".navbar a");

  if (header) {
    // Header scroll behaviour (only when menu is NOT open)
    window.addEventListener("scroll", () => {
      if (body.classList.contains("nav-open")) return;

      if (window.scrollY > 40) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  if (navToggle) {
    // Hamburger toggle
    navToggle.addEventListener("click", () => {
      const willOpen = !body.classList.contains("nav-open");

      if (willOpen) {
        // jump to top so overlay always starts from top of page
        window.scrollTo(0, 0);
        // keep header in "not scrolled" look while menu is open
        header && header.classList.remove("scrolled");
      }

      body.classList.toggle("nav-open");
      navToggle.classList.toggle("open");
    });
  }

  if (navLinks.length > 0) {
    // Close menu when clicking a nav link
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        body.classList.remove("nav-open");
        navToggle && navToggle.classList.remove("open");
      });
    });
  }

  // CONSENT FORM BUTTON LOGIC
  const consentBtn = document.querySelector(".consent-btn");

  if (consentBtn) {
    consentBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const file = "./winnie-paws-consent-1.pdf";

      const link = document.createElement("a");
      link.href = file;
      link.download = "winnie-paws-consent-1.pdf";
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  }
    
});
