document.addEventListener('DOMContentLoaded', () => {
    const tocRight = document.querySelector('.sidebar-right');
    const tocLeft = document.querySelector('.sidebar-left');
    const tocLinks = Array.from(tocRight.querySelectorAll('a'));
    const content = document.querySelector('.content');
    let lastClickedLink = null;

    function updateActiveLink() {
        let index = -1;
        const viewportHeight = window.innerHeight;

        tocLinks.forEach((link, i) => {
            const section = document.querySelector(link.getAttribute('href'));
            if (section) {
                const sectionTop = section.getBoundingClientRect().top;
                const sectionBottom = section.getBoundingClientRect().bottom;

                if (sectionTop < viewportHeight / 2 && sectionBottom > viewportHeight / 2) {
                    index = i;
                }
            }
        });

        tocLinks.forEach((link, i) => {
            link.classList.toggle('active', i === index || link === lastClickedLink);
        });
    }

    function updateLeftTOC(subCategories) {
        tocLeft.innerHTML = ''; // Clear existing content
        if (subCategories && subCategories.length > 0) {
            subCategories.forEach(subCategory => {
                const link = document.createElement('a');
                link.href = subCategory.href;
                link.textContent = subCategory.text;
                tocLeft.appendChild(link);
            });
            tocLeft.classList.add('active'); // Show the left TOC
        } else {
            tocLeft.classList.remove('active'); // Hide the left TOC if no sub-categories
        }
    }

    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href.startsWith('#')) {
                e.preventDefault();

                tocLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                lastClickedLink = this;

                const targetSection = document.querySelector(href);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop,
                        behavior: 'smooth'
                    });
                }
            } else {
                // Handle page navigation and update left TOC
                tocLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                lastClickedLink = this;

                // Simulate fetching sub-categories based on clicked link
                const subCategories = {
                    'producers.html': [
                        { href: 'producers/drill.html', text: 'Drill' }
                    ]
                    // Add more categories and their sub-categories here
                };

                updateLeftTOC(subCategories[href.split('/').pop()]);

                // Simulate fetching sub-categories and then navigating
                setTimeout(() => {
                    window.location.href = href;
                }, 100); // Delay navigation to ensure TOC update
            }
        });
    });

    window.addEventListener('scroll', updateActiveLink);
    window.addEventListener('resize', updateActiveLink);
    updateActiveLink(); // Initial check
});
