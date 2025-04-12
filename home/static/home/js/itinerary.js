document.addEventListener('DOMContentLoaded', function() {
    const itineraryContainer = document.getElementById('itineraryContainer');
    let dayCounter = 1;

    // Add new day
    document.querySelector('.add-day-btn').addEventListener('click', function() {
        dayCounter++;
        const newDay = `
            <div class="day-section" data-day="${dayCounter}">
                <h3>Day ${dayCounter}</h3>
                <div class="titles-container">
                    <div class="title-section">
                        <input type="text" name="day${dayCounter}_title[]" placeholder="Enter title" required>
                        <div class="activities-container">
                            <div class="activity">
                                <input type="text" name="day${dayCounter}_activity[]" placeholder="Enter activity" required>
                                <button type="button" class="add-activity-btn">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                        </div>
                        <button type="button" class="add-title-btn">
                            <i class="fas fa-plus"></i> Add Another Title
                        </button>
                    </div>
                </div>
            </div>
        `;
        itineraryContainer.insertBefore(createElementFromHTML(newDay), document.querySelector('.add-day-btn'));
    });

    // Event delegation for adding titles and activities
    itineraryContainer.addEventListener('click', function(e) {
        if (e.target.closest('.add-title-btn')) {
            const daySection = e.target.closest('.day-section');
            const dayNum = daySection.dataset.day;
            const titleSection = `
                <div class="title-section">
                    <input type="text" name="day${dayNum}_title[]" placeholder="Enter title" required>
                    <div class="activities-container">
                        <div class="activity">
                            <input type="text" name="day${dayNum}_activity[]" placeholder="Enter activity" required>
                            <button type="button" class="add-activity-btn">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <button type="button" class="add-title-btn">
                        <i class="fas fa-plus"></i> Add Another Title
                    </button>
                </div>
            `;
            e.target.closest('.titles-container').insertAdjacentHTML('beforeend', titleSection);
        }

        if (e.target.closest('.add-activity-btn')) {
            const daySection = e.target.closest('.day-section');
            const dayNum = daySection.dataset.day;
            const activityHTML = `
                <div class="activity">
                    <input type="text" name="day${dayNum}_activity[]" placeholder="Enter activity" required>
                    <button type="button" class="add-activity-btn">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            `;
            e.target.closest('.activities-container').insertAdjacentHTML('beforeend', activityHTML);
        }
    });

    function createElementFromHTML(htmlString) {
        const div = document.createElement('div');
        div.innerHTML = htmlString.trim();
        return div.firstChild;
    }
});
