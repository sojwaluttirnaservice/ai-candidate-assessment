import toast from "../../utils/toasts.js"

$(() => {


    const handleAdminLogout = async (e) => {
        e.preventDefault();

        try {

            const { data } = await axios.post('/api/v1/auth/logout');


            const { success, message } = data;
            if (success) {
                toast.success(message);
                setTimeout(() => {
                    window.open('/admin/login', '_self')
                }, 1000)
            }

        } catch (err) {
            toast.error(err?.response?.data?.message || 'Something went wrong')
        }
    }


    $(document).on("click", "#logout-btn", handleAdminLogout);

})