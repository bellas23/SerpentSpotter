fetch("./data.json")
    .then(response => response.json())
    .then(mySnakes => loadSnakes(mySnakes));

function loadSnakes(mySnakes) {
    var snakeCardsContainer = document.getElementById("snakeCards");

    for (let i = 0; i < mySnakes.snakes.length; i++) {
        let snake = mySnakes.snakes[i];
        let name = snake.name;
        let summary = snake.summary;
        let url = snake.url;

        // Create card element
        let card = document.createElement("div");
        card.classList.add("col-md-3");

        // Populate card with snake data
            card.innerHTML = `
            <div class="card mb-4 shadow-sm card-shape">
                <img src="${url}" alt="${name}" class="card-img-top square-image">
                <div class="card-body square-image">
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text" id="summary${i}">${summary}</p>
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