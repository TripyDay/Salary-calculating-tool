const items = [
    {
      id: 1,
      name: 'Product 1',
      price: 10.00,
      quantity: 1
    },
    {
      id: 2,
      name: 'Product 2',
      price: 20.00,
      quantity: 1
    },
    {
      id: 3,
      name: 'Product 3',
      price: 30.00,
      quantity: 1
    }
  ];
  
  const cart = {
    items: [],
    subtotal: 0,
    tax: 0,
    total: 0,
    addItem(item) {
      const existingItem = this.items.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        this.items.push(item);
      }
      this.update();
    },
    removeItem(item) {
      const index = this.items.findIndex((i) => i.id === item.id);
      if (index >= 0) {
        this.items.splice(index, 1);
      }
      this.update();
    },
    update() {
      let subtotal = 0;
      this.items.forEach((item) => {
        subtotal += item.price * item.quantity;
      });
      this.subtotal = subtotal;
      this.tax = this.subtotal * 0.1;
      this.total = this.subtotal + this.tax;
    }
  };
  
  function renderCart() {
    const cartItems = document.querySelector('#cart-items');
    cartItems.innerHTML = '';
    cart.items.forEach((item) => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
  
      const name = document.createElement('div');
      name.classList.add('name');
      name.innerText = item.name;
  
      const price = document.createElement('div');
      price.classList.add('price');
      price.innerText = `$${item.price.toFixed(2)}`;
  
      const quantity = document.createElement('div');
      quantity.classList.add('quantity');
      quantity.innerText = item.quantity;
  
      const removeButton = document.createElement('button');
      removeButton.classList.add('remove-button');
      removeButton.innerText = 'Remove';
      removeButton.addEventListener('click', () => {
        cart.removeItem(item);
      });
  
      cartItem.appendChild(name);
      cartItem.appendChild(price);
      cartItem.appendChild(quantity);
      cartItem.appendChild(removeButton);
      cartItems.appendChild(cartItem);
    });
  
    const subtotal = document.querySelector('#subtotal');
    subtotal.innerText = `$${cart.subtotal.toFixed(2)}`;
  
    const tax = document.querySelector('#tax');
    tax.innerText = `$${cart.tax.toFixed(2)}`;
  
    const total = document.querySelector('#total');
    total.innerText = `$${cart.total.toFixed(2)}`;
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    renderCart();
  
    const addItemButtons = document.querySelectorAll('.add-to-cart-button');
    addItemButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const id = parseInt(button.dataset.itemId);
        const item = items.find((i) => i.id === id);
        if (item) {
          cart.addItem(item);
        }
      });
    });
  });
  
