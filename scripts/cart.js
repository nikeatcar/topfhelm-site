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

    const li = document.createElement("li");

    // ---------- Название ----------

    const name = document.createElement("span");

    name.className = "order-item-name";

    let text = item.name;

    if (item.size)
        text += ` (${item.size})`;

    if (item.premium)
        text += " + Premium";

    name.textContent = text;


    // ---------- Количество ----------

    const controls = document.createElement("div");

    controls.className = "quantity-controls";


    const minus = document.createElement("button");

    minus.textContent = "−";

    minus.onclick = () => changeQuantity(index, -1);


    const qty = document.createElement("span");

    qty.className = "quantity";

    qty.textContent = item.qty;


    const plus = document.createElement("button");

    plus.textContent = "+";

    plus.onclick = () => changeQuantity(index, 1);


    controls.appendChild(minus);

    controls.appendChild(qty);

    controls.appendChild(plus);


    // ---------- Удалить ----------

    const remove = document.createElement("button");

    remove.className = "remove-btn";

    remove.innerHTML = "🗑";

    remove.onclick = () => removeFromCart(index);


    // ---------- Собираем ----------

    li.appendChild(name);

    li.appendChild(controls);

    li.appendChild(remove);

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
