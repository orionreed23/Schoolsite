// ===== Hero Carousel (Local Images) =====
const heroSections = document.querySelectorAll(".hero, .about-hero");
const imageFolder = "../images/carousel";
const totalImages = 4; // increase when you add more later
let images = [];

// build array of image paths
for (let i = 1; i <= totalImages; i++) {
  images.push(`${imageFolder}/${i}.jpg`);
}

heroSections.forEach(section => {
  const slides = section.querySelectorAll(".slide");
  slides.forEach((slide, idx) => {
    // loop images for however many slides exist
    const imgIndex = idx % images.length;
    slide.style.backgroundImage = `url('${images[imgIndex]}')`;
    slide.style.backgroundSize = "cover";
    slide.style.backgroundPosition = "center";
  });

  let current = 0;
  setInterval(() => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }, 5000);
});

// ===== Stats Reveal on Scroll =====
const statCards = document.querySelectorAll(".stat-card");
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");

        const number = entry.target.querySelector("h3");
        if (number) {
          animateCount(number);
        }

        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

statCards.forEach(card => observer.observe(card));

function animateCount(el) {
  const target = parseFloat(el.getAttribute("data-target"));
  const suffix = el.getAttribute("data-suffix") || "";
  const duration = 2000; // 2 seconds
  const startTime = performance.now();

  function updateCount(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);

    let current = target * eased;

    // Handle formatting
    if (suffix === "K") {
      // Students: show one decimal (e.g., 2.9K)
      el.textContent = current.toFixed(1) + suffix;
    } else if (suffix === "%") {
      // Marks: allow one decimal place
      el.textContent = current.toFixed(1) + suffix;
    } else {
      // Teachers: integer only
      el.textContent = Math.floor(current) + suffix;
    }

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    }
  }

  requestAnimationFrame(updateCount);
}

// ===== Testimonials: pause on hover/touch =====
(function () {
  const slider = document.querySelector('.testimonial-slider');
  const track  = document.querySelector('.testimonial-track');
  if (!slider || !track) return; // only runs where the slider exists

  const pause  = () => {
    // inline style + class for maximum reliability
    track.style.setProperty('animation-play-state', 'paused', 'important');
    slider.classList.add('paused');
  };
  const resume = () => {
    track.style.setProperty('animation-play-state', 'running', 'important');
    slider.classList.remove('paused');
  };

  slider.addEventListener('mouseenter', pause);
  slider.addEventListener('mouseleave', resume);
  slider.addEventListener('touchstart', pause, { passive: true });
  slider.addEventListener('touchend', resume);
  slider.addEventListener('touchcancel', resume);

  // ensure it starts running
  resume();
})();

lucide.createIcons();