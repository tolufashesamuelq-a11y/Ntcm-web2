const uploadForm = document.getElementById('uploadForm');
const uploadedResourcesDiv = document.getElementById('uploadedResources');

// Load existing uploads from localStorage
let uploads = JSON.parse(localStorage.getItem('uploads')) || [];

function renderUploads() {
  if(uploads.length === 0){
    uploadedResourcesDiv.innerHTML = "<p>No resources uploaded yet.</p>";
    return;
  }
  uploadedResourcesDiv.innerHTML = "";
  uploads.forEach((u, index) => {
    const div = document.createElement('div');
    div.style.marginBottom = "0.5rem";
    if(u.type === "flyer"){
      div.innerHTML = `<strong>Flyer:</strong> <img src="${u.src}" style="width:150px;height:auto;border-radius:8px;">`;
    } else if(u.type === "audio"){
      div.innerHTML = `<strong>Audio:</strong> <audio controls src="${u.src}"></audio>`;
    } else if(u.type === "document"){
      div.innerHTML = `<strong>Document:</strong> <a href="${u.src}" target="_blank">${u.src}</a>`;
    }
    uploadedResourcesDiv.appendChild(div);
  });
}

renderUploads();

uploadForm.addEventListener('submit', function(e){
  e.preventDefault();
  const type = document.getElementById('uploadType').value;
  let src = "";

  if(type === "document"){
    src = document.getElementById('fileURL').value.trim();
    if(!src){ alert("Please enter a URL."); return; }
  } else {
    const file = document.getElementById('fileInput').files[0];
    if(!file){ alert("Please select a file."); return; }
    // Convert file to base64 for localStorage preview
    const reader = new FileReader();
    reader.onload = function(evt){
      uploads.push({ type: type, src: evt.target.result });
      localStorage.setItem('uploads', JSON.stringify(uploads));
      renderUploads();
      document.getElementById('uploadMessage').textContent = "Uploaded successfully!";
      uploadForm.reset();
      setTimeout(()=>{document.getElementById('uploadMessage').textContent="";},3000);
    };
    reader.readAsDataURL(file);
    return; // prevent further execution
  }

  // For URL type
  uploads.push({ type: type, src: src });
  localStorage.setItem('uploads', JSON.stringify(uploads));
  renderUploads();
  document.getElementById('uploadMessage').textContent = "Uploaded successfully!";
  uploadForm.reset();
  setTimeout(()=>{document.getElementById('uploadMessage').textContent="";},3000);
});
