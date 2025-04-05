const supplies = ["First Aid Box", "Cotton", "Injection", "Sugar Test Kit"];

function searchSupplies() {
    const query = document.getElementById("searchBar").value.toLowerCase();
    const suggestionsBox = document.getElementById("suggestions");
    suggestionsBox.innerHTML = "";

    let filtered = supplies.filter(item => item.toLowerCase().includes(query));

    document.querySelectorAll(".supply").forEach(card => {
        let supplyName = card.dataset.name.toLowerCase();
        if (filtered.some(m => m.toLowerCase() === supplyName)) {
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
                    searchSupplies();
                };
                suggestionsBox.appendChild(div);
            });
        } else {
            suggestionsBox.classList.add("hidden");
        }
    } else {
        suggestionsBox.classList.add("hidden");
        document.querySelectorAll(".supply").forEach(card => card.classList.remove("hidden"));
    }
}

function showDetails(name, description, price, manufacture, expiry, imgSrc) {
    document.getElementById("supply-img").src = imgSrc;
    document.getElementById("supply-name").textContent = name;
    document.getElementById("supply-description").textContent = description;
    document.getElementById("supply-price").textContent = `Price: ${price}`;
    document.getElementById("supply-manufacture").textContent = `Manufacture Date: ${manufacture}`;
    document.getElementById("supply-expiry").textContent = `Expiry Date: ${expiry}`;
    document.getElementById("quantity").value = 1;

    document.getElementById("supply-details").classList.remove("hidden");
}

function closeDetails() {
    document.getElementById("supply-details").classList.add("hidden");
}
function addToCart() {
    let quantity = parseInt(document.getElementById("quantity").value);
    let name = document.getElementById("supply-name").textContent;
    let price = document.getElementById("supply-price").textContent.replace("Price: ₹", "");

    // Retrieve cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if item already exists in cart
    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ name, price, quantity });
    }

    // Save updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update cart count
    let cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem("cartCount", cartCount);

    // Update cart icon count
    document.getElementById("cartCount").innerText = cartCount;

    alert(`✅ Added ${quantity} item(s) of "${name}" to cart! 💚`);
}

