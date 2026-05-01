document.addEventListener("DOMContentLoaded", () => {
  // ===== BOOKING MODAL =====
  let calendlyInitialized = false;
  const openBtns = document.querySelectorAll(".open-booking");
  const modal = document.getElementById("bookingModal");
  const closeBtn = document.querySelector(".booking-close");

  function initCalendlyWidget() {
    if (calendlyInitialized) return;

    if (!window.Calendly) {
      setTimeout(initCalendlyWidget, 150);
      return;
    }

    const calendlyContainer = document.getElementById("calendly-inline-container");
    if (!calendlyContainer) return;

    Calendly.initInlineWidget({
      url: window.MEMBERSHIP_CALENDLY_URL || "https://calendly.com/winniepaws2323/new-meeting?hide_gdpr_banner=1&background_color=fffaf5&text_color=000000&primary_color=e29494",
      parentElement: calendlyContainer,
      prefill: {},
      utm: {}
    });

    calendlyInitialized = true;
  }

  if (modal && closeBtn && openBtns.length > 0) {
    openBtns.forEach(btn => {
      btn.addEventListener("click", e => {
        e.preventDefault();
        modal.classList.add("show");
        document.body.style.overflow = "hidden";
        initCalendlyWidget();
      });
    });

    closeBtn.addEventListener("click", () => {
      modal.classList.remove("show");
      document.body.style.overflow = "";
    });

    modal.addEventListener("click", e => {
      if (e.target === modal) {
        modal.classList.remove("show");
        document.body.style.overflow = "";
      }
    });
  }

  // ===== NAV / HEADER / HAMBURGER =====
  const body = document.body;
  const header = document.querySelector("header");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelectorAll(".navbar a");

  if (header) {
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
    navToggle.addEventListener("click", () => {
      const willOpen = !body.classList.contains("nav-open");

      if (willOpen) {
        window.scrollTo(0, 0);
        header && header.classList.remove("scrolled");
      }

      body.classList.toggle("nav-open");
      navToggle.classList.toggle("open");
    });
  }

  if (navLinks.length > 0) {
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        body.classList.remove("nav-open");
        navToggle && navToggle.classList.remove("open");
      });
    });
  }

  // ===== CONSENT FORM BUTTON =====
  const consentBtn = document.querySelector(".consent-btn");

  if (consentBtn) {
    consentBtn.addEventListener("click", e => {
      e.preventDefault();

      const link = document.createElement("a");
      link.href = "./winnie-paws-consent-1.pdf";
      link.download = "winnie-paws-consent-1.pdf";
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  }

  // ===== PRICE / MEMBERSHIP MODAL =====
  const priceModal = document.getElementById("priceModal");
  const priceCloseBtn = document.querySelector(".price-close");
  const priceOpenBtns = document.querySelectorAll(".open-price");
  const membershipPricingBtns = document.querySelectorAll(".view-pricing");

  const priceTitle = document.getElementById("priceModalTitle");
  const priceSubtitle = document.getElementById("priceModalSubtitle");
  const priceBody = document.getElementById("priceModalBody");

  const PRICE_DETAILS = {
    grooming: {
      title: "Full Grooming",
      subtitle: "Full Grooming · Starting at $75",
      prices: [
        { label: "X-Small Dogs (up to 15 lbs)", value: "$75" },
        { label: "Small Dogs (16-25 lbs)", value: "$90" },
        { label: "Medium Dogs (26-40 lbs)", value: "$120" },
        { label: "Large Dogs (41-60 lb)", value: "$140" },
        { label: "XL Dogs (61+ lb)", value: "$160" }
      ],
      body: `
        <div class="price-detail-block">
          <h3>What’s included</h3>
          <ul>
            <li>Blow Dry + Thorough Brush & Comb Out</li>
            <li>Ear Cleaning</li>
            <li>Nail Clipping & Buffing</li>
            <li>Paw Pad Trim</li>
            <li>Sanitary Trim</li>
            <li>Full Body Groom</li>
          </ul>

          <h3>Pricing notes</h3>
          <p>Final price depends on breed, coat condition, size, and behavior.</p>
        </div>
      `
    },

    bathing: {
      title: "Bathing",
      subtitle: "Short Hair Bath · Starting at $55",
      prices: [
        { label: "X-Small Dogs (up to 15 lbs)", value: "$55" },
        { label: "Small Dogs (16-25 lbs)", value: "$75" },
        { label: "Medium Dogs (26-40 lbs)", value: "$100" },
        { label: "Large Dogs (41-60 lbs)", value: "$120" },
        { label: "XL Dogs (61+ lbs)", value: "$140" }
      ],
      body: `
        <div class="price-detail-block">
          <h3>What’s included</h3>
          <ul>
            <li>Shampoo & Conditioner</li>
            <li>Blow Dry</li>
            <li>Brush & Comb Out</li>
            <li>Ear Cleaning</li>
            <li>Nail Clipping & Buffing</li>
          </ul>
        </div>
      `
    },

    bath_tidy: {
      title: "Bath & Tidy",
      subtitle: "Bath & Tidy · Starting at $60",
      prices: [
        { label: "X-Small Dogs (up to 15 lbs)", value: "$60" },
        { label: "Small Dogs (16-25 lbs)", value: "$70" },
        { label: "Medium Dogs (26-40 lbs)", value: "$100" },
        { label: "Large Dogs (41–60 lbs)", value: "$120" },
        { label: "XL Dogs (61+ lbs)", value: "$140" }
      ],
      body: `
        <div class="price-detail-block">
          <h3>What’s included</h3>
          <ul>
            <li>Bath</li>
            <li>Blow Dry</li>
            <li>Brush & Comb Out</li>
            <li>Face & Feet Trim</li>
            <li>Sanitary Trim</li>
          </ul>
        </div>
      `
    },

    flea_tick: {
      title: "Double Coated Bath & De-shed",
      subtitle: "Double Coated Bath & De-shed · Starting at $75",
      prices: [
        { label: "X-Small Dogs (up to 15 lbs)", value: "$75" },
        { label: "Small Dogs (16-25 lbs)", value: "$90" },
        { label: "Medium Dogs (26-40 lbs)", value: "$110" },
        { label: "Large Dogs (41–60 lbs)", value: "$130" },
        { label: "XL Dogs (61+ lbs)", value: "$150" }
      ],
      body: `
        <div class="price-detail-block">
          <h3>What’s included</h3>
          <ul>
            <li>Double Coat Bath</li>
            <li>De-shedding</li>
            <li>Blow Dry</li>
            <li>Brush & Comb Out</li>
            <li>Ear Cleaning</li>
            <li>Nail Clipping & Buffing</li>
          </ul>
        </div>
      `
    }
  };

  const MEMBERSHIP_PRICING = {
    "bath-essential": {
      title: "Bath & Tidy - Essential",
      subtitle: "1x per month · Pricing by dog size",
      prices: [
        { label: "XS", value: "$55/mo" },
        { label: "S", value: "$65/mo" },
        { label: "M", value: "$95/mo" },
        { label: "L", value: "$110/mo" },
        { label: "XL", value: "$130/mo" }
      ]
    },

    "bath-vip": {
      title: "Bath & Tidy - VIP",
      subtitle: "2x per month · Pricing by dog size",
      prices: [
        { label: "XS", value: "$100/mo" },
        { label: "S", value: "$120/mo" },
        { label: "M", value: "$180/mo" },
        { label: "L", value: "$210/mo" },
        { label: "XL", value: "$250/mo" }
      ]
    }
  };

  function openModalWithData(data) {
    if (!priceModal || !priceTitle || !priceSubtitle || !priceBody) return;

    priceTitle.textContent = data.title || "Service Details";
    priceSubtitle.textContent = data.subtitle || "";

    const pricesHTML = data.prices?.length
      ? `
        <div class="price-breakdown">
          <h3>Price breakdown</h3>
          <ul class="price-breakdown-list">
            ${data.prices.map(p => `
              <li>
                <span>${p.label}</span>
                <strong>${p.value}</strong>
              </li>
            `).join("")}
          </ul>
        </div>
      `
      : "";

    priceBody.innerHTML = pricesHTML + (data.body || "");

    priceBody.scrollTop = 0;
    priceModal.classList.add("show");
    priceModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    priceCloseBtn && priceCloseBtn.focus();
  }

  function closePriceModal() {
    if (!priceModal) return;

    priceModal.classList.remove("show");
    priceModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  priceOpenBtns.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const key = btn.getAttribute("data-price");
      const data = PRICE_DETAILS[key];

      if (data) openModalWithData(data);
    });
  });

  membershipPricingBtns.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const key = btn.getAttribute("data-plan");
      const data = MEMBERSHIP_PRICING[key];

      if (data) openModalWithData(data);
    });
  });

  if (priceModal) {
    priceCloseBtn && priceCloseBtn.addEventListener("click", closePriceModal);

    priceModal.addEventListener("click", e => {
      if (e.target === priceModal) closePriceModal();
    });

    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && priceModal.classList.contains("show")) {
        closePriceModal();
      }
    });
  }
});
