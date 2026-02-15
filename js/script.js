// --- 1. Gestion du Panier (JavaScript Logic) ---
let cart = [];
const cartModal = document.getElementById('cart-modal');
const cartList = document.getElementById('cart-list');
const cartCount = document.getElementById('cart-count');
const cartTotalDisplay = document.getElementById('cart-total-price');

function toggleCart() {
    cartModal.classList.toggle('open');
}

function addToCart(id, name, price, img) {
    cart.push({ id, name, price, img });
    updateCartUI();
    if(!cartModal.classList.contains('open')) toggleCart();
}

function updateCartUI() {
    if (!cartCount) return;
    cartCount.innerText = cart.length;
    if (cart.length === 0) {
        cartList.innerHTML = '<p style="text-align: center; color: var(--mocha); margin-top: 2rem;">Votre panier est vide.</p>';
        cartTotalDisplay.innerText = '0,00 €';
        return;
    }

    cartList.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <img src="${item.img}" alt="${item.name}">
            <div style="flex:1">
                <h4 class="serif" style="font-size: 0.9rem;">${item.name}</h4>
                <p style="font-size: 0.8rem; color: var(--gold);">${item.price},00 €</p>
            </div>
            <button onclick="removeItem(${index})" style="color: red; font-size: 0.7rem;">Supprimer</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotalDisplay.innerText = `${total},00 €`;
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function simulateCheckout() {
    if(cart.length === 0) return alert("Votre panier est vide");
    alert("Redirection vers la passerelle de paiement sécurisée...");
    cart = [];
    updateCartUI();
    toggleCart();
}

// --- 2. Custom Creator Logic ---
let selection = { head: '', heart: '', base: '' };

function selectNote(type, note) {
    selection[type] = note;
    
    // UI Toggle
    const groupIndex = type === 'head' ? 1 : type === 'heart' ? 2 : 3;
    const buttons = document.querySelectorAll(`.note-group:nth-of-type(${groupIndex}) .note-opt`);
    buttons.forEach(btn => btn.classList.remove('selected'));
    event.target.classList.add('selected');

    // Update Summary & Bottle Visual
    const fill = (Object.values(selection).filter(v => v !== '').length) * 30;
    const liquidFill = document.getElementById('liquid-fill');
    if (liquidFill) liquidFill.style.height = `${20 + fill}%`;
    
    const summary = document.getElementById('perfume-summary');
    if (summary) summary.innerText = `${selection.head || '?'} | ${selection.heart || '?'} | ${selection.base || '?'}`;
}

function addCustomToCart() {
    if(!selection.head || !selection.heart || !selection.base) {
        alert("Veuillez sélectionner les 3 notes pour votre création.");
        return;
    }
    addToCart(99, "Signature Sur Mesure", 145, "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=100");
    // Reset selection
    selection = { head: '', heart: '', base: '' };
    document.querySelectorAll('.note-opt').forEach(btn => btn.classList.remove('selected'));
    const liquidFill = document.getElementById('liquid-fill');
    if (liquidFill) liquidFill.style.height = `20%`;
}

// --- 3. Filters Logic ---
function filterProducts(category) {
    const cards = document.querySelectorAll('.card');
    const btns = document.querySelectorAll('.tab-btn');
    
    btns.forEach(btn => btn.classList.remove('active'));
    if (event) event.target.classList.add('active');

    cards.forEach(card => {
        if(category === 'all') {
            card.style.display = 'block';
        } else {
            card.classList.contains(category) ? card.style.display = 'block' : card.style.display = 'none';
        }
    });
}

// --- 4. Scroll Effects ---
window.addEventListener('scroll', () => {
    const nav = document.getElementById('main-nav');
    if (nav) window.scrollY > 50 ? nav.classList.add('scrolled') : nav.classList.remove('scrolled');
    
    // Reveal on scroll
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        if (revealTop < windowHeight - 100) el.classList.add('active');
    });
});

// Trigger first reveal
window.dispatchEvent(new Event('scroll'));
