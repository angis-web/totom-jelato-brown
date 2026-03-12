// 1. DATA (Your 30+ items)
const menuData = [
    { name: "Deluxe", price: "460 Birr", category: "food", img: "images/burger-burger.jpg" },
    { name: "Power Juice", price: "180 Birr", category: "drinks", img: "images/juice-power.jpg" },
    { name: "Pepperonia Pizza", price: "420 Birr", category: "food", img: "images/pizza-pepperonia.jpg" },
    { name: "Cozy Coffee", price: "60 Birr", category: "coffee", img: "images/coffee-cozy-coffee.jpg" },
    { name: "Crispy Chips", price: "100 Birr", category: "food", img: "images/chips.jpg" },
    { name: "Macaroni", price: "140 Birr", category: "food", img: "images/macaroni.jpg" },
    { name: "Cheeseburger Tripl Bacon", price: "385 Birr", category: "food", img: "images/burger-cc-triple-bacon.jpg" },
    { name: "Totom Jelato Food", price: "1180 Birr", category: "food", img: "images/foods.jpg" },
    { name: "Cappuccino", price: "70 Birr", category: "coffee", img: "images/coffee-cappuccino.jpg" },
    { name: "Avocado Juice", price: "180 Birr", category: "drinks", img: "images/juice-avocado.jpg" },
    { name: "Beyaynet", price: "170 Birr", category: "food", img: "images/injera-beyaynet.jpg" },
    { name: "Milk With Biscuits", price: "80 Birr", category: "coffee", img: "images/milk-with-biscuits.jpg" },
    { name: "Spaghetti", price: "180 Birr", category: "food", img: "images/pasta-spaghetti.jpg" },
    { name: "Tea", price: "40 Birr", category: "coffee", img: "images/tea-tea.jpg" },
    { name: "Meat and Vegetables Pizza", price: "400 Birr", category: "food", img: "images/pizza-meat-and-vegetables.jpg" },
    { name: "Strawberri Juice", price: "180 Birr", category: "drinks", img: "images/juice-strawberri.jpg" },
    { name: "Cheeseburger With Fresh Lettuce", price: "340 Birr", category: "food", img: "images/burger-cc-with-fresh-lettuce.jpg" },
    { name: "Special Burger", price: "510 Birr", category: "food", img: "images/burger-special-burger.jpg" },
    { name: "Orange Juice", price: "200 Birr", category: "drinks", img: "images/juice-orange.jpg" },
    { name: "Milk", price: "90 Birr", category: "coffee", img: "images/milk-milk.jpg" },
    { name: "Orange and Beetroot Juice", price: "40 Birr", category: "drinks", img: "images/juice-orange-and-beetroot.jpg" },
    { name: "Spaghetti with Marinara", price: "220 Birr", category: "food", img: "images/pasta-spaghetti-with-marinara.jpg" },
    { name: "Italian Style Pizza", price: "390 Birr", category: "food", img: "images/pizza-italian-style.jpg" },
    { name: "Crisps Chips", price: "110 Birr", category: "food", img: "images/chips-bowl-of-crisps.jpg" },
    { name: "Mango Juice", price: "170 Birr", category: "drinks", img: "images/juice-mango.jpg" },
    { name: "Coffee", price: "40 Birr", category: "coffee", img: "images/coffee-coffee.jpg" },
    { name: "Potato Chips", price: "90 Birr", category: "food", img: "images/chips-potato.jpg" },
    { name: "Burger with Sliced Vegetable", price: "300 Birr", category: "food", img: "images/burger-with-sliced-vegetable.jpg" },
    { name: "Spaghetti with Fresh Herbs", price: "180 Birr", category: "food", img: "images/pasta-shrimp-spaghetti-with-fresh-herbs.jpg" },
    { name: "Tea", price: "40 Birr", category: "coffee", img: "images/tea-with-brown-liquid.jpg" },
    { name: "Meat and vegetables Pizza", price: "440 Birr", category: "food", img: "images/pizza-meat-and-vegetables.jpg" },
    { name: "Meat", price: "340 Birr", category: "food", img: "images/meat.jpg" }
];

// --- SETTINGS ---
const itemsPerPage = 8;
let currentPage = 1;
let currentFilteredItems = [...menuData];

// --- DOM ELEMENTS ---
const menuGrid = document.getElementById('menu-grid');
const paginationContainer = document.getElementById('pagination-container');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const filterButtons = document.querySelectorAll('.filter-btn');

// --- INITIALIZE ---
window.addEventListener("DOMContentLoaded", () => {
    // 1. Always setup the Navbar (Home and Menu pages)
    setupNavbar();

    // 2. ONLY setup Menu logic if we are on the Menu page
    if (menuGrid) {
        updateDisplay();
        setupFilters();
    }
});

// 1. NAVBAR LOGIC (Works on all pages)
function setupNavbar() {
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

// ... Keep the rest of your functions (setupFilters, updateDisplay, etc.) exactly as they are

// 2. FILTERING LOGIC
function setupFilters() {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.dataset.category;
            
            // Note: Fixed "drink" vs "drinks" typo logic
            if (category === 'all') {
                currentFilteredItems = [...menuData];
            } else {
                currentFilteredItems = menuData.filter(item => item.category === category);
            }

            currentPage = 1;
            updateDisplay();
        });
    });
}

// 3. DISPLAY LOGIC
function updateDisplay() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = currentFilteredItems.slice(startIndex, endIndex);

    renderCards(itemsToDisplay);
    renderPagination();
}

// 4. CARD RENDERING
function renderCards(items) {
    if (items.length === 0) {
        menuGrid.innerHTML = `<p class="no-items">No items found in this category.</p>`;
        return;
    }

    menuGrid.innerHTML = items.map(item => `
        <div class="food-card" style="opacity: 0; display: block;">
            <div class="image-box"><img src="${item.img}" alt="${item.name}"></div>
            <div class="food-info">
                <h3>${item.name}</h3>
                <p class="price">${item.price}</p>
            </div>
        </div>
    `).join("");

    setTimeout(() => {
        document.querySelectorAll('.food-card').forEach(c => c.style.opacity = '1');
    }, 50);
}

// 5. PAGINATION RENDERING
function renderPagination() {
    const totalPages = Math.ceil(currentFilteredItems.length / itemsPerPage);
    if (totalPages <= 1) {
        paginationContainer.innerHTML = ""; // Hide pagination if only 1 page
        return;
    }

    let btnHtml = `<span style="display:none;" class="page-counter">Page ${currentPage} of ${totalPages}</span>`;
    btnHtml += `<div class="btn-group">`;

    if (currentPage > 1) {
        btnHtml += `<a class="btnn" onclick="changePage(${currentPage - 1})"><</a>`;
    }

    let startPage = currentPage;
    let endPage = Math.min(currentPage + 1, totalPages);

    if (currentPage === totalPages && totalPages > 1) {
        startPage = currentPage - 1;
        endPage = currentPage;
    }

    for (let i = startPage; i <= endPage; i++) {
        btnHtml += `<a class="btnn ${i === currentPage ? 'activee' : ''}" onclick="changePage(${i})">${i}</a>`;
    }

    if (currentPage < totalPages) {
        btnHtml += `<a class="btnn" onclick="changePage(${currentPage + 1})">></a>`;
    }

    btnHtml += `</div>`;
    paginationContainer.innerHTML = btnHtml;
}

// 6. GLOBAL PAGE CHANGE FUNCTION
window.changePage = function(page) {
    currentPage = page;
    updateDisplay();
    // Smooth scroll back to menu start
    document.querySelector('.category-buttons').scrollIntoView({ behavior: 'smooth' });
};