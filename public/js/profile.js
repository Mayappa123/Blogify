document.addEventListener("DOMContentLoaded", function () {
  const userActive = document.querySelector(".activeUser");
  const container3 = document.querySelector(".container3");
  // const close = document.querySelector(".close");

  container3.style.display = "none";

  function toggleContainer3() {
    const container3 = document.querySelector(".container3");
    if (container3.style.display === "none") {
      container3.style.display = "block";
      container3.style.display = "none";
    }
  }

  // function closeContainer3() {
  //   container3.style.display = "none";
  // }

  userActive.addEventListener("click", toggleContainer3);
  // close.addEventListener("close", closeContainer3);
});
