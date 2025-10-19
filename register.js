const registrationForm = document.getElementById('registrationForm');
const statusMessage = document.getElementById('statusMessage');

registrationForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = {
    fullName: registrationForm.fullName.value,
    churchName: registrationForm.churchName.value,
    comingFrom: registrationForm.comingFrom.value,
    position: registrationForm.position.value,
    maritalStatus: registrationForm.maritalStatus.value,
    gender: registrationForm.gender.value,
    needAccommodation: registrationForm.needAccommodation.checked,
    programDay: registrationForm.programDay.value,
    submittedAt: firebase.firestore.Timestamp.now()
  };

  try {
    await db.collection('registrations').add(formData);
    statusMessage.textContent = "Registration submitted successfully!";
    registrationForm.reset();
  } catch (error) {
    console.error(error);
    statusMessage.textContent = "Error submitting registration. Try again.";
  }
});
