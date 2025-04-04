document.addEventListener('DOMContentLoaded', function () {

    // Get all the buttons with the attribute [data-role="dropdown-btn"]
    const dropdownButtons = document.querySelectorAll("[data-role='dropdown-btn']");

    // On page load, hide all the dropdown elements
    document.querySelectorAll("[data-dropdown]")?.forEach(dropdown => {
        dropdown.style.display = 'none'; // Set the display of all dropdowns to 'none' to hide them initially
        dropdown.style.maxHeight = '' // Reset height
        dropdown.style.overflowY = '' // Rest scroll
    });

    // Loop through each dropdown button and add event listeners
    dropdownButtons.forEach(dropdownButton => {

        // Add 'mouseenter' event listener on the button (hover event)
        dropdownButton.addEventListener('mouseenter', function () {

            // First, hide all dropdowns when the mouse enters the button
            document.querySelectorAll("[data-dropdown]").forEach(dropdown => {
                dropdown.style.display = 'none'; // Hides all dropdowns
            });

            // Get the target dropdown name from the button's data-dropdown-target attribute
            const targetDropdownName = dropdownButton.getAttribute('data-dropdown-target');

            // Select the target dropdown using the data-dropdown attribute that matches the value
            const targetDropdown = document.querySelector(`[data-dropdown=${targetDropdownName}]`);





            // If the target dropdown is found, make it visible by setting its display to 'block'
            if (targetDropdown) {
                targetDropdown.style.display = 'block'; // Show the dropdown by changing display to 'block'

                const dropdownElementsLength = targetDropdown.getAttribute('data-dropdown-elements-count') || 5;
                const dropdownElements = targetDropdown.querySelectorAll('[data-dropdown-element]');
 

                const visibleItems = Math.min(dropdownElements.length, dropdownElementsLength);

                if (dropdownElements.length > dropdownElementsLength) {
                    targetDropdown.style.height = 'auto'
                }


                // Hide the overflow items
                for (let i = 0; i < dropdownElements.length; i++) {
                    const currentDisplay = window.getComputedStyle(dropdownElements[i]).display; // Get current display style

                    // If current display is not set to flex or another value, set it to block, otherwise keep the current display style
                    if (i < visibleItems) {
                        if (currentDisplay === 'flex') {
                            dropdownElements[i].style.display = 'flex'; // Keep it as 'flex' if it's already set
                        } else {
                            dropdownElements[i].style.display = 'block'; // Otherwise set it to 'block'
                        }
                    } else {
                        // dropdownElements[i].style.display = 'none'; // Hide items beyond the visible limit
                    }
                }


                // Apply a scrollable container for the remaining items if needed
                if (dropdownElements.length > visibleItems) {
                    targetDropdown.style.maxHeight = `${visibleItems * 30}px`; // Adjust item height as needed (30px is an example)
                    targetDropdown.style.overflowY = 'auto'; // Add vertical scrollbar for overflow items
                } else {
                    targetDropdown.style.maxHeight = ''; // Reset maxHeight
                    targetDropdown.style.overflowY = ''; // Reset overflow
                }
            }
        });

        // Add 'mouseleave' event listener on the dropdown button
        dropdownButton.addEventListener('mouseleave', function (e) {
            // Get the target dropdown name from the button's data-dropdown-target attribute
            const targetDropdownName = dropdownButton.getAttribute('data-dropdown-target');
            // Select the target dropdown using the data-dropdown attribute that matches the value
            const targetDropdown = document.querySelector(`[data-dropdown=${targetDropdownName}]`);

            // If the target dropdown exists, add another 'mouseleave' event on it
            if (targetDropdown) {
                targetDropdown.addEventListener('mouseleave', function () {
                    targetDropdown.style.display = 'none'; // Hide the dropdown when mouse leaves the dropdown
                });
            }
        });
    });
});
