// Updated login.js with realistic input validation
function validateLogin(event) {
    event.preventDefault(); // Prevent form from submitting automatically
    
    var email = document.getElementById("email").value;
    var pass = document.getElementById("pass").value;

    if (email.trim() === "" || pass.trim() === "") {
        alert("Please fill in all fields.");
        return false;
    }

    // Simple email format validation
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email (e.g., example@gmail.com)");
        return false;
    }

    // Simple password validation (min 6 characters)
    if (pass.length < 6) {
        alert("Password must be at least 6 characters long.");
        return false;
    }

    localStorage.setItem("loggedIn", "true");
    document.getElementById("loginLink").click(); // Clicks the hidden link to navigate
    return false;
}

// Restrict access to base.html
if (window.location.pathname.includes("base.html")) {
    if (localStorage.getItem("loggedIn") !== "true") {
        alert("You must log in first!");
        window.location.href = "login.html";
    }
}

// Animation for Order Now button and truck icon
document.addEventListener("DOMContentLoaded", function() {
    var orderButton = document.querySelector(".button");
    var truckIcon = document.querySelector("#truck");
    
    orderButton.addEventListener("mouseenter", function() {
        truckIcon.style.transform = "translateX(20px)";
        truckIcon.style.transition = "transform 0.3s ease-in-out";
    });

    orderButton.addEventListener("mouseleave", function() {
        truckIcon.style.transform = "translateX(0)";
    });
});

// Add order button functionality
document.addEventListener("DOMContentLoaded", function() {
    var foodItems = document.querySelectorAll(".container .boxe1, .boxe2, .boxe3, .boxe4, .boxe5, .boxe6, .boxe7, .boxe8, .boxe9, .boxe10");
    foodItems.forEach(function(item) {
        var orderBtn = document.createElement("button");
        orderBtn.textContent = "Order";
        orderBtn.style.display = "block";
        orderBtn.style.marginTop = "10px";
        orderBtn.style.padding = "5px 10px";
        orderBtn.style.cursor = "pointer";
        orderBtn.style.backgroundColor = "#ff5722";
        orderBtn.style.color = "white";
        orderBtn.style.border = "none";
        orderBtn.style.borderRadius = "5px";
        
        item.appendChild(orderBtn);
        
        orderBtn.addEventListener("click", function() {
            alert("Order placed at Jai Mata Di Restro!");
        });
    });
});
