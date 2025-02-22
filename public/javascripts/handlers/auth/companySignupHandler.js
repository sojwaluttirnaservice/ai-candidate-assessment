import toast from "../../utils/toasts.js";

$(() => {
    async function handleCompanySignup(e) {
        e.preventDefault();

        const signupButton = $("#company-signup-btn"); // Get the signup button
        const form = document.getElementById('company-form');
        const companyData = new FormData(form);

        // Validate password and confirm password
        if (companyData.get('password') !== companyData.get('confirm_password')) {
            toast.error('Password and Confirm password do not match');
            return;
        }

        try {
            // Disable button and change text to "Saving..."
            signupButton.prop("disabled", true).html("Saving...");

            // Make the API call
            const { data } = await axios.post('/api/v1/company', companyData);
            const { success, message } = data;

            if (success) {
                toast.success(message || 'Signup successful');
                setTimeout(() => window.open('/auth/login', '_self'), 500);
            } else {
                toast.error(message || 'Failed to sign up.');
            }
        } catch (err) {
            console.error("Signup Error:", err);
            toast.error(err?.response?.data?.message || 'Something went wrong');
        } finally {
            // Re-enable the button and restore original text
            signupButton.prop("disabled", false).html("Submit");
        }
    }

    // Event listener for the signup button
    $(document).on('click', '#company-signup-btn', handleCompanySignup);
});
