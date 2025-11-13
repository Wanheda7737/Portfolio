document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const stored = localStorage.getItem("theme");
  if (stored === "dark") root.classList.add("dark");
  function updateThemeButton() {
    if (!themeToggle) return;
    themeToggle.textContent = root.classList.contains("dark") ? "☀️" : "🌙";
  }
  updateThemeButton();
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      root.classList.toggle("dark");
      localStorage.setItem(
        "theme",
        root.classList.contains("dark") ? "dark" : "light"
      );
      updateThemeButton();
    });
  }

  const menuBtn = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
  }

  // header show/hide
  let lastScroll = window.scrollY || 0;
  const header = document.getElementById("site-header");
  window.addEventListener(
    "scroll",
    () => {
      const cur = window.scrollY || 0;
      if (!header) return;
      if (cur > lastScroll && cur > 80) {
        header.style.transform = "translateY(-110%)";
      } else {
        header.style.transform = "";
      }
      lastScroll = cur;
    },
    { passive: true }
  );

  // smooth internal links
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#" || href === "#!") return;
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        const offset = header ? header.offsetHeight + 12 : 12;
        const y = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: "smooth" });
        if (nav && nav.classList.contains("open")) nav.classList.remove("open");
      }
    });
  });

  // reveal on scroll
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((ent) => {
          if (ent.isIntersecting) ent.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  // skill ring animation (robust + unique gradients already set in HTML)
  document.querySelectorAll(".skill-ring").forEach((ring, i) => {
    const value = Number(ring.dataset.value) || 0;
    const svg = ring.querySelector(".ring-svg");
    if (!svg) return;
    const fg = svg.querySelector(".ring-fg");
    if (!fg) return;
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    fg.style.strokeDasharray = `${circumference}`;
    const offset =
      circumference * (1 - Math.min(Math.max(value, 0), 100) / 100);
    setTimeout(() => {
      fg.style.strokeDashoffset = `${offset}`;
    }, 250 + i * 100);

    // add sr-only percent for screen readers
    const percent = document.createElement("span");
    percent.className = "sr-only";
    percent.textContent = `سطح مهارت ${value} درصد`;
    if (!ring.parentElement.querySelector(".sr-only")) {
      ring.parentElement.appendChild(percent);
    }
  });

  // contact form
  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");
  const resetBtn = document.getElementById("contact-reset");
  if (resetBtn && form) {
    resetBtn.addEventListener("click", () => {
      form.reset();
      if (feedback) feedback.textContent = "";
    });
  }
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!feedback) return;
      feedback.textContent = "";
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      if (!name) {
        feedback.textContent = "لطفاً نام خود را وارد کنید.";
        form.name.focus();
        return;
      }
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        feedback.textContent = "لطفاً ایمیل معتبر وارد کنید.";
        form.email.focus();
        return;
      }
      if (!message) {
        feedback.textContent = "لطفاً پیام خود را وارد کنید.";
        form.message.focus();
        return;
      }
      feedback.textContent = "در حال ارسال...";
      setTimeout(() => {
        feedback.textContent = "پیام شما با موفقیت ارسال شد. متشکرم!";
        form.reset();
      }, 900);
    });
  }

  // footer year
  const yEl = document.getElementById("year");
  if (yEl) yEl.textContent = new Date().getFullYear();
});

const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("main-navigation");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

document.onkeydown = function (e) {
  if (e.keyCode == 123) return false; // F12
  if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) return false; // Ctrl+Shift+I
  if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) return false; // Ctrl+U
  if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) return false; // Ctrl+Shift+J
};
