document.addEventListener("DOMContentLoaded", function () {

    document.querySelectorAll("[data-role='open-modal-btn']").forEach((btn) => {
        btn.addEventListener("click", () => {
            let modalId = btn.getAttribute("data-target-modal");
            if (modalId) {
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.style.display = "flex"; // Show the modal
                } else {
                    console.error(`Modal with ID '${modalId}' not found.`);
                }
            }
        });
    });


    document.querySelectorAll('[data-role="modal"]').forEach((modal) => {
        const closeButton = modal.querySelector('[data-role="close-modal-btn"]');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                modal.style.display = 'none'; // Hides the modal
            });
        }
    });
});



const modal = {

    close: (modalId) => {
        let modal = document.getElementById(modalId)

        if (modal) {
            modal.style.display = 'none'; // Hides all modals
        } else {
            console.error(`Modal with ID '${modalId}' not found.`);
        }
    },

    open: (modalId) => {
        let modal = document.getElementById(modalId)
        if (modal) {
            modal.style.display = 'flex'; // Shows the modal
        } else {
            console.error(`Modal with ID '${modalId}' not found.`);
        }
    }
}


export default modal