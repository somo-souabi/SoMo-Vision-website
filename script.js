const SOMOVISION_SCRIPT_URL = 'PASTE_SOMOVISION_GOOGLE_SCRIPT_URL_HERE';

const contactForm = document.querySelector('#contact-form');
const statusMessage = document.querySelector('#status-message');

contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const payload = {
    name: formData.get('name')?.trim() ?? '',
    email: formData.get('email')?.trim() ?? '',
    message: formData.get('message')?.trim() ?? '',
  };

  if (!payload.name || !payload.email) {
    statusMessage.textContent = 'Please enter your name and email address.';
    return;
  }

  if (!payload.message) {
    statusMessage.textContent = 'Please enter your message.';
    return;
  }

  if (SOMOVISION_SCRIPT_URL.includes('PASTE_SOMOVISION_GOOGLE_SCRIPT_URL_HERE')) {
    statusMessage.textContent = 'Google Script URL still needs to be added.';
    return;
  }

  statusMessage.textContent = 'Sending...';

  try {
    const response = await fetch(SOMOVISION_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (response.type !== 'opaque' && !response.ok) {
      throw new Error('Unable to submit form.');
    }

    contactForm.reset();
    statusMessage.textContent = 'Thank you. Your message has been received.';
  } catch (error) {
    statusMessage.textContent = 'Something went wrong. Please try again later.';
  }
});
