function getQueryParameter(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }
  
  window.onload = () => {
    // Get the total books and total price from the URL
    const totalBooks = getQueryParameter('totalBooks');
    const totalPrice = getQueryParameter('totalPrice');
  
    // Display them in the appropriate locations
    document.getElementById('total-books-display').textContent = totalBooks;
    document.getElementById('total-price-display').textContent = totalPrice;
  };
  