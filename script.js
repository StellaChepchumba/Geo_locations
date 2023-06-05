function initMap() {
    // Retrieve the customer ID from the URL
    const customerId = window.location.pathname.split('/').pop();
  
    // Send a request to the server to retrieve the customer's location
    fetch(`/customer/${customerId}`)
      .then(response => response.json())
      .then(location => {
        console.log('Customer Location:', location); // Log the location variable
        const { CSTMR_LTTD, CSTMR_LNGTD } = location;
  
        const mapOptions = {
          center: { lat: parseFloat(CSTMR_LTTD), lng: parseFloat(CSTMR_LNGTD) },
          zoom: 15
        };
  
        const map = new google.maps.Map(document.getElementById('map-container'), mapOptions);
  
        const marker = new google.maps.Marker({
          position: { lat: parseFloat(CSTMR_LTTD), lng: parseFloat(CSTMR_LNGTD) },
          map: map,
          title: 'Customer Location'
        });
      })
      .catch(error => {
        console.error("Error fetching customer location:", error);
        // Handle the error
      });
  }
  