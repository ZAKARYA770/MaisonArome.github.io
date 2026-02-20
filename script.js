// ==================== STATE MANAGEMENT ====================
let cart = [];

// ==================== DOM ELEMENTS (With Safety Guards) ====================
const elements = {
    header: document.getElementById('header'),
    mobileMenuBtn: document.getElementById('mobile-menu-btn'),
    navMenu: document.getElementById('nav-menu'),
    navLinks: document.querySelectorAll('.nav-link'),
    cartBtn: document.getElementById('cart-btn'),
    mobileCartBtn: document.getElementById('mobile-cart-btn'),
    cartOverlay: document.getElementById('cart-overlay'),
    cartSidebar: document.getElementById('cart-sidebar'),
    cartClose: document.getElementById('cart-close'),
    cartBadge: document.getElementById('cart-badge'),
    mobileCartBadge: document.getElementById('mobile-cart-badge'),
    cartItems: document.getElementById('cart-items'),
    cartFooter: document.getElementById('cart-footer'),
    cartTotalPrice: document.getElementById('cart-total-price'),
    toast: document.getElementById('toast'),
    countdown: {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    },
    contactForm: document.getElementById('contact-form'),
    formSuccess: document.getElementById('form-success'),
    heroImg: document.querySelector('.hero-img'),
    scrollIndicator: document.querySelector('.scroll-indicator')
};

// ==================== SMOOTH SCROLLING ====================
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = 80;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (elements.navMenu && elements.navMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });
}

// ==================== HEADER SCROLL EFFECT ====================
function initHeaderScroll() {
    if (!elements.header) return;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            elements.header.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
            elements.header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            elements.header.style.boxShadow = 'none';
            elements.header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
}

// ==================== ACTIVE NAV LINK ====================
function initActiveNavLinks() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ==================== MOBILE MENU ====================
function toggleMobileMenu() {
    if (elements.mobileMenuBtn) elements.mobileMenuBtn.classList.toggle('active');
    if (elements.navMenu) elements.navMenu.classList.toggle('active');
}

function initMobileMenu() {
    if (elements.mobileMenuBtn) {
        elements.mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    if (elements.navLinks) {
        elements.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (elements.navMenu && elements.navMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            });
        });
    }
}

// ==================== CART FUNCTIONALITY ====================
function openCart() {
    if (elements.cartOverlay) elements.cartOverlay.classList.add('active');
    if (elements.cartSidebar) elements.cartSidebar.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    if (elements.cartOverlay) elements.cartOverlay.classList.remove('active');
    if (elements.cartSidebar) elements.cartSidebar.classList.remove('active');
    document.body.style.overflow = '';
}

function initCartHandlers() {
    if (elements.cartBtn) elements.cartBtn.addEventListener('click', openCart);
    if (elements.mobileCartBtn) elements.mobileCartBtn.addEventListener('click', openCart);
    if (elements.cartClose) elements.cartClose.addEventListener('click', closeCart);
    if (elements.cartOverlay) elements.cartOverlay.addEventListener('click', closeCart);
}

// ==================== UPDATE CART UI ====================
function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (elements.cartBadge) elements.cartBadge.textContent = totalItems;
    if (elements.mobileCartBadge) elements.mobileCartBadge.textContent = totalItems;

    if (elements.mobileCartBtn) {
        elements.mobileCartBtn.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    if (elements.cartItems) {
        if (cart.length === 0) {
            elements.cartItems.innerHTML = `
                <div class="cart-empty">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                        <line x1="3" y1="6" x2="21" y2="6"/>
                        <path d="M16 10a4 4 0 0 1-8 0"/>
                    </svg>
                    <p>Votre panier est vide</p>
                </div>
            `;
            if (elements.cartFooter) elements.cartFooter.style.display = 'none';
        } else {
            elements.cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}" loading="lazy">
                    </div>
                    <div class="cart-item-details">
                        <h3 class="cart-item-name">${item.name}</h3>
                        <p class="cart-item-price">${item.price} DH</p>
                        <div class="cart-item-controls">
                            <div class="cart-item-quantity">
                                <button class="cart-qty-btn" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <line x1="5" y1="12" x2="19" y2="12"/>
                                    </svg>
                                </button>
                                <span>${item.quantity}</span>
                                <button class="cart-qty-btn" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <line x1="12" y1="5" x2="12" y2="19"/>
                                        <line x1="5" y1="12" x2="19" y2="12"/>
                                    </svg>
                                </button>
                            </div>
                            <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="3 6 5 6 21 6"/>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                    <line x1="10" y1="11" x2="10" y2="17"/>
                                    <line x1="14" y1="11" x2="14" y2="17"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');

            if (elements.cartFooter) elements.cartFooter.style.display = 'block';
            if (elements.cartTotalPrice) elements.cartTotalPrice.textContent = `${totalPrice} DH`;
        }
    }

    localStorage.setItem('maisonAromeCart', JSON.stringify(cart));
}

