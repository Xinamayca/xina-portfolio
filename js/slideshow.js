document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    let slideIndex = 0;
    let interval;
  
    if (!slides.length) return;
  
    const showSlide = (index) => {
      slides.forEach(slide => slide.classList.remove('active'));
      slides[index].classList.add('active');
    };
  
    const nextSlide = () => {
      slideIndex = (slideIndex + 1) % slides.length;
      showSlide(slideIndex);
    };
  
    const prevSlide = () => {
      slideIndex = (slideIndex - 1 + slides.length) % slides.length;
      showSlide(slideIndex);
    };
  
    const startAutoSlide = () => {
      interval = setInterval(nextSlide, 3000);
    };
  
    const stopAutoSlide = () => clearInterval(interval);
  
    // Initialize slideshow
    showSlide(slideIndex);
    startAutoSlide();
  
    // Hover to pause
    const slideshow = document.getElementById('slideshow');
    slideshow.addEventListener('mouseover', stopAutoSlide);
    slideshow.addEventListener('mouseout', startAutoSlide);
  
    // Modal for full view
    slides.forEach(slide => {
      slide.addEventListener('click', () => {
        const modal = document.getElementById("fullscreenModal");
        const modalImg = document.getElementById("modalImage");
        modal.style.display = "block";
        modalImg.src = slide.src;
      });
    });
  
    document.getElementById("fullscreenModal").addEventListener("click", () => {
      document.getElementById("fullscreenModal").style.display = "none";
    });
  
    // Arrow controls
    document.getElementById("nextSlide").addEventListener("click", () => {
      stopAutoSlide();
      nextSlide();
      startAutoSlide();
    });
  
    document.getElementById("prevSlide").addEventListener("click", () => {
      stopAutoSlide();
      prevSlide();
      startAutoSlide();
    });
  });
  