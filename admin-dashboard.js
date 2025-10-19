// ------------- Auth Check & Logout ----------------
auth.onAuthStateChanged(user => {
  if(!user){
    window.location.href = "admin-login.html";
  }
});

document.getElementById('logoutBtn').addEventListener('click', async () => {
  await auth.signOut();
  window.location.href = "admin-login.html";
});

// ------------- Display Registrations -------------
const registrationsList = document.getElementById('registrationsList');

db.collection('registrations').orderBy('submittedAt','desc').onSnapshot(snapshot => {
  registrationsList.innerHTML = "";
  if(snapshot.empty){
    registrationsList.innerHTML = "<p class='muted small'>No registrations yet.</p>";
    return;
  }
  snapshot.forEach(doc => {
    const data = doc.data();
    const div = document.createElement('div');
    div.className = "card";
    div.style.marginBottom = "0.5rem";
    div.innerHTML = `
      <strong>${data.fullName}</strong> | ${data.churchName} | ${data.comingFrom} <br>
      Position: ${data.position}, Gender: ${data.gender}, Marital: ${data.maritalStatus} <br>
      Program Day: ${data.programDay} | Accommodation: ${data.needAccommodation ? 'Yes':'No'} <br>
      Submitted: ${new Date(data.submittedAt.seconds*1000).toLocaleString()}
    `;
    registrationsList.appendChild(div);
  });
});

// ------------- Upload Flyers --------------------
const flyerInput = document.getElementById('flyerUpload');
const flyerBtn = document.getElementById('uploadFlyerBtn');
const flyerStatus = document.getElementById('flyerStatus');

flyerBtn.addEventListener('click', async () => {
  if(flyerInput.files.length === 0){ flyerStatus.textContent = "Select a flyer file first."; return; }
  const file = flyerInput.files[0];
  const storageRef = storage.ref(`flyers/${file.name}`);
  try {
    await storageRef.put(file);
    flyerStatus.textContent = "Flyer uploaded successfully!";
  } catch(error){
    console.error(error);
    flyerStatus.textContent = "Error uploading flyer.";
  }
});

// ------------- Upload Audio --------------------
const audioInput = document.getElementById('audioUpload');
const audioBtn = document.getElementById('uploadAudioBtn');
const audioStatus = document.getElementById('audioStatus');

audioBtn.addEventListener('click', async () => {
  if(audioInput.files.length === 0){ audioStatus.textContent = "Select an audio file first."; return; }
  const file = audioInput.files[0];
  const storageRef = storage.ref(`audios/${file.name}`);
  try {
    await storageRef.put(file);
    audioStatus.textContent = "Audio uploaded successfully!";
  } catch(error){
    console.error(error);
    audioStatus.textContent = "Error uploading audio.";
  }
});

// ------------- Upload Files / Resources ----------------
const fileInput = document.getElementById('fileUpload');
const fileBtn = document.getElementById('uploadFileBtn');
const fileTitle = document.getElementById('fileTitle');
const fileStatus = document.getElementById('fileStatus');

fileBtn.addEventListener('click', async () => {
  if(fileInput.files.length === 0){ fileStatus.textContent = "Select a file first."; return; }
  if(!fileTitle.value){ fileStatus.textContent = "Enter a file title."; return; }

  const file = fileInput.files[0];
  const storageRef = storage.ref(`resources/${file.name}`);
  try {
    const uploadTask = await storageRef.put(file);
    const url = await storageRef.getDownloadURL();

    await db.collection('driveFiles').add({
      title: fileTitle.value,
      fileURL: url,
      uploadedAt: firebase.firestore.Timestamp.now()
    });

    fileStatus.textContent = "File uploaded successfully!";
    fileInput.value = "";
    fileTitle.value = "";
  } catch(error){
    console.error(error);
    fileStatus.textContent = "Error uploading file.";
  }
});
