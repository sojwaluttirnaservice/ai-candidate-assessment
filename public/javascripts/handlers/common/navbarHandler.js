// Function to apply active class based on the full path after the domain
function setActiveLink() {
    const links = document.querySelectorAll('[data-role="nav-link"]');
    const currentPath = window.location.pathname; // Get full path after domain

    links.forEach(link => {
        const linkPath = new URL(link.href, window.location.origin).pathname; // Convert to absolute path

        if (currentPath === linkPath) {
            // Mark as active if the full path matches
            link.setAttribute('data-active', 'true');
            link.classList.add('border-indigo-500', 'text-gray-900');
            link.classList.remove('border-transparent', 'text-gray-500');

            // Disable hover effect for active link
            link.removeEventListener('mouseenter', addHoverEffect);
            link.removeEventListener('mouseleave', removeHoverEffect);
        } else {
            // Mark as inactive if the path does not match
            link.setAttribute('data-active', 'false');
            link.classList.add('border-transparent', 'text-gray-500');
            link.classList.remove('border-indigo-500', 'text-gray-900');

            // Enable hover effects for inactive links
            link.addEventListener('mouseenter', addHoverEffect);
            link.addEventListener('mouseleave', removeHoverEffect);
        }
    });
}

// Function to handle hover effect
function addHoverEffect(event) {
    event.target.classList.add('hover:border-gray-300', 'hover:text-gray-700');
}

// Function to remove hover effect
function removeHoverEffect(event) {
    event.target.classList.remove('hover:border-gray-300', 'hover:text-gray-700');
}

// Function to update active link when a navigation link is clicked
function updateActiveLink(event) {
    const clickedLink = event.target.closest('[data-role="nav-link"]');
    if (!clickedLink) return;

    const linkPath = new URL(clickedLink.href, window.location.origin).pathname;
    history.pushState(null, '', clickedLink.href); // Update URL without reloading

    setActiveLink(); // Re-apply active styles
}

// Apply active link styles on page load
window.addEventListener('load', setActiveLink);

// Attach click event listeners to navigation links
document.querySelectorAll('[data-role="nav-link"]').forEach(link => {
    link.addEventListener('click', updateActiveLink);
});
