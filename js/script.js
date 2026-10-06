// Header gains a solid background once scrolled past the hero,
// so nav stays readable over lighter sections below.
const siteHeader = document.querySelector('.site-header');

function updateHeaderScrollState() {
  siteHeader.classList.toggle('scrolled', window.scrollY > 40);
}

updateHeaderScrollState();
window.addEventListener('scroll', updateHeaderScrollState);

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Small icon templates reused in the room modal's meta row
const META_ICONS = {
  size: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 3 3 3 3 9"/><polyline points="15 3 21 3 21 9"/><polyline points="3 15 3 21 9 21"/><polyline points="21 15 21 21 15 21"/></svg>',
  guests: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.3"/><path d="M15.5 14.2c2.6.4 4.5 2.7 4.5 5.8"/></svg>',
  bed: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6"/><path d="M3 14h18"/><path d="M7 10V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3"/></svg>',
  bath: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16a1 1 0 0 1 1 1 7 7 0 0 1-7 7H10a7 7 0 0 1-7-7 1 1 0 0 1 1-1z"/><path d="M6 12V6a2 2 0 0 1 2-2h1"/><line x1="4" y1="22" x2="4" y2="20"/><line x1="18" y1="22" x2="18" y2="20"/></svg>'
};

// Room data sourced from the hotel's MakeMyTrip listing
// (https://www.makemytrip.com/hotels/malaiya_landmark-details-sagar.html).
// Shared amenity list — identical across all 4 room categories
const COMMON_ROOM_AMENITIES = [
  'Private bathroom',
  'Shower & toiletries',
  'Air conditioning',
  'Ceiling fan',
  'Television',
  'Wi-Fi',
  'Room service (limited hours)',
  'Daily housekeeping',
  'Extra bed on request (surcharge)'
];

// Shared booking links — these OTAs link to the property page, not individual
// room types, so the same links apply across all 4 room categories.
const BOOKING_LINKS = {
  makemytrip: 'https://www.makemytrip.com/hotels/malaiya_landmark-details-sagar.html',
  agoda: 'https://www.agoda.com/malaiya-landmark/hotel/sagar-in.html?cid=1844104&ds=Lp7BcjFnj71ga8oj',
  goibibo: 'https://www.goibibo.com/hotels/rooms-of-malaiya-landmark-hotel-in-sagar-202608181549059357/',
  expedia: 'https://www.expedia.co.in/Sagar-Hotels-Malaiya-Landmark.h134642441.Hotel-Information',
  hotelscom: 'https://in.hotels.com/ho4309558112/malaiya-landmark/'
};

const ROOMS = {
  normal: {
    title: 'Standard Room',
    caption: 'The Everyday Retreat',
    images: ['images/room-normal-1.png', 'images/room-normal-2.png', 'images/about.png', 'images/hotel-corridor.png'],
    meta: [
      { icon: 'size', text: '290 sq.ft (27 sq.mt)' },
      { icon: 'guests', text: 'Sleeps 2' },
      { icon: 'bed', text: '2 Single Beds' },
      { icon: 'bath', text: '1 Bathroom' }
    ],
    amenities: COMMON_ROOM_AMENITIES,
    booking: BOOKING_LINKS
  },
  deluxe: {
    title: 'Deluxe Room',
    caption: 'Comfort, Thoughtfully Refined',
    images: ['images/room-deluxe-1.png', 'images/about.png', 'images/hotel-corridor.png'],
    meta: [
      { icon: 'size', text: '290 sq.ft (27 sq.mt)' },
      { icon: 'guests', text: 'Sleeps 2' },
      { icon: 'bed', text: '1 Queen Bed' },
      { icon: 'bath', text: '1 Bathroom' }
    ],
    amenities: COMMON_ROOM_AMENITIES,
    booking: BOOKING_LINKS
  },
  premium: {
    title: 'Family Room',
    caption: 'A Little More Indulgence',
    images: ['images/room-premium-1.png', 'images/about.png', 'images/hotel-corridor.png'],
    meta: [
      { icon: 'size', text: '430 sq.ft (40 sq.mt)' },
      { icon: 'guests', text: 'Sleeps 4' },
      { icon: 'bed', text: '2 Double Beds' },
      { icon: 'bath', text: '1 Bathroom' }
    ],
    amenities: COMMON_ROOM_AMENITIES,
    booking: BOOKING_LINKS
  },
  suite: {
    title: 'Suite',
    caption: 'Space To Make Yourself At Home',
    images: ['images/room-suite-1.png', 'images/about.png', 'images/hotel-corridor.png'],
    meta: [
      { icon: 'size', text: '430 sq.ft (40 sq.mt)' },
      { icon: 'guests', text: 'Sleeps 2' },
      { icon: 'bed', text: '1 Queen Bed' },
      { icon: 'bath', text: '1 Bathroom' }
    ],
    amenities: COMMON_ROOM_AMENITIES,
    booking: BOOKING_LINKS
  }
};

// Room details modal
const roomModal = document.getElementById('roomModal');
const modalMainImage = document.getElementById('modalMainImage');
const modalCaption = document.getElementById('modalCaption');
const modalTitle = document.getElementById('modalTitle');
const modalThumbs = document.getElementById('modalThumbs');
const modalMeta = document.getElementById('modalMeta');
const modalAmenities = document.getElementById('modalAmenities');
const modalBookOptions = document.getElementById('modalBookOptions');
const modalClose = document.getElementById('modalClose');
const modalImageCounter = document.getElementById('modalImageCounter');
const modalPrev = document.getElementById('modalPrev');
const modalNext = document.getElementById('modalNext');

