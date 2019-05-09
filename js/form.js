"use strict";

try {
  // Initialize Firebase
  // const config = {
  //   apiKey: "AIzaSyAQLDZqt0cpzBusMi34m_skaiWhTYxbHfE",
  //   authDomain: "portfolio-9f1f1.firebaseapp.com",
  //   databaseURL: "https://portfolio-9f1f1.firebaseio.com",
  //   projectId: "portfolio-9f1f1",
  //   storageBucket: "portfolio-9f1f1.appspot.com",
  //   messagingSenderId: "543603757417"
  // };

  // firebase.initializeApp(config);

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

    //Hide alert after 3 seconds
    setTimeout(() => {
      formAlert.innerHTML = "Submit";
      formAlert.style.backgroundColor = "#586c8c";
      formAlert.style.color = "#ffffff";
    }, 3000);

    //Clear form
    const reset = document.getElementById("contactForm");
    reset.reset();
  };

  //Listen for from submit
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
} 

catch (err) {
  const formAlert = document.querySelector(".grid__formAlert");
  formAlert.innerHTML = "Try later";
  formAlert.style.backgroundColor = "#a20000";
  formAlert.disabled = "true";
}
