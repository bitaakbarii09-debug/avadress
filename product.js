const products = [
  {
    id: 1,
    name: "تیشرت ساده",
    price: 350000,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    description: "تیشرتی راحت و مناسب استفاده روزمره.",
    colors: ["سفید", "مشکی"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 2,
    name: "هودی کلاسیک",
    price: 750000,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
    description: "هودی راحت برای روزهای خنک.",
    colors: ["مشکی", "طوسی"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 3,
    name: "پیراهن روزمره",
    price: 620000,
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80",
    description: "پیراهنی ساده برای استایل روزمره.",
    colors: ["سفید", "آبی"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 4,
    name: "شلوار جین",
    price: 890000,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80",
    description: "شلوار جین مناسب استایل روزانه.",
    colors: ["آبی", "مشکی"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 5,
    name: "سویشرت اسپرت",
    price: 680000,
    image: "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=800&q=80",
    description: "سویشرتی راحت با ظاهر اسپرت.",
    colors: ["کرم", "مشکی"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 6,
    name: "مانتو مینیمال",
    price: 980000,
    image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=800&q=80",
    description: "مانتویی ساده برای استایل مینیمال.",
    colors: ["کرم", "مشکی"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 7,
    name: "کاپشن روزمره",
    price: 1250000,
    image: "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=800&q=80",
    description: "کاپشن مناسب هوای خنک.",
    colors: ["مشکی", "سبز"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 8,
    name: "لباس راحتی",
    price: 540000,
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=80",
    description: "لباسی راحت برای استفاده روزمره.",
    colors: ["صورتی", "طوسی"],
    sizes: ["S", "M", "L", "XL"]
  }
];

const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));
const product = products.find(item => item.id === productId);
const container = document.getElementById("product-detail");

if (!product) {
  container.innerHTML = `
    <div class="detail-info">
      <h1>محصول پیدا نشد!</h1>
      <a href="index.html">بازگشت به فروشگاه</a>
    </div>
  `;
} else {
  container.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <section class="detail-info">
      <h1>${product.name}</h1>
      <p>${product.description}</p>
      <h2>${product.price.toLocaleString("fa-IR")} تومان</h2>

      <label for="product-size">انتخاب سایز:</label>
      <select id="product-size">
        ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join("")}
      </select>

      <label for="product-color">انتخاب رنگ:</label>
      <select id="product-color">
        ${product.colors.map(color => `<option value="${color}">${color}</option>`).join("")}
      </select>

      <button id="add-detail-cart">افزودن به سبد خرید</button>
      <p id="detail-message" role="status"></p>
      <a href="index.html">بازگشت به فروشگاه</a>
    </section>
  `;
document.getElementById("add-detail-cart").addEventListener("click", () => {
  const size = document.getElementById("product-size").value;
  const color = document.getElementById("product-color").value;

  const cart = JSON.parse(localStorage.getItem("avadress-cart") || "[]");

  cart.push({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    size: size,
    color: color,
    qty: 1,
  });

  localStorage.setItem("avadress-cart", JSON.stringify(cart));

  document.getElementById("detail-message").textContent =
    "محصول به سبد خرید اضافه شد! 🛒";

  document.getElementById("add-detail-cart").textContent =
    "اضافه شد ✓";
});
  
