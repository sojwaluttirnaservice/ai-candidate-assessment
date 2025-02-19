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
})