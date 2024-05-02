let cartForm = document.querySelector('.cart-form-container');

document.querySelector('#cart-btn').onclick = () =>{
  cartForm.classList.toggle('active');
}

document.querySelector('#close-cart-btn').onclick = () =>{
  cartForm.classList.remove('active');
}

let favForm = document.querySelector('.fav-form-container');

document.querySelector('#fav-btn').onclick = () =>{
  favForm.classList.toggle('active');
}

document.querySelector('#close-fav-btn').onclick = () =>{
  favForm.classList.remove('active');
}

const cartContainer = document.querySelector('#cart-container .cart-content');

// Handle "Add to Cart" button clicks
document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', (event) => {
        const bookBox = event.target.closest('.box');
        const bookId = bookBox.getAttribute('data-book-id');
        const bookTitle = bookBox.getAttribute('data-book-title');
        const bookPrice = bookBox.getAttribute('data-book-price');
        const bookImage = bookBox.querySelector('.image img').src;

        // Check if the item is already in the cart
        const existingItem = cartContainer.querySelector(`.cart-item[data-book-id="${bookId}"]`);

        if (existingItem) {
            alert(`${bookTitle} is already in the cart.`);
        } else {
            // Create a new cart item
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.setAttribute('data-book-id', bookId);
            cartItem.innerHTML = `
                  <img src="${bookImage}" alt="${bookTitle}" class="cart-item-image">
                  <div class="cart-item-details">
                      <h3>${bookTitle}</h3>
                      <p>Price: ₹${bookPrice}</p>
                      <button class="remove-from-cart">Remove</button>
                  </div>
            `;

            // Append to the cart container
            cartContainer.appendChild(cartItem);

            // Handle removing the item from the cart
            cartItem.querySelector('.remove-from-cart').addEventListener('click', () => {
                cartItem.remove();
            });

            // Show alert that the book has been added to the cart
            alert(`${bookTitle} has been added to the cart.`);
        }
    });
});

const favContainer = document.querySelector('#fav-container .fav-content');

// Handle "Fav" button clicks
document.querySelectorAll('.fas.fa-heart').forEach((button) => {
    button.addEventListener('click', (event) => {
        const bookBox = event.target.closest('.box');
        const bookId = bookBox.getAttribute('data-book-id');
        const bookTitle = bookBox.getAttribute('data-book-title');
        const bookPrice = bookBox.getAttribute('data-book-price');
        const bookImage = bookBox.querySelector('.image img').src;

        // Check if the item is already in the fav
        const existingItem = favContainer.querySelector(`.fav-item[data-book-id="${bookId}"]`);

        if (existingItem) {
            alert(`${bookTitle} is already in the cart.`);
        } else {
            // Create a new fav item
            const favItem = document.createElement('div');
            favItem.className = 'fav-item';
            favItem.setAttribute('data-book-id', bookId);
            favItem.innerHTML = `
                  <img src="${bookImage}" alt="${bookTitle}" class="fav-item-image">
                  <div class="fav-item-details">
                      <h3>${bookTitle}</h3>
                      <p>Price: ₹${bookPrice}</p>
                      <button class="remove-from-fav">Remove</button>
                  </div>
            `;

            // Append to the cart container
            favContainer.appendChild(favItem);

            // Handle removing the item from the cart
            favItem.querySelector('.remove-from-fav').addEventListener('click', () => {
                favItem.remove();
            });

            // Show alert that the book has been added to the fav
            alert(`${bookTitle} has been added to the favorites.`);
        }
    });
});

// Find the modal and its close button
const bookModal = document.querySelector('#book-modal');
const closeModalBtn = bookModal.querySelector('.close-btn');
// Close modal functionality
closeModalBtn.addEventListener('click', () => {
    bookModal.style.display = 'none';
});

