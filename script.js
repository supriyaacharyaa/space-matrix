// ----------- Mobile Menu -----------
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
    menuToggle.setAttribute('aria-expanded', !expanded);
    navLinks.classList.toggle('open');
  });
}

// ----------- Counters -----------
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  if (counters.length === 0) return;

  const startCounting = (counter) => {
    const target = +counter.getAttribute("data-target");
    let count = 0;
    const increment = Math.ceil(target / 100);

    const updateCount = () => {
      if (count < target) {
        count += increment;
        counter.innerText = count;
        setTimeout(updateCount, 30);
      } else {
        counter.innerText = target + "+";
      }
    };

    counter.innerText = "0";
    updateCount();
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) startCounting(entry.target);
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
});

// ----------- Overlay Scroll Animation -----------
const text = document.getElementById('overlayText');
const imageContainer = document.getElementById('imageContainer');
if (text && imageContainer) {
  window.addEventListener('scroll', () => {
    const rect = imageContainer.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      const imageMiddle = rect.top + rect.height / 2;
      const scrollProgress = 1 - (imageMiddle / windowHeight);
      const clamped = Math.max(0, Math.min(scrollProgress, 1));
      const translateY = 100 - 150 * clamped;
      text.style.transform = `translate(-50%, ${translateY}%)`;
    }
  });
}

// ----------- Swipers -----------
if (typeof Swiper !== 'undefined') {
  const swiperEl = document.querySelector(".mySwiper");
  if (swiperEl) {
    new Swiper(".mySwiper", {
      slidesPerView: 3,
      spaceBetween: 30,
      pagination: { el: ".swiper-pagination", clickable: true },
    });
  }

  const swiperEl1 = document.querySelector(".mySwiper1");
  if (swiperEl1) {
    new Swiper(".mySwiper1", {
      pagination: { el: ".swiper-pagination", type: "progressbar" },
      navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
    });
  }
}

// ----------- Hero Overlay Scroll -----------
const heroWrapper = document.querySelector('.hero-wrapper');
const overlay = document.querySelector('.bg-overlay');
const container = document.querySelector('.hero .container');
const header = document.querySelector("header");
const navLink = document.querySelectorAll('.nav-link-text');

if (heroWrapper && overlay && container && header && navLink.length > 0) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const wrapperTop = heroWrapper.offsetTop;
    const wrapperHeight = heroWrapper.offsetHeight;
    const windowHeight = window.innerHeight;
    const wrapperEnd = wrapperTop + wrapperHeight;

    // Calculate progress only when inside hero-wrapper
    if (scrollTop < wrapperTop) {
      // BEFORE hero section
      header.style.backgroundColor = 'white';
      navLink.forEach(link => link.style.color = 'black');
      overlay.style.width = '0%';
      container.style.color = 'black';
    } else if (scrollTop >= wrapperTop && scrollTop <= wrapperEnd) {
      // INSIDE hero-wrapper
      const progress = Math.min(Math.max((scrollTop - wrapperTop) / (wrapperHeight - windowHeight), 0), 1);
      
      overlay.style.width = `${progress * 100}%`;

      // Interpolate text color from black to white smoothly
      const colorVal = Math.floor(progress * 255);
      container.style.color = `rgb(${colorVal}, ${colorVal}, ${colorVal})`;

      // Set header background transparent
      header.style.backgroundColor = 'transparent';

      // Change nav link color after ~60% scroll
      if (progress <= 0.61) {
        navLink.forEach(link => link.style.color = 'gray');
      } else {
        navLink.forEach(link => link.style.color = 'white');
      }
    } else {
      // AFTER hero section
      header.style.backgroundColor = 'white';
      navLink.forEach(link => link.style.color = 'black');
      overlay.style.width = '100%';
      container.style.color = 'white';
    }
  });
}

