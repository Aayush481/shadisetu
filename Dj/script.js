document.addEventListener('DOMContentLoaded', function () {
  const selectEl = document.getElementById('city-selector');
  const containerRoot = document.querySelector('.main');
  const lightbox = document.getElementById("lightbox");

  const galleryPlaceholder = [
    "https://tse2.mm.bing.net/th/id/OIP.UTay8qAaHOCh7B8S75lpLwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    "https://tse3.mm.bing.net/th/id/OIP.3DFkqgp5Tdn9vouEK7mQegHaFl?rs=1&pid=ImgDetMain&o=7&rm=3",
    "https://tse4.mm.bing.net/th/id/OIP.ntwQB0SD5Me8WLOgz_f0fgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    "https://th.bing.com/th/id/R.edc376f104dc54bf34d1db13c65daabd?rik=vbMWBY3iFWj3bg&riu=http%3a%2f%2fdancemusicnw.com%2fwp-content%2fuploads%2f2015%2f11%2fgenericdj-1170x731.jpg&ehk=mXZp0aXZ2pK%2bivFzdNeAh1mt%2fyCARcRl4hX4QGeLVmc%3d&risl=&pid=ImgRaw&r=0",
    
  ];

  const djSection = document.createElement('section');
  djSection.id = 'dj-section';
  djSection.className = 'dj-section';
  containerRoot.appendChild(djSection);

  async function fetchDJs() {
    try {
      const res = await fetch('data.json');
      if (!res.ok) throw new Error('Network response was not ok');
      return await res.json();
    } catch (err) {
      console.error('Fetch error:', err);
      return [];
    }
  }

  function renderDJs(djs, city) {
    djSection.innerHTML = '';
    const normalizedCity = (city || '').toLowerCase();
    const filtered = djs.filter(dj => (dj.city || '').toLowerCase() === normalizedCity);

    if (!filtered.length) {
      const empty = document.createElement('div');
      empty.className = 'empty';
      empty.textContent = city === 'select-city' || !city
        ? 'Please select a city to see DJs around you.'
        : `No DJs found in ${city}. Please try another city.`;
      djSection.appendChild(empty);
      return;
    }

    filtered.forEach(dj => {
      const card = document.createElement('div');
      card.className = 'dj-card';

      const img = document.createElement('img');
      img.src = dj.gallery?.[0] || 'placeholder.jpg';
      img.alt = dj.business_name || 'DJ';
      img.className = 'dj-img';
      card.appendChild(img);

      const info = document.createElement('div');
      info.className = 'dj-info';
      info.style.marginTop = '20px';
      info.innerHTML = `
        <h3 class="dj-name">${dj.business_name || ''}</h3>
        <p><strong>Owner:</strong> ${dj.owner_name || '—'}</p>
        <p><strong>Address:</strong> ${dj.address || '—'}</p>
        <p><strong>Price Range:</strong> ${dj.price_range || '—'}</p>
        <p><strong>Verified:</strong> ${dj.verified ? 'Yes' : 'No'}</p>
      `;

      const visitBtn = document.createElement('button');
      visitBtn.className = 'visit-shop';
      visitBtn.textContent = 'View Details';
      visitBtn.addEventListener('click', () => viewBtnFunction(dj));
      info.appendChild(visitBtn);

      card.appendChild(info);
      djSection.appendChild(card);
    });
  }

  function viewBtnFunction(djData) {
    lightbox.innerHTML = '';
    lightbox.style.display = 'block';

    lightbox.setAttribute('aria-hidden', 'false');

    const section = document.createElement('section');
    section.className = 'dj-detail';
    const topGalleryCon = document.createElement('div');
    topGalleryCon.className = 'top-gallery-con';
    

    section.innerHTML = `
      <header class="topbar">
        <button id="backBtn" class="btn btn-ghost">← Back</button>
        <div class="breadcrumb">${djData.city} › DJ › ${djData.business_name}</div>
      </header>

      <section class="hero card">
        <div class="hero-media" style="background-image:url('${djData.gallery?.[0] || 'placeholder.jpg'}')"></div>
        <div class="hero-body">
          <h1 class="shop-name">${djData.business_name}</h1>
          <div class="meta"><strong>Owner:</strong> ${djData.owner_name || '—'}</div>
          <div class="address">${djData.address}</div>
          <div class="tagline">Specialized in premium sound and lighting setups.</div>
          <div class="contact-row">
            <a class="btn" href="tel:${djData.phone}">Call ${djData.phone}</a>
            <button class="btn btn-outline">Message</button>
          </div>
          <div class="small"><strong>Price range:</strong> ${djData.price_range || '—'}</div>
        </div>
      </section>
    `;
    
    const gallerySection = document.createElement('article');
    gallerySection.className = 'card';
    gallerySection.innerHTML = `<h2 class="section-title">Gallery</h2>`;
    const galleryGrid = document.createElement('div');
    galleryGrid.className = 'gallery-grid';
    (galleryPlaceholder).forEach((src, i) => {
      const item = document.createElement('a');
      item.className = 'gallery-item';
      const img = document.createElement('img');
      img.src = src;
      img.alt = `Gallery Image ${i + 1}`;
      item.appendChild(img);
      galleryGrid.appendChild(item);
    });
    gallerySection.appendChild(galleryGrid);
    topGalleryCon.appendChild(gallerySection);
    
    const bookingSection = document.createElement('article');
    bookingSection.id = 'bookingForm';
    bookingSection.className = 'card booking';
    bookingSection.innerHTML = `<h2 class="section-title">Quick Booking</h2>`;
    const form = document.createElement('form');
    form.id = 'bookingForm';
    form.innerHTML = `
      <input id="bname" type="text" placeholder="Your name" required>
      <div class="row">
        <input id="bphone" type="tel" placeholder="Mobile number" required>
        
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
    topGalleryCon.appendChild(bookingSection);


    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.className = 'close-btn';
    closeBtn.onclick = () => {
      lightbox.innerHTML = '';
      lightbox.setAttribute('aria-hidden', 'true');
    };
    section.appendChild(topGalleryCon);
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
  let djData = [];
  fetchDJs().then(data => {
    djData = data;
    renderDJs(djData, selectEl.value);
  });

  // Re-render when city changes
  selectEl.addEventListener('change', function () {
    renderDJs(djData, selectEl.value);
  });
});