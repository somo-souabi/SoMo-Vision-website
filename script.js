const SOMOVISION_SCRIPT_URL = 'PASTE_SOMOVISION_GOOGLE_SCRIPT_URL_HERE';

const yearElement = document.getElementById('current-year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const form = document.getElementById('contact-form');
const statusMessage = document.getElementById('form-status');

form?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const message = String(formData.get('message') || '').trim();

  if (!name || !email || !message) {
    statusMessage.textContent = 'Please complete all fields before submitting.';
    return;
  }

  const payload = {
    formType: 'somovision_contact',
    name: name,
    email: email,
    message: message,
    source: 'somovision.eu',
    website: 'somovision.eu',
    submittedAt: new Date().toISOString(),
  };

  statusMessage.textContent = 'Sending your message...';

  try {
    await fetch(SOMOVISION_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    });

    form.reset();
    statusMessage.textContent = 'Thank you. Your message has been sent.';
  } catch (error) {
    statusMessage.textContent = 'Something went wrong. Please try again soon.';
  }
});
