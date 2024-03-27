function searchRedirect() {
    var searchInput = document.getElementById('searchInput').value.toLowerCase();
    if (searchInput === 'slack') {
        window.location.href = '/product?prod=slack';
        return false; // Prevent form submission
    } else if (searchInput === 'discord') {
        window.location.href = '/product?prod=discord';
        return false; // Prevent form submission
    } else if (searchInput === 'steam') {
        window.location.href = '/product?prod=steam';
        return false; // Prevent form submission
    } else {
        alert('Not in the current version of this system! come back later');
        return false; // Prevent form submission
    }
}
