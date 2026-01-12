// Product Data
const products = [
    {
        id: 1,
        name: "Kemeja Batik Solo Modern",
        category: "fashion",
        price: 350000,
        image: "batik_shirt.jpg",
        isNew: true
    },
    {
        id: 2,
        name: "Vas Keramik Tanah Liat",
        category: "decor",
        price: 125000,
        image: "ceramic_vase.jpg",
        isNew: false
    },
    {
        id: 3,
        name: "Tas Anyaman Rotan Bali",
        category: "fashion",
        price: 280000,
        image: "rattan_bag.jpg",
        isNew: true
    },
    {
        id: 4,
        name: "Ukiran Kayu Jepara",
        category: "craft",
        price: 850000,
        image: "wooden_craft.jpg",
        isNew: false
    },
    {
        id: 5,
        name: "Selendang Tenun Ikat",
        category: "fashion",
        price: 450000,
        image: "ikat_cloth.jpg",
        isNew: false
    },
    {
        id: 6,
        name: "Set Cangkir Gerabah",
        category: "decor",
        price: 180000,
        image: "pottery_set.jpg",
        isNew: true
    },
    {
        id: 7,
        name: "Topeng Tradisional",
        category: "craft",
        price: 320000,
        image: "mask_mask.jpg",
        isNew: false
    },
    {
        id: 8,
        name: "Lampu Hias Bambu",
        category: "decor",
        price: 150000,
        image: "bamboo_lamp.jpg",
        isNew: false
    }
];

// DOM Elements
const productGrid = document.getElementById('product-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const navbar = document.getElementById('navbar');
const cartCountElement = document.getElementById('cart-count');

// State
let cartCount = 0;

// Format Currency
const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { 
        style: 'currency', 
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
};

// Render Products
function renderProducts(filter = 'all') {
    productGrid.innerHTML = '';
    
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(product => product.category === filter);

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        
        // Simple badge logic
        const badgeHTML = product.isNew 
            ? `<span style="position:absolute; top:10px; left:10px; background:var(--primary-color); color:#fff; padding:2px 8px; border-radius:4px; font-size:0.7rem; z-index:2;">Baru</span>` 
            : '';

        productCard.innerHTML = `
            <div class="product-image">
                ${badgeHTML}
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300?text=Produk+Nusantara'">
                <div class="product-actions">
                    <button class="action-btn" onclick="addToCart()" aria-label="Add to Cart"><ion-icon name="cart-outline"></ion-icon></button>
                    <button class="action-btn" aria-label="View Details"><ion-icon name="eye-outline"></ion-icon></button>
                    <button class="action-btn" aria-label="Wishlist"><ion-icon name="heart-outline"></ion-icon></button>
                </div>
            </div>
            <div class="product-info">
                <span class="product-category">${product.category === 'craft' ? 'Kriya' : product.category === 'decor' ? 'Dekorasi' : 'Busana'}</span>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">${formatRupiah(product.price)}</div>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });
}

// Add to Cart Functionality
window.addToCart = () => {
    cartCount++;
    cartCountElement.textContent = cartCount;
    // Optional: Add small animation to badge
    cartCountElement.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartCountElement.style.transform = 'scale(1)';
    }, 200);
}

// Filter Functionality
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active to clicked
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        renderProducts(filterValue);
    });
});

// Sticky Navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});
