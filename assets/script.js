// Configure Tailwind to use the Inter font and enable JIT mode
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out forwards",
        "slide-down": "slideDown 0.3s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
    },
  },
};
document.addEventListener("DOMContentLoaded", () => {
  const openButton = document.getElementById("openModalButton");
  const closeButton = document.getElementById("closeModalButton");
  const modal = document.getElementById("customModal");

  // --- Modal Component Logic ---

  /**
   * Opens the modal dialog.
   */
  function openModal() {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    // Set initial opacity to 0 and fade in (controlled by CSS animation)
    modal.style.opacity = "1";
  }

  /**
   * Closes the modal dialog.
   */
  function closeModal() {
    modal.style.opacity = "0"; // Start fade out
    setTimeout(() => {
      modal.classList.remove("flex");
      modal.classList.add("hidden");
    }, 300); // Match CSS transition duration
  }

  // Event listener to open the modal
  openButton.addEventListener("click", openModal);

  // Event listener to close the modal using the button
  closeButton.addEventListener("click", closeModal);

  // Event listener to close the modal by clicking the backdrop
  modal.addEventListener("click", (event) => {
    // Check if the click occurred directly on the modal overlay (not the content)
    if (event.target === modal) {
      closeModal();
    }
  });

  // Accessibility: Close modal on 'Escape' key press
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("flex")) {
      closeModal();
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("navbarToggle");
  const menu = document.getElementById("navbarMenu");

  toggleBtn.addEventListener("click", () => {
    menu.classList.toggle("show"); // toggles mobile menu visibility
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion-header");

    header.addEventListener("click", () => {
      // Close all other items
      accordionItems.forEach((i) => {
        if (i !== item) i.classList.remove("active");
      });
      // Toggle current item
      item.classList.toggle("active");
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-tab");

      // Reset all buttons and panels
      tabButtons.forEach((b) => b.classList.remove("active"));
      tabPanels.forEach((p) => p.classList.remove("active"));

      // Activate clicked button and matching panel
      btn.classList.add("active");
      document.getElementById(target).classList.add("active");
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const tooltipBtn = document.querySelector(".tooltip-btn");

  tooltipBtn.addEventListener("click", () => {
    alert(tooltipBtn.getAttribute("data-tooltip"));
  });
});
document.addEventListener("DOMContentLoaded", () => {
  // === 7. Toast Notification ===
  const showToastBtn = document.getElementById("showToastBtn");
  const toast = document.getElementById("toast");

  showToastBtn?.addEventListener("click", () => {
    toast.classList.remove("hidden");
    toast.style.opacity = "1";

    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.classList.add("hidden"), 300);
    }, 3000);
  });

  // === 8. Progress Bar (Simulated Upload) ===
  const progressFill = document.querySelector(".progress-fill");
  let progress = 0;
  const simulateProgress = () => {
    if (progress < 100) {
      progress += 1;
      progressFill.style.width = `${progress}%`;
      setTimeout(simulateProgress, 50);
    }
  };
  simulateProgress(); // Start on load

  // === 9. Input Validation ===
  const emailForm = document.getElementById("emailForm");
  const emailInput = document.getElementById("emailInput");
  const emailError = document.getElementById("emailError");

  emailForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailValue = emailInput.value.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

    if (!isValid) {
      emailError.classList.remove("hidden");
      emailInput.style.borderColor = "#dc2626";
    } else {
      emailError.classList.add("hidden");
      emailInput.style.borderColor = "#4f46e5";
      alert("Email submitted: " + emailValue);
    }
  });

  // === 10. Toggle Switch ===
  const darkToggle = document.getElementById("darkModeToggle");
  darkToggle?.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode", darkToggle.checked);
  });
  document.addEventListener("DOMContentLoaded", () => {
    const darkToggle = document.getElementById("darkModeToggle");

    darkToggle?.addEventListener("change", () => {
      document.body.classList.toggle("dark-mode", darkToggle.checked);
    });
  });
  document.addEventListener("contextmenu", (event) => event.preventDefault());
  // === 11. Avatar Status (Optional: toggle online/offline) ===
  const avatarStatus = document.querySelector(".avatar-status");
  avatarStatus?.addEventListener("click", () => {
    avatarStatus.classList.toggle("online");
    avatarStatus.style.background = avatarStatus.classList.contains("online")
      ? "#22c55e"
      : "#9ca3af";
  });

  // === 12. Rating Stars ===
  const stars = document.querySelectorAll(".star");
  const ratingDisplay = document.getElementById("ratingValue");

  stars.forEach((star) => {
    star.addEventListener("click", () => {
      const value = parseInt(star.getAttribute("data-value"));

      stars.forEach((s) => {
        s.classList.remove("active");
        if (parseInt(s.getAttribute("data-value")) <= value) {
          s.classList.add("active");
        }
      });

      ratingDisplay.textContent = `Rating: ${value}`;
    });
  });
});
// Intersection //
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".hidden-section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    {
      threshold: 0.2, // trigger when 20% of section is visible
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
});
