const cartForm = document.querySelector('.cart-form-container');
const favForm = document.querySelector('.fav-form-container');

//open cart 
document.querySelector('#cart-btn').onclick = () => {
  cartForm.classList.toggle('active');
};

//closes cart
document.querySelector('#close-cart-btn').onclick = () => {
  cartForm.classList.remove('active');
};

//opens fav
document.querySelector('#fav-btn').onclick = () => {
  favForm.classList.toggle('active');
};

//closes fav
document.querySelector('#close-fav-btn').onclick = () => {
  favForm.classList.remove('active');
};

const cartContainer = document.querySelector('#cart-container .cart-content');
const favContainer = document.querySelector('#fav-container .fav-content');

// Function to attach event listener for removing cart items
function attachRemoveButtonListener(cartItem) {
  cartItem.querySelector('.remove-from-cart').addEventListener('click', () => {
    cartItem.remove();
    updateCartSummary();
    checkIfCartIsEmpty();
  });
}

// Function to attach event listener for removing fav items
function attachRemoveButtonListenerFav(favItem) {
  favItem.querySelector('.remove-from-fav').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default behavior
    favItem.remove(); // Remove the item
  });
}

// Function to update cart summary (total price and book count)
function updateCartSummary() {
  const cartItems = cartContainer.querySelectorAll('.cart-item');
  let totalPrice = 0;
  let totalBooks = 0;

  cartItems.forEach((item) => {
    const price = parseFloat(item.querySelector('.cart-item-details p').textContent.replace('Price: ₹', ''));
    totalPrice += price;
    totalBooks++;
  });

  document.getElementById('total-books').textContent = totalBooks;
  document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

// Function to check if the cart is empty
function checkIfCartIsEmpty() {
  const cartItems = cartContainer.querySelectorAll('.cart-item');
  if (cartItems.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
  }
}

// Function to add a book to the cart
function addBookToCart(bookId, bookTitle, bookPrice, bookImage) {
  const existingItem = cartContainer.querySelector(`.cart-item[data-book-id="${bookId}"]`);

  if (existingItem) {
    alert(`${bookTitle} is already in the cart.`);
  } else {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.setAttribute('data-book-id', bookId);
    cartItem.innerHTML = `
      <img src="${bookImage}" alt="${bookTitle}" class="cart-item-image">
      <div class="cart-item-details">
        <h3>${bookTitle}</h3>
        <p>Price: ${bookPrice}</p>
        <button class="remove-from-cart">Remove</button>
      </div>
    `;

    cartContainer.appendChild(cartItem);
    attachRemoveButtonListener(cartItem);
    updateCartSummary();
    checkIfCartIsEmpty();

    alert(`${bookTitle} has been added to the cart.`);
  }
}

// Function to add a book to the favorites
function addBookToFav(bookId, bookTitle, bookPrice, bookImage) {
  const existingItem = favContainer.querySelector(`.fav-item[data-book-id="${bookId}"]`);

  if (existingItem) {
    alert(`${bookTitle} is already in the favorites.`);
  } else {
    const favItem = document.createElement('div');
    favItem.className = 'fav-item';
    favItem.setAttribute('data-book-id', bookId);
    favItem.innerHTML = `
      <img src="${bookImage}" alt="${bookTitle}" class="fav-item-image">
      <div class="fav-item-details">
        <h3>${bookTitle}</h3>
        <p>Price: ${bookPrice}</p>
        <button class="remove-from-fav">Remove</button>
      </div>
    `;

    alert(`${bookTitle} has been added to the favorites.`);
    
    favContainer.appendChild(favItem);
    attachRemoveButtonListenerFav(favItem);
  }
}

// Function to open and populate the book modal
function openBookModal(bookBox) {
  const bookId = bookBox.getAttribute('data-book-id');
  const bookTitle = bookBox.getAttribute('data-book-title');
  const bookPrice = bookBox.getAttribute('data-book-price');
  const bookImage = bookBox.querySelector('.image img')?.src || bookBox.querySelector('img').src;

  const bookDetailsContainer = document.querySelector('#book-modal .book-details');
  bookDetailsContainer.innerHTML = `
    <h2>${bookTitle}</h2>
    <img src="${bookImage}" alt="${bookTitle}" style="max-width: 200px;">
    <p>Price: ${bookPrice}</p>
  `;

  const addToCartBtn = document.querySelector('#book-modal .add-to-cart');
  addToCartBtn.onclick = () => {
    addBookToCart(bookId, bookTitle, bookPrice, bookImage);
  };

  const addToFavBtn = document.querySelector('#book-modal .add-to-fav');
  addToFavBtn.onclick = () => {
    addBookToFav(bookId, bookTitle, bookPrice, bookImage);
  };

  document.querySelector('#book-modal').style.display = 'block';
}

// Handle modal closing
const bookModal = document.querySelector('#book-modal');
const closeModalBtn = bookModal.querySelector('.close-btn');

closeModalBtn.addEventListener('click', () => {
  bookModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === bookModal) {
    bookModal.style.display = 'none';
  }
});

