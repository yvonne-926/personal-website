// ===========================
// Navbar scroll effect
// ===========================
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ===========================
// Mobile nav toggle
// ===========================
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.querySelector("i").className = isOpen
    ? "fas fa-times"
    : "fas fa-bars";
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.querySelector("i").className = "fas fa-bars";
  });
});

// ===========================
// Contact form validation
// ===========================
const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formStatus.textContent = "";
  formStatus.className = "form-status";

  let valid = true;

  ["name", "email", "message"].forEach((id) => {
    const field = document.getElementById(id);
    field.classList.remove("invalid");
    if (!field.value.trim()) {
      field.classList.add("invalid");
      valid = false;
    }
  });

  const emailField = document.getElementById("email");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailField.value.trim() && !emailPattern.test(emailField.value.trim())) {
    emailField.classList.add("invalid");
    valid = false;
  }

  if (!valid) {
    formStatus.textContent = "Please fill in all fields correctly.";
    formStatus.classList.add("error");
    return;
  }

  // Replace this section with a real form submission service
  // (e.g., Formspree, EmailJS, or your own backend)
  formStatus.textContent = "Thanks for your message! I'll get back to you soon.";
  formStatus.classList.add("success");
  form.reset();
});

// Remove invalid styling on input
form.querySelectorAll("input, textarea").forEach((field) => {
  field.addEventListener("input", () => field.classList.remove("invalid"));
});

// ===========================
// Footer year
// ===========================
document.getElementById("year").textContent = new Date().getFullYear();

// ===========================
// Scroll-in animations
// ===========================
const observerOptions = {
  threshold: 0.18,
  rootMargin: "0px 0px -40px 0px",
};

const scrollCharm = document.getElementById("scroll-charm");

function updateScrollCharm(sectionId) {
  if (!scrollCharm) return;
  scrollCharm.dataset.section = sectionId;
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("section-visible");
      pageSections.forEach((section) => {
        section.classList.toggle("section-current", section === entry.target);
      });
      updateScrollCharm(entry.target.id || "hero");
    }
  });
}, observerOptions);

const pageSections = document.querySelectorAll("section");
updateScrollCharm("hero");

pageSections.forEach((section) => {
  sectionObserver.observe(section);
});

document
  .querySelectorAll("#about .section-title, #about .about-content")
  .forEach((el) => {
    el.classList.add("reveal-on-scroll", "reveal-right");
    observer.observe(el);
  });

document
  .querySelectorAll("#projects .section-title, #projects .section-subtitle")
  .forEach((el) => {
    el.classList.add("reveal-on-scroll", "reveal-up");
    observer.observe(el);
  });

document.querySelectorAll("#projects .project-card").forEach((el, index) => {
  el.classList.add("reveal-on-scroll", "reveal-pop");
  el.style.transitionDelay = `${index * 90}ms`;
  observer.observe(el);
});

document
  .querySelectorAll("#contact .section-title, #contact .section-subtitle, #contact .contact-form")
  .forEach((el) => {
    el.classList.add("reveal-on-scroll", "reveal-left");
    observer.observe(el);
  });

// ===========================
// Blog Image Carousel
// ===========================
function initBlogCarousel() {
  const carousel = document.querySelector(".blog-carousel");
  if (!carousel) return;

  const slides = carousel.querySelectorAll(".blog-carousel-slide");
  const dots = carousel.querySelectorAll(".blog-carousel-dot");

  if (slides.length === 0) return;

  let currentSlide = 0;
  let autoPlay;

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  }

  // Dot clicks
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.dataset.index);
      showSlide(index);
      // Reset timer on manual interaction
      clearInterval(autoPlay);
      autoPlay = setInterval(() => showSlide(currentSlide + 1), 3000);
    });
  });

  // Auto-advance every 3 seconds
  function startAutoPlay() {
    autoPlay = setInterval(() => showSlide(currentSlide + 1), 3000);
  }

  // Pause on hover
  carousel.addEventListener("mouseenter", () => clearInterval(autoPlay));
  carousel.addEventListener("mouseleave", startAutoPlay);

  // Start auto-advance
  startAutoPlay();
}

// Initialize carousel on events page
initBlogCarousel();
