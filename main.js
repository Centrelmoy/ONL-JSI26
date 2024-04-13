  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
  const firebaseConfig = {
    apiKey: "AIzaSyDVYlTGCW7y4OiMnhUP30NgxwXAtGSbQjA",
    authDomain: "onl-jsi26.firebaseapp.com",
    projectId: "onl-jsi26",
    storageBucket: "onl-jsi26.appspot.com",
    messagingSenderId: "1083840212072",
    appId: "1:1083840212072:web:cf57506f2cc61aaf12dfdd",
    measurementId: "G-WH1HFCM2XK"
};

const app = initializeApp(firebaseConfig);
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
const db = getFirestore(app);
const auth = getAuth();
var uid = null;

onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("email").innerHTML = user.email;
    uid = user.uid;
    document.getElementById("box-add-blog").style.display = "block";
  }
  renderBlogs();
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


const add_blog_btn = document.getElementById("add_blog_btn");
add_blog_btn.addEventListener("click", (e) => {
  e.preventDefault();
  const title = document.getElementById("blog-title").value;
  const content = document.getElementById("blog-content").value;
  if (title === "" || content === "") {
    alert("Please fill in all fields");
    return;
  }
  addDoc(collection(db, "blogs"), {
    title: title,
    content: content,
    uid: uid,
  })
    .then(() => {
      alert("Blog added successfully");
      document.getElementById("blog-title").value = "";
      document.getElementById("blog-content").value = "";
      renderBlogs();
    })
    .catch((error) => {
      alert(error.message);
    });
});

const renderBlogs = async () => {
  document.getElementById("box-render").innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "blogs"));
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const blog = document.createElement("div");
    blog.className = "box-blog";
    blog.innerHTML = `
    <div class="box-blog-title">${data.title}</div>
    <div class="box-blog-body">${data.content}</div>
    `;
    document.getElementById("box-render").appendChild(blog);
  });
}
