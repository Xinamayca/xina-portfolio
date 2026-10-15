gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Phones and tablets already scroll smoothly by themselves; Lenis only adds work there
// and fights iOS momentum scrolling, so it's used for mouse/trackpad devices only.
const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

// Smooth scrolling with Lenis, driven by GSAP's ticker so ScrollTrigger stays in sync
if (!reduceMotion && !isTouch) {
    const lenis = new Lenis({ lerp: 0.1 });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Navbar links scroll smoothly through Lenis
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (e) => {
            const target = document.querySelector(link.getAttribute("href"));
            if (!target) return;
            e.preventDefault();
            lenis.scrollTo(target);
        });
    });
}

// On phones the browser bar shows/hides while scrolling, which resizes the viewport.
// Don't recalculate every animation when that happens, or they jump.
ScrollTrigger.config({ ignoreMobileResize: true });

// Logo animation: the logo is rendered large in CSS and scaled down,
// which keeps the text sharp and cheap to animate
gsap.set(".logo", { transformOrigin: "0 0" });

const mm = gsap.matchMedia();

// Desktop: logo shrinks into the top-left, Work section elements slide in
mm.add("(min-width: 769px)", () => {
    gsap.fromTo(".logo",
        { scale: 1, x: 40, y: 0 },
        {
            scrollTrigger: {
                trigger: "#section1",
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
            scale: 0.1,
            x: 0,
            ease: "none",
        }
    );

    // Project date animation in Section 2
    gsap.to("#section2 .project-date", {
        scrollTrigger: {
            trigger: "#section2",
            start: "top 70%",
            end: "top 5%",
            scrub: 1,
        },
        x: 75,
        opacity: 1,
        ease: "power2.out"
    });

    // Project object animation in Section 2
    gsap.to("#section2 .project-object img", {
        scrollTrigger: {
            trigger: "#section2",
            start: "top 60%",
            end: "top top",
            scrub: 1,
        },
        y: -125,
        x: -195,
        opacity: 1,
        ease: "power2.out"
    });

    gsap.fromTo(".shape-img",
        {
          y: 150,
        },
        {
          scrollTrigger: {
            trigger: "#section3",
            start: "20% 85%",
            end: "100% bottom",
            scrub: 1,
          },
          y: 0,
          opacity: 1,
          ease: "power2.out"
        }
    );
});

// Mobile: logo starts centred on the screen and shrinks into the navbar.
// The decorative Work image and About shape are hidden in CSS, so they aren't animated here.
mm.add("(max-width: 768px)", () => {
    // Measurements of the Horst lettering, relative to its font size:
    // the ink starts 2.5% below the top of the text box and is 110.5% tall.
    const logoFontSize = () => parseFloat(getComputedStyle(document.querySelector(".logo h1")).fontSize);
    const LOGO_TOP = 4; // matches .logo { top } in the mobile CSS

    gsap.fromTo(".logo",
        {
            scale: 1,
            // Centre the lettering vertically on the screen
            y: () => window.innerHeight / 2 - LOGO_TOP - logoFontSize() * (0.025 + 1.105 / 2),
        },
        {
            scrollTrigger: {
                trigger: "#section1",
                start: "top top",
                end: "60% top",
                scrub: 0.5, // a little smoothing hides iOS delivering scroll positions a frame late
                invalidateOnRefresh: true,
            },
            // End at about 34px on a 390px-wide phone, small enough to sit in the navbar
            scale: () => (window.innerWidth * 0.088) / logoFontSize(),
            y: 0,
            force3D: true, // keep the logo on its own GPU layer so Safari doesn't redraw it every frame
            ease: "none",
        }
    );

    // Projects fade up as they come into view
    gsap.utils.toArray("#section2 .project-title").forEach((title) => {
        // The "01 — date" label sits before the title (or its link), the description after it
        const block = title.closest("a") || title;
        const label = block.previousElementSibling;
        const description = block.nextElementSibling;

        gsap.from([label, title, description], {
            scrollTrigger: {
                trigger: title,
                start: "top 90%",
                toggleActions: "play none none reverse",
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
        });
    });
});

// Underline animation for project h1 elements
document.querySelectorAll("#section2 .project-title").forEach((title) => {
    // Create an underline element dynamically
    const underline = document.createElement("div");
    underline.style.position = "absolute";
    underline.style.left = "0";
    underline.style.width = title.getAttribute("data-underline-width") || "100%";
    underline.style.height = "2px"; // Adjust thickness if needed
    underline.style.backgroundColor = "black"; // Underline color
    underline.style.pointerEvents = "none"; // Prevent interaction
    title.style.position = "relative"; // Ensure the h1 is positioned relatively
    title.appendChild(underline);

    // Grow from the left with scaleX instead of width, so the browser doesn't re-layout every frame
    gsap.set(underline, { y: -8, scaleX: 0, transformOrigin: "left center" });

    // Hover effect
    title.addEventListener("mouseenter", () => {
        gsap.to(underline, { scaleX: 1, duration: 0.4, ease: "power3.out", overwrite: true });
    });

    title.addEventListener("mouseleave", () => {
        gsap.to(underline, { scaleX: 0, duration: 0.3, ease: "power3.out", overwrite: true });
    });
});
