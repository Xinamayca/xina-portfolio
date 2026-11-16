// Project pages: highlight the section you're reading in the sticky index on the left
const indexLinks = document.querySelectorAll(".cs-index a");

if (indexLinks.length) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                indexLinks.forEach((link) =>
                    link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id)
                );
            });
        },
        // A section counts as "being read" when it crosses a line just above the middle of the screen
        { rootMargin: "-40% 0px -55% 0px" }
    );

    document.querySelectorAll(".cs-section").forEach((section) => observer.observe(section));
}
