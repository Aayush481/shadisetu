
document.getElementById('vendorForm').addEventListener('input', updatePreview);

function updatePreview() {
  const name = document.querySelector('[name="businessName"]').value;
  const city = document.querySelector('[name="city"]').value;
  const service = document.querySelector('[name="serviceName"]').value;
  const price = document.querySelector('[name="price"]').value;

  document.getElementById('previewCard').innerHTML = `
    <h3>${name || 'Business Name'}</h3>
    <p>${city || 'City'}</p>
    <p>${service ? `${service} - ₹${price}` : 'Add a service to preview'}</p>
  `;
}

// Mock OTP flow
document.querySelector('[name="phone"]').addEventListener('blur', () => {
  alert('OTP sent to your phone (mock)');
});

// Image compression (basic WebP conversion)
document.querySelector('[name="coverImage"]').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const img = document.createElement('img');
  img.src = URL.createObjectURL(file);
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      console.log('Compressed image blob:', blob);
      // Upload blob to server or preview
    }, 'image/webp', 0.8);
  };
});