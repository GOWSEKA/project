const medicines = ["Neurogen Tablets", "Brain Tonic Syrup", "Neurolife Capsules", "Mind Calm Syrup"];

function searchMedicine() {
    const query = document.getElementById("searchBar").value.toLowerCase();
    const suggestionsBox = document.getElementById("suggestions");
    suggestionsBox.innerHTML = "";

    let filtered = medicines.filter(med => med.toLowerCase().includes(query));

    document.querySelectorAll(".medicine").forEach(card => {
        let medName = card.dataset.name.toLowerCase();
        if (filtered.some(m => m.toLowerCase() === medName)) {
            card.classList.remove("hidden");
        } else {
            card.classList.add("hidden");
        }
    });

    if (query) {
        if (filtered.length > 0) {
            suggestionsBox.classList.remove("hidden");
            filtered.forEach(item => {
                const div = document.createElement("div");
                div.classList.add("px-4", "py-2", "hover:bg-gray-200", "cursor-pointer");
                div.innerText = item;
                div.onclick = () => {
                    document.getElementById("searchBar").value = item;
                    suggestionsBox.classList.add("hidden");
                    searchMedicine();
                };
                suggestionsBox.appendChild(div);
            });
        } else {
            suggestionsBox.classList.add("hidden");
        }
    } else {
        suggestionsBox.classList.add("hidden");
        document.querySelectorAll(".medicine").forEach(card => card.classList.remove("hidden"));
    }
}

function showDetails(name, description, price, priceInfo, manufacture, expiry, imgSrc, quantity) {
    document.getElementById("medicine-img").src = imgSrc;
    document.getElementById("medicine-name").textContent = name;
    document.getElementById("medicine-description").textContent = description;
    document.getElementById("medicine-price").textContent = `Price: ${price} (${priceInfo})`;
    document.getElementById("medicine-manufacture").textContent = `Manufacture Date: ${manufacture}`;
    document.getElementById("medicine-expiry").textContent = `Expiry Date: ${expiry}`;
    document.getElementById("quantity").value = 1;

    document.getElementById("medicine-details").classList.remove("hidden");
}

function closeDetails() {
    document.getElementById("medicine-details").classList.add("hidden");
}
function addToCart() {
    let quantity = parseInt(document.getElementById("quantity").value);
    let name = document.getElementById("medicine-name").textContent;
    let price = document.getElementById("medicine-price").textContent.replace("Price: ₹", "").trim();
    
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the item already exists in the cart
    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ name, price, quantity });
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update cart count
    updateCartCount();

    // Show success message with ✅💚
    alert(`✅ Added ${quantity} item(s) of "${name}" to cart! 💚`);
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem("cartCount", cartCount);
    
    // Update the cart count in the UI if available
    let cartCountElement = document.getElementById("cartCount");
    if (cartCountElement) {
        cartCountElement.innerText = cartCount;
    }
}