let currentRoomImages = [];
let currentImageIndex = 0;

function setModalImage(index) {
  currentImageIndex = index;
  const src = currentRoomImages[index];
  modalMainImage.src = src;
  modalMainImage.alt = modalTitle.textContent;
  Array.from(modalThumbs.children).forEach((thumb, i) => {
    thumb.classList.toggle('active', i === index);
  });
  modalImageCounter.textContent = `${index + 1}/${currentRoomImages.length}`;
}

function showPrevImage() {
  setModalImage((currentImageIndex - 1 + currentRoomImages.length) % currentRoomImages.length);
}

function showNextImage() {
  setModalImage((currentImageIndex + 1) % currentRoomImages.length);
}

function openRoomModal(roomKey) {
  const room = ROOMS[roomKey];
  if (!room) return;

  modalTitle.textContent = room.title;
  modalCaption.textContent = room.caption;

  currentRoomImages = room.images;

  modalThumbs.innerHTML = room.images
    .map(src => `<button class="modal-thumb"><img src="${src}" alt="${room.title} thumbnail" loading="lazy"></button>`)
    .join('');

  Array.from(modalThumbs.children).forEach((thumb, i) => {
    thumb.addEventListener('click', () => setModalImage(i));
  });

  setModalImage(0);

  modalMeta.innerHTML = room.meta
    .map(m => `<span>${META_ICONS[m.icon]} ${m.text}</span>`)
    .join('');

  const checkIcon = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
  modalAmenities.innerHTML = room.amenities.map(a => `<li>${checkIcon} ${a}</li>`).join('');

  modalBookOptions.innerHTML = `
    <a href="${room.booking.makemytrip}" target="_blank" rel="noopener" class="book-link">MakeMyTrip</a>
    <a href="${room.booking.agoda}" target="_blank" rel="noopener" class="book-link">Agoda</a>
    <a href="${room.booking.goibibo}" target="_blank" rel="noopener" class="book-link">Goibibo</a>
    <a href="${room.booking.expedia}" target="_blank" rel="noopener" class="book-link">Expedia</a>
    <a href="${room.booking.hotelscom}" target="_blank" rel="noopener" class="book-link">Hotels.com</a>
  `;

  roomModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeRoomModal() {
  roomModal.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.view-room-btn').forEach(btn => {
  btn.addEventListener('click', () => openRoomModal(btn.dataset.room));
});

// Rooms section slider — button-driven only (no native scroll container),
// so it can never intercept the page's vertical scrolling.
const roomSlider = document.getElementById('roomSlider');
const roomTrack = document.getElementById('roomTrack');
const roomsPrev = document.getElementById('roomsPrev');
const roomsNext = document.getElementById('roomsNext');
let roomTrackOffset = 0;

function roomTrackMaxOffset() {
  return Math.max(0, roomTrack.scrollWidth - roomSlider.clientWidth);
}

function setRoomTrackOffset(offset) {
  const maxOffset = roomTrackMaxOffset();
  roomTrackOffset = Math.min(Math.max(offset, 0), maxOffset);
  roomTrack.style.transform = `translateX(-${roomTrackOffset}px)`;
  roomsPrev.classList.toggle('is-disabled', roomTrackOffset <= 0);
  roomsNext.classList.toggle('is-disabled', roomTrackOffset >= maxOffset - 1);
}

function slideRooms(direction) {
  const card = roomTrack.querySelector('.room-card');
  if (!card) return;
  const gap = parseFloat(getComputedStyle(roomTrack).columnGap) || 0;
  const amount = card.getBoundingClientRect().width + gap;
  setRoomTrackOffset(roomTrackOffset + direction * amount);
}

roomsPrev.addEventListener('click', () => slideRooms(-1));
roomsNext.addEventListener('click', () => slideRooms(1));
window.addEventListener('resize', () => setRoomTrackOffset(roomTrackOffset));
setRoomTrackOffset(0);

modalClose.addEventListener('click', closeRoomModal);
modalPrev.addEventListener('click', showPrevImage);
modalNext.addEventListener('click', showNextImage);

roomModal.addEventListener('click', e => {
  if (e.target === roomModal) closeRoomModal();
});

document.addEventListener('keydown', e => {
  if (!roomModal.classList.contains('open')) return;
  if (e.key === 'Escape') closeRoomModal();
  if (e.key === 'ArrowLeft') showPrevImage();
  if (e.key === 'ArrowRight') showNextImage();
});

// Enquiry form submission (Web3Forms)
const form = document.getElementById('enquireForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  status.textContent = 'Sending...';
  status.style.color = '#555';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });
    const result = await response.json();

    if (result.success) {
      status.textContent = 'Thank you! Your enquiry has been sent.';
      status.style.color = 'green';
      form.reset();
    } else {
      status.textContent = 'Something went wrong. Please try again.';
      status.style.color = 'crimson';
    }
  } catch (err) {
    status.textContent = 'Network error. Please try again later.';
    status.style.color = 'crimson';
  }
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Scroll-triggered reveal animations
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealEls = document.querySelectorAll('.reveal');

if (prefersReducedMotion) {
  revealEls.forEach(el => el.classList.add('in-view'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));
}

// Count-up animation for the "13 rooms" stat badge
const countEl = document.querySelector('[data-countup]');

if (countEl) {
  const target = parseInt(countEl.dataset.countup, 10);

  if (prefersReducedMotion) {
    countEl.textContent = target;
  } else {
    const countObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);

        const duration = 1200;
        const start = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          countEl.textContent = Math.round(eased * target);
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });

    countObserver.observe(countEl);
  }
}
