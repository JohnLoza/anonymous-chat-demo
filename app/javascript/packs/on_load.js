document.addEventListener("turbolinks:load", () => {
  // submit on enter
  $("[data-submit-on-enter]").on("keydown", (event) => {
    submitParentForm(event);
  });

  function submitParentForm(event) {
    if (event.keyCode === 13) {
      if (event.shiftKey)
        return;
      event.preventDefault();
      const form = $(event.target).parents('form')[0];
      $(form).children('[type=submit]').click();
    }
  }
  // submit on enter
});
