const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    price: 499,
    category: "electronics",
    image: "images/wirelessMouse.jpg",
  },
  {
    id: 2,
    name: "Wireless Keyboard",
    price: 1299,
    category: "electronics",
    image: "images/wirelessKeyboard.webp",
  },
  {
    id: 3,
    name: "Men's Casual T-Shirt",
    price: 699,
    category: "fashion",
    image: "images/tshirt.jpg",
  },
  {
    id: 4,
    name: "Women's Sneakers",
    price: 2499,
    category: "fashion",
    image: "images/shoes.jpg",
  },
  {
    id: 5,
    name: "Notebook Set",
    price: 199,
    category: "stationery",
    image: "images/notebook.jpg",
  },
  {
    id: 6,
    name: "Premium Pen Pack",
    price: 149,
    category: "stationery",
    image: "images/pens.jpg",
  },
  {
    id: 7,
    name: "Organic Brown Rice",
    price: 499,
    category: "groceries",
    image: "images/rice.jpg",
  },
  {
    id: 8,
    name: "Fresh Apples (1kg)",
    price: 199,
    category: "groceries",
    image: "images/apples.jpg",
  },
  {
    id: 9,
    name: "The Psychology of Money",
    price: 299,
    category: "books",
    image: "images/book.jpg",
  },
  {
    id: 10,
    name: "Atomic Habits",
    price: 349,
    category: "books",
    image: "images/book2.jpg",
  },
  {
    id: 11,
    name: "Wooden Chair",
    price: 1599,
    category: "furniture",
    image: "images/chair.jpg",
  },
  {
    id: 12,
    name: "Modern Study Table",
    price: 9499,
    category: "furniture",
    image: "images/table.jpg",
  },
  {
    id: 13,
    name: "Aloe Vera Face Wash",
    price: 249,
    category: "beauty&personalCare",
    image: "images/facewash.jpg",
  },
  {
    id: 14,
    name: "Herbal Shampoo",
    price: 299,
    category: "beauty&personalCare",
    image: "images/shampoo.jpg",
  },
];

const productContainer = document.getElementById("productContainer");
const cartSidebar = document.getElementById("cartSidebar");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const searchInput = document.getElementById("searchInput");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderProducts(list) {
  productContainer.innerHTML = "";
  list.forEach((product) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.image}">
      <div class="product-content">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button data-id="${product.id}">Add to Cart</button>
      </div>
    `;
    productContainer.appendChild(div);
  });
}

function addToCart(id) {
  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.quantity++;
  } else {
    const product = products.find((p) => p.id === id);
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  renderCart();
}

function renderCart() {
  cartItems.innerHTML = "";
  cart.forEach((item) => {
    cartItems.innerHTML += `
      <div class="cart-item">
        <strong>${item.name}</strong><br>
        ₹${item.price} ×
        <input type="number" min="1" value="${item.quantity}" data-id="${item.id}">
        <button data-remove="${item.id}">Remove</button>
      </div>
    `;
  });
  updateTotal();
  cartCount.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
}

function updateTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = `Total: ₹${total}`;
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

productContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    addToCart(Number(e.target.dataset.id));
  }
});

cartItems.addEventListener("input", (e) => {
  if (e.target.type === "number") {
    const item = cart.find((i) => i.id === Number(e.target.dataset.id));
    item.quantity = Number(e.target.value);
    saveCart();
    updateTotal();
  }
});

cartItems.addEventListener("click", (e) => {
  if (e.target.dataset.remove) {
    cart = cart.filter((i) => i.id !== Number(e.target.dataset.remove));
    saveCart();
    renderCart();
  }
});

document.getElementById("cartBtn").onclick = () =>
  cartSidebar.classList.add("open");
document.getElementById("closeCart").onclick = () =>
  cartSidebar.classList.remove("open");

searchInput.addEventListener("input", function () {
  const keyword = this.value.toLowerCase();
  renderProducts(
    products.filter((p) => p.name.toLowerCase().includes(keyword)),
  );
});

document.querySelector(".filters").addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const cat = e.target.dataset.category;
    renderProducts(
      cat === "all" ? products : products.filter((p) => p.category === cat),
    );
  }
});

renderProducts(products);
renderCart();
