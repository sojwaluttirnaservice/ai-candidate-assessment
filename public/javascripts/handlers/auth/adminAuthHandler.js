import toast from "../../utils/toasts.js";



const handleLogin = async (loginDetails) => {
    try {

        const { data } = await axios.post("/api/v1/auth/login", loginDetails);

        console.log(data)

        const { success, message } = data

        if (success) {
            toast.success(message)
            setTimeout(() => {
                window.location.href = "/admin/dashboard" 
            }, 100)
        } else {
            toast.error(message)
        }
    } catch (err) {
        console.error(err);
        toast.error(err?.response?.data?.message || "Something went wrong")
    }
}




$(document).on('click', '#login-btn', function (e) {
    e.preventDefault();

    const loginDetails = new FormData(document.getElementById('login-form'));
    handleLogin(loginDetails)
})