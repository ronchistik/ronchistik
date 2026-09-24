const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav__toggle");
const menu = document.querySelector(".menu");
const timeline = document.querySelector(".timeline");
const entries = [...document.querySelectorAll(".entry")];
const indexLinks = [...document.querySelectorAll(".index a")];

const when = {
  paypal: "Now · Lead, AI initiatives",
  scheduley: "2026 · Founded, San Jose",
  apple: "Feb 2021 to May 2024",
  versa: "Jan 2020 to Aug 2020",
  aisera: "Feb 2018 to Mar 2019",
  nyt: "Feb 2017 to Jul 2017 · New York",
  realtor: "May 2015 to Feb 2017 · Santa Clara",
  dod: "Apr 2014 to Sep 2014 · San Francisco",
};

entries.forEach((entry) => {
  const article = entry.querySelector("article");
  if (article && when[entry.id]) article.dataset.when = when[entry.id];
});

function onScroll() {
  nav.classList.toggle("is-scrolled", window.scrollY > 8);

  const rect = timeline.getBoundingClientRect();
  const view = window.innerHeight * 0.45;
  const total = rect.height;
  const seen = Math.min(Math.max(view - rect.top, 0), total);
  timeline.style.setProperty("--progress", String(seen / total));

  let current = entries[0];
  entries.forEach((entry) => {
    const top = entry.getBoundingClientRect().top;
    entry.classList.toggle("is-active", top < view && top > -entry.offsetHeight * 0.45);
    if (top < view) current = entry;
  });

  indexLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${current.id}`);
  });
}

toggle.addEventListener("click", () => {
  const open = menu.classList.toggle("is-open");
  menu.hidden = !open;
  toggle.setAttribute("aria-expanded", String(open));
  toggle.textContent = open ? "Close" : "Menu";
});

menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("is-open");
    menu.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "Menu";
  });
});

onScroll();
document.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll);
