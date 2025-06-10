 
    // Toggle mobile menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    

    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
      menuToggle.setAttribute('aria-expanded', !expanded);
      navLinks.classList.toggle('open');
    });

   document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");

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

      // Reset to 0 every time it's about to animate again
      counter.innerText = "0";
      updateCount();
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCounting(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
      observer.observe(counter);
    });
  });

       const text = document.getElementById('overlayText');
    const imageContainer = document.getElementById('imageContainer');

    window.addEventListener('scroll', () => {
      const rect = imageContainer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Only animate when image is in view
      if (rect.top < windowHeight && rect.bottom > 0) {
        const imageMiddle = rect.top + rect.height / 2;
        const scrollProgress = 1 - (imageMiddle / windowHeight); // 0 to 1

        // Clamp scrollProgress between 0 and 1
        const clamped = Math.max(0, Math.min(scrollProgress, 1));

        // Map progress from 100% (below) to -50% (centered vertically)
        const translateY = 100 - 150 * clamped;

        text.style.transform = `translate(-50%, ${translateY}%)`;
      }
    });

    var swiper = new Swiper(".mySwiper", {
      slidesPerView: 3,
      spaceBetween: 30,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

     var swiper1 = new Swiper(".mySwiper1", {
      pagination: {
        el: ".swiper-pagination",
        type: "progressbar",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });


const heroWrapper = document.querySelector('.hero-wrapper');
const hero = document.querySelector('.hero');
const overlay = document.querySelector('.bg-overlay');
const container = document.querySelector('.hero .container');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const wrapperTop = heroWrapper.offsetTop;
  const wrapperHeight = heroWrapper.offsetHeight;

  const progress = Math.min(Math.max((scrollTop - wrapperTop) / (wrapperHeight - window.innerHeight), 0), 1);

  // Expand overlay width from 0% to 100%
  overlay.style.width = `${progress * 100}%`;

  // Interpolate text color from black to white
  const text = Math.floor(0 + progress * 255);
  container.style.color = `rgb(${text}, ${text}, ${text})`;
});

const header = document.querySelector("header");
const navLink = document.querySelectorAll('.nav-link-text');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const wrapperTop = heroWrapper.offsetTop;
  const wrapperHeight = heroWrapper.offsetHeight;
  const windowHeight = window.innerHeight;
  const wrapperEnd = wrapperTop + wrapperHeight;

  // Calculate progress of scrolling through hero-wrapper
  const progress = Math.min(Math.max((scrollTop - wrapperTop) / (wrapperHeight - windowHeight), 0), 1);

  // 1. Before hero-wrapper starts
  if (scrollTop < wrapperTop) {
    header.style.backgroundColor = 'white';
    navLink.forEach(link => link.style.color = 'black');
  }

  // 2. While inside hero-wrapper
  else if (scrollTop >= wrapperTop && scrollTop < wrapperEnd) {
    header.style.backgroundColor = 'transparent';

    if (progress <= 0.61) {
      navLink.forEach(link => link.style.color = 'gray');
    } else {
      navLink.forEach(link => link.style.color = 'white');
    }

    // Update overlay animation
    overlay.style.width = `${progress * 100}%`;
  }

  // 3. After hero-wrapper ends
  else {
    header.style.backgroundColor = 'white';
    navLink.forEach(link => link.style.color = 'black');
  }
});

  const animatedText = document.getElementById('animatedText');
  const scrollSection = document.getElementById('scrollSection');

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


 


  document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector(".fade-section");
    const fadeText = section.querySelector(".fade-text");

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          section.classList.add("active");

          fadeText.classList.remove("animate");
          void fadeText.offsetWidth; // reflow trick
          fadeText.classList.add("animate");
        } else {
          section.classList.remove("active");
        }
      });
    }, { threshold: 0.5 });

    observer.observe(section);
  });


  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  });

  const frame = document.querySelector('.white-frame-container');
  observer.observe(frame);


document.addEventListener("DOMContentLoaded", () => {
  const menuLinks = document.querySelectorAll(".custom-nav-item");
  const sections = document.querySelectorAll("section");

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

//for our work
// function updateCardBodyClass() {
//   const elements = document.querySelectorAll('.card-body');
//   if (!elements.length) return; // Exit if no such elements

//   elements.forEach(el => {
//     if (window.innerWidth > 600) {
//       el.classList.remove('card-body');
//     } else {
//       if (!el.classList.contains('card-body')) {
//         el.classList.add('card-body');
//       }
//     }
//   });
// }

// document.addEventListener("DOMContentLoaded", () => {
//   updateCardBodyClass();
//   window.addEventListener("resize", updateCardBodyClass);
// });


//BacktoUp
document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("backToTopBtn");

    if (!btn) return; // Prevent error if button not found

    window.addEventListener("scroll", () => {
      if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        btn.style.display = "block";
      } else {
        btn.style.display = "none";
      }
    });

    btn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  });
