/* filepath: /D:/Projects/Zil Travellers/zil_travelers/home/templates/home/script.js */
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navLinksItems = document.querySelectorAll(".nav-links a");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
    document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "auto";
    
    // Toggle search container visibility
    searchContainer.classList.toggle("active");
});

navLinksItems.forEach(item => {
    item.addEventListener("click", () => {
        if (navLinks.classList.contains("active")) {
            navLinks.classList.remove("active");
            hamburger.classList.remove("active");
            document.body.style.overflow = "auto";
        }
    });
});

// Show/hide search on mobile
const searchContainer = document.querySelector(".search-container");

// Handle search form submission
document.querySelector(".search-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = document.querySelector(".search-input").value;
    // Add your search logic here
    console.log("Searching for:", searchTerm);
});