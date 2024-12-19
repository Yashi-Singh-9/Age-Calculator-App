document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("age-form");
  const dayInput = document.getElementById("day");
  const monthInput = document.getElementById("month");
  const yearInput = document.getElementById("year");
  const dayError = document.getElementById("day-error");
  const monthError = document.getElementById("month-error");
  const yearError = document.getElementById("year-error");
  const yearsResult = document.getElementById("years");
  const monthsResult = document.getElementById("months");
  const daysResult = document.getElementById("days");
  const submitButton = document.querySelector("button[type='submit']");

  // Event listener for button click
  submitButton.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default behavior
    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);
    const currentDate = new Date();
    let hasError = false;

    clearErrors();

    // Validate day
    if (!dayInput.value) {
      showError(dayInput, dayError, "This field is required");
      hasError = true;
    } else if (day < 1 || day > 31) {
      showError(dayInput, dayError, "Must be a valid day");
      hasError = true;
    }

    // Validate month
    if (!monthInput.value) {
      showError(monthInput, monthError, "This field is required");
      hasError = true;
    } else if (month < 1 || month > 12) {
      showError(monthInput, monthError, "Must be a valid month");
      hasError = true;
    }

    // Validate year
    if (!yearInput.value) {
      showError(yearInput, yearError, "This field is required");
      hasError = true;
    } else if (year > currentDate.getFullYear()) {
      showError(yearInput, yearError, "Must be in the past");
      hasError = true;
    }

    // Validate complete date
    if (!hasError) {
      const inputDate = new Date(year, month - 1, day);
      if (
        inputDate.getDate() !== day ||
        inputDate.getMonth() !== month - 1 ||
        inputDate.getFullYear() !== year ||
        inputDate > currentDate
      ) {
        showError(dayInput, dayError, "Must be a valid date");
        showError(monthInput, monthError, "");
        showError(yearInput, yearError, "");
        hasError = true;
      }
    }

    // If no errors, calculate age
    if (!hasError) {
      calculateAge(day, month, year, currentDate);
    }
  });

  // Function to clear errors
  function clearErrors() {
    [dayInput, monthInput, yearInput].forEach((input) => {
      input.classList.remove("error");
      input.previousElementSibling.classList.remove("error");
    });
    [dayError, monthError, yearError].forEach((error) => (error.textContent = ""));
  }

  // Function to show errors
  function showError(input, errorElement, message) {
    input.classList.add("error");
    input.previousElementSibling.classList.add("error");
    errorElement.textContent = message;
  }

  // Function to calculate age
  function calculateAge(day, month, year, currentDate) {
    let years = currentDate.getFullYear() - year;
    let months = currentDate.getMonth() + 1 - month;
    let days = currentDate.getDate() - day;

    if (days < 0) {
      months -= 1;
      days += new Date(year, month, 0).getDate(); // Add days of the previous month
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    displayResult(years, months, days);
  }

  // Function to display the result
  function displayResult(years, months, days) {
    yearsResult.textContent = years;
    monthsResult.textContent = months;
    daysResult.textContent = days;
  }
});
