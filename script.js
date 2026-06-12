// Set user name
document.getElementById('userName').innerText = 'Hi, ' + currentUser.name;

// Set min date to today
document.getElementById('dateSelect').min = new Date().toISOString().split('T')[0];
document.getElementById('dateSelect').value = new Date().toISOString().split('T')[0];

// Movies data
const movies = [
  { id: 1, title: "Salaar", lang: "Telugu", emoji: "⚔️" },
  { id: 2, title: "Jawan", lang: "Hindi", emoji: "🔥" },
  { id: 3, title: "Leo", lang: "Tamil", emoji: "🦁" },
  { id: 4, title: "Animal", lang: "Hindi", emoji: "🐺" },
  { id: 5, title: "Devara", lang: "Telugu", emoji: "🌊" },
  { id: 6, title: "KGF Chapter 3", lang: "Kannada", emoji: "👑" }
];

let selectedMovie = null;
let selectedSeats = [];
const seatPrice = 200;
const totalSeats = 50;

// Render movies
const moviesList = document.getElementById('moviesList');
movies.forEach(movie => {
  const card = document.createElement('div');
  card.className = 'movie-card';
  card.innerHTML = `
    <div class="movie-poster">${movie.emoji}</div>
    <div class="movie-info">
      <div class="movie-title">${movie.title}</div>
      <div class="movie-lang">${movie.lang}</div>
    </div>
  `;
  card.onclick = () => selectMovie(movie);
  moviesList.appendChild(card);
});

function selectMovie(movie) {
  selectedMovie = movie;
  document.getElementById('selectedMovieTitle').innerText = `Book Tickets: ${movie.title}`;
  document.getElementById('bookingSection').classList.add('active');
  renderSeats();
  window.scrollTo({ top: document.getElementById('bookingSection').offsetTop - 80, behavior: 'smooth' });
}

function renderSeats() {
  const seatsGrid = document.getElementById('seatsGrid');
  seatsGrid.innerHTML = '';
  selectedSeats = [];
  updateSummary();
  
  // Random booked seats for demo
  const bookedSeats = [3, 7, 12, 18, 22, 25, 31, 38, 44];
  
  for(let i = 1; i <= totalSeats; i++) {
    const seat = document.createElement('div');
    seat.className = 'seat';
    seat.innerText = i;
    
    if(bookedSeats.includes(i)) {
      seat.classList.add('booked');
    } else {
      seat.onclick = () => toggleSeat(i, seat);
    }
    seatsGrid.appendChild(seat);
  }
}

function toggleSeat(seatNum, seatEl) {
  if(seatEl.classList.contains('selected')) {
    seatEl.classList.remove('selected');
    selectedSeats = selectedSeats.filter(s => s!== seatNum);
  } else {
    if(selectedSeats.length >= 10) {
      alert('Maximum 10 seats matrame book cheyagalam');
      return;
    }
    seatEl.classList.add('selected');
    selectedSeats.push(seatNum);
  }
  updateSummary();
}

function updateSummary() {
  document.getElementById('selectedSeatsText').innerText = selectedSeats.length? selectedSeats.sort((a,b) => a-b).join(', ') : 'None';
  document.getElementById('ticketCount').innerText = selectedSeats.length;
  document.getElementById('totalPrice').innerText = '₹' + (selectedSeats.length * seatPrice);
  document.getElementById('bookBtn').disabled = selectedSeats.length === 0;
}

function bookTickets() {
  if(selectedSeats.length === 0) return;
  
  const booking = {
    user: currentUser.email,
    movie: selectedMovie.title,
    theatre: document.getElementById('theatreSelect').value,
    date: document.getElementById('dateSelect').value,
    time: document.getElementById('timeSelect').value,
    seats: selectedSeats,
    total: selectedSeats.length * seatPrice,
    bookingId: 'BMS' + Date.now()
  };
  
  let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
  bookings.push(booking);
  localStorage.setItem('bookings', JSON.stringify(bookings));
  
  document.getElementById('successMsg').innerHTML = `✅ Booking Confirmed! <br> Booking ID: ${booking.bookingId}`;
  document.getElementById('successMsg').style.display = 'block';
  
  setTimeout(() => {
    document.getElementById('successMsg').style.display = 'none';
    renderSeats();
  }, 4000);
}

function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = 'login.html';
}
