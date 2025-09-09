const menuIcon = document.querySelector("#menuicon");
const closeIcon = document.querySelector("#crossicon");
const sidebar = document.getElementById("sidebar");


menuIcon.addEventListener("click", () => {
  if (sidebar.classList.contains("sidebargo")) {
    // If sidebar is hidden, show it
    sidebar.classList.remove("sidebargo");
    menuIcon.style.display = "none";
    closeIcon.style.display = "inline-block";
  } else {
    // If sidebar is visible, hide it
    sidebar.classList.add("sidebargo");
    menuIcon.style.display = "inline-block";
    closeIcon.style.display = "none";
  }
});

// Close icon click
closeIcon.addEventListener("click", () => {
  sidebar.classList.add("sidebargo"); // hide sidebar
  closeIcon.style.display = "none";
  menuIcon.style.display = "inline-block";
});
