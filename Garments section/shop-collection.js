 const lightboxCon = document.querySelector('.lightbox-con');
document.getElementById('gallery').addEventListener('click', function (e) {
  const img = e.target.closest('img');
  if (!img) return;
    
    lightboxCon.style.display = 'flex';
    lightboxCon.style.justifyContent = 'center';
    lightboxCon.style.alignItems = 'center';
    lightboxCon.style.position = 'fixed';
    lightboxCon.style.width = '100%';
    lightboxCon.style.height = '100%';
    lightboxCon.style.top = '0';
    lightboxCon.style.left = '0';
   
    lightboxCon.setAttribute('aria-hidden', 'false');
    lightboxCon.style.background = 'white';
   const lightboxImg = document.getElementById('lightboxImg');
   const descriptionBox = document.querySelector('.description-box');
   descriptionBox.style.display = 'flex';
   descriptionBox.style.flexDirection = 'column';
   descriptionBox.style.alignItems = 'center';
   descriptionBox.style.justifyContent = 'center';
   descriptionBox.style.textAlign = 'center';

   descriptionBox.style.padding = '15px';
   descriptionBox.style.borderRadius = '8px';
   descriptionBox.style.maxWidth = '90%';
   descriptionBox.style.marginTop = '10px';
   descriptionBox.style.width ="30%";
   descriptionBox.style.height = "87%";
   descriptionBox.style.fontSize = "24px";
   descriptionBox.style.color = "#f32667ff";
  lightboxImg.src = img.src;


 
document.querySelector('.description').innerHTML = `
  <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;  text-align: left; id="desc-con">
    <h3 style="font-size: 18px; margin-bottom: 8px;">Zardozi Heritage Lehenga</h3>
    <div><strong>Fabric:</strong> Velvet</div>
    <div><strong>Work:</strong> Handcrafted Zardozi & Gota Patti</div>
    <div><strong>Blouse:</strong> Custom-fit, included</div>
    <div><strong>Dupatta:</strong> Net with embroidered border</div>
    <div><strong>Color:</strong> Rich Maroon & Gold</div>
    <div><strong>Size:</strong> Free size (custom stitching available)</div>
    <div><strong>Occasion:</strong> Bridal, Sangeet, Reception</div>
    <div><strong>Care Instructions:</strong> Dry clean only</div>
    <div><strong>Price:</strong> ₹18,000 onwards</div>
    <div><strong>Delivery:</strong> Home trial available in Deoband area</div>
  </div>
`;

  const lightbox = document.getElementById('lightbox');
  lightbox.style.display = 'flex';
  lightbox.style.flexDirection = 'row';
 
  lightbox.setAttribute('aria-hidden', 'false');
});
lightboxCon.addEventListener('click',function (e){
if (e.target.class === 'lightbox-con') {
   
    lightboxCon.style.display = 'none';
    lightboxCon.setAttribute("aria-hidden","true");
  }
});
document.getElementById('lightbox').addEventListener('click', function (e) {
 
    document.getElementById('lightbox').style.display = 'none';
    document.getElementById('lightbox').setAttribute('aria-hidden', 'true');
    lightboxCon.style.display = 'none';
    lightboxCon.setAttribute("aria-hidden","true");
  
});


document.getElementById('whatsappBtn').addEventListener('click', function () {
  const num = '+91-9412011223';
  const cleaned = num.replace(/\D/g, '');
  window.open('https://wa.me/' + cleaned, '_blank');
});


document.getElementById('bookingForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('bname').value.trim();
  const phone = document.getElementById('bphone').value.trim();
  const type = document.getElementById('btype').value;
  const note = document.getElementById('bnote').value.trim();

  
  if (!name || !phone) return alert('Please enter your name and mobile number.');

  
  const msg = document.getElementById('bookingMsg');
  msg.textContent = `Request sent! We'll contact you soon for your ${type}.`;
  msg.style.display = 'block';

  
  e.target.reset();
});


document.getElementById('directionsBtn').addEventListener('click', function () {
  window.open('https://www.google.com/maps/search/?api=1&query=Verma+Residence,+Masjid+Road,+Deoband', '_blank');
});