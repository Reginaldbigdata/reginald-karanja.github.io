// ================== SCROLL REVEAL & ANIMATIONS ==================
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");

                // Animate skill bars
                const bars = entry.target.querySelectorAll(".skill-progress");
                bars.forEach(bar => {
                    const level = bar.getAttribute("data-level");
                    bar.style.width = level + "%";
                });

                // Animate counters
                const counters = entry.target.querySelectorAll(".counter");
                counters.forEach(counter => {
                    const target = +counter.getAttribute("data-target");
                    let current = 0;
                    const increment = Math.ceil(target / 60);

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.innerText = current;
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target;
                        }
                    };

                    updateCounter();
                });

                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);

reveals.forEach(reveal => observer.observe(reveal));

// ================== NAVBAR ACTIVE LINK ==================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 60;
        const sectionId = section.getAttribute("id");

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === "#" + sectionId) {
                    link.classList.add("active");
                }
            });
        }
    });
});

// ================== COLLAPSIBLE PROJECT DETAILS ==================
document.querySelectorAll(".toggle-details").forEach(button => {
    button.addEventListener("click", () => {
        const details = button.nextElementSibling;
        details.classList.toggle("active");
        button.innerText = details.classList.contains("active") ? "Hide Details" : "Show Details";
    });
});

// ================== THEME TOGGLE ==================
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
    body.classList.add("light-theme");
    toggleBtn.textContent = "☀️";
}

toggleBtn.addEventListener("click", () => {
    body.classList.toggle("light-theme");
    const isLight = body.classList.contains("light-theme");
    toggleBtn.textContent = isLight ? "☀️" : "🌙";
    localStorage.setItem("theme", isLight ? "light" : "dark");
});

// ================== SCROLL PROGRESS INDICATOR ==================
const progressBar = document.getElementById("scroll-progress");
window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + "%";
});

// ================== AUTO UPDATE FOOTER YEAR ==================
document.getElementById("year").textContent = new Date().getFullYear();

// ================== CV DOWNLOAD TRACKING ==================
function setupCVTracking(btnId, storageKey) {
    const btn = document.getElementById(btnId);
    if (btn) {
        btn.addEventListener("click", () => {
            let clicks = localStorage.getItem(storageKey);
            clicks = clicks ? parseInt(clicks) + 1 : 1;
            localStorage.setItem(storageKey, clicks);
            console.log(`${btnId} clicked ${clicks} times`);
        });
    }
}
setupCVTracking("cv-download", "cvClicks");
setupCVTracking("cv-download-sticky", "stickyCvClicks");

const metric = document.getElementById("cv-metric");
if (metric) {
    metric.textContent = `CV Downloads: ${localStorage.getItem("cvClicks") || 0}`;
}

// ================== STICKY CV BUTTON ON SCROLL ==================
const stickyCV = document.querySelector(".sticky-cv");
window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        stickyCV.style.opacity = "1";
        stickyCV.style.transform = "translateY(0)";
    } else {
        stickyCV.style.opacity = "0";
        stickyCV.style.transform = "translateY(20px)";
    }
});
