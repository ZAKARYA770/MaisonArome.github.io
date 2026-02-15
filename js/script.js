document.addEventListener('DOMContentLoaded', () => {
    console.log("Maison Arôme : Script chargé avec succès.");

    // --- 1. GESTION DU LOGO & NAVIGATION ---
    // On ne touche au logo que s'il est sous forme de texte (cas des anciennes versions)
    const navLogo = document.getElementById('navLogo');
    if (navLogo && navLogo.tagName === 'SPAN') {
        navLogo.innerText = "Maison Arôme";
    }

    // --- 2. GESTION DU PANIER (GLOBAL) ---
    const cartCount = document.getElementById('cart-count');
    const updateBadge = () => {
        let cart = JSON.parse(localStorage.getItem('maisonAromeCart')) || [];
        if (cartCount) cartCount.innerText = cart.length;
    };
    updateBadge();

    // --- 3. LOGIQUE DE PERSONNALISATION (Seulement si sur la page personnalisation) ---
    const input = document.getElementById('engravingInput');
    const previewText = document.getElementById('previewText');
    const previewColor = document.getElementById('previewColor');
    const displayPrice = document.getElementById('displayPrice');

    // Mise à jour de la gravure en temps réel
    if (input && previewText) {
        input.addEventListener('input', (e) => {
            previewText.innerText = e.target.value.toUpperCase() || "VOTRE GRAVURE";
        });
    }

    // Changement de Couleur
    document.querySelectorAll('.color-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            const color = dot.getAttribute('data-color');
            if (previewColor) previewColor.style.backgroundColor = color;
            
            document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
        });
    });

    // Changement de Flacon et Prix
    document.querySelectorAll('.opt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const price = btn.getAttribute('data-price');
            if (displayPrice) displayPrice.innerText = price + ",00 €";
            
            document.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
    
    // Bouton Ajouter au panier
    const addBtn = document.getElementById('addToCartBtn');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            let cart = JSON.parse(localStorage.getItem('maisonAromeCart')) || [];
            cart.push({ name: "Parfum Personnalisé", price: 120 });
            localStorage.setItem('maisonAromeCart', JSON.stringify(cart));
            updateBadge();
            alert("Ajouté au panier !");
        });
    }
});

// Fonction globale pour le panier (accessible depuis le HTML)
window.toggleCart = function() {
    const modal = document.getElementById('cart-modal');
    if (modal) {
        modal.classList.toggle('open');
    } else {
        console.error("Erreur : L'élément 'cart-modal' est introuvable.");
    }
};
