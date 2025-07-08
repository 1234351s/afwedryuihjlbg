const cartItems = document.getElementById('cart-items');
const totalDisplay = document.getElementById('total');
const sideCart = document.getElementById('side-cart');
const closeBtn = document.getElementById('close-cart');
let cart = [];

function updateCartUI() {
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} — ${item.price} грн x 
      <button class="qty-btn" data-index="${index}" data-action="decrease">−</button>
      ${item.qty}
      <button class="qty-btn" data-index="${index}" data-action="increase">+</button>
    `;
    cartItems.appendChild(li);
    total += item.price * item.qty;
  });

  totalDisplay.textContent = total;
}

// Додавання товару
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', e => {
    const product = e.target.closest('.product');
    const name = product.dataset.name;
    const price = parseInt(product.dataset.price);

    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name, price, qty: 1 });
    }

    updateCartUI();
    sideCart.classList.add('open');
  });
});

// Зміна кількості
cartItems.addEventListener('click', e => {
  if (e.target.classList.contains('qty-btn')) {
    const index = e.target.dataset.index;
    const action = e.target.dataset.action;

    if (action === 'increase') {
      cart[index].qty += 1;
    } else if (action === 'decrease') {
      cart[index].qty -= 1;
      if (cart[index].qty === 0) cart.splice(index, 1);
    }

    updateCartUI();
  }
});

// Закриття кошика
closeBtn.addEventListener('click', () => {
  sideCart.classList.remove('open');
});


document.getElementById('checkout-btn').addEventListener('click', () => {
  if (cart.length === 0) {
    alert("Кошик порожній 😢");
    return;
  }

  const form = document.getElementById('order-form');
  const orderInput = document.getElementById('order-input');
  const totalInput = document.getElementById('total-input');

  const orderDetails = cart.map(item => `${item.name} x ${item.qty} = ${item.qty * item.price} грн`).join('\n');
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  orderInput.value = orderDetails;
  totalInput.value = `${total} грн`;

  form.submit();

  alert("Замовлення відправлено!");
  cart = [];
  updateCartUI();
  sideCart.classList.remove('open');
});
