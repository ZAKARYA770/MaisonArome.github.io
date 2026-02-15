// --- 1. Gestion du Panier avec LocalStorage ---
let cart = JSON.parse(localStorage.getItem('maisonAromeCart')) || [];

function saveCart() {
    localStorage.setItem('maisonAromeCart', JSON.stringify(cart));
    updateCartUI();
}

const cartModal = document.getElementById('cart-modal');
const cartList = document.getElementById('cart-list');
const cartCount = document.getElementById('cart-count');
const cartTotalDisplay = document.getElementById('cart-total-price');

function toggleCart() {
    cartModal.classList.toggle('open');
}

function addToCart(id, name, price, img) {
    cart.push({ id, name, price, img });
    saveCart();
    if(!cartModal.classList.contains('open')) toggleCart();
}

function updateCartUI() {
    if (cartCount) cartCount.innerText = cart.length;
    if (!cartList) return;

    if (cart.length === 0) {
        cartList.innerHTML = '<p style="text-align: center; color: var(--mocha); margin-top: 2rem;">Votre panier est vide.</p>';
        if (cartTotalDisplay) cartTotalDisplay.innerText = '0,00 €';
        return;
    }

    cartList.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <img src="${item.img}" alt="${item.name}">
            <div style="flex:1">
                <h4 class="serif" style="font-size: 0.9rem;">${item.name}</h4>
                <p style="font-size: 0.8rem; color: var(--gold);">${item.price},00 €</p>
            </div>
            <button onclick="removeItem(${index})" style="color: red; font-size: 0.7rem; border:none; background:none; cursor:pointer;">Supprimer</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    if (cartTotalDisplay) cartTotalDisplay.innerText = `${total},00 €`;
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
}

// Khdem UI melli t-loadi l-page
updateCartUI();

// --- Bqiyat l-code (Creator & Filters) ---
// ... (khli l-code dyal selectNote o filterProducts kima kano)
