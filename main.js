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

  // ===== PRICES MODAL =====
  const priceModal = document.getElementById("priceModal");
  const priceCloseBtn = document.querySelector(".price-close");
  const priceOpenBtns = document.querySelectorAll(".open-price");

  const priceTitle = document.getElementById("priceModalTitle");
  const priceSubtitle = document.getElementById("priceModalSubtitle");
  const priceBody = document.getElementById("priceModalBody");

  // Simple content map (edit text freely)
  const PRICE_DETAILS = {
    grooming: {
      title: "Grooming",
      subtitle: "Grooming options · Starting at $110",
      prices: [
        { label: "Small Dogs (up to 15 lbs)", value: "$110" },
        { label: "Medium Dogs (16-40 lbs)", value: "$120" },
        { label: "Large Dogs (41-70 lb)", value: "$160" },
        { label: "XL Dogs (71+ lb)", value: "$180" }
      ],
      body: `
        <div class="price-detail-block">
          <h3>What’s included</h3>
          <ul>
            <li>Bath + blow-dry</li>
            <li>Full haircut & styling</li>
            <li>Nails trimmed</li>
            <li>Ears cleaned</li>
            <li>Paw pad trim</li>
          </ul>

          <h3>Pricing notes</h3>
          <p>
            Final price depends on breed, coat condition, size, and behavior.
            Matting may require extra time and may add a dematting fee.
          </p>
        </div>
      `
    },

    bathing: {
      title: "Bathing",
      subtitle: "Short hair bath",
      prices: [
        { label: "X-Small Dogs (up to 15 lbs)", value: "$70" },
        { label: "Small Dogs (16-25 lbs)", value: "$90" },
        { label: "Medium Dogs (16-40 lbs)", value: "$110" },
        { label: "Large Dogs (41-70 lbs)", value: "$135" },
        { label: "XL Dogs (71+ lbs)", value: "$155" }
      ],
      body: `
        <div class="price-detail-block">
          <h3>What’s included</h3>
          <ul>
            <li>Bath</li>
            <li>Blow-Dry</li>
            <li>Nails</li>
            <li>Ears</li>
          </ul>

          <h3>Great for</h3>
          <p>Short Coat Breeds.</p>
        </div>
      `
    },

    bath_tidy: {
      title: "Bath & Tidy",
      subtitle: "Bath + light trim · Starting at $90",
      prices: [
        { label: "Small (0–20 lb)", value: "$90+" },
        { label: "Medium (21–45 lb)", value: "$105+" },
        { label: "Large (46–75 lb)", value: "$125+" }
      ],
      body: `
        <div class="price-detail-block">
          <h3>What’s included</h3>
          <ul>
            <li>Bath + blow-dry</li>
            <li>Nails</li>
            <li>Ears</li>
            <li>Paw trim</li>
            <li>Light tidy (face/feet/sanitary areas)</li>
          </ul>

          <p class="price-note">
            <strong>No full haircut</strong> — perfect maintenance option.
          </p>
        </div>
      `
    },

    flea_tick: {
      title: "Flea & Tick Treatment",
      subtitle: "Add-on service · +$20 (when added to an appointment)",
      prices: [
        { label: "Add-on to any service", value: "+$20" }
      ],
      body: `
        <div class="price-detail-block">
          <h3>What’s included</h3>
          <ul>
            <li>Gentle flea & tick shampoo / treatment</li>
            <li>Extra rinse + coat check</li>
          </ul>

          <h3>Important</h3>
          <p>
            For heavy infestations, we may recommend a vet-approved treatment plan.
          </p>
        </div>
      `
    }
  };

  function openPriceModal(key) {
    const data = PRICE_DETAILS[key] || {
      title: "Service Details",
      subtitle: "",
      body: "<p>Details coming soon.</p>"
    };

    priceTitle.textContent = data.title;
    priceSubtitle.textContent = data.subtitle;

    const pricesHTML = (data.prices && data.prices.length)
      ? `
        <div class="price-breakdown">
          <h3>Price breakdown</h3>
          <ul class="price-breakdown-list">
	    ${data.prices.map(p => `<li><span>${p.label}</span><strong>${p.value}</strong></li>`).join("")}
          </ul>
          <p class="price-small-note">Prices are estimates. Exact total depends on coat condition, behavior, and time required.</p>
        </div>
      `
      : "";

    priceBody.innerHTML = pricesHTML + data.body;
      
    priceModal.classList.add("show");
    priceModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // Focus the close button for accessibility
    priceCloseBtn && priceCloseBtn.focus();
  }

  function closePriceModal() {
    priceModal.classList.remove("show");
    priceModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (priceModal && priceOpenBtns.length > 0) {
    priceOpenBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const key = btn.getAttribute("data-price");
        openPriceModal(key);
      });
    });

    // Close by X
    priceCloseBtn && priceCloseBtn.addEventListener("click", closePriceModal);

    // Close by clicking overlay background
    priceModal.addEventListener("click", (e) => {
      if (e.target === priceModal) closePriceModal();
    });

    // Close on ESC (only if this modal is open)
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && priceModal.classList.contains("show")) {
        closePriceModal();
      }
    });
  }

    
});
