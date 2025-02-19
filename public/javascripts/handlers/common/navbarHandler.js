// Function to apply active class based on data-active attribute
function setActiveLink() {
    const links = document.querySelectorAll('[data-role="nav-link"]');

    // Check if there's an active page stored in localStorage
    const activePage = localStorage.getItem('activeNavLink');

    // Loop through all the links
    links.forEach(link => {
        const page = link.getAttribute('href').split('/').pop(); // Get the last part of the URL as identifier

        if (activePage && activePage === page) {
            // If the page in localStorage matches the link, set it as active
            link.setAttribute('data-active', 'true');
            link.classList.add('border-indigo-500', 'text-gray-900');
            link.classList.remove('border-transparent', 'text-gray-500');

            // Disable hover effect for active link
            link.addEventListener('mouseenter', function () {
                link.classList.remove('hover:border-gray-300', 'hover:text-gray-700');
            });

            link.addEventListener('mouseleave', function () {
                // Do nothing on hover-out to keep it active
            });
        } else {
            // If it doesn't match, set it as inactive
            link.setAttribute('data-active', 'false');
            link.classList.add('border-transparent', 'text-gray-500');
            link.classList.remove('border-indigo-500', 'text-gray-900');

            // Enable hover effect for inactive links
            link.addEventListener('mouseenter', function () {
                link.classList.add('hover:border-gray-300', 'hover:text-gray-700');
            });

            link.addEventListener('mouseleave', function () {
                link.classList.remove('hover:border-gray-300', 'hover:text-gray-700');
            });
        }
    });
}

// Function to update active page in localStorage
function updateActiveLink(event) {
    const clickedLink = event.target;
    const linkPage = clickedLink.getAttribute('href').split('/').pop(); // Get the identifier from URL
    localStorage.setItem('activeNavLink', linkPage); // Store the active link in localStorage

    // Re-apply active styles
    setActiveLink();
}

// On page load, apply the active link based on localStorage
window.addEventListener('load', setActiveLink);

// Add event listeners for click on nav links
document.querySelectorAll('[data-role="nav-link"]').forEach(link => {
    link.addEventListener('click', updateActiveLink);
});
