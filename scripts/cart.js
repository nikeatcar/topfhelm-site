// ===== cart.js =====

let cart = JSON.parse(localStorage.getItem('topfhelm-cart')) || [];

function cartItemKey(item) {
  return `${item.name}|${item.size || ''}|${item.premium ? '1' : '0'}`;
}

// Добавить товар в корзину
function addToCart(productName, options = {}) {
  const key = cartItemKey({ name: productName, ...options });
  const existingIndex = cart.findIndex(item => cartItemKey(item) === key);

  if (existingIndex !== -1) {
    cart[existingIndex].qty += 1;
  } else {
    cart.push({ name: productName, ...options, qty: 1 });
  }

  localStorage.setItem('topfhelm-cart', JSON.stringify(cart));
  updateCartCounter();
}

// Отобразить содержимое корзины
function openCartPopup() {
  const cartPopup = document.getElementById('order-popup');
  const orderText = document.getElementById('order-text');
  const orderList = document.getElementById('order-list');
  orderList.innerHTML = "";

  if (cart.length === 0) {
    orderText.value = "🛒 Your order is empty.";
  } else {
    const lines = cart.map((item) => {
      let line = `- ${item.name} ×${item.qty}`;
      if (item.size) line += ` (Size: ${item.size})`;
      if (item.premium) line += ` + Premium`;
      return line;
    });

    orderText.value = `🏰 *TopfHelm Order*\n\n` +
      lines.map(l => l.replace(/^- /, '\u2022 ')).join("\n") +
      "\n\nPlease send this message in DM. Thank you!";

    cart.forEach((item, index) => {
      const li = document.createElement('li');
      let line = `${item.name} ×${item.qty}`;
      if (item.size) line += ` (Size: ${item.size})`;
      if (item.premium) line += ` + Premium`;

      const qtyBox = document.createElement('div');
      qtyBox.classList.add('qty-box');

      const minusBtn = document.createElement('button');
      minusBtn.textContent = '−';
      minusBtn.onclick = () => changeQuantity(index, -1);

      const plusBtn = document.createElement('button');
      plusBtn.textContent = '+';
      plusBtn.onclick = () => changeQuantity(index, 1);

      const removeBtn = document.createElement('button');
      removeBtn.textContent = "🗑";
      removeBtn.classList.add('remove-item');
      removeBtn.onclick = () => removeFromCart(index);

      li.textContent = line;
      li.appendChild(qtyBox);
      qtyBox.appendChild(minusBtn);
      qtyBox.appendChild(plusBtn);
      li.appendChild(removeBtn);

      orderList.appendChild(li);
    });
  }

  cartPopup.classList.remove('hidden');
}

function changeQuantity(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem('topfhelm-cart', JSON.stringify(cart));
  updateCartCounter();
  openCartPopup();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('topfhelm-cart', JSON.stringify(cart));
  updateCartCounter();
  openCartPopup();
}

function clearCart() {
  cart = [];
  localStorage.removeItem('topfhelm-cart');
  updateCartCounter();
  alert("Cart cleared!");
}

function updateCartCounter() {
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    const totalQty = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    cartCount.textContent = totalQty;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const viewCartBtn = document.getElementById('view-cart');
  const clearCartBtn = document.getElementById('clear-cart');

  if (viewCartBtn) {
    viewCartBtn.addEventListener('click', openCartPopup);
  }
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', clearCart);
  }

  updateCartCounter();
});

function addTshirtToCart(button) {
    const name = button.dataset.name;
    const sizeGroup = button.dataset.sizeGroup;
    const premiumGroup = button.dataset.premiumGroup;
  
    let size = '';
    let premium = false;
  
    if (sizeGroup) {
      const selected = document.querySelector(`input[name="${sizeGroup}"]:checked`);
      if (selected) size = selected.value;
    }
  
    if (premiumGroup) {
      const premiumCheckbox = document.querySelector(`input[name="${premiumGroup}"]`);
      if (premiumCheckbox && premiumCheckbox.checked) premium = true;
    }
  
    addToCart(name, { size, premium });
  }
