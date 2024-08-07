// scripts.js

document.addEventListener("DOMContentLoaded", function() {
    const tocLinks = document.querySelectorAll('.toc a');
    let lastClickedLink = null;

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
            link.classList.toggle('active', i === index || link === lastClickedLink);
        });
    }

    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Prevent default behavior only for internal links
            if (href.startsWith('#')) {
                e.preventDefault();

                // Remove the active class from all links
                tocLinks.forEach(l => l.classList.remove('active'));

                // Add the active class to the clicked link
                this.classList.add('active');

                lastClickedLink = this;

                // Scroll smoothly to the section
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop,
                        behavior: 'smooth'
                    });
                }
            } else {
                // For external links, just add the active class and allow normal navigation
                tocLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                lastClickedLink = this;
            }
        });
    });

    window.addEventListener('scroll', updateActiveLink);
    window.addEventListener('resize', updateActiveLink);
    updateActiveLink(); // Initial check
});
