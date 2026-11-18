// Project pages: click an image to see it large. Close with the ✕, a click on the background or Esc;
// flip through the page's images with the arrows or the ← → keys.
const lightboxImages = [...document.querySelectorAll(".cs-content img:not(.no-lightbox)")];

if (lightboxImages.length) {
    const box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Image viewer");
    box.hidden = true;
    box.innerHTML = `
        <button class="lightbox-close" aria-label="Close">✕</button>
        <button class="lightbox-prev" aria-label="Previous image">←</button>
        <figure class="lightbox-figure">
            <img class="lightbox-img" alt="" />
            <figcaption class="lightbox-caption"></figcaption>
        </figure>
        <button class="lightbox-next" aria-label="Next image">→</button>
    `;
    document.body.appendChild(box);

    const img = box.querySelector(".lightbox-img");
    const caption = box.querySelector(".lightbox-caption");
    const multiple = lightboxImages.length > 1;
    box.querySelector(".lightbox-prev").hidden = !multiple;
    box.querySelector(".lightbox-next").hidden = !multiple;

    let current = 0;
    let lastFocus = null;

    const show = (index) => {
        current = (index + lightboxImages.length) % lightboxImages.length;
        const source = lightboxImages[current];
        img.src = source.currentSrc || source.src;
        img.alt = source.alt;
        // Use the figure's caption if there is one, otherwise the image description
        const figcaption = source.closest("figure")?.querySelector("figcaption");
        caption.textContent = figcaption ? figcaption.textContent : source.alt;
    };

    const open = (index) => {
        lastFocus = document.activeElement;
        show(index);
        box.hidden = false;
        document.documentElement.classList.add("lightbox-open");
        box.querySelector(".lightbox-close").focus();
    };

    const close = () => {
        box.hidden = true;
        document.documentElement.classList.remove("lightbox-open");
        if (lastFocus) lastFocus.focus();
    };

    lightboxImages.forEach((image, index) => {
        image.classList.add("lightbox-trigger");
        image.tabIndex = 0;
        image.setAttribute("role", "button");
        image.addEventListener("click", () => open(index));
        image.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                open(index);
            }
        });
    });

    box.querySelector(".lightbox-close").addEventListener("click", close);
    box.querySelector(".lightbox-prev").addEventListener("click", (e) => { e.stopPropagation(); show(current - 1); });
    box.querySelector(".lightbox-next").addEventListener("click", (e) => { e.stopPropagation(); show(current + 1); });
    // Clicking the dark background (not the image itself) closes it
    box.addEventListener("click", (e) => { if (e.target === box || e.target.classList.contains("lightbox-figure")) close(); });

    document.addEventListener("keydown", (e) => {
        if (box.hidden) return;
        if (e.key === "Escape") close();
        if (multiple && e.key === "ArrowLeft") show(current - 1);
        if (multiple && e.key === "ArrowRight") show(current + 1);
    });
}
