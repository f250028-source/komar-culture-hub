// KOMAR CULTURE HUB — INTERACTIVE WEBSITE

const header = document.getElementById("header");
const progress = document.getElementById("progress");
const backToTop = document.getElementById("backToTop");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// 1. NAVIGATION AND SCROLL PROGRESS
function updateScroll() {
  const scrollY = window.scrollY;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;

  header.classList.toggle("scrolled", scrollY > 40);
  backToTop.classList.toggle("visible", scrollY > 450);

  progress.style.width =
    (scrollable > 0 ? (scrollY / scrollable) * 100 : 0) + "%";
}

window.addEventListener("scroll", updateScroll, { passive: true });
updateScroll();

// 2. MOBILE MENU
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close menu" : "Open menu"
  );
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
  });
});

// 3. ANIMATIONS WHEN SCROLLING
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("visible"));
}

// 4. INTERACTIVE CLUB DETAILS
const clubInformation = {
  film: {
    icon: "🎬",
    category: "FILM CLUB / CINEMA & CONVERSATION",
    title: "Film Club",
    description: "KCH Film Club creates a space to experience cinema as both art and a source of meaningful discussion. Members explore stories, filmmaking, characters, themes, and the different perspectives presented through film.",
    activities: [
      "Film screenings and viewing sessions",
      "Post-film group discussions",
      "Exploration of storytelling and filmmaking",
      "Sharing interpretations and creative ideas"
    ]
  },
  book: {
    icon: "📖",
    category: "BOOK CLUB / READING & DISCOVERY",
    title: "Book Club",
    description: "KCH Book Club brings readers together to discover literature, exchange interpretations, and explore ideas from different genres and authors. It encourages reading, critical thinking, and thoughtful conversation.",
    activities: [
      "Group reading and book discussions",
      "Exploring literary themes and characters",
      "Sharing book recommendations",
      "Building a community of curious readers"
    ]
  },
  drama: {
    icon: "🎭",
    category: "DRAMA CLUB / ART & PERFORMANCE",
    title: "Drama Club",
    description: "KCH Drama Club celebrates theatrical expression and the art of performance. It provides a creative environment for exploring acting, storytelling, teamwork, and artistic confidence.",
    activities: [
      "Acting and theatrical expression",
      "Creative storytelling",
      "Collaborative performance activities",
      "Developing confidence and communication"
    ]
  }
};

const modal = document.getElementById("clubModal");
const modalClose = document.getElementById("modalClose");
const modalOverlay = document.getElementById("modalOverlay");
let previousFocus = null;

function openClub(clubName) {
  const club = clubInformation[clubName];
  if (!club) return;

  previousFocus = document.activeElement;

  document.getElementById("modalIcon").textContent = club.icon;
  document.getElementById("modalCategory").textContent = club.category;
  document.getElementById("modalTitle").textContent = club.title;
  document.getElementById("modalDescription").textContent =
    club.description;

  const activitiesContainer =
    document.getElementById("modalActivities");

  activitiesContainer.replaceChildren();

  const heading = document.createElement("h4");
  heading.textContent = "WHAT YOU CAN EXPLORE";
  activitiesContainer.appendChild(heading);

  const list = document.createElement("ul");

  club.activities.forEach(activity => {
    const item = document.createElement("li");
    item.textContent = activity;
    list.appendChild(item);
  });

  activitiesContainer.appendChild(list);

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modalClose.focus();
}

function closeClub() {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (previousFocus) previousFocus.focus();
}

document.querySelectorAll("[data-club]").forEach(button => {
  button.addEventListener("click", () => {
    openClub(button.dataset.club);
  });
});

modalClose.addEventListener("click", closeClub);
modalOverlay.addEventListener("click", closeClub);

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && modal.classList.contains("active")) {
    closeClub();
  }

  if (event.key === "Tab" && modal.classList.contains("active")) {
    const focusable = Array.from(
      modal.querySelectorAll("button, a[href]")
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

// 5. BACK TO TOP
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// 6. AUTOMATIC FOOTER YEAR
document.getElementById("year").textContent =
  new Date().getFullYear();

// 7. CLOSE MOBILE MENU WITH ESCAPE
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && navLinks.classList.contains("open")) {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    menuToggle.focus();
  }
});

console.log("Komar Culture Hub website initialized.");
