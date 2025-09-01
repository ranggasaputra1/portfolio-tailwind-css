//Navbar Fixed
window.onscroll = function () {
  const header = document.querySelector("header");
  const fixedNav = header.offsetTop;
  const toTop = document.querySelector("#to-top");

  if (window.pageYOffset > fixedNav) {
    header.classList.add("navbar-fixed");
    toTop.classList.remove("hidden");
    toTop.classList.add("flex");
  } else {
    header.classList.remove("navbar-fixed");
    toTop.classList.remove("flex");
    toTop.classList.add("hidden");
  }
};

// Hamburger
const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector("#nav-menu");

hamburger.addEventListener("click", function (e) {
  e.stopPropagation(); // cegah klik bubble ke window
  hamburger.classList.toggle("hamburger-active");
  navMenu.classList.toggle("hidden");
});

// Klik di luar hamburger dan navMenu
window.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    hamburger.classList.remove("hamburger-active");
    navMenu.classList.add("hidden");
  }
});


//Dark Mode Toggle
const darkToggle = document.querySelector("#dark-toggle");
const html = document.querySelector("html");

darkToggle.addEventListener("click", function () {
  if (darkToggle.checked) {
    html.classList.add("dark");
    localStorage.theme = "dark";
  } else {
    html.classList.remove("dark");
    localStorage.theme = "light";
  }
});

//Pindahkan Posisi Toggle Sesuai Mode
if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  darkToggle.checked = true;
} else {
  darkToggle.checked = false;
}
//Script agar ketika merubah ke dark mode saat halaman di refresh tetap menjadi darkmode
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}

// --- Intersection Observer untuk Animasi Scroll ---
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.2
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.animate-fade-in').forEach((el, index) => {
    el.style.setProperty('--animation-delay', `${index * 0.1}s`);
    observer.observe(el);
  });

  // --- Logika Lightbox ---
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxClose = document.getElementById('lightbox-close');

  const galleryItems = document.querySelectorAll('#portfolio img, #blog img');

  // Fungsi untuk menutup lightbox
  const closeLightbox = () => {
    lightbox.classList.add('hidden');
    document.body.style.overflow = ''; // Mengaktifkan kembali scrolling
  };
  
  // Event listener untuk tombol tutup
  lightboxClose.addEventListener('click', closeLightbox);
  
  // Event listener untuk menutup lightbox saat mengklik latar belakang
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Event listener untuk setiap gambar di portfolio dan project
  galleryItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault(); 
      const imageUrl = e.target.src;
      lightboxImage.src = imageUrl;
      lightbox.classList.remove('hidden');
      document.body.style.overflow = 'hidden'; // Nonaktifkan scrolling
    });
  });

  // Event listener untuk tombol ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
      closeLightbox();
    }
  });
});