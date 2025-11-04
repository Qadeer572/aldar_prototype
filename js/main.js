// Main JavaScript functionality

// Cart management
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function updateCartCount() {
    const cartCounts = document.querySelectorAll('.cart-count');
    const count = cartItems.length;
    
    cartCounts.forEach(cartCount => {
        if (count > 0) {
            cartCount.textContent = count;
            cartCount.style.display = 'flex';
        } else {
            cartCount.style.display = 'none';
        }
    });
}

function addToCart(productData) {
    cartItems.push(productData);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
}

// Make openCart globally accessible
window.openCart = function() {
    console.log('openCart function called'); // Debug log
    console.log('Cart items:', cartItems); // Debug log
    
    if (cartItems.length === 0) {
        alert('Your cart is empty. Add items to your cart to view them here.');
        return;
    }
    
    // Create cart display
    let cartHTML = 'Shopping Cart (' + cartItems.length + ' items):\n\n';
    let total = 0;
    
    cartItems.forEach((item, index) => {
        cartHTML += `${index + 1}. ${item.name} - Size: ${item.size.toUpperCase()} - ${item.price}\n`;
        // Extract price number (remove AED and commas)
        const priceNum = parseFloat(item.price.replace('AED', '').replace(',', '').trim());
        if (!isNaN(priceNum)) {
            total += priceNum;
        }
    });
    
    cartHTML += `\nTotal: AED ${total.toLocaleString()}`;
    
    alert(cartHTML);
    console.log('Cart Items:', cartItems);
};

// Cart icon click functionality - use event delegation for better reliability
document.addEventListener('click', function(e) {
    // Check if click is on cart icon or any child element
    const cartIcon = e.target.closest('.cart-icon') || e.target.closest('#cart-icon');
    const cartCount = e.target.closest('.cart-count');
    
    if (cartIcon || cartCount) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Cart icon clicked!'); // Debug log
        openCart();
        return false;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart count on page load
    updateCartCount();
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Category filter functionality (for products page)
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            // Placeholder for future filter functionality
        });
    });

    // Wishlist toggle (placeholder)
    const wishlistButtons = document.querySelectorAll('.product-wishlist');
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            // Placeholder for wishlist functionality
            console.log('Wishlist clicked');
        });
    });

    // Form submission handling (placeholder)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Placeholder for form submission
            alert('Thank you for your message! This is a prototype.');
        });
    }

    // Add to Bag functionality
    const addToBagButton = document.querySelector('.add-to-bag-button');
    if (addToBagButton) {
        addToBagButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get selected size
            const sizeSelect = document.getElementById('size-select');
            const selectedSize = sizeSelect ? sizeSelect.value : null;
            
            // Check if size is selected
            if (!selectedSize || selectedSize === '') {
                alert('Please select a size before adding to bag.');
                if (sizeSelect) {
                    sizeSelect.focus();
                    sizeSelect.style.borderColor = 'var(--accent-pink)';
                    setTimeout(() => {
                        sizeSelect.style.borderColor = '';
                    }, 2000);
                }
                return;
            }
            
            // Get product information
            const productName = document.querySelector('.product-detail-name')?.textContent || 'Product';
            const productPrice = document.querySelector('.product-detail-price')?.textContent || '';
            
            // Show success message
            const buttonText = this.textContent;
            this.textContent = 'Added!';
            this.style.backgroundColor = 'var(--accent-pink-dark)';
            
            // Add to cart
            const productData = {
                name: productName,
                size: selectedSize,
                price: productPrice,
                id: Date.now() // Simple ID for demo
            };
            
            addToCart(productData);
            
            // Log to console (for development)
            console.log('Added to bag:', productData);
            
            // Reset button after 2 seconds
            setTimeout(() => {
                this.textContent = buttonText;
                this.style.backgroundColor = '';
            }, 2000);
            
            // Update cart icon animation
            const cartIcon = document.querySelector('.cart-icon');
            if (cartIcon) {
                cartIcon.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    cartIcon.style.transform = '';
                }, 300);
            }
        });
    }

    // Wishlist button on product detail page
    const wishlistButtonDetail = document.querySelector('.wishlist-button-detail');
    if (wishlistButtonDetail) {
        wishlistButtonDetail.addEventListener('click', function(e) {
            e.preventDefault();
            this.textContent = this.textContent === '♡' ? '♥' : '♡';
            this.style.color = this.textContent === '♥' ? 'var(--accent-pink-dark)' : '';
            console.log('Wishlist toggled');
        });
    }
});

