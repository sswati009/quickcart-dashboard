let products = [];
let filteredProducts = [];
let cartCount = 0;

async function fetchProducts() {
  try {
    document.getElementById("buffer").style.display = "block";

    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();

    products = data;
    filteredProducts = data;

    renderProducts(data);
   

  } catch (error) {
    document.getElementById("product").innerHTML =
      `<p class="text-danger">Failed to load products.</p>`;
  } finally {
    document.getElementById("buffer").style.display = "none";
  }
}

function renderProducts(data) {
  const container = document.getElementById("product");
  container.innerHTML = "";

  data.forEach(product => {
    container.innerHTML += `
      <div class="col-md-3 mb-4">
        <div class="card h-100">
          <img src="${product.image}" class="card-img-top" height="200">
          <div class="card-body">
            <h6>${product.title}</h6>
            <p>₹${product.price}</p>
            <button class="btn btn-primary btn-sm" onclick="showDetails(${product.id})">
              View
            </button>
            <button class="btn btn-success btn-sm" onclick="addToCart()">
              Add
            </button>
          </div>
        </div>
      </div>
    `;
  });
}

// 🔍 SEARCH
document.getElementById("Input").addEventListener("input", function () {
  const query = this.value.toLowerCase();

  const result = filteredProducts.filter(p =>
    p.title.toLowerCase().includes(query)
  );

  renderProducts(result);
});

// 📦 MODAL
function showDetails(id) {
  const product = products.find(p => p.id === id);

  document.getElementById("modalContent").innerHTML = `
    <h5>${product.title}</h5>
    <p>${product.description}</p>
    <p><strong>Price:</strong> ₹${product.price}</p>
    <p><strong>Rating:</strong> ${product.rating.rate}</p>
  `;

  new bootstrap.Modal(document.getElementById("productModel")).show();
}

// 🔽 SORT
document.getElementById("Option").addEventListener("change", function () {
  let sorted = [...filteredProducts];

  if (this.value === "low") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (this.value === "high") {
    sorted.sort((a, b) => b.price - a.price);
  }

  renderProducts(sorted);
});

// 🛒 CART
function addToCart() {
  cartCount++;
  document.getElementById("cart").innerText = cartCount;
}

// 🚀 START
fetchProducts();