document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('engravingInput');
    const previewText = document.getElementById('previewText');
    const charCount = document.getElementById('charCount');
    const displayPrice = document.getElementById('displayPrice');
    
    // Mise à jour de la gravure
    if(input) {
        input.addEventListener('input', (e) => {
            const val = e.target.value.toUpperCase();
            previewText.innerText = val || "VOTRE GRAVURE";
            charCount.innerText = val.length;
        });
    }

    // Sélection du flacon (Prix)
    document.querySelectorAll('.opt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            displayPrice.innerText = btn.dataset.price + ",00 €";
        });
    });

    // Sélection de la couleur
    document.querySelectorAll('.color-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            document.getElementById('previewColor').style.backgroundColor = dot.dataset.color;
        });
    });
});

function toggleCart() {
    alert("Le panier sera bientôt disponible !");
}
