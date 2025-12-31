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
	url: "https://calendly.com/winniepaws2323/new-meeting?hide_gdpr_banner=1&background_color=fffaf5&text_color=000000&primary_color=e29494",
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
      title: "Full Grooming",
      subtitle: "Full Grooming · Starting at $120",
      prices: [
        { label: "X-Small Dogs (up to 15 lbs)", value: "$120" },
        { label: "Small Dogs (16-25 lbs)", value: "$140" },
        { label: "Medium Dogs (26-40 lbs)", value: "$165" },
        { label: "Large Dogs (41-61 lb)", value: "$180" },
        { label: "XL Dogs (61+ lb)", value: "$200" }
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

          <h3>Hairstyles</h3>
          <ul>
            <li>Light Trims</li>
            <li>Hand Scissored Trims</li>
            <li>Breed Standard Patterns</li>
            <li>Short Styles</li>
            <li>Accessory</li>
          </ul>

          <h3>Breed examples</h3>
          <p>Yorkie, Maltese, Shih-tzu, Collies, Shelties, Westies, Golden Retrievers, etc.</p>

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
      subtitle: "Short Hair Bath · Starting at $70",
      prices: [
        { label: "X-Small Dogs (up to 15 lbs)", value: "$70" },
        { label: "Small Dogs (16-25 lbs)", value: "$90" },
        { label: "Medium Dogs (26-40 lbs)", value: "$110" },
        { label: "Large Dogs (41-60 lbs)", value: "$135" },
        { label: "XL Dogs (61+ lbs)", value: "$155" }
      ],
      body: `
        <div class="price-detail-block">
          <h3>What’s included</h3>
          <ul>
            <li>Skin/coat-appropriate Shampoo & Conditioner</li>
            <li>Blow Dry</li>
            <li>Thorough Brush & Comb Out</li>
            <li>De-shedding (if applicable)</li>
            <li>Ear Cleaning</li>
            <li>Nail Clipping & Buffing</li>
            <li>Paw Pad Trim (if applicable)</li>
            <li>Sanitary Trim (if applicable)</li>
            <li>Accessory</li>
          </ul>

          <h3>Breed Examples</h3>
          <p>Pitbull, Bulldog, Boxer, Coonhound, Beagle, Mastiff, Pug, etc.</p>

          <h3>Pricing notes</h3>
          <p>
            Final price depends on breed, coat condition, size, and behavior.
            Matting may require extra time and may add a dematting fee.
          </p>
        </div>
      `
    },

    bath_tidy: {
      title: "Bath & Tidy",
      subtitle: "Bath & Tidy · Starting at $90",
      prices: [
        { label: "X-Small Dogs (up to 15 lbs)", value: "$90" },
        { label: "Small Dogs (16-25 lbs)", value: "$115" },
        { label: "Medium Dogs (26-40 lbs)", value: "$130" },
        { label: "Large Dogs (41–60 lbs)", value: "$145" },
        { label: "XL Dogs (61+ lbs)", value: "$170" }
      ],
      body: `
        <div class="price-detail-block">
          <h3>What’s included</h3>
          <ul>
            <li>Skin/coat-appropriate Shampoo & Conditioner</li>
            <li>Blow Dry</li>
            <li>Thorough Brush & Comb Out</li>
            <li>Ear Cleaning</li>
            <li>Nail Clipping & Buffing</li>
            <li>Paw Pad Trim (if applicable)</li>
            <li>Sanitary Trim (if applicable)</li>
            <li>Face & Feet Trim</li>
            <li>Accessory</li>
          </ul>

          <h3>Breed Examples</h3>
          <p>Yorkie, poodle , doodle, Maltese , Havanese, etc.</p>

          <h3>Pricing notes</h3>
          <p>
            Final price depends on breed, coat condition, size, and behavior.
            Matting may require extra time and may add a dematting fee.
          </p>
        </div>
      `
    },

    flea_tick: {
      title: "Double Coated Bath & De-shed",
      subtitle: "Double Coated Bath & De-shed – PREMIUM · Starting at $115",
      prices: [
        { label: "X-Small Dogs (up to 15 lbs)", value: "$115" },
        { label: "Small Dogs (16-25 lbs)", value: "$130" },
        { label: "Medium Dogs (26-40 lbs)", value: "$145" },
        { label: "Large Dogs (41–60 lbs)", value: "$175" },
        { label: "XL Dogs (61+ lbs)", value: "$195" }
      ],
      body: `
        <div class="price-detail-block">
          <h3>What’s included</h3>
          <ul>
            <li>Skin/coat-appropriate Shampoo & Conditioner</li>
            <li>Blow Dry</li>
            <li>Thorough Brush & Comb Out</li>
            <li>De-shedding</li>
            <li>Ear Cleaning</li>
            <li>Nail Clipping & Buffing</li>
            <li>Paw Pad Trim (if applicable)</li>
            <li>Sanitary Trim (if applicable)</li>
            <li>Accessory</li>
          </ul>

          <h3>Breed Examples</h3>
          <p>German Shepherd, Husky, Shiba-inu, etc.</p>

          <h3>Pricing notes</h3>
          <p>
            Final price depends on breed, coat condition, size, and behavior.
            Matting may require extra time and may add a dematting fee.
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