// Click "eye" icon to open book modal
document.querySelectorAll('.fas.fa-eye').forEach((eyeButton) => {
  eyeButton.addEventListener('click', (event) => {
    const bookBox = event.target.closest('.box');
    openBookModal(bookBox); // Open the modal with book details
  });
});

// Click "heart" icon to add to favorites
document.querySelectorAll('.fas.fa-heart').forEach((heartButton) => {
  heartButton.addEventListener('click', (event) => {
    const bookBox = event.target.closest('.box');
    const bookId = bookBox.getAttribute('data-book-id');
    const bookTitle = bookBox.getAttribute('data-book-title');
    const bookPrice = bookBox.getAttribute('data-book-price');
    const bookImage = bookBox.querySelector('.image img').src;

    addBookToFav(bookId, bookTitle, bookPrice, bookImage); // Add to favorites
  });
});

const featuredSection = document.querySelector('#featured');

// Add to cart for featured section books
featuredSection.querySelectorAll('.add-to-cart').forEach((button) => {
  button.addEventListener('click', (event) => {
    const bookBox = event.target.closest('.box');
    const bookId = bookBox.getAttribute('data-book-id');
    const bookTitle = bookBox.getAttribute('data-book-title');
    const bookPrice = bookBox.getAttribute('data-book-price');
    const bookImage = bookBox.querySelector('.image img')?.src || bookBox.querySelector('img').src;

    addBookToCart(bookId, bookTitle, bookPrice, bookImage); // Add to cart for featured books
  });
});

// Open book modal when clicking on a book in home or arrivals sections
const homeSection = document.querySelector('#home');
const arrivalsSection = document.querySelector('#arrivals');

[homeSection, arrivalsSection].forEach((section) => {
  section.querySelectorAll('.swiper-slide.box').forEach((bookBox) => {
    bookBox.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default link behavior
      openBookModal(bookBox); // Open the modal with book details
    });
  });
});

//header stays even if scrolled
window.onscroll = () => {
  if (window.scrollY > 80) {
    document.querySelector('.header .header-2').classList.add('active');
  } else {
    document.querySelector('.header .header-2').classList.remove('active');
  }
};

//header stays even if scrolled after a reload
window.onload = () => {
  if (window.scrollY > 80) {
    document.querySelector('.header .header-2').classLis.add('active');
  } else {
    document.querySelector('.header .header-2').classList.remove('active');
  }
};

//for animating books
var swiper = new Swiper(".books-slider", {
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 7500,
    disableOnInteraction: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

//for animating featured books
var swiper = new Swiper(".featured-slider", {
  spaceBetween: 10,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 7500,
    disableOnInteraction: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    450: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});

//for animating arrivals books
var swiper = new Swiper(".arrivals-slider", {
  spaceBetween: 10,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 7500,
    disableOnInteraction: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});