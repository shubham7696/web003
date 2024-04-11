function setListeners() {
  const inputFields = document.querySelectorAll(
    'input[type="text"], input[type="email"],  input[type="number"] '
  );
  inputFields.forEach((field) => {
    field.addEventListener("keyup", () => {
      const fieldParent = field.parentElement;
      fieldParent.classList.remove("error");
    });
  });

  // Similar event listener for gender selection (optional)
  const genderRadios = document.querySelectorAll('input[type="radio"]');
  genderRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      const genderContainer = document.querySelector(".gender-error-container");
      genderContainer.classList.remove("error"); // Remove error class on change
    });
  });
}

function validateForm() {
  var form = document.getElementById("myForm");

  var firstName = document.getElementById("firstName").value.trim();
  var lastName = document.getElementById("lastName").value.trim();
  var email = document.getElementById("email").value.trim();
  var phone = document.getElementById("phone").value.trim();
  var password = document.getElementById("password").value.trim();
  var gender = document.getElementById("male").checked
    ? true
    : document.getElementById("female").checked
    ? true
    : false;
  var country = document.getElementById("country").value;
  var terms = document.getElementById("terms").checked;

  var errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((message) => (message.textContent = ""));

  if (firstName === "") {
    const firstNameError = document.getElementById("firstNameError");
    firstNameError.textContent = "First Name is required";
  }

  if (lastName === "") {
    const lastNameError = document.getElementById("lastNameError");
    lastNameError.textContent = "Last Name is required";
  }

  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    const emailError = document.querySelector("#email").parentElement;
    emailError.classList.add("error");
    emailError.querySelector(".error-message").textContent =
      "Invalid Email format";
  }

  var phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone)) {
    const emailError = document.querySelector("#phone").parentElement;
    emailError.classList.add("error");
    emailError.querySelector(".error-message").textContent =
      "Invalid Phone format";
  }

  if (password === "") {
    const emailError = document.querySelector("#password").parentElement;
    emailError.classList.add("error");
    emailError.querySelector(".error-message").textContent =
      "Invalid Password format";
  }

  if (!gender) {
    const genderContainer = document.querySelector(".gender-error-container");
    genderContainer.classList.add("error");
    genderContainer.querySelector(".error-message").textContent =
      "Please select Gender";
    isValid = false;
  }

  if (country === "Select a country") {
    const countryContainer = document.querySelector(".country-error-container");
    countryContainer.classList.add("error");
    isValid = false;
  }

  if (!terms) {
    alert("Please accept Terms & Conditions");
  }

  // Check if there is any error and we don't need to manage
  // hasError in all the checks above.
  var errorMessages = document.querySelectorAll(".error-message");
  let hasError = false;

  for (const message of errorMessages) {
    if (message.textContent.trim() !== "") {
      hasError = true;
      break;
    }
  }

  if (hasError) {
    return false;
  } else {
    return true;
  }
}

let data = [
  {
    id: 1,
    firstName: "Shubh",
    lastName: "Shar",
    email: "abc@gmail.com",
    phone: "7696686988",
    gender: "M",
    country: "india",
  },
  {
    id: 2,
    firstName: "Shubham",
    lastName: "Sharma",
    email: "abc1@gmail.com",
    phone: "9056386988",
    gender: "F",
    country: "canada",
  },
];

function validateAndInsert(event) {
  event.preventDefault();
  console.log("=============================");
  console.log("validateAndInsert");
  if (validateForm()) {
    addUserData();
  }
}

function readAll() {
  var tbData = document.querySelector(".table_data");
  var elements = "";
  data.map(
    (d) =>
      (elements += `<tr>
            <td>${d.firstName}</td>
            <td>${d.lastName}</td>
            <td>${d.email}</td>
            <td>${d.phone}</td>
            <td>${d.gender}</td>
            <td>${d.country}</td>
            <td><button onclick={edit(${d.id})}>Update</button></td>
            <td><button  onclick={delet(${d.id})}>Delete</button></td>
            </tr>`)
  );
  tbData.innerHTML = elements;
}

function addUserData() {
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  var gender = "";

  if (document.getElementById("male").checked === true) {
    gender = "M";
  } else if (document.getElementById("female").checked === true) {
    gender = "F";
  }

  var country = document.getElementById("country").value;

  var newObj = {
    id: data.length + 1,
    firstName,
    lastName,
    email,
    phone,
    gender,
    country,
  };
  data.push(newObj);
  console.log("=============================");

  console.log("=============================");
  console.log("this is getting called");
  readAll();
}

function edit(id) {
  var editData = data.find((item) => item.id === id);

  document.getElementById("firstName").value = editData.firstName;
  document.getElementById("lastName").value = editData.lastName;
  document.getElementById("email").value = editData.email;
  document.getElementById("phone").value = editData.phone;
  document.getElementById("country").value = editData.country;
  if (editData.gender === "M") {
    document.getElementById("male").checked = true;
    document.getElementById("female").checked = false;
  } else if (editData.gender === "F") {
    document.getElementById("male").checked = false;
    document.getElementById("female").checked = true;
  }
  document.querySelector(".button").style.display = "none";
  document.querySelector(".updateBtn").style.display = "inline-block";

  document.querySelector(".editId").value = id;
}

function update(event) {
  event.preventDefault();
  if (validateForm()) {
    document.querySelector(".button").style.display = "inline-block";
    document.querySelector(".updateBtn").style.display = "none";

    var id = parseInt(document.querySelector(".editId").value);
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var gender = "";

    if (document.getElementById("male").checked === true) {
      gender = "M";
    } else if (document.getElementById("female").checked === true) {
      gender = "F";
    }

    var country = document.getElementById("country").value;

    var updateObj = { id, firstName, lastName, email, phone, gender, country };
    console.log("=============================");
    console.log(`${id}`);
    var index = data.findIndex((f) => f.id === id);
    data[index] = updateObj;
    readAll();
  }
}

function delet(id) {
  var newData = data.filter((f) => f.id !== id);
  data = newData;
  readAll();
}
