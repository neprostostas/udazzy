document.addEventListener("DOMContentLoaded", () => {

    function onOffline() {
        const element = document.querySelector(".no-internet");
        element.classList.add("active");
    }

    function onOnline() {
        const element = document.querySelector(".no-internet");
        element.classList.remove("active");
    }

    // Attach event listeners to handle online and offline events
    window.addEventListener("offline", onOffline);
    window.addEventListener("online", onOnline);

    // Check the initial online/offline status
    if (navigator.onLine) onOnline();
    else onOffline();

});