// ==================== CART ACTIONS ====================
window.addToCart = function (product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += product.quantity;
    } else {
        cart.push(product);
    }
    updateCartUI();
    showToast(`${product.name} ajouté au panier !`);
};

window.updateQuantity = function (id, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(id);
        return;
    }
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity = newQuantity;
        updateCartUI();
    }
};

window.removeFromCart = function (id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
    showToast('Produit retiré du panier');
};

// ==================== TOAST NOTIFICATION ====================
function showToast(message) {
    if (!elements.toast) return;
    elements.toast.textContent = message;
    elements.toast.classList.add('show');

    setTimeout(() => {
        elements.toast.classList.remove('show');
    }, 4000);
}

// ==================== QUANTITY SELECTOR HANDLER ====================
function initQuantitySelectors() {
    document.addEventListener('click', (e) => {
        const minusBtn = e.target.closest('.qty-minus');
        const plusBtn = e.target.closest('.qty-plus');

        if (minusBtn || plusBtn) {
            const selector = e.target.closest('.quantity-selector');
            const input = selector.querySelector('.qty-input');
            let val = parseInt(input.value);

            if (minusBtn && val > 1) val--;
            if (plusBtn && val < (parseInt(input.max) || 99)) val++;

            input.value = val;
        }
    });
}

// ==================== ADD TO CART HANDLER ====================
function initAddToCartButtons() {
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.add-to-cart');
        if (!btn) return;

        const card = btn.closest('.product-card');
        const qtyInput = card ? card.querySelector('.qty-input') : null;

        const product = {
            id: btn.dataset.id,
            name: btn.dataset.name,
            price: parseInt(btn.dataset.price),
            image: btn.dataset.image,
            quantity: qtyInput ? parseInt(qtyInput.value) : 1
        };

        window.addToCart(product);
        if (qtyInput) qtyInput.value = 1;
    });
}

// ==================== COUNTDOWN TIMER ====================
function initCountdown() {
    const { days, hours, minutes, seconds } = elements.countdown;
    if (!days || !hours || !minutes || !seconds) return;

    let timeLeft = { days: 27, hours: 12, minutes: 45, seconds: 30 };

    const timer = setInterval(() => {
        if (timeLeft.seconds > 0) timeLeft.seconds--;
        else if (timeLeft.minutes > 0) { timeLeft.minutes--; timeLeft.seconds = 59; }
        else if (timeLeft.hours > 0) { timeLeft.hours--; timeLeft.minutes = 59; timeLeft.seconds = 59; }
        else if (timeLeft.days > 0) { timeLeft.days--; timeLeft.hours = 23; timeLeft.minutes = 59; timeLeft.seconds = 59; }
        else { clearInterval(timer); return; }

        days.textContent = String(timeLeft.days).padStart(2, '0');
        hours.textContent = String(timeLeft.hours).padStart(2, '0');
        minutes.textContent = String(timeLeft.minutes).padStart(2, '0');
        seconds.textContent = String(timeLeft.seconds).padStart(2, '0');
    }, 1000);
}

// ==================== AROMA FILTERS ====================
function initAromaFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const aromaCards = document.querySelectorAll('.aroma-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            aromaCards.forEach(card => {
                const cat = card.dataset.category;
                const matches = filter === 'all' || cat === filter;
                card.style.display = matches ? 'block' : 'none';
                if (matches) card.classList.remove('hidden');
                else card.classList.add('hidden');
            });
        });
    });
}

