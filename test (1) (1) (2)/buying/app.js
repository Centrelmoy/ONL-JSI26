import { app } from "../config.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);
const type = urlParams.get("type");
const isBestSeller = urlParams.get("isBestSeller");
console.log(isBestSeller);

const db = getFirestore(app);
const auth = getAuth();
var uid = null;
var productUpdate = null;

let listProductHTML = document.querySelector(".listProduct");
let listCartHTML = document.querySelector(".listCart");
let iconCart = document.querySelector(".icon-cart");
let iconCartSpan = document.querySelector(".icon-cart span");
let body = document.querySelector("body");
let closeCart = document.querySelector(".close");
let cart = [];
let products = [];

async function getDataFromFireBase() {
  let q = null;
  if (type == null && isBestSeller != null) {
    q = query(collection(db, "products"), where("isBestSeller", "==", true));
  } else {
    q = query(collection(db, "products"), where("product_type", "==", type));
  }
  var data = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    data.push({ ...doc.data(), id: doc.id });
  });
  addDataToHTML(data) ;
    products = data;
}


const addDataToHTML = (data) => {
  if (data.length > 0) {
    data.forEach((product) => {
        console.log(product);
      let newProduct = document.createElement("div");
      newProduct.dataset.id = product.id;
      newProduct.classList.add("item");
      newProduct.innerHTML = `<img src="${product.image}" alt="">
                <h2>${product.product_name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart" product_id=${product.id}>Add To Cart</button>`;
      listProductHTML.appendChild(newProduct);
    });
  }

  document.querySelectorAll(".addCart").forEach((item) => {
    item.addEventListener("click", (event) => {
        let id_product = event.target.getAttribute("product_id");
      addToCart(id_product);
    });
  });
};
getDataFromFireBase()

iconCart.addEventListener("click", () => {
    body.classList.toggle("showCart");
  });
  closeCart.addEventListener("click", () => {
    body.classList.toggle("showCart");
  });
// listProductHTML.addEventListener("click", (event) => {
//   let positionClick = event.target;
//   if (positionClick.classList.contains("addCart")) {
//     let id_product = positionClick.parentElement.dataset.id;
//     addToCart(id_product);
//   }
// });

const addToCart = (id) => {
  let positionThisProductInCart = cart.findIndex(
    (value) => value.id == id
  );
  if (cart.length <= 0) {
    cart = [
      {
        product_id: id,
        quantity: 1,
      },
    ];
  } else if (positionThisProductInCart < 0) {
    cart.push({
      product_id: id,
      quantity: 1,
    });
  } else {
    cart[positionThisProductInCart].quantity =
      cart[positionThisProductInCart].quantity + 1;
  }
  addCartToHTML();
  addCartToMemory();
};
const addCartToMemory = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};
const addCartToHTML = () => {
  listCartHTML.innerHTML = "";
  let totalQuantity = 0;
  if (cart.length > 0) {
    cart.forEach((item) => {
      totalQuantity = totalQuantity + item.quantity;
      let newItem = document.createElement("div");
      newItem.classList.add("item");
      newItem.dataset.id = item.product_id;

      let positionProduct = products.findIndex(
        (value) => value.id == item.product_id
      );
      let info = products[positionProduct];
      listCartHTML.appendChild(newItem);
      newItem.innerHTML = `
            <div class="image">
                    <img src="${info.image}">
                </div>
                <div class="name">
                ${info.product_name}
                </div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
    });
  }
  iconCartSpan.innerText = totalQuantity;
};

listCartHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (
    positionClick.classList.contains("minus") ||
    positionClick.classList.contains("plus")
  ) {
    let product_id = positionClick.parentElement.parentElement.dataset.id;
    let type = "minus";
    if (positionClick.classList.contains("plus")) {
      type = "plus";
    }
    changeQuantityCart(product_id, type);
  }
});
const changeQuantityCart = (product_id, type) => {
  let positionItemInCart = cart.findIndex(
    (value) => value.product_id == product_id
  );
  if (positionItemInCart >= 0) {
    let info = cart[positionItemInCart];
    switch (type) {
      case "plus":
        cart[positionItemInCart].quantity =
          cart[positionItemInCart].quantity + 1;
        break;

      default:
        let changeQuantity = cart[positionItemInCart].quantity - 1;
        if (changeQuantity > 0) {
          cart[positionItemInCart].quantity = changeQuantity;
        } else {
          cart.splice(positionItemInCart, 1);
        }
        break;
    }
  }
  addCartToHTML();
  addCartToMemory();
};

