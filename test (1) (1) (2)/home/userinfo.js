import { app } from "./config.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore(app);
let isExitInfo = false;
let userInfoId = null;
let uid = null;
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
    uid = auth.currentUser.uid;
  } else {
    checkInfoIsExit();
  }
});
async function checkInfoIsExit() {
  const q = query(collection(db, "users"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    if (doc.exists()) {
      isExitInfo = true;
      userInfoId = doc.id;
      renderInfo(doc.data());
    }
  });
}
function renderInfo(user) {
  document.getElementById("name").value = user.name;
  document.getElementById("date_born").value = user.date_born;
  document.getElementById("phone").value = user.phone;
  document.getElementById("address").value = user.address;
  document.getElementById("image").value = user.image;
  if (user.gender) {
    document.getElementById("male").checked = true;
  } else {
    document.getElementById("female").checked = true;
  }
}

document.getElementById("userForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const date_born = document.getElementById("date_born").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const image = document.getElementById("image").value;
  const male = document.getElementById("male").checked;
  const uid = auth.currentUser.uid;
  var ismale = null;
  if (male) {
    ismale = true;
  } else {
    ismale = false;
  }

  if (isExitInfo) {
    const userRef = doc(db, "users", userInfoId);
    updateDoc(userRef, {
      name: name,
      date_born: date_born,
      phone: phone,
      address: address,
      image: image,
      gender: ismale,
    }).then(() => {
      alert("Update user info successfully");
    });
   
  } else {
    addDoc(collection(db, "users"), {
      name: name,
      date_born: date_born,
      phone: phone,
      address: address,
      image: image,
      gender: ismale,
      uid: uid,
    })
      .then(() => {
        alert("Add user info successfully");
      })
      .catch((error) => {
        alert(error.message);
      });
  }
});
