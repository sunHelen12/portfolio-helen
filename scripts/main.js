// Cursor glow
const glow = document.createElement("div");
glow.className = "cursor-glow";
document.body.appendChild(glow);
let gx = 0,
  gy = 0,
  cx = 0,
  cy = 0;
window.addEventListener("pointermove", (e) => {
  gx = e.clientX;
  gy = e.clientY;
  glow.classList.add("active");
});
window.addEventListener("pointerleave", () => glow.classList.remove("active"));
(function loop() {
  cx += (gx - cx) * 0.12;
  cy += (gy - cy) * 0.12;
  glow.style.transform = `translate(${cx - 210}px, ${cy - 210}px)`;
  requestAnimationFrame(loop);
})();

// Magnetic + ripple buttons
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("pointermove", (e) => {
    const r = btn.getBoundingClientRect();
    const mx = ((e.clientX - r.left) / r.width) * 100;
    const my = ((e.clientY - r.top) / r.height) * 100;
    btn.style.setProperty("--mx", mx + "%");
    btn.style.setProperty("--my", my + "%");
    const dx = (e.clientX - (r.left + r.width / 2)) * 0.12;
    const dy = (e.clientY - (r.top + r.height / 2)) * 0.12;
    btn.style.transform = `translate(${dx}px, ${dy}px) translateY(-2px)`;
  });
  btn.addEventListener("pointerleave", () => {
    btn.style.transform = "";
  });
  btn.addEventListener("click", (e) => {
    const r = btn.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    const size = Math.max(r.width, r.height);
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = e.clientX - r.left - size / 2 + "px";
    ripple.style.top = e.clientY - r.top - size / 2 + "px";
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  });
});

// Scroll reveal
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add("in-view");
        io.unobserve(en.target);
      }
    });
  },
  { threshold: 0.15 },
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Active nav link
const here = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll("nav a[data-page]").forEach((a) => {
  if (a.dataset.page === here) a.classList.add("active");
});
