export function initFormSubmit() {
  const forms = document.querySelectorAll("form");

  if (!forms) {
    return;
  }

  forms.forEach((form) => {
    const formSubmitButton = form.querySelector(".button.form-submit");
    const submitButton = form.querySelector(".submit-button");
    const label = form.querySelector(".button-label");

    if (!formSubmitButton || !submitButton) {
      return;
    }
  
    // add event listener to the form submit button
    formSubmitButton.addEventListener("click", function (e) {
      e.preventDefault(); // prevent the default action
      // check if the form is valid
      if (form.checkValidity()) {
        // if valid, submit the form and change the button text
        submitButton.click();
        
        label.textContent = submitButton.getAttribute("data-wait");
      } else {
        // if not valid, report validity (this will show the HTML5 validation messages)
        form.reportValidity();
      }
    });
  });
}