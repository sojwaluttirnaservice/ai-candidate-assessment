import toast from "../../utils/toasts.js"

$(() => {

  

    async function handleCandidateSignup(e) {

        e.preventDefault();


        try {
            let form = document.getElementById('candidate-form')



            let candidateData = new FormData(form)

            if (candidateData.get('password') != candidateData.get('confirm_password')) {
                toast.error('Password and Confirm password do not match')
                return;
            }

            const { data } = await axios.post('/api/v1/candidate', candidateData)

            let { success, message } = data;
            if (success) {
                toast.success('Signup successful')
                setTimeout(() => {
                    window.open('/auth/login', '_self')
                }, 500)
            } else {
                toast.error(message)
            }

        } catch (err) {

            console.error(err)

            toast.error(err?.response?.data?.message || 'Unable to signup')

        }
    }

    $(document).on('click', '#candidate-signup-btn', handleCandidateSignup)


})