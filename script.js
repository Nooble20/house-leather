// Ganti nomor ini dengan nomor WhatsApp bisnis Anda, gunakan kode negara tanpa tanda +.
const WHATSAPP_NUMBER = "6281234567890";

const products = [
  { name: "Classic Briefcase", category: "Bags", price: 2350000, image: "photo-1553062407-98eeb64c6a62" },
  { name: "Leather Wallet", category: "Wallets", price: 650000, image: "photo-1627123424574-724758594e93" },
  { name: "Classic Belt", category: "Belts", price: 450000, image: "photo-1624222247344-550fb8e7b6a7" },
  { name: "Card Holder", category: "Accessories", price: 350000, image: "photo-1622560480654-d96214fdc887" },
  { name: "Leather Backpack", category: "Bags", price: 1850000, image: "photo-1548036328-c9fa89d128fa" },
  { name: "Travel Duffle Bag", category: "Bags", price: 2100000, image: "photo-1584917865442-de89df76afd3" },
  { name: "Minimalist Wallet", category: "Wallets", price: 550000, image: "photo-1627123424574-724758594e93" },
  { name: "Key Holder", category: "Accessories", price: 250000, image: "photo-1511499767150-a48a237f0083" }
];

const formatPrice = amount => "Rp " + amount.toLocaleString("id-ID");
const whatsappUrl = message => "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);

document.querySelectorAll(".wa-link").forEach(link => {
  link.href = whatsappUrl(link.dataset.message || "Halo NOOBLE, saya ingin bertanya tentang produk.");
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

const grid = document.querySelector("#product-grid");
function renderProducts(category = "All") {
  const visible = products.filter(product => category === "All" || product.category === category);
  grid.innerHTML = visible.map(product => `
    <article class="product-card">
      <div class="product-photo"><img loading="lazy" src="https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=700&q=80" alt="${product.name}"></div>
      <div class="product-info">
        <p class="product-category">${product.category}</p><h3>${product.name}</h3>
        <div class="price">${formatPrice(product.price)}</div>
        <a class="product-buy" href="${whatsappUrl(`Halo NOOBLE, saya tertarik dengan ${product.name} (${formatPrice(product.price)}). Mohon info ketersediaannya.`)}" target="_blank" rel="noopener noreferrer">☏ &nbsp; Pesan via WhatsApp</a>
      </div>
    </article>`).join("");
}
renderProducts();

document.querySelectorAll(".filter").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll(".filter").forEach(item => item.classList.remove("active"));
  button.classList.add("active");
  renderProducts(button.dataset.filter);
}));

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "✕" : "☰";
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.textContent = "☰";
}));

document.querySelector("#contact-form").addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const message = `Halo NOOBLE House Leather!\nNama: ${data.get("name")}\nEmail: ${data.get("email")}\nPesan: ${data.get("message")}`;
  window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
});
document.querySelector("#year").textContent = new Date().getFullYear();
