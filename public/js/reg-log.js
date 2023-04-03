import { convertFD2JSON } from "./functions/form.js";

const APP = {
  init() {
    APP.addListeners();
  },
  addListeners() {
    let form = document.getElementById("regForm");
    let username = document.getElementById("username");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    username.addEventListener("change", APP.testName);
    email.addEventListener("change", APP.testEmail);
    password.addEventListener("change", APP.checkPasswordRequirements)
    username.addEventListener("invalid", APP.fail);
    email.addEventListener("invalid", APP.fail);
    password.addEventListener("invalid", APP.fail);
    form.addEventListener("submit", APP.validateAndSubmit);
  },
  testName(ev) {
    let username = ev.target;
    username.setCustomValidity("");
    let currently = username.checkValidity();
    console.log(username.validity);
    if (currently) {
      if (username?.length < 4) {
        username.setCustomValidity("Short username.");
        username.reportValidity();
      } else if (username?.length > 20) {
        username.setCustomValidity("Too long username.");
        username.reportValidity();
      } else {
        let span = username.parentElement.querySelector(".errMessage");
        span.textContent = "";
      }
    }
  },
  testEmail(ev) {
    let email = ev.target;
    email.setCustomValidity("");
    let currently = email.checkValidity();
    if (currently) {
      let emReg = new RegExp("@gmail.com$", "i");
      if (emReg.test(email.value) === false) {
        email.setCustomValidity("NOT a gmail address.");
        email.reportValidity();
      } else {
        let span = email.parentElement.querySelector(".errMessage");
        span.textContent = "";
      }
    }
  },
  checkPasswordRequirements() {
    // Allowed: [! @ # $ % ^ & * ( ) . , ? ; : ~]
    const upper = document.querySelector(".upper");
    const lower = document.querySelector(".lower");
    const num = document.querySelector(".num");
    const len = document.querySelector(".len");
    const invalid = document.querySelector(".invalid");
    let response = {
      upper: false,
      lower: false,
      num: false,
      len: false,
      matches: null,
      invalid: true,
    };
    let txt = password.value.trim();
    response.upper = /[A-Z]/.test(txt);
    if (response.upper === false) {
      upper.style.display = "block";
    } else {
      upper.style.display = "none";
    }
    response.lower = /[a-z]/.test(txt);
    if (response.lower === false) {
      lower.style.display = "block";
    } else {
      lower.style.display = "none";
    }
    response.num = /[0-9]/.test(txt);
    if (response.num === false) {
      num.style.display = "block";
    } else {
      num.style.display = "none";
    }
    response.len = password.value.trim().length >= 10;
    if (response.len === false) {
      len.style.display = "block";
    } else {
      len.style.display = "none";
    }
    response.matches = txt.match(/([^A-Za-z0-9_!@#$%^&*().,?;:~])/);
    if (response.matches && response.matches.length > 0) {
      response.invalid = false;
      invalid.style.display = "block";
    } else {
      invalid.style.display = "none";
    }
    return response;
  },
  fail(ev) {
    let field = ev.target;
    switch (field.id) {
      case "username":
        let usernameSpan = field.parentElement.querySelector(".errMessage");
        usernameSpan.textContent = "Neispravno korisničko ime.";
        break;
      case "email":
        let emailSpan = field.parentElement.querySelector(".errMessage");
        emailSpan.textContent = "Email adresa nije validna.";
        break;
      case "password":
        let passwordSpan = field.parentElement.querySelector(".errMessage");
        passwordSpan.textContent = "Neispravna lozinka.";
        break;
    }
  },
  validateAndSubmit(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    const form = ev.target;
    const fd = new FormData(form);
    for (let key of fd.keys()) {
          console.log(key, fd.get(key));
    }
    const json = convertFD2JSON(fd);
    const url = "/register";
    const h = new Headers();
    h.append("Content-type", "application/json");
    const req = new Request(url, {
      headers: h,
      body: json,
      method: "POST",
    });
    fetch(req)
      .then((res) => res.json())
      .then((data) => {
        console.log("username:", data);
        let ms;
        return new Promise(resolve => setTimeout(resolve, ms))
      })
      .then((prom) => prom(window.location.href = "http://localhost:3330/", 10000))
      .catch(err => console.warn(err));
  }
};

document.addEventListener("DOMContentLoaded", APP.init);