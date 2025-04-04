import toast from "../../utils/toasts.js"
import modal from "../common/modalHandler.js";

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



    // IMAGE UPLOAD PART

    async function handleCandidateProfileImageUpload(e) {
        e.preventDefault();

        const formData = new FormData(document.getElementById('upload-image-form'))

        try {

            const { data } = await axios.put('/api/v1/candidate/upload-image', formData)

            const { success, message } = data

            if (success) {
                toast.success(message)
                modal.close('image-upload-modal')
                location.reload()
            } else {
                toast.error(message)
            }

        } catch (err) {
            console.error(err)
            toast.error(err?.response?.data?.message || 'Unable to change the profile')
        }
    }


    $(document).on('click', '#upload-candidate-image-btn', handleCandidateProfileImageUpload)



    // ASYNC FUNCTION FOR CHATTTING WITH GPT

    async function chatWithGPT(userMessage) {
        try {
            const { data: resData } = await axios.post('/api/v1/candidate/chat', { userMessage })

            let { success, message, data } = resData

            if (success) {
                let { chatResponse } = data;
                return chatResponse;
            }

        } catch (err) {
            console.error(err)
            toast.error(err?.response?.data?.message || 'Unable to chat with GPT')
        }

    }

    //GENERATE CANDIDATE oBJECTIVE 
    function getObjectivePrompt(candidate, skills, education) {
        if (!candidate || !skills || !education) {
            throw new Error("Candidate, skills, and education details are required.");
        }
    
        const skillList = skills.map(skill => skill.skill_name).join(", ") || "No skills listed";
        const educationList = education.map(edu =>
            `${edu.degree_type} in ${edu.specialization || "General"}`
        ).join(", ") || "No education details provided";
    
        return `
        Generate a one-line, first-person career objective for the following candidate profile:
        
        **Candidate Details:**
        - Years of Experience: ${candidate.years_of_experience}
        - Skills: ${skillList}
        - Education: ${educationList}
    
        The objective should be clear, concise, and highlight career goals in a single short sentence. Avoid headings or labels in the output.
        `;
    }
    


    async function handleGenerateObjective(e) {
        e.preventDefault();

        const button = $(this); // Capture the button
        const generateText = button.find("#generate-text");

        try {
            // Change the button text to "Generating..."
            generateText.html(`
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 animate-spin" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25"></circle>
                    <path fill="currentColor" class="opacity-75" d="M4 12a8 8 0 0116 0"></path>
                </svg>
                Generating...
            `);

            // Disable the button to prevent multiple clicks
            button.prop("disabled", true);

            // Get and parse candidate data
            let candidate = button.attr('data-candidate');
            candidate = candidate ? JSON.parse(candidate) : null;

            let skills = button.attr('data-candidate-skills');
            skills = skills ? JSON.parse(skills) : [];

            let education = button.attr('data-candidate-education');
            education = education ? JSON.parse(education) : [];

            // Generate the objective prompt
            let userMessage = getObjectivePrompt(candidate, skills, education);

            // API call to generate objective
            let chatResponse = await chatWithGPT(userMessage);
            console.log(chatResponse.content);

            // Update the textarea with the generated objective
            $("[name='candidate_objective']").val(chatResponse?.content);
        } catch (err) {
            console.error(err);
            alert(err?.response?.data?.message || err?.message || 'Unable to generate the objective');
        } finally {
            // Restore the button text to "Generate"
            generateText.html(`
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2l2.6 5.3L20 8l-4 4 1 5.6L12 14l-5 3 1-5.6-4-4 5.4-.7L12 2z"></path>
                    <path d="M5 19l2-2m10 2l-2-2m-6 2l2-2m6 2l-2-2"></path>
                </svg>
                Generate
            `);

            // Re-enable the button after completion
            button.prop("disabled", false);
        }
    }

    // Attach event listener to the button
    $(document).on('click', '#generate-objective-btn', handleGenerateObjective);




    // Summary part here

    // Generate concise summary (3 lines max)
    function getSummaryPrompt(candidate, skills, education) {
        if (!candidate || !skills || !education) {
            throw new Error("Candidate, skills, and education details are required.");
        }

        // Format skills into a readable string
        const skillList = skills.map(skill => skill.skill_name).join(", ") || "No skills listed";

        // Format education details into a readable string
        const educationList = education.map(edu =>
            `${edu.degree_type} in ${edu.specialization || "General"} from ${edu.institution_name} (${edu.passing_year})`
        ).join(", ") || "No education details provided";

        // Construct a concise prompt for a 3-line summary
        return `
    Generate a concise, first-person candidate summary (maximum 3 lines) based on the following profile:
    
    **Candidate Details:**
    - Gender: ${candidate.gender}
    - Years of Experience: ${candidate.years_of_experience}
    - Objective: ${candidate.candidate_objective || "No objective provided."}

    **Skills:** ${skillList}

    **Education:** ${educationList}

    The summary should be professional, engaging, and limited to 3 lines, highlighting the candidate's strengths and career focus in a single compact paragraph. Do not include any headings or labels in the output.
    `;
    }




    async function handleGenerateSummary(e) {
        e.preventDefault();

        const button = $(this); // Capture the button
        const generateText = button.find("#generate-text");

        try {
            // Change the button text to "Generating"
            generateText.html(`
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 animate-spin" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25"></circle>
                    <path fill="currentColor" class="opacity-75" d="M4 12a8 8 0 0116 0"></path>
                </svg>
                Generating...
            `);

            // Disable the button to prevent multiple clicks
            button.prop("disabled", true);

            // Get and parse candidate data
            let candidate = button.attr('data-candidate');
            candidate = candidate ? JSON.parse(candidate) : null;

            let skills = button.attr('data-candidate-skills');
            skills = skills ? JSON.parse(skills) : [];

            let education = button.attr('data-candidate-education');
            education = education ? JSON.parse(education) : [];

            // Generate the summary prompt
            let userMessage = getSummaryPrompt(candidate, skills, education);

            // API call to generate summary
            let chatResponse = await chatWithGPT(userMessage);
            console.log(chatResponse.content);

            // Update the textarea with the generated summary
            $("[name='candidate_summary']").val(chatResponse?.content);
        } catch (err) {
            console.error(err);
            alert(err?.response?.data?.message || err?.message || 'Unable to generate the summary');
        } finally {
            // Restore the button text to "Generate"
            generateText.html(`
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2l2.6 5.3L20 8l-4 4 1 5.6L12 14l-5 3 1-5.6-4-4 5.4-.7L12 2z"></path>
                    <path d="M5 19l2-2m10 2l-2-2m-6 2l2-2m6 2l-2-2"></path>
                </svg>
                Generate
            `);

            // Re-enable the button after completion
            button.prop("disabled", false);
        }
    }

    // Attach event listener to the button
    $(document).on('click', '#generate-summary-btn', handleGenerateSummary);

})