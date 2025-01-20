let cart = [];
let currentImages = []; // Array to store product images
let currentImageIndex = 0; // To track the current image index

// Translations for English and Arabic
const translations = {
  en: {
    price: "Price: ",
    availableColors: "Available Colors: ",
    chooseColor: "Choose a color: ",
    addToCart: "Add to Cart",
    checkoutMessage: "Your order has been successfully sent via WhatsApp!",
    checkoutButton: "Buy Now",
    cartEmpty: "There are no items in the cart!",
    productDetails: "Product Details",
    homeLink: "Home",
    shopLink: "Shop",
    aboutLink: "About",
    welcomeMsg: "Welcome to Yoyo Store",
    introMsg: "Discover unique handmade bags crafted with love.",
    aboutTitle: "About Yoyo",
    aboutText: "At Yoyo, we create high-quality handmade bags that combine style and functionality. We prioritize craftsmanship, sustainability, and unique designs."
  },
  ar: {
    price: "السعر: ",
    availableColors: "الألوان المتوفرة: ",
    chooseColor: "اختر لونًا: ",
    addToCart: "أضف إلى السلة",
    checkoutMessage: "تم إرسال طلبك بنجاح عبر WhatsApp!",
    checkoutButton: "اشتري الآن",
    cartEmpty: "لا توجد عناصر في السلة!",
    productDetails: "تفاصيل المنتج",
    homeLink: "الصفحة الرئيسية",
    shopLink: "التسوق",
    aboutLink: "عن الشركة",
    welcomeMsg: "مرحبًا بكم في متجر يويو",
    introMsg: "اكتشف الحقائب اليدوية الفريدة المصنوعة بحب.",
    aboutTitle: "عن يويو",
    aboutText: "في يويو، نحن نصنع حقائب يدوية عالية الجودة تجمع بين الأناقة والوظيفية. نحن نولي الأولوية للحرفية، والاستدامة، والتصاميم الفريدة."
  }
};

let currentLanguage = 'en'; // Default language

// Show product details in a modal
function showProductDetails(name, price, img, colors) {
  currentImages = img.split(',');
  currentImageIndex = 0;
  
  document.getElementById('product-name').textContent = name;
  document.getElementById('product-price').textContent = `${translations[currentLanguage].price} ${price} EGP`;
  document.getElementById('product-image').src = currentImages[currentImageIndex];
  document.getElementById('product-colors').textContent = `${translations[currentLanguage].availableColors} ${colors}`;
  
  const colorSelect = document.getElementById('product-colors-select');
  colorSelect.innerHTML = '';
  colors.split(',').forEach(color => {
    const option = document.createElement('option');
    option.value = color.trim();
    option.textContent = color.trim();
    colorSelect.appendChild(option);
  });

  document.getElementById('product-color-label').textContent = translations[currentLanguage].chooseColor;
  document.getElementById('modal-add-to-cart').textContent = translations[currentLanguage].addToCart;
  document.getElementById('modal-add-to-cart').onclick = () => addToCart(name, price, colorSelect.value);
  
  document.getElementById('product-details-modal').style.display = 'block';
}

// Close product details modal
function closeProductDetails() {
  document.getElementById('product-details-modal').style.display = 'none';
}

// Change image when clicking previous or next
function changeImage(direction) {
  currentImageIndex += direction;

  if (currentImageIndex < 0) {
    currentImageIndex = currentImages.length - 1;
  } else if (currentImageIndex >= currentImages.length) {
    currentImageIndex = 0;
  }

  document.getElementById('product-image').src = currentImages[currentImageIndex];
}

// Add selected product to the cart
function addToCart(name, price, selectedColor) {
  cart.push({ name, price, color: selectedColor });
  updateCart();
  closeProductDetails();
}

// Update cart display
function updateCart() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
  
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ${item.price} EGP - Color: ${item.color}`;
    cartItems.appendChild(li);
  });
}

// Checkout and send order via WhatsApp
function checkout() {
  if (cart.length === 0) {
    alert(translations[currentLanguage].cartEmpty);
    return;
  }

  const cartSummary = cart.map(item => `${item.name} - ${item.price} EGP - Color: ${item.color}`).join('\n');
  const message = `Hello! I would like to purchase the following products:\n\n${cartSummary}\nThank you!`;

  const whatsappLink = `https://wa.me/01016975219?text=${encodeURIComponent(message)}`;
  window.open(whatsappLink, '_blank');

  alert(translations[currentLanguage].checkoutMessage);
  cart = [];
  updateCart();
}

// Toggle between languages
function toggleLanguage() {
  currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';
  updateLanguage();
}

// Update all texts on the page according to the selected language
function updateLanguage() {
  document.getElementById('site-name').textContent = currentLanguage === 'en' ? 'Yoyo Brand' : 'براند يويو';
  document.getElementById('home-link').textContent = translations[currentLanguage].homeLink;
  document.getElementById('shop-link').textContent = translations[currentLanguage].shopLink;
  document.getElementById('about-link').textContent = translations[currentLanguage].aboutLink;
  document.getElementById('welcome-msg').textContent = translations[currentLanguage].welcomeMsg;
  document.getElementById('intro-msg').textContent = translations[currentLanguage].introMsg;
  document.getElementById('products-title').textContent = translations[currentLanguage].productDetails;
  document.getElementById('about-title').textContent = translations[currentLanguage].aboutTitle;
  document.getElementById('about-text').textContent = translations[currentLanguage].aboutText;
  document.getElementById('language-toggle').textContent = currentLanguage === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية';

  // Update prices and product details dynamically if needed.
  document.getElementById('product-1-price').textContent = `${translations[currentLanguage].price} 50 EGP`;
  document.getElementById('product-2-price').textContent = `${translations[currentLanguage].price} 60 EGP`;
}
