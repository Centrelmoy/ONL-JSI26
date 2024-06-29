import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged
  } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
  
  const auth = getAuth();
  
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       window.location.href = "home.html";
//     } 
//   });
  
  signup_btn.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.getElementById("signup_email").value;
    const password = document.getElementById("signup_pass").value;
    const confirm_password = document.getElementById("signup_confirm_pass").value;
    if (email === "" || password === "" || confirm_password === "") {
      alert("Please fill in all fields");
      return;
    }
    if (password !== confirm_password) {
      alert("Passwords do not match");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          alert("Sign up successful");
          console.log(user);
          login();
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  });
  
  
  const login_btn = document.getElementById("login_btn");
  
  login_btn.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.getElementById("login_email").value;
    const password = document.getElementById("login_pass").value;
    if (email === "" || password === "" ) {
      alert("Please fill in all fields");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user) {
          window.location.href = "../home/index.html";    
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
  });
  

  var a = document.getElementById("loginBtn");
  var b = document.getElementById("registerBtn");
  var x = document.getElementById("login");
  var y = document.getElementById("register");

  function login() {
    x.style.left = "4px";
    y.style.right = "-520px";
    a.className += " white-btn";
    b.className = "btn";
    x.style.opacity = 1;
    y.style.opacity = 0;
  }

  function register() {
    x.style.left = "-510px";
    y.style.right = "5px";
    a.className = "btn";
    b.className += " white-btn";
    x.style.opacity = 0;
    y.style.opacity = 1;
  }