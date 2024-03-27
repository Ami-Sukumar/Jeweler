function searchRedirect() {
    var searchInput = document.getElementById('searchInput').value.toLowerCase();

 // Check if searchInput is empty
    if (searchInput === '') {
        alert('Please enter a search term!');
        return false; // Prevent form submission
    }

    // Check if searchInput contains unexpected characters
    var inval = /^[a-zA-Z0-9\s]+$/; // Regular expression to allow only letters, numbers, and spaces
    if (!inval.test(searchInput)) {
        alert('Invalid characters entered! Please use only letters, numbers, and spaces.');
        return false; // Prevent form submission
    }

    // Handle valid search terms
    if (searchInput === 'slack') {
        window.location.href = '/slack.html?prod=slack';
        return false; // Prevent form submission
    } else if (searchInput === 'discord') {
        window.location.href = '/discord.html?prod=discord';
        return false; // Prevent form submission
    } else if (searchInput === 'steam') {
        window.location.href = '/steam.html?prod=steam';
        return false; // Prevent form submission
    } else {
        alert('Not in the current version of this system! come back later');
        return false; // Prevent form submission
    }
}