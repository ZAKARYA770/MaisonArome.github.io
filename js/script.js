let cart = JSON.parse(localStorage.getItem('maisonAromeCart')) || [];

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.classList.toggle('open');
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartList = document.getElementById('cart-list');
    const totalPrice = document.getElementById('cart-total-price');

    if (cartCount) cartCount.innerText = cart.length;

    if (cartList) {
        cartList.innerHTML = cart.map((item, index) => `
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:15px; border-bottom:1px solid #eee; padding-bottom:10px;">
                <img src="${item.img}" style="width:50px;">
                <div style="flex:1;">
                    <h4 style="font-size:0.8rem; margin:0;">${item.name}</h4>
                    <p style="color:#c5a059; font-size:0.7rem;">${item.price} €</p>
                </div>
            </div>
        `).join('');
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    if (totalPrice) totalPrice.innerText = `${total},00 €`;
}

// Appeler update au chargement
document.addEventListener('DOMContentLoaded', updateCartUI);
