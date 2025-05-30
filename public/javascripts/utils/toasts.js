const toast = {
    success: (_message) => {
        Toastify({
            text: _message,
            duration: 2000,
            className: "!bg-green-600 text-white",
            style: {
                background: "linear-gradient(to right, #4caf50, #2e7d32)",
            },
        }).showToast(); // Display success message if save is successful
    },

    error: (_message, style = {}) => {
        Toastify({
            text: _message,
            duration: 2000,
            style: {
                background: "linear-gradient(to right, #ff7e7e, #ff3f3f)",
            },
        }).showToast();
    },

    warning: "",
    info: "",
};

export default toast;
