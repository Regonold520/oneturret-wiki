// scripts.js

document.addEventListener("DOMContentLoaded", function() {
    const tocLinks = document.querySelectorAll('.toc a');

    function updateActiveLink() {
        let index = -1;
        const viewportHeight = window.innerHeight;

        tocLinks.forEach((link, i) => {
            const section = document.querySelector(link.getAttribute('href'));
            if (section) {
                const sectionTop = section.getBoundingClientRect().top;
                const sectionBottom = section.getBoundingClientRect().bottom;

                // Check if the section is in the viewport middle
                if (sectionTop < viewportHeight / 2 && sectionBottom > viewportHeight / 2) {
                    index = i;
                }
            }
        });

        tocLinks.forEach((link, i) => {
            link.classList.toggle('active', i === index);
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    window.addEventListener('resize', updateActiveLink);
    updateActiveLink(); // Initial check
});
