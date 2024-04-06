import {
    getAuth,
    onAuthStateChanged,
    signOut 
  } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
  
  const auth = getAuth();
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      document.getElementById("email").innerHTML = user.email;
    }
  });
  
  const logout_btn = document.getElementById("logout_btn");
  logout_btn.addEventListener("click", (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        window.location.href = "login.html";
      })
      .catch((error) => {
        alert(error.message);
      });
  });