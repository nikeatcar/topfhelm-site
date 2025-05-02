// ===== merch.js =====

// Фильтрация товаров
const filterButtons = document.querySelectorAll('.filter-btn');
const merchItems = document.querySelectorAll('.merch-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');

    merchItems.forEach(item => {
      if (filter === 'all' || item.classList.contains(filter)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Popup заказа
const orderButtons = document.querySelectorAll('.order-btn');
const orderPopup = document.getElementById('order-popup');
const orderText = document.getElementById('order-text');
const copyOrderBtn = document.getElementById('copy-order');
const sendInstagramBtn = document.getElementById('send-instagram');
const closePopup = document.getElementById('close-popup');

orderButtons.forEach(button => {
  button.addEventListener('click', () => {
    const productName = button.getAttribute('data-product');
    const sizeGroup = button.getAttribute('data-size-group');
    const premiumGroup = button.getAttribute('data-premium-group');
    
    let selectedSize = '';
    let premiumSelected = false;
    
    if (sizeGroup) {
      const sizeOption = document.querySelector(`input[name="${sizeGroup}"]:checked`);
      if (sizeOption) {
        selectedSize = sizeOption.value;
      }
    }
    
    if (premiumGroup) {
      const premiumOption = document.querySelector(`input[name="${premiumGroup}"]`);
      if (premiumOption && premiumOption.checked) {
        premiumSelected = true;
      }
    }
    
    let orderMessage = `🏰 TopfHelm Order\nProduct: ${productName}`;

    if (sizeGroup && selectedSize !== "") {
      orderMessage += `\nSize: ${selectedSize}`;
    }
    
    if (premiumSelected) {
      orderMessage += `\nPremium Oversized: Yes (+€10)`;
    }
    
    orderText.value = orderMessage;
    orderPopup.classList.remove('hidden');
  });
});

copyOrderBtn.addEventListener('click', () => {
  orderText.select();
  document.execCommand('copy');
  copyOrderBtn.textContent = "Copied! 🖊";

  setTimeout(() => {
    copyOrderBtn.textContent = "Copy Order Text";
  }, 1500);
});

closePopup.addEventListener('click', () => {
  orderPopup.classList.add('hidden');
});

// Чтобы при клике вне окна закрывалось
window.addEventListener('click', (e) => {
  if (e.target === orderPopup) {
    orderPopup.classList.add('hidden');
  }
});

window.addEventListener('load', function(){
  new Glider(document.querySelector('.glider'), {
    slidesToShow: 1,
    dots: '.dots',
    arrows: {
      prev: '.glider-prev',
      next: '.glider-next'
    },
    draggable: true,
    scrollLock: true
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

});