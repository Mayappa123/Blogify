document.addEventListener("DOMContentLoaded", function () {
  const profileIcon = document.getElementById("profile-icon");
  const profileContainer = document.getElementById("profile-container");

  // Initially hide the profile container
  profileContainer.style.display = "none";

  // Add click event listener to profile icon
  profileIcon.addEventListener("click", function (event) {
    event.preventDefault();
    // Toggle the visibility of the profile container
    if (profileContainer.style.display === "none") {
      profileContainer.style.display = "block";
    } else {
      profileContainer.style.display = "none";
    }
  });
});
