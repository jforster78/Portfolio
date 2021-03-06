"use strict";

//INITIALISE FIREBASE
const config = {
  apiKey: "AIzaSyAf1MfuEzHphWug0xdWXBduNj-P5Bdf3hc",
  authDomain: "www.jfweb.co.uk",
  databaseURL: "https://portfolio-e01b4.firebaseio.com",
  projectId: "portfolio-e01b4",
  storageBucket: "portfolio-e01b4.appspot.com",
  messagingSenderId: "444285138274",
  // appId: "1:444285138274:web:1480b1dbe555ee59"
};
firebase.initializeApp(config);

//DATA COLLECTION AND FORM SUBMISSION
const formSubmission = (() => {
  //Reference messages collection
  const messagesRef = firebase.database().ref("messages");

  //Function to get form values
  const getInputVal = id => {
    return document.getElementById(id).value;
  };

  //Submit form
  const submitForm = e => {
    e.preventDefault();

    //Get values
    let fullname = getInputVal("fullname");
    let email = getInputVal("email");
    let company = getInputVal("company");
    let phone = getInputVal("phone");
    let message = getInputVal("message");

    //Save message
    saveMessage(fullname, email, company, phone, message);

    //Show alert
    const formAlert = document.querySelector(".grid__formAlert");
    formAlert.innerHTML = "Sent";
    formAlert.style.backgroundColor = "#00a90a";

    //Hide alert after 5 seconds
    setTimeout(() => {
      formAlert.innerHTML = "Submit";
      formAlert.style.backgroundColor = "#586c8c";
      formAlert.style.opacity = ".3";
      formAlert.style.transition = "1s";
      formAlert.setAttribute("disabled", "disabled");
    }, 5000);

    //Clear form
    const reset = document.getElementById("contactForm");
    reset.reset();

    //Clear reCaptcha
    grecaptcha.reset();
  };

  //Submit button
  const contactForm = document.getElementById("contactForm");
  contactForm.addEventListener("submit", submitForm);

  //Save messages to firebase
  const saveMessage = (fullname, email, company, phone, message) => {
    let newMessageReg = messagesRef.push();
    newMessageReg.set({
      fullname: fullname,
      email: email,
      company: company,
      phone: phone,
      message: message
    });
  };
})();

//RECAPTCHA VERIFICATION
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha', {
  "callback": response => {
    console.log("dataCallback", response);
    const formAlert = document.querySelector(".grid__formAlert");
    formAlert.removeAttribute('disabled');
    formAlert.style.transition = "1s";
    formAlert.style.opacity = "1";
  },
  "expired-callback": () => {
    const formAlert = document.querySelector(".grid__formAlert");
    formAlert.setAttribute('disabled', "disabled");
    formAlert.style.opacity = ".3";
  }
});
window.recaptchaVerifier.render();