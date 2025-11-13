const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

document.addEventListener("contextmenu", (event) => event.preventDefault());
document.onkeydown = function (e) {
  if (e.keyCode == 123) return false; // F12
  if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) return false; // Ctrl+Shift+I
  if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) return false; // Ctrl+U
  if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) return false; // Ctrl+Shift+J
};

// 1. Find the form
const signupForm = document.getElementById("signup-form");

// 2. Listen for the 'submit' event
signupForm.addEventListener("submit", function (event) {
  // Prevent the form from doing a page reload
  event.preventDefault();

  // 3. Get the values from the form
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // 4. Get existing users from localStorage, or create a new empty array
  // We must use JSON.parse and JSON.stringify because localStorage only stores strings
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // 5. Add the new user object to the array
  users.push({
    username: username,
    email: email,
    password: password, // (Again, don't store plain text passwords in a real app!)
  });

  // 6. Save the updated array back into localStorage
  localStorage.setItem("users", JSON.stringify(users));

  alert("User saved to browser storage!");

  // 7. Reset the form
  signupForm.reset();
});

function togglePassword(id, btn) {
  const input = document.getElementById(id);

  if (input.type === "password") {
    input.type = "text";
    btn.textContent = "🙈"; // change icon to hide
  } else {
    input.type = "password";
    btn.textContent = "👁"; // change icon to show
  }
}
document.querySelectorAll("input").forEach((input) => {
  // Block emojis
  input.addEventListener("input", function () {
    this.value = this.value.replace(
      /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}]/gu,
      ""
    );
  });

  // Block copy/paste
  input.addEventListener("copy", (e) => e.preventDefault());
  input.addEventListener("paste", (e) => e.preventDefault());
  input.addEventListener("cut", (e) => e.preventDefault());
});
