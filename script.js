// ========================================
// BLUECART - SIMPLE PRODUCT PROJECT
// ========================================

const API_URL = "https://fakestoreapi.com/products";


// HTML elements
const productContainer = document.getElementById("productContainer");
const loadingMessage = document.getElementById("loadingMessage");
const errorMessage = document.getElementById("errorMessage");

const productModal = document.getElementById("productModal");
const productDetails = document.getElementById("productDetails");
const closeModal = document.getElementById("closeModal");


// ========================================
// GET ALL PRODUCTS
// ========================================

async function getProducts() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Could not load products.");
        }

        const products = await response.json();

        displayProducts(products);

    } catch (error) {

        console.error(error);

        errorMessage.classList.remove("hidden");

    } finally {

        loadingMessage.classList.add("hidden");

    }
}


// ========================================
// DISPLAY ALL PRODUCTS
// ========================================

function displayProducts(products) {

    productContainer.innerHTML = "";

    products.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        // Clicking the card opens product details
        card.addEventListener("click", function () {
            getProductDetails(product.id);
        });

        card.innerHTML = `
            <img
                class="product-image"
                src="${product.image}"
                alt="${product.title}"
            >

            <div class="product-info">

                <p class="product-category">
                    ${product.category}
                </p>

                <h3 class="product-title">
                    ${product.title}
                </h3>

                <p class="product-price">
                    $${product.price.toFixed(2)}
                </p>

            </div>
        `;

        productContainer.appendChild(card);

    });
}


// ========================================
// GET ONE PRODUCT
// ========================================

async function getProductDetails(productId) {

    try {

        const response = await fetch(
            `${API_URL}/${productId}`
        );

        if (!response.ok) {
            throw new Error("Could not load product details.");
        }

        const product = await response.json();

        productDetails.innerHTML = `

            <div class="details-layout">

                <img
                    class="details-image"
                    src="${product.image}"
                    alt="${product.title}"
                >

                <div>

                    <p class="details-category">
                        ${product.category}
                    </p>

                    <h2 class="details-title">
                        ${product.title}
                    </h2>

                    <p class="details-price">
                        $${product.price.toFixed(2)}
                    </p>

                    <p class="details-description">
                        ${product.description}
                    </p>

                    <p class="details-rating">
                        ⭐ ${product.rating.rate}
                        / 5
                        (${product.rating.count} reviews)
                    </p>

                </div>

            </div>

        `;

        productModal.classList.remove("hidden");

    } catch (error) {

        console.error(error);

    }
}


// ========================================
// CLOSE MODAL
// ========================================

closeModal.addEventListener("click", function () {
    productModal.classList.add("hidden");
});


// Close when clicking outside the modal
productModal.addEventListener("click", function (event) {

    if (event.target === productModal) {
        productModal.classList.add("hidden");
    }

});


// ========================================
// START PROJECT
// ========================================

getProducts();
