// JavaScript
document.addEventListener("DOMContentLoaded", function () {
  const profileIcon = document.querySelectorAll("activeUser");
  const profileSection = document.querySelectorAll("container3");

  // Add click event listener to profile icon
  profileIcon.addEventListener("click", function (event) {
    event.preventDefault();

    // Toggle the visibility of the profile section
    if (profileSection.style.display === "none") {
      profileSection.style.display = "block";
      document.body.style.opacity("0.7"); // Add class to adjust opacity
    } else {
      profileSection.style.display = "none";
      document.body.style.opacity("0.7"); // Remove class
    }
  });
});
