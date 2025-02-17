// Optional JavaScript for additional interactivity

// Smooth scrolling for anchor links (enhancement for browsers that may not support CSS smooth scroll)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    if (this.hash !== "") {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});
