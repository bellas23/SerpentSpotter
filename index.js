document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-btn");

    // Function to trigger search
    function identifySnake() {
        let userInput = searchInput.value.toLowerCase().trim();  // Get the updated input value
       
        if (userInput === "") {
            let snakeCardsContainer = document.getElementById("snakeCards");
            snakeCardsContainer.innerHTML = "<p style='text-align: center;'>Please enter some snake features to search</p>";
            return;  // Exit the function early if input is empty
        }

        if (userInput !== "") {
            console.log("Searching for:", userInput);

            // Fetch data from data.json
            fetch("./data.json")
                .then(response => response.json())
                .then(mySnakes => {
                    let userFeatures = userInput.split(',').map(feature => feature.trim());
                    let filteredSnakes = mySnakes.snakes.filter(snake => {
                        let snakeFeatures = Object.values(snake.features).flat().map(feature => feature.toLowerCase());
                        return userFeatures.every(feature => snakeFeatures.includes(feature));
                    });
                    loadSnakes(filteredSnakes);
                });
        }
    }

    // Listen for button click
    searchButton.addEventListener("click", identifySnake);

    // Listen for Enter key press
    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();  // Prevent form submission (if applicable)
            identifySnake();  // Call the search function
        }
    });
});

function loadSnakes(filteredSnakes) {
    var snakeCardsContainer = document.getElementById("snakeCards");

    snakeCardsContainer.innerHTML = "";

    if (filteredSnakes.length === 0) {
        snakeCardsContainer.innerHTML = "<p style='text-align: center;'>No matching snakes found</p>";
        return; 
    }

    for (let i = 0; i < filteredSnakes.length; i++) {
        let snake = filteredSnakes[i];
        let name = snake.name;
        let summary = snake.summary;
        let url = snake.url;
        let features = snake.features;

        // Concatenate features into a comma-separated string
        let featuresString = Object.values(features).flat().join(", ");

        // Create card element
        let card = document.createElement("div");
        card.classList.add("col-md-4");

        // Populate card with snake data including features
        card.innerHTML = `
            <div class="card mb-4 shadow-sm card-shape">
                <img src="${url}" alt="${name}" class="card-img-top square-image">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <p><strong>Features: </strong>${featuresString}</p>
                    <p class="card-text" id="summary${i}"><strong>Description: </strong>${summary}</p>
                    <button onclick="toggleText(${i})" class="btn btn-primary">More</button>
                </div>
            </div>
        `;

        // Append card to container
        snakeCardsContainer.appendChild(card);
    }
}

function toggleText(index) {
    let summary = document.getElementById(`summary${index}`);
    let button = summary.parentElement.querySelector('button');

    if (summary.classList.contains('expanded')) {
        summary.classList.remove('expanded');
        button.textContent = 'More';
    } else {
        summary.classList.add('expanded');
        button.textContent = 'Less';
    }
}