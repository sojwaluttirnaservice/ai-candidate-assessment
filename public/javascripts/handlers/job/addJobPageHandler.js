import toast from "../../utils/toasts.js"

$(() => {

    // $('.datepicker').datepicker();

    const handleSaveJob = async (jobData) => {
        const saveButton = document.querySelector('#save-job-btn');

        // Disable the button and change the text to "Saving..."
        saveButton.disabled = true;
        saveButton.textContent = 'Saving...';

        try {
            let { data } = await axios.post('/api/v1/job', jobData);

            const { success, message } = data;

            if (success) {
                toast.success(message);
                setTimeout(() => {
                    window.open('/job', '_self');
                }, 500);
            } else {
                toast.error(message);
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Something went wrong');
        } finally {
            // Re-enable the button and restore the original text
            saveButton.disabled = false;
            saveButton.textContent = 'Save Job'; // Change this to your original button text
        }
    }

    $(document).on('click', '#save-job-btn', function (e) {
        e.preventDefault();

        const jobData = new FormData(document.querySelector('#job-form'));

        handleSaveJob(jobData);
    });

});
