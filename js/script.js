/**
 * MAISON ARÔME - Personalization Logic (Senior Architecture)
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- State Management ---
    let customization = {
        bottle: "Classique",
        color: "rgba(197, 160, 89, 0.3)",
        engraving: "",
        price: 120
    };

    // --- DOM Elements ---
    const elements = {
        engravingInput: document.getElementById('engravingInput'),
        previewText: document.getElementById('previewText'),
        previewColor: document.getElementById('previewColor'),
        charCount: document.getElementById('charCount'),
        bottleOptions: document.querySelectorAll('#bottleSelect .option-btn'),
        colorDots: document.querySelectorAll('#colorSelect .color-dot'),
        displayPrice: document.getElementById('displayPrice'),
        addToCartBtn: document.getElementById('addToCartBtn'),
        cartCount: document.getElementById('cart-count')
    };

    // --- Logic Functions ---

    /**
     * Updates the UI preview based on state
     */
    const updatePreview = () => {
        if (elements.previewText) {
            elements.previewText.innerText = customization.engraving || "VOTRE GRAVURE";
        }
        if (elements.previewColor) {
            elements.previewColor.style.backgroundColor = customization.color;
        }
        if (elements.displayPrice) {
            elements.displayPrice.innerText = `${customization.price},00 €`;
        }
        if (elements.charCount) {
            elements.charCount.innerText = customization.engraving.length;
        }
    };

    // --- Event Listeners ---

    // 1. Engraving Input
    if (elements.engravingInput) {
        elements.engravingInput.addEventListener('input', (e) => {
            customization.engraving = e.target.value.toUpperCase();
            updatePreview();
        });
    }

    // 2. Bottle Selection
    elements.bottleOptions.forEach(btn => {
        btn.addEventListener('click', () => {
            // UI Toggle
            elements.bottleOptions.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update State
            customization.bottle = btn.getAttribute('data-value');
            customization.price = parseInt(btn.getAttribute('data-price'));
            updatePreview();
        });
    });

    // 3. Color Selection
    elements.colorDots.forEach(dot => {
        dot.addEventListener('click', () => {
            elements.colorDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');

            customization.color = dot.getAttribute('data-color');
            updatePreview();
        });
    });

    // 4. Add to Cart & LocalStorage
    if (elements.addToCartBtn) {
        elements.addToCartBtn.addEventListener('click', () => {
            // Retrieve existing cart
            let cart = JSON.parse(localStorage.getItem('maisonAromeCart')) || [];
            
            // Create unique item
            const cartItem = {
                id: Date.now(),
                name: `Flacon Personnalisé - ${customization.bottle}`,
                details: `Gravure: ${customization.engraving || 'Aucune'}`,
                price: customization.price,
                img: 'images/logo.jpeg' // Placeholder
            };

            cart.push(cartItem);
            localStorage.setItem('maisonAromeCart', JSON.stringify(cart));

            // Visual feedback
            elements.addToCartBtn.innerText = "Ajouté !";
            setTimeout(() => {
                elements.addToCartBtn.innerText = "Ajouter à mon écrin";
            }, 2000);

            // Update badge if exists
            if (elements.cartCount) {
                elements.cartCount.innerText = cart.length;
            }
        });
    }

    // Initialize UI on load
    updatePreview();
});

/**
 * Navigation & Shared UI Logic
 */
const toggleCart = () => {
    const modal = document.getElementById('cart-modal');
    if (modal) modal.classList.toggle('open');
};

const cartBtn = document.getElementById('cartToggle');
const closeBtn = document.getElementById('closeCart');

if (cartBtn) cartBtn.addEventListener('click', toggleCart);
if (closeBtn) closeBtn.addEventListener('click', toggleCart);
