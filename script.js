const products = [
 {id:1,name:'مانتو لینن آوا',category:'مانتو',price:1890000,oldPrice:2190000,badge:'پرفروش',color:'کرم',image:'manto_new.jpg'},
 {id:2,name:'پیراهن میدی رُز',category:'پیراهن',price:2350000,oldPrice:0,badge:'جدید',color:'صورتی',image:'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=700&q=80'},
 {id:3,name:'شومیز کلاسیک نوا',category:'شومیز',price:1190000,oldPrice:1390000,badge:'پیشنهاد ویژه',color:'سفید',image:'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=700&q=80'},
 {id:4,name:'شلوار پارچه‌ای ماه',category:'شلوار',price:1450000,oldPrice:0,badge:'',color:'خاکی',image:'https://images.unsplash.com/photo-1506629905607-d9f4b4d7c0f5?auto=format&fit=crop&w=700&q=80'},
 {id:5,name:'مانتو کتی آرتا',category:'مانتو',price:2690000,oldPrice:0,badge:'جدید',color:'قهوه‌ای',image:'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=80'},
 {id:6,name:'پیراهن تابان',category:'پیراهن',price:1990000,oldPrice:2290000,badge:'پرفروش',color:'مشکی',image:'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=700&q=80'},
 {id:7,name:'شومیز راه‌راه دریا',category:'شومیز',price:1290000,oldPrice:0,badge:'',color:'آبی',image:'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=700&q=80'},
 {id:8,name:'شلوار راسته رها',category:'شلوار',price:1590000,oldPrice:0,badge:'',color:'طوسی',image:'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=700&q=80'}
];
const toman = n => new Intl.NumberFormat('fa-IR').format(n) + ' تومان';
const grid = document.getElementById('product-grid');
const cart = [];
let currentFilter = 'همه';
let searchTerm = '';

function renderProducts(){
  let list = products.filter(p =>
    (currentFilter === 'همه' || p.category === currentFilter) &&
    p.name.includes(searchTerm)
  );

  const sort = document.getElementById('sort-select').value;

  if (sort === 'low') list.sort((a, b) => a.price - b.price);
  if (sort === 'high') list.sort((a, b) => b.price - a.price);

grid.innerHTML = list.map(p => `
    <article class="product-card">
      <div class="product-photo">
        <img src="${p.image}" alt="${p.name}" loading="lazy"
             onerror="this.style.opacity='.25'">

     ${p.badge ?`<span class="badge">${p.badge}</span>`:"}

        <div class="product-options">
          <label>
            سایز لباس
            <select class="size-select" data-size="${p.id}">
              <option value="">انتخاب سایز</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </label>

          <label>
            رنگ لباس
            <select class="color-select" data-color="${p.id}">
              <option value="${p.color}">${p.color}</option>
              <option value="مشکی">مشکی</option>
              <option value="سفید">سفید</option>
              <option value="کرم">کرم</option>
              <option value="صورتی">صورتی</option>
              <option value="قهوه‌ای">قهوه‌ای</option>
            </select>
          </label>

          <button class="quick-add" data-add="${p.id}">
            + افزودن به سبد خرید
          </button>
        </div>
      </div>

      <div class="product-info">
        <div class="product-meta">
          <div>
            <h3>${p.name}</h3>
            <p>${p.category} · رنگ ${p.color}</p>
          </div>

          <div class="price">
          ${p.oldPrice
  ?`<span class="old-price">${new Intl.NumberFormat('fa-IR').format(p.oldPrice)}</span>`
  :"}
            ${new Intl.NumberFormat('fa-IR').format(p.price)}
          </div>
        </div>

        <div class="swatches">
          <span style="background:#d8c4ad"></span>
          <span style="background:#34302e"></span>
          <span style="background:#b77e72"></span>
        </div>
      </div>
    </article>
  ).join('');

  document.getElementById('empty-state').hidden = list.length > 0;
}
const drawer=document.getElementById('cart-drawer'), overlay=document.getElementById('overlay');
function openCart(){drawer.classList.add('open');overlay.classList.add('show');drawer.setAttribute('aria-hidden','false');}
function closeCart(){drawer.classList.remove('open');overlay.classList.remove('show');drawer.setAttribute('aria-hidden','true');}
grid.addEventListener('click',e=>{const b=e.target.closest('[data-add]');if(b)addToCart(Number(b.dataset.add));});
document.getElementById('filters').addEventListener('click',e=>{const b=e.target.closest('[data-filter]');if(!b)return;currentFilter=b.dataset.filter;document.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x===b));renderProducts();});
document.getElementById('sort-select').addEventListener('change',renderProducts);
document.getElementById('cart-open').addEventListener('click',openCart);
document.getElementById('cart-close').addEventListener('click',closeCart);
overlay.addEventListener('click',closeCart);
document.getElementById('cart-items').addEventListener('click', e => {
  const quantityButton = e.target.closest('[data-qty]');
  const removeButton = e.target.closest('[data-remove]');

  if (quantityButton) {
    const index = Number(quantityButton.dataset.index);
    const item = cart[index];

    if (!item) return;

    item.qty += Number(quantityButton.dataset.qty);

    if (item.qty <= 0) {
      cart.splice(index, 1);
    }

    renderCart();
  }

  if (removeButton) {
    const index = Number(removeButton.dataset.remove);

    if (index >= 0 && index < cart.length) {
      cart.splice(index, 1);
      renderCart();
    }
  }
});
document.getElementById('checkout-btn').addEventListener('click',()=>showToast(cart.length?'برای پرداخت واقعی باید درگاه پرداخت و بخش سفارش‌ها راه‌اندازی شود.':'سبد خریدت خالی است.'));
const searchPanel=document.getElementById('search-panel');
document.getElementById('search-toggle').addEventListener('click',()=>{searchPanel.classList.add('open');document.getElementById('search-input').focus();});
document.getElementById('search-close').addEventListener('click',()=>searchPanel.classList.remove('open'));
document.getElementById('search-form').addEventListener('submit',e=>{e.preventDefault();searchTerm=document.getElementById('search-input').value.trim();currentFilter='همه';document.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x.dataset.filter==='همه'));renderProducts();searchPanel.classList.remove('open');document.getElementById('products').scrollIntoView();});
document.querySelectorAll('.collection-card').forEach(c=>c.addEventListener('click',()=>{currentFilter=c.dataset.category;document.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x.dataset.filter===currentFilter));renderProducts();}));
document.getElementById('newsletter-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const status = document.getElementById('newsletter-status');
  const button = form.querySelector('button');

  button.disabled = true;
  status.textContent = 'در حال ثبت ایمیل...';

  try {
    const response = await fetch('https://formspree.io/f/maeeygwg', {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });

    if (response.ok) {
      status.textContent = 'ممنون از عضویتت! 🌷';
      form.reset();
    } else {
      status.textContent = 'ثبت ایمیل انجام نشد؛ لطفاً دوباره تلاش کن.';
    }
  } catch (error) {
    status.textContent = 'اتصال برقرار نشد؛ لطفاً دوباره تلاش کن.';
  } finally {
    button.disabled = false;
  }
});
document.getElementById('menu-toggle').addEventListener('click',()=>document.getElementById('nav').classList.toggle('open'));
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>document.getElementById('nav').classList.remove('open')));
renderProducts();renderCart();
