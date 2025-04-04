import toast from "../../utils/toasts.js";
import modal from "../common/modalHandler.js";

$(() => {


    async function handleShortlistCandidate(e) {
        e.preventDefault();

        let shortlistData = new FormData(document.getElementById('shortlist-candidate-form'))


        try {

            const { data } = await axios.post('/api/v1/candidate/shortlist', shortlistData)

            let { success, message } = data;
            if (success) {
                toast.success(message)
                modal.close('shortlist-candidate-modal')
            } else {
                toast.error(message)
            }
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || "Unable to shortlist the candidate")
        }
    }

    $(document).on('click', '#shortlist-candidate-btn', handleShortlistCandidate)
})