// Handle "fa-eye" button clicks to open the modal
document.querySelectorAll('.fas.fa-eye').forEach((button) => {
    button.addEventListener('click', (event) => {
        const bookBox = event.target.closest('.box');
        const bookId = bookBox.getAttribute('data-book-id');
        const bookTitle = bookBox.getAttribute('data-book-title');
        const bookPrice = bookBox.getAttribute('data-book-price');
        const bookImage = bookBox.querySelector('.image img').src;

        // Populate the modal with book details
        const bookDetailsContainer = bookModal.querySelector('.book-details');
        bookDetailsContainer.innerHTML = `
            <h2>${bookTitle}</h2>
            <img src="${bookImage}" alt="${bookTitle}" style="max-width: 200px;">
            <p>Price: ₹${bookPrice}</p>
        `;

        // Display the modal
        bookModal.style.display = 'block';

        // Add functionality for "Add to Cart"
        const addToCartBtn = bookModal.querySelector('.add-to-cart');
        addToCartBtn.addEventListener('click', () => {
            // Check if the book is already in the cart
            const existingItem = cartContainer.querySelector(`.cart-item[data-book-id="${bookId}"]`);

            if (existingItem) {
                alert(`${bookTitle} is already in the cart.`);
            } else {
                // Add to the cart
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.setAttribute('data-book-id', bookId);
                cartItem.innerHTML = `
                    <img src="${bookImage}" alt="${bookTitle}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h3>${bookTitle}</h3>
                        <p>Price: ₹${bookPrice}</p>
                        <button class="remove-from-cart">Remove</button>
                    </div>
                `;
                cartContainer.appendChild(cartItem);

                // Close the modal and inform the user
                bookModal.style.display = 'none';
                alert(`${bookTitle} has been added to the cart.`);
            }
        });

        // Add functionality for "Add to Favorites"
        const addToFavBtn = bookModal.querySelector('.add-to-fav');
        addToFavBtn.addEventListener('click', () => {
            // Check if the book is already in the favorites
            const existingFavItem = favContainer.querySelector(`.fav-item[data-book-id="${bookId}"]`);

            if (existingFavItem) {
                alert(`${bookTitle} is already in the favorites.`);
            } else {
                // Add to the favorites
                const favItem = document.createElement('div');
                favItem.className = 'fav-item';
                favItem.setAttribute('data-book-id', bookId);
                favItem.innerHTML = `
                    <img src="${bookImage}" alt="${bookTitle}" class="fav-item-image">
                    <div class="fav-item-details">
                        <h3>${bookTitle}</h3>
                        <p>Price: ₹${bookPrice}</p>
                        <button class="remove-from-fav">Remove</button>
                    </div>
                `;
                favContainer.appendChild(favItem);

                // Close the modal and inform the user
                bookModal.style.display = 'none';
                alert(`${bookTitle} has been added to the favorites.`);
            }
        });
    });
});

// Function to populate and open the modal
function openBookModal(bookBox) {
    const bookId = bookBox.getAttribute('data-book-id');
    const bookTitle = bookBox.getAttribute('data-book-title');
    const bookPrice = bookBox.getAttribute('data-book-price');
    const bookImage = bookBox.querySelector('.image img')?.src || bookBox.querySelector('img').src;

    // Populate the modal with book details
    const bookDetailsContainer = bookModal.querySelector('.book-details');
    bookDetailsContainer.innerHTML = `
        <h2>${bookTitle}</h2>
        <img src="${bookImage}" alt="${bookTitle}" style="max-width: 200px;">
        <p>Price: ₹${bookPrice}</p>
    `;

    // Add event listeners to "Add to Cart" and "Add to Favorites"
    const addToCartBtn = bookModal.querySelector('.add-to-cart');
    addToCartBtn.onclick = () => {
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
                    <p>Price: ₹${bookPrice}</p>
                    <button class="remove-from-cart">Remove</button>
                </div>
            `;
            cartContainer.appendChild(cartItem);
            bookModal.style.display = 'none';
            alert(`${bookTitle} has been added to the cart.`);
        }
    };

    const addToFavBtn = bookModal.querySelector('.add-to-fav');
    addToFavBtn.onclick = () => {
        const existingFavItem = favContainer.querySelector(`.fav-item[data-book-id="${bookId}"]`);
        if (existingFavItem) {
            alert(`${bookTitle} is already in the favorites.`);
        } else {
            const favItem = document.createElement('div');
            favItem.className = 'fav-item';
            favItem.setAttribute('data-book-id', bookId);
            favItem.innerHTML = `
                <img src="${bookImage}" alt="${bookTitle}" class="fav-item-image">
                <div class="fav-item-details">
                    <h3>${bookTitle}</h3>
                    <p>Price: ₹${bookPrice}</p>
                    <button class="remove-from-fav">Remove</button>
                </div>
            `;
            favContainer.appendChild(favItem);
            bookModal.style.display = 'none';
            alert(`${bookTitle} has been added to the favorites.`);
        }
    };

    // Display the modal
    bookModal.style.display = 'block';
}

// Get the "home" and "arrivals" sections
const homeSection = document.querySelector('#home');
const arrivalsSection = document.querySelector('#arrivals');

// Add event listeners to the "home" and "arrivals" sections
[homeSection, arrivalsSection].forEach((section) => {
    section.querySelectorAll('.swiper-slide.box').forEach((bookBox) => {
        bookBox.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            openBookModal(bookBox); // Open the modal with book details
        });
    });
});

// Close the modal when clicking outside the content area
window.addEventListener('click', (event) => {
    if (event.target === bookModal) {
        bookModal.style.display = 'none';
    }
});

window.onscroll = () =>{

  searchForm.classList.remove('active');

  if(window.scrollY > 80){
    document.querySelector('.header .header-2').classList.add('active');
  }else{
    document.querySelector('.header .header-2').classList.remove('active');
  }

}

window.onload = () =>{

  if(window.scrollY > 80){
    document.querySelector('.header .header-2').classList.add('active');
  }else{
    document.querySelector('.header .header-2').classList.remove('active');
  }

}

var swiper = new Swiper(".books-slider", {
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
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

var swiper = new Swiper(".featured-slider", {
  spaceBetween: 10,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
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

var swiper = new Swiper(".arrivals-slider", {
  spaceBetween: 10,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
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