let map, directionsService, directionsRenderer;
let pickupAutocomplete, dropoffAutocomplete;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 23.8103, lng: 90.4125 }, // Dhaka default
    zoom: 12,
  });

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

  // Autocomplete
  pickupAutocomplete = new google.maps.places.Autocomplete(document.getElementById("pickup"));
  dropoffAutocomplete = new google.maps.places.Autocomplete(document.getElementById("dropoff"));
}

document.getElementById("rideForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const pickup = document.getElementById("pickup").value;
  const dropoff = document.getElementById("dropoff").value;
  const vehicle = document.getElementById("vehicle").value;

  if (!pickup || !dropoff || !vehicle) {
    alert("Please fill all fields.");
    return;
  }

  directionsService.route(
    {
      origin: pickup,
      destination: dropoff,
      travelMode: google.maps.TravelMode.DRIVING,
    },
    function (response, status) {
      if (status === "OK") {
        directionsRenderer.setDirections(response);
        const leg = response.routes[0].legs[0];
        document.getElementById("statusMsg").textContent =
          `Ride requested: ${vehicle.toUpperCase()} - Distance: ${leg.distance.text}, Duration: ${leg.duration.text}`;
      } else {
        alert("Could not calculate route.");
      }
    }
  );
});
