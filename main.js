// ---------------------
// Footer Year Update
// ---------------------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------------------
// Watch Live Button
// ---------------------
document.getElementById('watchLiveBtn').addEventListener('click', () => {
  // Replace with your live streaming link
  window.open("https://your-live-stream-link.com", "_blank");
});

// ---------------------
// Latest Videos Grid
// ---------------------
const videoGrid = document.getElementById('videoGrid');

// Sample video data (replace with actual YouTube links)
const videos = [
  {
    title: "THE GOSPEL, WHAT IT IS AND WHAT IT IS NOT",
    url: "https://www.youtube.com/watch?v=uxVLXxH6tRs",
    thumbnail: "https://img.youtube.com/vi/uxVLXxH6tRs/hqdefault.jpg"
  },
  {
    title: "WALKING IN THE POWER OF THE HOLY SPIRIT",
    url: "https://www.youtube.com/watch?v=fxqR5JjeAnc",
    thumbnail: "https://img.youtube.com/vi/fxqR5JjeAnc/hqdefault.jpg"
  },
  {
    title: "NOT I BUT CHRIST 2",
    url: "https://www.youtube.com/watch?v=4RjsFR9QJLw",
    thumbnail: "https://img.youtube.com/vi/4RjsFR9QJLw/hqdefault.jpg"
  }
];

// Populate video cards
videoGrid.innerHTML = "";
videos.forEach(video => {
  const card = document.createElement('div');
  card.className = "video-card card";
  card.onclick = () => window.open(video.url, "_blank");
  card.innerHTML = `
    <img src="${video.thumbnail}" alt="${video.title}" style="width:100%;border-radius:8px;">
    <div class="video-info" style="margin-top:0.5rem;">
      <div class="title">${video.title}</div>
    </div>
  `;
  videoGrid.appendChild(card);
});

// ---------------------
// Flyer Carousel
// ---------------------
const carousel = document.getElementById('flyerCarousel');
const totalFlyers = carousel.children.length;
let currentIndex = 0;

function showFlyer(index) {
  carousel.style.transform = `translateX(-${index * 100}%)`;
}

document.getElementById('nextFlyer').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % totalFlyers;
  showFlyer(currentIndex);
});
document.getElementById('prevFlyer').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + totalFlyers) % totalFlyers;
  showFlyer(currentIndex);
});

// Auto-slide every 5 seconds
setInterval(() => {
  currentIndex = (currentIndex + 1) % totalFlyers;
  showFlyer(currentIndex);
}, 5000);

// ---------------------
// Google Drive Section
// ---------------------
const driveFilesDiv = document.getElementById('driveFiles');

// Example admin-uploaded files
const files = [
  { name: "Event Schedule.pdf", url: "https://drive.google.com/file/d/FILE_ID_1/view" },
  { name: "Sermon Notes.pdf", url: "https://drive.google.com/file/d/FILE_ID_2/view" },
  { name: "Youth Program.pdf", url: "https://drive.google.com/file/d/FILE_ID_3/view" }
];

// Populate Google Drive links
driveFilesDiv.innerHTML = "";
files.forEach(file => {
  const a = document.createElement('a');
  a.href = file.url;
  a.target = "_blank";
  a.textContent = file.name;
  a.className = "btn";
  a.style.marginRight = "0.5rem";
  a.style.marginBottom = "0.5rem";
  driveFilesDiv.appendChild(a);
});

// ---------------------
// Modal (Optional for video previews)
// ---------------------
const overlay = document.getElementById('overlay');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');

function openModal(contentHTML) {
  modalBody.innerHTML = contentHTML;
  overlay.classList.add('open');
}

function closeModal() {
  modalBody.innerHTML = "";
  overlay.classList.remove('open');
}

modalClose.addEventListener('click', closeModal);
overlay.addEventListener('click', e => {
  if (e.target === overlay) closeModal();
});
