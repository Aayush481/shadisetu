// document.addEventListener('DOMContentLoaded', async function () {
//   const root = document.body;

//   // Fetch data from JSON
//   async function fetchData() {
//     try {
//       const res = await fetch('data.json');
//       if (!res.ok) throw new Error('Failed to load data');
//       return await res.json();
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       return null;
//     }
//   }

//   // Create header section
//   function createHeader(data) {
//     const header = document.createElement('header');
//     header.innerHTML = `
//       <h1>${data.name}</h1>
//       <p>${data.description}</p>
//       <p><strong>Contact:</strong> ${data.contact}</p>
//       <p><strong>Address:</strong> ${data.address}</p>
//     `;
//     root.appendChild(header);
//   }

//   // Create gallery section
//   function createGallery(images) {
//     const gallery = document.createElement('section');
//     gallery.innerHTML = `<h2>Collection Gallery</h2>`;
//     const container = document.createElement('div');
//     container.className = 'gallery';
//     images.forEach(src => {
//       const img = document.createElement('img');
//       img.src = src;
//       img.alt = 'Bridal Outfit';
//       container.appendChild(img);
//     });
//     gallery.appendChild(container);
//     root.appendChild(gallery);
//   }

//   // Create pricing section
//   function createPricing(prices) {
//     const pricing = document.createElement('section');
//     pricing.innerHTML = `<h2>Price & Services</h2>`;
//     const list = document.createElement('ul');
//     prices.forEach(item => {
//       const li = document.createElement('li');
//       li.innerHTML = `<strong>${item.name}:</strong> ${item.price}`;
//       list.appendChild(li);
//     });
//     pricing.appendChild(list);
//     root.appendChild(pricing);
//   }

//   // Create booking form
//   function createBooking(formFields) {
//     const formSection = document.createElement('section');
//     formSection.innerHTML = `<h2>Quick Booking</h2>`;
//     const form = document.createElement('form');
//     form.id = 'bookingForm';

//     formFields.forEach(field => {
//       const input = document.createElement('input');
//       input.type = field.type;
//       input.name = field.name;
//       input.placeholder = field.placeholder;
//       form.appendChild(input);
//     });

//     const button = document.createElement('button');
//     button.type = 'submit';
//     button.textContent = 'Request Now';
//     form.appendChild(button);

//     form.addEventListener('submit', function (e) {
//       e.preventDefault();
//       alert('Booking request submitted!');
//       form.reset();
//     });

//     formSection.appendChild(form);
//     root.appendChild(formSection);
//   }

//   // Create reviews section
//   function createReviews(reviews) {
//     const reviewSection = document.createElement('section');
//     reviewSection.innerHTML = `<h2>Reviews</h2>`;
//     reviews.forEach(r => {
//       const p = document.createElement('p');
//       p.innerHTML = `<strong>${r.name}:</strong> ${r.comment}`;
//       reviewSection.appendChild(p);
//     });
//     root.appendChild(reviewSection);
//   }

//   // Load and render everything
//   const data = await fetchData();
//   if (data) {
//     createHeader(data.studio);
//     createGallery(data.gallery);
//     createPricing(data.pricing);
//     createBooking(data.bookingFields);
//     createReviews(data.reviews);
//   }
// });














// });