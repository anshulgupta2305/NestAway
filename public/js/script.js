document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("form").forEach((form) => {
    if (form.querySelector(".delete-action")) {
      form.addEventListener("submit", (event) => {
        const confirmed = window.confirm(
          "Are you sure you want to delete this listing?"
        );

        if (!confirmed) {
          event.preventDefault();
        }
      });
    }
  });
});
