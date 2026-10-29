const products = [
  {id:1,name:"تیشرت ساده",price:350000,image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",description:"تیشرتی راحت و مناسب استفاده روزمره.",colors:["سفید","مشکی"],sizes:["S","M","L","XL"]},
  {id:2,name:"هودی کلاسیک",price:750000,image:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",description:"هودی راحت برای روزهای خنک.",colors:["مشکی","طوسی"],sizes:["S","M","L","XL"]},
  {id:3,name:"پیراهن روزمره",price:620000,image:"https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80",description:"پیراهنی ساده برای استایل روزمره.",colors:["سفید","آبی"],sizes:["S","M","L","XL"]},
  {id:4,name:"شلوار جین",price:890000,image:"https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80",description:"شلوار جین مناسب استایل روزانه.",colors:["آبی","مشکی"],sizes:["S","M","L","XL"]},
  {id:5,name:"سویشرت اسپرت",price:680000,image:"https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=800&q=80",description:"سویشرتی راحت با ظاهر اسپرت.",colors:["کرم","مشکی"],sizes:["S","M","L","XL"]},
  {id:6,name:"مانتو مینیمال",price:980000,image:"https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=800&q=80",description:"مانتویی ساده برای استایل مینیمال.",colors:["کرم","مشکی"],sizes:["S","M","L","XL"]},
  {id:7,name:"کاپشن روزمره",price:1250000,image:"https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=800&q=80",description:"کاپشن مناسب هوای خنک.",colors:["مشکی","سبز"],sizes:["S","M","L","XL"]},
  {id:8,name:"لباس راحتی",price:540000,image:"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=80",description:"لباسی راحت برای استفاده روزمره.",colors:["صورتی","طوسی"],sizes:["S","M","L","XL"]}
];

const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));
const product = products.find(item => item.id === productId);
const container = document.getElementById("product-detail");

function colorClass(color) {
  const colors = {
    "سفید": "#ffffff",
    "مشکی": "#222222",
    "طوسی": "#a7a7a7",
    "آبی": "#78a9d6",
    "کرم": "#e8d4b8",
    "صورتی": "#e9a3ba",
    "سبز": "#91aa88"
  };
  return colors[color] || "#eeeeee";
}

if (container) {
  if (!product) {
    container.innerHTML =`
      <section class="not-found">
        <h1>محصول پیدا نشد!</h1>
        <a href="index.html">بازگشت به فروشگاه</a>
      </section>`
    ;
  } else {
    container.innerHTML =`
      <div class="product-image-box">
        <img src="${product.image}" alt="${product.name}">
      </div>

      <section class="detail-info">
        <span class="product-label">محصول جدید</span>
        <h1>${product.name}</h1>
        <p class="product-description">${product.description}</p>

        <div class="price">
          ${product.price.toLocaleString("fa-IR")} تومان
        </div>

        <div class="option-group">
          <div class="option-title">
            <span>رنگ</span>
            <span id="selected-color">${product.colors[0]}</span>
          </div>
         <div class="color-options">
  ${product.colors.map((color, index) =>
    '<button type="button" class="color-choice ' +
    (index === 0 ? 'selected' : '') +
    '" data-color="' + color +
    '" title="' + color +
    '" style="--color:' + colorClass(color) +
    '"></button>'
  ).join("")}
</div>
        </div>

        <div class="option-group">
          <div class="option-title">
            <span>سایز</span>
            <span id="selected-size">${product.sizes[0]}</span>
          </div>
        <div class="size-options">
  ${product.sizes.map((size, index) =>
    '<button type="button" class="size-choice ' +
    (index === 0 ? 'selected' : '') +
    '" data-size="' + size + '">' +
    size +
    '</button>'
  ).join("")}
</div>
        </div>

        <button id="add-detail-cart" class="add-cart">
           افزودن به سبد خرید
      </button>

        <p id="detail-message" class="detail-message" role="status"></p>

        <a class="back-link" href="index.html">
          ← بازگشت به فروشگاه
        </a>

      <section class="service-cards">
  <button class="service-card" data-info="برای اطلاع از روش و زمان ارسال سفارش، با پشتیبانی فروشگاه تماس بگیرید.">
    <span class="service-icon">🚚</span>
    <strong>ارسال سفارش</strong>
    <p>مشاهده جزئیات</p>
  </button>

  <button class="service-card" data-info="ما تلاش می‌کنیم محصولات باکیفیت و مناسب به شما ارائه کنیم.">
    <span class="service-icon">✨</span>
    <strong>تضمین کیفیت</strong>
    <p>مشاهده جزئیات</p>
  </button>

 <button class="service-card" data-info="برای پرسیدن سؤال یا پیگیری سفارش، از طریق واتساپ با ما در ارتباط باشید.">
  <span class="service-icon">💗</span>
  <strong>پشتیبانی واتساپ</strong>
  <p>ارتباط با ما</p>
</button>

  <button class="service-card" data-info="سفارش‌ها با دقت برای آماده‌سازی و ارسال بسته‌بندی می‌شوند.">
    <span class="service-icon">📦</span>
    <strong>بسته‌بندی</strong>
    <p>مشاهده جزئیات</p>
  </button>
</section>

<div id="service-popup" class="service-popup">
  <div class="service-popup-content">
    <button id="close-service-popup" type="button">×</button>
    <p id="service-popup-text"></p>
  </div>
</div>
      </section>
    `;

    let selectedColor = product.colors[0];
    let selectedSize = product.sizes[0];

    document.querySelectorAll(".color-choice").forEach(button => {
      button.addEventListener("click", () => {
        document.querySelectorAll(".color-choice")
          .forEach(item => item.classList.remove("selected"));

        button.classList.add("selected");
        selectedColor = button.dataset.color;
        document.getElementById("selected-color").textContent = selectedColor;
      });
    });

    document.querySelectorAll(".size-choice").forEach(button => {
      button.addEventListener("click", () => {
        document.querySelectorAll(".size-choice")
          .forEach(item => item.classList.remove("selected"));

        button.classList.add("selected");
        selectedSize = button.dataset.size;
        document.getElementById("selected-size").textContent = selectedSize;
      });
    });

    document.getElementById("add-detail-cart").addEventListener("click", () => {
      const cart = JSON.parse(localStorage.getItem("avadress-cart") || "[]");

      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: selectedSize,
        color: selectedColor,
        qty: 1
      });

      localStorage.setItem("avadress-cart", JSON.stringify(cart));

      document.getElementById("detail-message").textContent =
        "محصول به سبد خرید اضافه شد! 🛍️";
    });
   document.querySelectorAll(".service-card").forEach(card => {
  card.addEventListener("click", () => {

    if (card.querySelector("strong").textContent.includes("پشتیبانی")) {
      window.open("https://wa.me/989962096558", "_blank");
      return;
    }

    document.getElementById("service-popup-text").textContent =
      card.dataset.info;

    document.getElementById("service-popup").classList.add("show");
  });
});

document.getElementById("close-service-popup").addEventListener("click", () => {
  document.getElementById("service-popup").classList.remove("show");
});
  }
}
