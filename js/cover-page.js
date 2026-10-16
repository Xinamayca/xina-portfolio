// Project pages: the navbar is white while it sits over the dark cover image,
// and turns back to black once you scroll past the cover.
const cover = document.querySelector(".cv-cover");
const navbar = document.querySelector(".navbar");

if (cover && navbar) {
    navbar.classList.add("on-cover");

    // Only watch a thin strip at the top of the screen, where the navbar is
    const observer = new IntersectionObserver(
        ([entry]) => navbar.classList.toggle("on-cover", entry.isIntersecting),
        { rootMargin: "0px 0px -92% 0px" }
    );
    observer.observe(cover);
}
