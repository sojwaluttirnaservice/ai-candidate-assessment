import toast from "../../utils/toasts.js"

$(() => {

    // HANDLING THE UPDATES
    const handleUpdatePersonalDetails = async (e) => {

        e.preventDefault();



        try {
            const personalDetails = new FormData(document.getElementById('personal-details-form'))
            const { data } = await axios.put('/api/v1/candidate', personalDetails)

            const { success, message } = data

            if (success) {
                toast.success(message)
                location.reload()
            } else {
                toast.error(message)
            }
        } catch (err) {
            console.error(err)
            toast.error(err?.response?.data?.message || 'Error while updating the details')
        }
    }

    $(document).on('click', "[data-role='update-personal-details-btn']", handleUpdatePersonalDetails);


    //    HANDLE THE SKILLS SECTION 

    async function handleSkillsUpdation(e) {
        e.preventDefault();



        try {

            const checkbox = $(e.target);

            // data-role="skill-checkbox"
            // data-candidate-id="<%= candidate.id%>"
            // type="checkbox"
            // name="skills"
            // id="<%= skill.name %>"
            // value="<%= skill.id %>"

            let isChecked = checkbox.is(':checked');

            console.log(isChecked)
            let checkboxData = {

                skill_id_fk: checkbox.val(),
                candidate_id_fk: checkbox.attr('data-candidate-id')
            }


            const { data } = isChecked
                ? await axios.post('/api/v1/candidate-skill', checkboxData)
                : await axios.delete('/api/v1/candidate-skill', { data: checkboxData });
            const { success, message } = data;

            if (success) {
                toast.success(message)
            } else {
                toast.error(message)
            }
        } catch (err) {
            console.error(err)
            toast.error(err?.response?.data?.message || 'Cannot update skill')
        }
    }

    $(document).on("change", "[data-role='skill-checkbox']", handleSkillsUpdation)



    async function handleUpdateEducationDetails(e) {
        e.preventDefault()

        let formIndex = $(this).attr('data-form-index')

        let form = document.getElementById(`candidate-education-form-${formIndex}`)

        const educationFormDetails = new FormData(form);


        try {

            const { data } = await axios.put('/api/v1/education', educationFormDetails)

            const { success, message } = data

            if (success) {
                toast.success(message)
                // location.reload()
            } else {
                toast.error(message)
            }

        } catch (err) {
            console.error(err)
            toast.error(err?.response?.data?.message || "Unable to update the education details")
        }
    }

    $(document).on('click', ".update-education-details-btn", handleUpdateEducationDetails)



    async function handleDeleteEducationDetails(e) {
        e.preventDefault()

        let educationId = $(this).attr('data-education-id')

        if (!educationId) {
            toast.error('Education ID is required to delete the details')
            return
        }

        let deleteData = { id: educationId }

        try {
            const { data } = await axios.delete('/api/v1/education', {
                data: deleteData
            })

            const { success, message } = data

            if (success) {
                toast.success(message)
                setTimeout(() => {
                    location.reload()
                }, [400])
            } else {
                toast.error(message)
            }

        } catch (err) {
            console.error(err)
            toast.error(err?.response?.data?.message || "Unable to delete the education details")
        }
    }

    $(document).on('click', '.delete-candidate-education-btn', handleDeleteEducationDetails)




    // Adding education details the new one


    async function handleAddEducationDetails(e) {
        e.preventDefault()


        let form = document.getElementById(`candidate-education-form`)

        const educationFormDetails = new FormData(form);


        try {

            const { data } = await axios.post('/api/v1/education', educationFormDetails)

            const { success, message } = data

            if (success) {
                toast.success(message)
                // location.reload()
                setTimeout(() => {
                    location.reload()
                }, [400])
            } else {
                toast.error(message)
            }


        } catch (err) {
            console.error(err)
            toast.error(err?.response?.data?.message || 'Unable to add education details')
        }

    }

    $(document).on('click', '#add-education-details-btn', handleAddEducationDetails)

    $(document).on('click', '#reset-education-details-btn', function (e) {
        e.preventDefault()
        let form = document.getElementById(`candidate-education-form`)
        form.reset()
    })
})