const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const year = document.querySelector("[data-year]");
const revealItems = document.querySelectorAll(".reveal");
const canvas = document.querySelector("#techField");
const contactForm = document.querySelector("[data-contact-form]");
const formNote = document.querySelector("[data-form-note]");
const ctx = canvas.getContext("2d");

year.textContent = new Date().getFullYear();

const closeNav = () => {
  nav.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
};

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    closeNav();
  }
});

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const message = formData.get("message").trim();
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

    window.location.href = `mailto:your.email@example.com?subject=${subject}&body=${body}`;

    if (formNote) {
      formNote.textContent = "Your email app should open with the message ready to send.";
    }
  });
}

const updateHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
};

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

revealItems.forEach((item) => revealObserver.observe(item));

let width = 0;
let height = 0;
let nodes = [];
let animationFrame;

const palette = ["#0f766e", "#2563eb", "#b45309"];

const resizeCanvas = () => {
  const ratio = window.devicePixelRatio || 1;
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const count = Math.min(68, Math.max(34, Math.floor(width / 22)));
  nodes = Array.from({ length: count }, (_, index) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.36,
    vy: (Math.random() - 0.5) * 0.36,
    color: palette[index % palette.length]
  }));
};

const draw = () => {
  ctx.clearRect(0, 0, width, height);

  nodes.forEach((node, index) => {
    node.x += node.vx;
    node.y += node.vy;

    if (node.x < 0 || node.x > width) node.vx *= -1;
    if (node.y < 0 || node.y > height) node.vy *= -1;

    for (let otherIndex = index + 1; otherIndex < nodes.length; otherIndex += 1) {
      const other = nodes[otherIndex];
      const distance = Math.hypot(node.x - other.x, node.y - other.y);

      if (distance < 126) {
        ctx.strokeStyle = `rgba(17, 24, 39, ${0.12 - distance / 1400})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(other.x, other.y);
        ctx.stroke();
      }
    }

    ctx.fillStyle = node.color;
    ctx.beginPath();
    ctx.arc(node.x, node.y, 2.2, 0, Math.PI * 2);
    ctx.fill();
  });

  animationFrame = window.requestAnimationFrame(draw);
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

resizeCanvas();

if (!prefersReducedMotion.matches) {
  draw();
} else {
  ctx.clearRect(0, 0, width, height);
}

window.addEventListener("resize", () => {
  window.cancelAnimationFrame(animationFrame);
  resizeCanvas();
  if (!prefersReducedMotion.matches) {
    draw();
  }
});
