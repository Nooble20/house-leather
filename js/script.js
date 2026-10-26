// --- DATA SAMPLE DENGAN UNSPLASH CURATED IMAGES ---
const galleryItems = [
  {
    id: 1,
    title: "Misty Mountain Sunrise",
    category: "nature",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    desc: "Suasana pagi hari di lembah pegunungan dengan lapisan kabut tebal menyelimuti danau alami.",
    tags: ["gunung", "danau", "sunrise", "fog"],
    likes: 142,
    date: "2026-03-10"
  },
  {
    id: 2,
    title: "Geometric Modern Facade",
    category: "architecture",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    desc: "Desain arsitektur modern minimalis dengan pola geometris repetitif dan permainan bayangan tajam.",
    tags: ["architecture", "geometry", "building", "modern"],
    likes: 98,
    date: "2026-04-01"
  },
  {
    id: 3,
    title: "Cybernetic Neon Dreams",
    category: "digital",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=80",
    desc: "Eksplorasi visual sci-fi dengan warna neon vibran dan abstraksi digital 3D beresolusi tinggi.",
    tags: ["neon", "cyberpunk", "abstract", "digital"],
    likes: 215,
    date: "2026-04-12"
  },
  {
    id: 4,
    title: "Gaze into Horizon",
    category: "portrait",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    desc: "Fotografi potret sinematik dengan pencahayaan golden hour natural dan kedalaman bidang (depth of field).",
    tags: ["portrait", "face", "cinematic", "model"],
    likes: 178,
    date: "2026-02-15"
  },
  {
    id: 5,
    title: "Pure Monochrome Simplicity",
    category: "minimal",
    image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1200&q=80",
    desc: "Estetika minimalis dengan objek tunggal, ruang negatif luas, dan komposisi yang menenangkan jiwa.",
    tags: ["minimal", "clean", "calm", "object"],
    likes: 85,
    date: "2026-01-20"
  },
  {
    id: 6,
    title: "Emerald Forest Path",
    category: "nature",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
    desc: "Jalan setapak di tengah hutan pinus lebat yang disinari cahaya matahari menembus kanopi dedaunan.",
    tags: ["forest", "trees", "nature", "green"],
    likes: 120,
    date: "2026-03-22"
  },
  {
    id: 7,
    title: "Glass Skyward Reflection",
    category: "architecture",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    desc: "Gedung pencakar langit berlapis kaca memantulkan awan dinamis di pusat distrik keuangan metropolis.",
    tags: ["skyscraper", "glass", "city", "urban"],
    likes: 64,
    date: "2026-02-28"
  },
  {
    id: 8,
    title: "Vortices of Color",
    category: "digital",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    desc: "Kombinasi fluid acrylic dan render 3D menciptakan pusaran warna gradien yang menghipnotis.",
    tags: ["fluid", "gradient", "3d", "art"],
    likes: 310,
    date: "2026-04-18"
  }
];

// --- STATE MANAGEMENT ---
let currentCategory = "all";
let searchQuery = "";
let currentSort = "newest";
let activeIndex = 0;
let filteredItems = [...galleryItems];
let userLikes = JSON.parse(localStorage.getItem("lumina_likes") || "{}");

// --- DOM ELEMENTS ---
const galleryGrid = document.getElementById("galleryGrid");
const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("searchInput");
const clearSearchBtn = document.getElementById("clearSearch");
const sortBySelect = document.getElementById("sortBy");
const itemCountEl = document.getElementById("itemCount");
const emptyState = document.getElementById("emptyState");
const resetFilterBtn = document.getElementById("resetFilterBtn");
const themeToggle = document.getElementById("themeToggle");

// Lightbox Elements
const lightbox = document.getElementById("lightbox");
const lightboxOverlay = document.getElementById("lightboxOverlay");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxCategory = document.getElementById("lightboxCategory");
const lightboxDesc = document.getElementById("lightboxDesc");
const lightboxTags = document.getElementById("lightboxTags");
const lightboxLikes = document.getElementById("lightboxLikes");
const lightboxLikeBtn = document.getElementById("lightboxLikeBtn");
const lightboxDownload = document.getElementById("lightboxDownload");
const lightboxShare = document.getElementById("lightboxShare");
const toast = document.getElementById("toast");

// --- THEME INITIALIZATION ---
function initTheme() {
  const savedTheme = localStorage.getItem("lumina_theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
  themeToggle.innerHTML = theme === "dark" 
    ? '<i class="fa-solid fa-sun"></i>' 
    : '<i class="fa-solid fa-moon"></i>';
}

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const nextTheme = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", nextTheme);
  localStorage.setItem("lumina_theme", nextTheme);
  updateThemeIcon(nextTheme);
});

