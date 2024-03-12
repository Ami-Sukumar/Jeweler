// Get all the grid container elements
const gridContainers = document.querySelectorAll(".grid-container");

// Add mousemove event listener to each grid container
gridContainers.forEach(function(gridContainer) {
    gridContainer.addEventListener("mousemove", function(event) {
        // Calculate the vertical position of the cursor relative to the grid container
        const posY = event.clientY - gridContainer.getBoundingClientRect().top;

        // Set the scrollTop property of the grid container based on cursor position
        gridContainer.scrollTop = posY;
    });
});
