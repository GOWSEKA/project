// Medicine list
const medicines = [
    { name: "Liver Care Tablets", description: "Supports liver health and detoxification.", price: "₹600", details: "₹600 (1 strip = 10 tablets)", manufacture: "01-2023", expiry: "01-2026", img: "images/liver_care_tablets.jpg", quantity: "1 strip = 10 tablets" },
    { name: "Hepatol Syrup", description: "Helps in liver recovery and improves digestion.", price: "₹400", details: "₹400 (100ml)", manufacture: "02-2024", expiry: "02-2026", img: "images/hepatol_syrup.jpg", quantity: "100ml" },
    { name: "Hepa Care Capsules", description: "Promotes liver function and prevents liver diseases.", price: "₹500", details: "₹500 (1 strip = 10 capsules)", manufacture: "03-2023", expiry: "03-2026", img: "images/hepa_care_capsules.jpg", quantity: "1 strip = 10 capsules" },
    { name: "Hepatomax Syrup", description: "Aids in liver detoxification and regeneration.", price: "₹350", details: "₹350 (100ml)", manufacture: "04-2023", expiry: "04-2026", img: "images/hepatomax_syrup.jpg", quantity: "100ml" }
];

function searchMedicine() {
    const query = document.getElementById("searchBar").value.toLowerCase();
    const suggestionsBox = document.getElementById("suggestions");
    suggestionsBox.innerHTML = "";

    let filtered = medicines.filter(med => med.name.toLowerCase().includes(query));

    document.querySelectorAll(".medicine").forEach(card => {
        let medName = card.dataset.name.toLowerCase();
        if (filtered.some(m => m.name.toLowerCase() === medName)) {
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
                div.innerText = item.name;
                div.onclick = () => {
                    document.getElementById("searchBar").value = item.name;
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

function showDetails(name, description, price, manufacture, expiry, imgSrc, quantity) {
    document.getElementById("medicine-img").src = imgSrc;
    document.getElementById("medicine-name").textContent = name;
    document.getElementById("medicine-description").textContent = description;
    document.getElementById("medicine-price").textContent = `Price: ${price}`;
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