// --- RENDER GALLERY ---
function renderGallery() {
  // Filter logic
  filteredItems = galleryItems.filter(item => {
    const matchCategory = currentCategory === "all" || item.category === currentCategory;
    const matchQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchQuery;
  });

  // Sort logic
  if (currentSort === "newest") {
    filteredItems.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (currentSort === "popular") {
    filteredItems.sort((a, b) => (b.likes + (userLikes[b.id] ? 1 : 0)) - (a.likes + (userLikes[a.id] ? 1 : 0)));
  } else if (currentSort === "name") {
    filteredItems.sort((a, b) => a.title.localeCompare(b.title));
  }

  // Update item counter
  itemCountEl.textContent = `Menampilkan ${filteredItems.length} dari ${galleryItems.length} karya`;

  // Render cards or empty state
  if (filteredItems.length === 0) {
    galleryGrid.innerHTML = "";
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";
  galleryGrid.innerHTML = filteredItems.map((item, index) => {
    const isLiked = userLikes[item.id] ? "liked" : "";
    return `
      <div class="gallery-card" data-index="${index}">
        <div class="card-img-wrap">
          <img src="${item.image}" alt="${item.title}" loading="lazy">
          <span class="card-tag">${item.category}</span>
          <button class="card-like-btn ${isLiked}" data-id="${item.id}" aria-label="Like">
            <i class="fa-solid fa-heart"></i>
          </button>
        </div>
        <div class="card-content">
          <h2 class="card-title">${item.title}</h2>
          <p class="card-desc">${item.desc}</p>
        </div>
      </div>
    `;
  }).join("");

  // Attach card click listeners
  document.querySelectorAll(".gallery-card").forEach(card => {
    card.addEventListener("click", (e) => {
      // Cegah klik lightbox jika yang ditekan tombol like
      if (e.target.closest(".card-like-btn")) return;
      const idx = parseInt(card.getAttribute("data-index"), 10);
      openLightbox(idx);
    });
  });

  // Attach like button listeners
  document.querySelectorAll(".card-like-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.getAttribute("data-id");
      toggleLike(id);
    });
  });
}

// --- LIKE FUNCTIONALITY ---
function toggleLike(id) {
  if (userLikes[id]) {
    delete userLikes[id];
  } else {
    userLikes[id] = true;
  }
  localStorage.setItem("lumina_likes", JSON.stringify(userLikes));
  renderGallery();

  // Update lightbox jika sedang terbuka
  if (lightbox.classList.contains("active")) {
    updateLightboxLikeState();
  }
}

// --- LIGHTBOX CONTROLS ---
function openLightbox(index) {
  activeIndex = index;
  const item = filteredItems[activeIndex];
  if (!item) return;

  lightboxImg.src = item.image;
  lightboxTitle.textContent = item.title;
  lightboxCategory.textContent = item.category;
  lightboxDesc.textContent = item.desc;
  lightboxDownload.href = item.image;

  // Render tags
  lightboxTags.innerHTML = item.tags.map(tag => `<span>#${tag}</span>`).join("");

  updateLightboxLikeState();

  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function updateLightboxLikeState() {
  const item = filteredItems[activeIndex];
  if (!item) return;
  const isLiked = userLikes[item.id];
  const count = item.likes + (isLiked ? 1 : 0);

  lightboxLikes.textContent = count;
  if (isLiked) {
    lightboxLikeBtn.classList.add("liked");
  } else {
    lightboxLikeBtn.classList.remove("liked");
  }
}

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "auto";
}

function showNext() {
  if (filteredItems.length === 0) return;
  activeIndex = (activeIndex + 1) % filteredItems.length;
  openLightbox(activeIndex);
}

function showPrev() {
  if (filteredItems.length === 0) return;
  activeIndex = (activeIndex - 1 + filteredItems.length) % filteredItems.length;
  openLightbox(activeIndex);
}

// --- EVENT LISTENERS ---
// Filter buttons
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.getAttribute("data-category");
    renderGallery();
  });
});

// Search Input
searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value.trim();
  clearSearchBtn.style.display = searchQuery ? "block" : "none";
  renderGallery();
});

clearSearchBtn.addEventListener("click", () => {
  searchInput.value = "";
  searchQuery = "";
  clearSearchBtn.style.display = "none";
  renderGallery();
});

// Sort
sortBySelect.addEventListener("change", (e) => {
  currentSort = e.target.value;
  renderGallery();
});

// Reset Filter
resetFilterBtn.addEventListener("click", () => {
  searchQuery = "";
  searchInput.value = "";
  currentCategory = "all";
  filterButtons.forEach(b => b.classList.toggle("active", b.getAttribute("data-category") === "all"));
  renderGallery();
});

// Lightbox Listeners
lightboxClose.addEventListener("click", closeLightbox);
lightboxOverlay.addEventListener("click", closeLightbox);
lightboxNext.addEventListener("click", showNext);
lightboxPrev.addEventListener("click", showPrev);

lightboxLikeBtn.addEventListener("click", () => {
  const item = filteredItems[activeIndex];
  if (item) toggleLike(item.id);
});

// Share Button & Toast
lightboxShare.addEventListener("click", () => {
  navigator.clipboard.writeText(window.location.href);
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
});

// Keyboard Navigation
window.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") showNext();
  if (e.key === "ArrowLeft") showPrev();
});

// Inisialisasi awal
initTheme();
renderGallery();