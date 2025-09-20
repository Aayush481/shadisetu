document.addEventListener('DOMContentLoaded', function () {
  const selectEl = document.getElementById('city-selector');
  const containerRoot = document.querySelector('.main');
  const lightbox = document.getElementById("lightbox");

  const gallery1 = [
    "shoot1.jpg",
    "shoot2.webp",
    "shoot3.webp",
    "shoot4.webp",
    "shoot5.webp"
  ];

  const photographerSection = document.createElement('section');
  photographerSection.id = 'photographer-section';
  photographerSection.className = 'photographer-section';
  containerRoot.appendChild(photographerSection);

  async function fetchPhotographers() {
    try {
      const res = await fetch('data.json');
      if (!res.ok) throw new Error('Network response was not ok');
      return await res.json();
    } catch (err) {
      console.error('Fetch error:', err);
      return [];
    }
  }

  function renderPhotographers(photographers, city) {
    photographerSection.innerHTML = '';
    const normalizedCity = (city || '').toLowerCase();
    const filtered = photographers.filter(p => (p.location || '').toLowerCase() === normalizedCity);

    if (!filtered.length) {
      const empty = document.createElement('div');
      empty.className = 'empty';
      empty.textContent = city === 'select-city' || !city
        ? 'Please select a city to see photographers around you.'
        : `No photographers found in ${city}. Please try another city.`;
      photographerSection.appendChild(empty);
      return;
    }

    filtered.forEach(p => {
      const card = document.createElement('div');
      card.className = 'photographer-card';

      const img = document.createElement('img');
      img.src = p.image || 'placeholder.jpg';
      img.alt = p.name || 'Photographer';
      img.className = 'photographer-img';
      card.appendChild(img);

      const info = document.createElement('div');
      info.className = 'photographer-info';
      info.style.marginTop = '20px';
      info.innerHTML = `
        <h3 class="photographer-name">${p.name || ''}</h3>
        <p><strong>Address:</strong> ${p.address || '—'}</p>
        <p><strong>Specialties:</strong> ${Array.isArray(p.specialties) ? p.specialties.join(', ') : p.specialties || '—'}</p>
        <p><strong>Price Range:</strong> ${p.priceRange || '—'}</p>
        <p><strong>Style:</strong> ${p.style || '—'}</p>
      `;

      const visitBtn = document.createElement('button');
      visitBtn.className = 'visit-shop';
      visitBtn.textContent = 'Visit Shop';
      visitBtn.addEventListener('click', () => viewBtnFunction(p));
      info.appendChild(visitBtn);

      card.appendChild(info);
      photographerSection.appendChild(card);
    });
  }

  function viewBtnFunction(photographerData) {
    lightbox.innerHTML = '';
    lightbox.setAttribute('aria-hidden', 'false');

    const section = document.createElement('section');
    section.className = 'photographer-detail';

    section.innerHTML = `
      <header class="topbar">
        <button id="backBtn" class="btn btn-ghost">← Back</button>
        <div class="breadcrumb">${photographerData.location} › Photography › ${photographerData.name}</div>
      </header>

      <section class="hero card">
        <div class="hero-media" style="background-image:url('${photographerData.image || 'placeholder.jpg'}')"></div>
        <div class="hero-body">
          <h1 class="shop-name">${photographerData.name}</h1>
          <div class="meta"><strong>Owner:</strong> ${photographerData.owner || '—'}</div>
          <div class="address">${photographerData.address}</div>
          <div class="tagline">${photographerData.description || 'Specialized in bridal shoots, cinematic edits, and event coverage.'}</div>
          <div class="contact-row">
            
            ${photographerData.contact2 ?'': `<a class="btn" href="tel:+91 8273340245">Call +91 8273350343</a>` }
            <button class="btn btn-outline">Message</button>
            <button class="btn btn-outline">Request Trial</button>
          </div>
          <div class="small"><strong>Price range:</strong> ${photographerData.priceRange || '₹8,000 – ₹45,000'}</div>
        </div>
      </section>
    `;

    const gallerySection = document.createElement('article');
    gallerySection.className = 'card';
    gallerySection.innerHTML = `<h2 class="section-title">Collection Gallery</h2>`;
    const galleryGrid = document.createElement('div');
    galleryGrid.className = 'gallery-grid';
    (photographerData.gallery || gallery1).forEach((src, i) => {
      const item = document.createElement('a');
      item.className = 'gallery-item';
      const img = document.createElement('img');
      img.src = src;
      img.alt = `Shoot ${i + 1}`;
      item.appendChild(img);
      galleryGrid.appendChild(item);
    });
    gallerySection.appendChild(galleryGrid);
    section.appendChild(gallerySection);

    

    const bookingSection = document.createElement('article');
    bookingSection.className = 'card booking';
    bookingSection.innerHTML = `<h2 class="section-title">Quick Booking</h2>`;
    const form = document.createElement('form');
    form.id = 'bookingForm';
    form.innerHTML = `
      <input id="bname" type="text" placeholder="Your name" required>
      <div class="row">
        <input id="bphone" type="tel" placeholder="Mobile number" required>
        <select id="btype" aria-label="Select type">
          <option value="trial">wedding shoot</option>
          <option value="custom">Engagement shoot</option>
          <option value="consult">others</option>
        </select>
      </div>
      <textarea id="bnote" rows="3" placeholder="Short note (date, sizes, preferences)"></textarea>
      <button class="btn" type="submit">Send Request</button>
      <div id="bookingMsg" class="small" aria-live="polite" style="display:none;color:green;margin-top:6px;"></div>
    `;
    form.onsubmit = function (e) {
      e.preventDefault();
      document.getElementById('bookingMsg').textContent = 'Request sent successfully!';
      document.getElementById('bookingMsg').style.display = 'block';
      form.reset();
    };
    bookingSection.appendChild(form);
    section.appendChild(bookingSection);

    if (photographerData.reviews?.length) {
      const reviewsSection = document.createElement('article');
      reviewsSection.className = 'card';
      reviewsSection.innerHTML = `<h2 class="section-title">Reviews</h2>`;
      const reviewsContainer = document.createElement('div');
      reviewsContainer.className = 'reviews';
      photographerData.reviews.forEach(r => {
        const review = document.createElement('div');
        review.className = 'review';
        review.innerHTML = `<strong>${r.name}</strong> — ${r.comment}<br><em>Rating:</em> ${r.rating} ⭐`;
        reviewsContainer.appendChild(review);
      });
      reviewsSection.appendChild(reviewsContainer);
      section.appendChild(reviewsSection);
    }

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
       closeBtn.className = 'close-btn';
    closeBtn.onclick = () => {
      lightbox.innerHTML = '';
      lightbox.setAttribute('aria-hidden', 'true');
    };
    section.appendChild(closeBtn);

   
    setTimeout(() => {
      const backBtn = document.getElementById('backBtn');
      if (backBtn) {
        backBtn.onclick = () => {
          lightbox.innerHTML = '';
          lightbox.setAttribute('aria-hidden', 'true');
        };
      }
    }, 0);

    lightbox.appendChild(section);
  }

  // Load data and render default city
  let photographersData = [];
  fetchPhotographers().then(data => {
    photographersData = data;
    renderPhotographers(photographersData, selectEl.value);
  });

  // Re-render when city changes
  selectEl.addEventListener('change', function () {
    renderPhotographers(photographersData, selectEl.value);
  });
});