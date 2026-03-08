const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const revealElements = document.querySelectorAll(".reveal");
const skillBars = document.querySelectorAll(".skill-bar");
const contactForm = document.querySelector("[data-contact-form]");
const formNote = document.querySelector("[data-form-note]");

const closeMenu = () => {
  if (!header || !navToggle) {
    return;
  }

  header.classList.remove("menu-open");
  document.body.classList.remove("menu-open");
  navToggle.setAttribute("aria-expanded", "false");
};

if (navToggle && header && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("menu-open");
    document.body.classList.toggle("menu-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 780) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const level = entry.target.getAttribute("data-level");
        const fill = entry.target.querySelector(".skill-fill");
        if (fill && level) {
          fill.style.width = `${level}%`;
        }

        skillObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.35,
    }
  );

  skillBars.forEach((bar) => skillObserver.observe(bar));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
  skillBars.forEach((bar) => {
    const level = bar.getAttribute("data-level");
    const fill = bar.querySelector(".skill-fill");
    if (fill && level) {
      fill.style.width = `${level}%`;
    }
  });
}

if (contactForm && formNote) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    formNote.textContent = "Opening your email app with the message prefilled.";
    window.location.href = `mailto:67755334+SITHILMANETH@users.noreply.github.com?subject=${subject}&body=${body}`;
  });
}
