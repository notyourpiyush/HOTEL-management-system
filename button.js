document.addEventListener("DOMContentLoaded", function () {
    var foodItems = document.querySelectorAll(".container div");
    var restaurantName = "Jai Mata Di Restro";
    var cart = [];

    // Search Bar Implementation
    const searchBar = document.createElement("input");
    searchBar.placeholder = "🔍 Search food items...";
    searchBar.style.cssText = `
        margin: 10px;
        padding: 8px;
        width: calc(100% - 20px);
        border: 2px solid #2196F3;
        border-radius: 20px;
    `;
    document.querySelector(".container").prepend(searchBar);

    // Search Functionality
    searchBar.addEventListener("input", function(e) {
        const searchTerm = e.target.value.toLowerCase();
        foodItems.forEach(item => {
            const itemText = item.textContent.toLowerCase();
            item.style.display = itemText.includes(searchTerm) ? "block" : "none";
        });
    });

    // Cart Toggle Button
    var cartToggle = document.createElement("div");
    cartToggle.id = "cartToggle";
    cartToggle.innerHTML = "🛒 0";
    Object.assign(cartToggle.style, {
        position: "fixed",
        top: "20px",
        right: "20px",
        background: "#ff5722",
        color: "white",
        padding: "12px 18px",
        borderRadius: "30px",
        cursor: "pointer",
        zIndex: "1000",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        fontSize: "16px",
        display: "none"
    });
    document.body.appendChild(cartToggle);

    // Cart Container
    var cartContainer = document.createElement("div");
    cartContainer.id = "cartContainer";
    Object.assign(cartContainer.style, {
        position: "fixed",
        top: "60px",
        right: "20px",
        background: "white",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "15px",
        width: "300px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        zIndex: "1000",
        display: "none"
    });
    document.body.appendChild(cartContainer);

    // Toggle Cart Visibility
    cartToggle.addEventListener("click", function () {
        cartContainer.style.display = cartContainer.style.display === "block" ? "none" : "block";
    });

    // Update Cart Display
    function updateCartUI() {
        cartToggle.innerHTML = `🛒 ${cart.reduce((sum, item) => sum + item.quantity, 0)}`;
        cartContainer.innerHTML = `<h3 style="margin:0 0 10px 0; color:#333;">Your Cart (₹${calculateTotal()})</h3>`;
        
        if (cart.length === 0) {
            cartContainer.innerHTML += "<p style='text-align:center; color:#666;'>Cart is empty</p>";
        } else {
            cart.forEach((item) => {
                cartContainer.innerHTML += `
                    <div style="margin:8px 0; font-size:14px;">
                        ✅ ${item.quantity}x ${item.foodName} 
                        <span style="float:right;">₹${item.quantity * item.price}</span>
                    </div>`;
            });
        }

        // Confirm Order Button
        var confirmButton = document.createElement("button");
        confirmButton.textContent = "Confirm Order";
        confirmButton.style.cssText = `
            width: 100%;
            padding: 10px;
            margin-top: 15px;
            background: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        `;
        confirmButton.onclick = confirmOrder;
        cartContainer.appendChild(confirmButton);
    }

    // Calculate Total Amount
    function calculateTotal() {
        return cart.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    }

    // Order Confirmation
    function confirmOrder() {
        if (cart.length === 0) {
            alert("Cart is empty!");
            return;
        }
        alert(`Order Confirmed!\nTotal: ₹${calculateTotal()}`);
        cart = [];
        updateCartUI();
        cartContainer.style.display = "none";
    }

    // Add Order Buttons to Food Items
    foodItems.forEach(function (item) {
        var orderBtn = document.createElement("button");
        orderBtn.textContent = "Order";
        orderBtn.style.cssText = `
            padding: 6px 12px;
            background: #2196F3;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            margin-top: 8px;
        `;
        item.appendChild(orderBtn);

        orderBtn.addEventListener("click", function () {
            var foodName = item.querySelector("b").textContent;
            var price = parseFloat(item.querySelector(".price").textContent.replace(/[^0-9.]/g, ''));
            
            var quantity = prompt("Enter quantity:", "1");
            if (!quantity || isNaN(quantity) || quantity <= 0) {
                alert("Invalid quantity!");
                return;
            }

            cart.push({
                foodName: foodName,
                quantity: parseInt(quantity),
                price: price,
                restaurant: restaurantName
            });
            
            cartToggle.style.display = "block";
            updateCartUI();
        });
    });
});