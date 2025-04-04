import toast from "../../utils/toasts.js";

$(() => {



    $(document).on('click', '[data-role="company-logout-btn"]', async function (e) {
        e.preventDefault()

        try {

            const { data } = await axios.post('/api/v1/auth/logout');

            const { success, message } = data;
            if (success) {
                toast.success(message);
                setTimeout(() => {
                    window.open('/auth/login', '_self')
                }, 1000)
            }

        } catch (err) {
            toast.error(err?.response?.data?.message || 'Something went wrong')
        }
    })



    // HANLDE TOGGLING THE MOBILE MENU FOR THE COMPANY NAVBAR

    // HANLDE TOGGLING THE MOBILE MENU FOR THE COMPANY NAVBAR
    $(document).on('click', '[data-role="mobile-menu-btn"]', function (e) {
        e.preventDefault();

        // Find the mobile menu element
        const mobileMenu = $('[data-role="mobile-menu"]');

        // Check if the menu is currently visible
        const currentDisplay = mobileMenu.css('display');

        if (currentDisplay === 'none') {
            // Fade in the menu and change the display to block
            mobileMenu.stop(true, true).fadeIn(300); // 300ms fade-in duration
        } else {
            // Fade out the menu and change the display to none
            mobileMenu.stop(true, true).fadeOut(300); // 300ms fade-out duration
        }
    });



})