// ----------- Animated Text Scroll -----------
const animatedText = document.getElementById('animatedText');
const scrollSection = document.getElementById('scrollSection');
if (animatedText && scrollSection) {
  window.addEventListener('scroll', () => {
    const sectionRect = scrollSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (sectionRect.top < windowHeight && sectionRect.bottom > 0) {
      const sectionMiddle = sectionRect.top + sectionRect.height / 2;
      const scrollProgress = 1 - (sectionMiddle / windowHeight);
      const clampedProgress = Math.max(0, Math.min(scrollProgress, 1));
      const translateY = 100 - 150 * clampedProgress;
      animatedText.style.transform = `translate(-50%, ${translateY}%)`;
    }
  });
}

// ----------- Fade Section Observer -----------
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".fade-section");
  if (!section) return;

  const fadeText = section.querySelector(".fade-text");
  if (!fadeText) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        section.classList.add("active");
        fadeText.classList.remove("animate");
        void fadeText.offsetWidth;
        fadeText.classList.add("animate");
      } else {
        section.classList.remove("active");
      }
    });
  }, { threshold: 0.5 });

  observer.observe(section);
});

// ----------- White Frame Observer -----------
const frame = document.querySelector('.white-frame-container');
if (frame) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  });
  observer.observe(frame);
}

// ----------- Active Navigation Highlight -----------
document.addEventListener("DOMContentLoaded", () => {
  const menuLinks = document.querySelectorAll(".custom-nav-item");
  const sections = document.querySelectorAll("section");

  if (menuLinks.length === 0 || sections.length === 0) return;

  window.addEventListener("scroll", () => {
    let currentSectionId = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        currentSectionId = section.getAttribute("id");
      }
    });

    menuLinks.forEach(link => {
      link.classList.remove("active-link");
      if (link.dataset.section === currentSectionId) {
        link.classList.add("active-link");
      }
    });
  });
});

// ----------- Back to Top -----------
window.addEventListener("load", function () {
  const btn = document.getElementById("backToTopBtn");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.style.display = (window.scrollY > 200) ? "block" : "none";
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// ----------- Copyright Year -----------
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

//---------Scroll Template----------
document.querySelectorAll('.horizontal-section').forEach(section => {
  const content = section.querySelector('.scroll-content');
  const contentWidth = content.scrollWidth;
  const viewportWidth = window.innerWidth;

  // Set section height proportional to how much we need to scroll
  section.style.height = (contentWidth - viewportWidth + window.innerHeight) + 'px';

  // Attach scroll event
  window.addEventListener('scroll', () => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 0 && rect.bottom >= 0) {
      const scrollProgress = Math.min(-rect.top / (section.offsetHeight - window.innerHeight), 1);
      content.style.transform = `translateX(-${scrollProgress * (contentWidth - viewportWidth)}px)`;
    }
  });
});

//------Scroll-Responsive----
function setupHorizontalScroll() {
  document.querySelectorAll('.horizontal-section').forEach(section => {
    const content = section.querySelector('.scroll-content');
    const panels = content.querySelectorAll('.panel');
    const viewportWidth = window.innerWidth;

    const totalWidth = panels.length * viewportWidth;
    content.style.width = totalWidth + 'px';

    let scrollHeight;
    if (viewportWidth < 768) {
      scrollHeight = totalWidth - viewportWidth + window.innerHeight;
    } else {
      scrollHeight = window.innerHeight * 2;  // adjust this multiplier to your liking
    }

    section.style.height = scrollHeight + 'px';

    window.addEventListener('scroll', () => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 0 && rect.bottom >= 0) {
        const progress = Math.min(-rect.top / (section.offsetHeight - window.innerHeight), 1);
        content.style.transform = `translateX(-${progress * (totalWidth - viewportWidth)}px)`;
      }
    });
  });
}

// Initial setup
setupHorizontalScroll();

// Optional: Recalculate on window resize
window.addEventListener('resize', () => {
  setupHorizontalScroll();
});