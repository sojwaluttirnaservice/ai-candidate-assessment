
$(() => {



    let selectedSkills = []





    const handleFetchCandidates = async () => {
        let skills = selectedSkills.map(skill => skill.id)
        const { data } = await axios.post('/api/v1/candidate/list', { skills })


        const { candidatesMatchingSkills } = data.data


        console.log(candidatesMatchingSkills)
        renderCandidates(candidatesMatchingSkills)
    }

    $(document).on('change', 'input[data-skill]', function () {

        const skillName = $(this).attr('data-skill-name');
        const skillId = $(this).val();



        if ($(this).is(':checked')) {
            // Add the skill to the selected skills list
            selectedSkills.push({ skill_name: skillName, id: skillId });
        } else {
            // Remove the skill from the selected skills list
            selectedSkills = selectedSkills.filter(skill => skill.id != skillId);
        }

        $('#selected-skills-count').text(selectedSkills.length ? selectedSkills.length : '0')

        renderSelectedSkills(selectedSkills)

        if (selectedSkills.length > 0) {
            handleFetchCandidates()
        } else {
            renderCandidates([])
        }

    })


    $(document).on('click', '[data-role="remove-skill-btn"]', function () {

        const skillId = $(this).attr('data-skill-id')

        selectedSkills = selectedSkills.filter(skill => skill.id != skillId)
        $(`input[id="filter-skill-${skillId}"]`).prop('checked', false);

        renderSelectedSkills(selectedSkills)
    })




    // /// Rendering logic

    function renderSelectedSkills(_skillsArray) {

        let selectedSkillsContainer = $('[data-role="selected-skills"]')

        selectedSkillsContainer.empty();
        const html =
            _skillsArray.map(_skill => {
                return (
                    `
            <span
                class="m-1 inline-flex rounded-full border border-gray-200 items-center py-1.5 pl-3 pr-2 text-sm font-medium bg-white text-gray-900">
                <span>${_skill.skill_name}</span>
                <button
                    data-skill-id="${_skill.id}"
                    type="button"
                    data-role="remove-skill-btn"
                    class="flex-shrink-0 ml-1 h-4 w-4 p-1 rounded-full inline-flex text-gray-400 hover:bg-gray-200 hover:text-gray-500">
                    <span class="sr-only">Remove filter for Objects</span>
                    <svg
                        class="h-2 w-2"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 8 8">
                        <path
                            stroke-linecap="round"
                            stroke-width="1.5"
                            d="M1 1l6 6m0-6L1 7" />
                    </svg>
                </button>
            </span>
            `
                )
            }).join('')

        selectedSkillsContainer.html(html)
    }


    function renderCandidates(_candidatesArray) {

        let candidatesListContainer = $('[data-role="candidate-list"]')
        let profileImageUrl = candidatesListContainer.attr('data-profileImageUrl')

        let html = _candidatesArray.map((_candidate, _index) => {
            return (
                `
                <li>
                    <a href="/resume/c/${_candidate.id}" class="block hover:bg-gray-50">
                        <div class="flex items-center px-4 py-4 sm:px-6">
                            <div class="min-w-0 flex-1 flex items-center">
                                <div class="flex-shrink-0">
                                    <img class="h-12 w-12 rounded-full" src="${profileImageUrl}/${_candidate.image_name}" alt="">
                                </div>
                                <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                    <div>
                                        <p class="text-sm font-medium text-indigo-600 truncate">${_candidate.name}</p>
                                        <p class="mt-2 flex items-center text-sm text-gray-500">
                                            <!-- Heroicon name: solid/mail -->
                                            <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                            </svg>
                                            <span class="truncate">${_candidate.email}</span>
                                            <span class="truncate"> &nbsp; EXPERIENCE: ${_candidate.years_of_experience} yrs</span>

                                        </p>
                                    </div>
                                    <div class="hidden md:block">
                                        <div>
                                            <p class="text-sm text-gray-900">
                                               Skills
                                              
                                            </p>
                                            <p class="mt-2 flex items-center text-sm text-gray-500">
                                                ${_candidate?.candidate_skills?.map(skill => {
                    return (
                        `<svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                                        </svg>
                                                        ${skill.skill_name}
                                                        `
                    )

                }).join(' ')}
                                                <!-- Heroicon name: solid/check-circle -->
                                                
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <!-- Heroicon name: solid/chevron-right -->
                                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </a>
                </li>

                `
            )
        })


        candidatesListContainer.html(html)
    }

})