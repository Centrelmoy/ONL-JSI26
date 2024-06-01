import { app } from "./config.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
const db = getFirestore(app);
const auth = getAuth();
var uid = null;
var productUpdate = null;

onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("email").innerHTML = user.email;
    uid = user.uid;
    document.getElementById("box-add-blog").style.display = "block";
  }
  renderProducts();
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

const add_product_btn = document.getElementById("add_product_btn");
add_product_btn.addEventListener("click", (e) => {
  e.preventDefault();
  const product_name = document.getElementById("product_name").value;
  const price = document.getElementById("price").value;
  const image = document.getElementById("image").value;
  const product_type = document.getElementById("product_type").value;
  const description = document.getElementById("description").value;
  console.log(product_name, price, image, product_type, description);
  if (
    product_name === "" ||
    price === "" ||
    image === "" ||
    product_type === "" ||
    description === ""
  ) {
    alert("Please fill in all fields");
    return;
  }
  addDoc(collection(db, "products"), {
    product_name: product_name,
    price: price,
    image: image,
    product_type: product_type,
    description: description,
    uid: uid,
  })
    .then(() => {
      alert("Product added successfully");
      document.getElementById("product_name").value = "";
      document.getElementById("price").value = "";
      document.getElementById("image").value = "";
      document.getElementById("product_type").value = "";
      document.getElementById("description").value = "";
      renderProducts();
    })
    .catch((error) => {
      alert(error.message);
    });
});

const renderProducts = async () => {
  let product_render = document.getElementById("product-render");
  product_render.innerHTML = `
  <tr>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Update</th>
                  </tr>`;
  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id);
    const data = doc.data();
    const blog = document.createElement("tr");
    console.log(typeof parseInt(data.image));
    blog.innerHTML = `
    <td><img style="width:100px" src="${data.image}" alt=""> </td>
    <td>${data.product_name}</td>
    <td>${parseInt(data.price).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</td>
    <td><button class="btn-delete" data_id=${doc.id}>Delete</button>
    <button class="btn-update" data_id=${doc.id}>Edit</button>
    </td>
    `;
    product_render.appendChild(blog);
  });
  document.querySelectorAll(".btn-delete").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const id = e.target.getAttribute("data_id");
      await deleteDoc(doc(db, "products", id));
      renderProducts();
    });
  });

  document.querySelectorAll(".btn-update").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      btn.onclick = async function () {
        var modal = document.getElementById("myModal");
        modal.style.display = "block";
        const id = e.target.getAttribute("data_id");
        const product = await getDoc(doc(db, "products", id));
        const data = product.data();
        productUpdate = {
          id: product.id,
          data: data,
        };
        console.log(productUpdate);
        document.getElementById("update_product_name").value = data.product_name;
        document.getElementById("update_price").value = data.price;
        document.getElementById("update_image").value = data.image;
        document.getElementById("update_product_type").value = data.product_type;
        document.getElementById("update_description").value = data.description;
      };
    });
  });
};

document.getElementById("update_product_btn").addEventListener("click", async (e) => {
  e.preventDefault();
  const product_name = document.getElementById("update_product_name").value;
  const price = document.getElementById("update_price").value;
  const image = document.getElementById("update_image").value;
  const product_type = document.getElementById("update_product_type").value;
  const description = document.getElementById("update_description").value;
  await updateDoc(doc(db, "products", productUpdate.id), {
    product_name: product_name,
    price: price,
    image: image,
    product_type: product_type,
    description: description,
  });
  alert("Products updated successfully");
  renderProducts();
  modal.style.display = "none";
});
var modal = document.getElementById("myModal");

// Get the modal

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
