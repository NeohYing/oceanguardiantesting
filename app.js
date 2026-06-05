// AOS

AOS.init({
    once: true
});

// Toggle sidebar and hamburger icon
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const hero = document.querySelector('.hero');
menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    if (hero) {
        hero.classList.toggle('shifted');
    }
    if (menuToggle.textContent === '☰') {
        menuToggle.textContent = '✕';
    } else {
        menuToggle.textContent = '☰';
    }
});

// Dropdown inside sidebar
document.querySelectorAll('.dropdown > a').forEach(item => {
    item.addEventListener('click', function (e) {
        e.preventDefault();
        const parent = this.parentElement;
        parent.classList.toggle('active');
    });
});

// Counter animation (stats section)
const counters = document.querySelectorAll('.counter');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.dataset.target;

            let count = 0;
            const increment = target / 100;

            const updateCounter = () => {
                if (count < target) {
                    count += increment;
                    counter.textContent = Math.ceil(count);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
            observer.unobserve(counter);
        }
    });
});

counters.forEach(counter => observer.observe(counter));

/* Featured Marine Aniamls Section */

const track = document.getElementById("slidertrack");
const next = document.getElementById("nextbtn");
const prev = document.getElementById("prevbtn");

const gap = 30;

next.addEventListener("click", () => {
    const cardWidth =
        track.querySelector(".animal-card").offsetWidth + gap;

    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(-${cardWidth}px)`;

    track.addEventListener(
        "transitionend",
        () => {
            track.appendChild(track.firstElementChild);
            track.style.transition = "none";
            track.style.transform = "translateX(0)";
        },
        { once: true }
    );
});

prev.addEventListener("click", () => {
    const cardWidth =
        track.querySelector(".animal-card").offsetWidth + gap;

    track.prepend(track.lastElementChild);
    track.style.transition = "none";
    track.style.transform = `translateX(-${cardWidth}px)`;

    requestAnimationFrame(() => {
        track.style.transition = "transform 0.5s ease";
        track.style.transform = "translateX(0)";
    });
});