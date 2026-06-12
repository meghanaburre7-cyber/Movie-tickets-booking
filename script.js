// Title Page → Splash Screen → Movies Page
function startApp() {
    document.getElementById("titlePage").style.display = "none";
    document.getElementById("splash").style.display = "flex";

    setTimeout(() => {
        document.getElementById("splash").style.display = "none";
        document.getElementById("moviesPage").style.display = "block";
    }, 3000);
}

let selectedMovie = "";
let selectedSeats = [];
const ticketPrice = 200;

// Movie Selection
function selectMovie(movie) {
    selectedMovie = movie;

    document.getElementById("moviesPage").style.display = "none";
    document.getElementById("bookingPage").style.display = "block";

    document.getElementById("movieTitle").innerHTML =
        "Movie : " + movie;
}

// Seat Selection
document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".seat").forEach(seat => {

        seat.addEventListener("click", () => {

            seat.classList.toggle("selected");

            let seatNo = seat.innerText;

            if (selectedSeats.includes(seatNo)) {
                selectedSeats = selectedSeats.filter(s => s !== seatNo);
            } else {
                selectedSeats.push(seatNo);
            }

            updateTotal();
        });

    });

});

// Update Total Amount
function updateTotal() {
    let total = selectedSeats.length * ticketPrice;

    document.getElementById("totalAmount").innerHTML =
        "Total Amount: ₹" + total;
}

// Book Ticket
function bookTicket() {

    let name = document.getElementById("name").value.trim();
    let showtime = document.getElementById("showtime").value;

    if (name === "") {
        alert("Please Enter Name");
        return;
    }

    if (selectedSeats.length === 0) {
        alert("Please Select Seats");
        return;
    }

    let total = selectedSeats.length * ticketPrice;

    alert(
        "🎉 Booking Successful!\n\n" +
        "Movie : " + selectedMovie +
        "\nName : " + name +
        "\nShow Time : " + showtime +
        "\nSeats : " + selectedSeats.join(", ") +
        "\nTotal : ₹" + total
    );

    // Reset booking form
    selectedSeats = [];

    document.querySelectorAll(".seat").forEach(seat => {
        seat.classList.remove("selected");
    });

    document.getElementById("name").value = "";

    updateTotal();
}
