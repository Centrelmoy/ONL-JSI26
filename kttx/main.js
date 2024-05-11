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
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
const db = getFirestore(app);
const auth = getAuth();
var uid = null;
var blogUpdate = null;

onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("email").innerHTML = user.email;
    uid = user.uid;
    document.getElementById("box-add-blog").style.display = "block";
  }
  renderBlogs();
});

const add_blog_btn = document.getElementById("add_blog_btn");
add_blog_btn.addEventListener("click", (e) => {
  e.preventDefault();
  const title = document.getElementById("blog-title").value;
  const content = document.getElementById("blog-content").value;
  const price = document.getElementById("blog-price").value;
  const picture = document.getElementById("blog-picture").value;


  if (title === "" || content === "" || picture === "" || price === "") {
    alert("Please fill in all fields");
    return;
  }
  addDoc(collection(db, "blogs"), {
    title: title,
    picture: picture,
    price: price,
    content: content,
    uid: uid,
  })
    .then(() => {
      alert("Blog added successfully");
      document.getElementById("blog-title").value = "";
      document.getElementById("blog-picture").value = "";
      document.getElementById("blog-price").value = "";
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
    console.log(doc.id);
    const data = doc.data();
    var stringBtn = "";
    if (data.uid === uid) {
      stringBtn = `<button class="btn-delete" data_id=${doc.id}>Delete</button>
      <button class="btn-update" data_id=${doc.id}>Update</button>`;
    }
    const blog = document.createElement("div");
    blog.className = "box-blog";
    blog.innerHTML = `
    <div class="box-blog-title">${data.title}</div>
    <div class="box-blog-body">${data.content}</div>
    <div class="box-blog-price">${data.price} VND</div>
    <div class="box-blog-picture">${data.picture}</div>

    ${stringBtn}
    `;
    document.getElementById("box-render").appendChild(blog);
  });
  document.querySelectorAll(".btn-delete").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const id = e.target.getAttribute("data_id");
      await deleteDoc(doc(db, "blogs", id));
      renderBlogs();
    });
  });
  
  document.querySelectorAll(".btn-update").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      btn.onclick = async function () {
        modal.style.display = "block";
        const id = e.target.getAttribute("data_id");
        const blog = await getDoc(doc(db, "blogs", id));
        const data = blog.data();
        blogUpdate = {
          id: blog.id,
          data: data,
        }
        document.getElementById("blog-title-update").value = data.title;
        document.getElementById("blog-content-update").value = data.content;
        document.getElementById("blog-content-update").value = data.picture;
        document.getElementById("blog-content-update").value = data.price;
      };
    });
  });
};

document.getElementById("update_blog_btn").addEventListener("click", async (e) => {
  e.preventDefault();
  const title = document.getElementById("blog-title-update").value;
  const content = document.getElementById("blog-content-update").value;
  const picture = document.getElementById("blog-content-update").value;
  const price = document.getElementById("blog-content-update").value;
  if (title === "" || content === "" || picture === "" || price === "") {
    alert("Please fill in all fields");
    return;
  }
  await updateDoc(doc(db, "blogs", blogUpdate.id), {
    title: title,
    content: content,
    picture: picture,
    price: price,
  });
  alert("Blog updated successfully");
  renderBlogs();
  modal.style.display = "none";
});


const form = document.getElementById("imageForm");
const imageContainer = document.getElementById("imageContainer");

form.addEventListener("submit", function(event) {
  event.preventDefault();
  const imageUrl = document.getElementById("imageUrl").value;
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = "User-selected image";
  imageContainer.innerHTML = "";
  imageContainer.appendChild(image);
});