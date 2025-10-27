const closeButton = $(".close-button");
const userButton = $(".user-button");
const sectionUserAdd = $(".section-user-add");
const form = $("#user-form");
const nameInput = $("#name-input");
const userNameInput = $("#user-name");
const emailInput = $("#email");
const phoneNumberInput = $("#phone-number");
const userTable = $("#user-table tbody");
const submitButton = $(".submit-btn");

let isEdit = false;
let editRow = null;

// Load users from localStorage
let users = JSON.parse(localStorage.getItem("users")) || [];

// Render table function
function renderTable() {
  userTable.empty();

  // Always show table header
  const tableHeader = `
    <tr class="table-header">
      <th>ID</th>
      <th>Full Name</th>
      <th>Username</th>
      <th>Email</th>
      <th>Phone</th>
      <th>Actions</th>
    </tr>
  `;
  userTable.append(tableHeader);

  users.forEach((user, index) => {
    const newRow = $(`
      <tr class="table-row">
        <td>${index + 1}</td>
        <td>${user.name}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td class="is-right">
          <button class="btn edit"><span class="material-symbols-outlined">edit</span></button>
          <button class="btn delete"><span class="material-symbols-outlined">delete</span></button>
        </td>
      </tr>
    `);
    userTable.append(newRow);
  });
  localStorage.setItem("users", JSON.stringify(users));
}

// Initial render
renderTable();

userButton.on("click", function () {
  sectionUserAdd.css("display", "flex");
});

closeButton.on("click", function () {
  sectionUserAdd.css("display", "none");
});

// Add / Edit
form.on("submit", function (e) {
  e.preventDefault();

  const newUser = {
    name: nameInput.val(),
    username: userNameInput.val(),
    email: emailInput.val(),
    phone: phoneNumberInput.val(),
  };

  if (!isEdit) {
    users.push(newUser);
  } else {
    const index = editRow.index();
    users[index] = newUser;
    isEdit = false;
    submitButton.val("Add User");
  }

  localStorage.setItem("users", JSON.stringify(users));
  renderTable();
  form[0].reset();
  sectionUserAdd.css("display", "none");
});

// Delete user
$(document).on("click", ".delete", function () {
  const index = $(this).closest("tr").index();
  users.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(users));
  renderTable();
});

// Edit user
$(document).on("click", ".edit", function () {
  isEdit = true;
  sectionUserAdd.css("display", "flex");
  editRow = $(this).closest("tr");
  const index = editRow.index();
  const user = users[index];

  nameInput.val(user.name);
  userNameInput.val(user.username);
  emailInput.val(user.email);
  phoneNumberInput.val(user.phone);
  submitButton.val("Save Changes");
});