// ==================== CONTACT FORM ====================
function initContactForm() {
    if (!elements.contactForm) return;

    elements.contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        elements.contactForm.style.display = 'none';
        if (elements.formSuccess) elements.formSuccess.style.display = 'block';

        setTimeout(() => {
            elements.contactForm.style.display = 'block';
            if (elements.formSuccess) elements.formSuccess.style.display = 'none';
            elements.contactForm.reset();
        }, 4000);
    });
}

// ==================== FADE IN ON SCROLL (Backup) ====================
function initFadeInOnScroll() {
    const items = document.querySelectorAll('[data-aos]');
    if (!('IntersectionObserver' in window)) {
        items.forEach(el => el.classList.add('aos-animate'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    items.forEach(el => observer.observe(el));
}

// ==================== CHECKOUT HANDLERS ====================
function initCheckoutHandlers() {
    const checkoutBtn = document.getElementById('checkout-btn');
    const backToCartBtn = document.getElementById('back-to-cart');
    const checkoutForm = document.getElementById('checkout-form');
    const cartMainActions = document.getElementById('cart-main-actions');
    const checkoutFormContainer = document.getElementById('checkout-form-container');
    const cartItems = document.getElementById('cart-items');
    const cartFooter = document.getElementById('cart-footer');

    if (checkoutBtn && cartMainActions && checkoutFormContainer && cartFooter) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) return;
            cartMainActions.style.display = 'none';
            cartItems.style.display = 'none';
            cartFooter.style.display = 'none'; // Hide footer to allow form to occupy full space
            checkoutFormContainer.style.display = 'block';
        });
    }

    if (backToCartBtn) {
        backToCartBtn.addEventListener('click', () => {
            if (cartMainActions) cartMainActions.style.display = 'block';
            if (cartItems) cartItems.style.display = 'block';
            if (cartFooter) cartFooter.style.display = 'block'; // Show footer back
            if (checkoutFormContainer) checkoutFormContainer.style.display = 'none';
        });
    }

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = checkoutForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Envoi en cours...';

            const name = document.getElementById('checkout-name').value;
            const phone = document.getElementById('checkout-phone').value;
            const address = document.getElementById('checkout-address').value;

            const itemsList = cart.map((item, index) =>
                `${index + 1}. ${item.name} - Quantité: ${item.quantity}`
            ).join('\n');

            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

            // Construct WhatsApp Message Content
            const message =
                `Bonjour Maison Arôme,\n\n` +
                `Nouvelle commande:\n\n` +
                `Nom: ${name}\n` +
                `Téléphone: ${phone}\n` +
                `Adresse: ${address}\n\n` +
                `Produits:\n` +
                `${itemsList}\n\n` +
                `Total: ${total} DH\n\n` +
                `Merci.`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappLink = `https://wa.me/212708235021?text=${encodedMessage}`;

            showToast('Redirection vers WhatsApp...');

            // Short delay to let the toast show up
            setTimeout(() => {
                window.open(whatsappLink, '_blank');

                // Clear cart and reset UI
                setTimeout(() => {
                    finalizeOrder(checkoutForm, cartMainActions, cartItems, checkoutFormContainer);
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }, 1000);
            }, 500);
        });
    }
}

function finalizeOrder(form, actions, items, container) {
    cart = [];
    updateCartUI();
    closeCart();
    form.reset();
    if (actions) actions.style.display = 'block';
    if (items) items.style.display = 'block';
    if (elements.cartFooter) elements.cartFooter.style.display = 'block';
    if (container) container.style.display = 'none';
}

// ==================== INITIALIZE APP ====================
function initApp() {
    console.log('🌸 MAISON AROME - System check...');

    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true, offset: 100 });
    }

    const saved = localStorage.getItem('maisonAromeCart');
    if (saved) {
        try { cart = JSON.parse(saved); } catch (e) { cart = []; }
    }

    initSmoothScrolling();
    initHeaderScroll();
    initActiveNavLinks();
    initMobileMenu();
    initCartHandlers();
    updateCartUI();
    initQuantitySelectors();
    initAddToCartButtons();
    initCountdown();
    initAromaFilters();
    initContactForm();
    initCheckoutHandlers();
    initFadeInOnScroll();

    console.log('🌸 MAISON AROME - Online');
}

// Start
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
