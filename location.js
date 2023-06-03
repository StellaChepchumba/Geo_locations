  // Connect to database and retrieve the latitude and longitude
  const mysql = require("mysql");
  const connection = mysql.createConnection({
    host: '10.50.171.197',
    user: 'data',
    password: 'data@2021',
    database: 'marv_gsmrt'
  });

  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL database:", err);
    } else {
      console.log("Connected to MySQL database!");
    }
  });

  const getCustomerLocation = (CSTMR_NO, callback) => {
  const query = `SELECT CSTMR_LTTD, CSTMR_LNGTD FROM customers WHERE CSTMR_NO = 70004`;

    connection.query(query, (error, results) => {
      if (error) {
        console.error("Error fetching customer location:", error);
        callback(error, null);
      } else {
        const location = results[0];
        callback(null, location);
      }
    });
  };

  const googleMaps = require("@google/maps").createClient({
    key: "AIzaSyBMq3xqBaqYQ8MuufNFUZ62xhQi1_85jNg"
  });

  const pinCustomerLocationOnMap = (CSTMR_LTTD, CSTMR_LNGTD) => {
    const location = { lat: CSTMR_LTTD, lng: CSTMR_LNGTD };
    const mapUrl = googleMaps.staticMapURL({
      center: location,
      zoom: 15,
      size: "500x400",
      markers: [{ location }]
    });

    console.log("Google Maps URL:", mapUrl);
  };

  const CSTMR_NO = 70004;

  getCustomerLocation(CSTMR_NO, (error, location) => {
    if (error) {
      // Handle error
    } else {
      const { CSTMR_LTTD, CSTMR_LNGTD } = location;
      pinCustomerLocationOnMap(CSTMR_LTTD, CSTMR_LNGTD);
    }
  });

  function pinCustomerOnMap(CSTMR_LTTD, CSTMR_LNGTD) {
    const googleMapsClient = require('@googlemaps/google-maps-services-js').Client;
  
   
    const apiKey = 'AIzaSyBMq3xqBaqYQ8MuufNFUZ62xhQi1_85jNg';
    const googleMaps = new googleMapsClient({ apiKey });
  
    // Create a map and center it on the customer's location
    const mapOptions = {
      center: {
        lat: CSTMR_LTTD,
        lng: CSTMR_LNGTD,
      },
      zoom: 12,
    };
    const map = new googleMaps.maps.Map(document.getElementById('map'), mapOptions);
  
    // Create a marker and position it on the map
    const marker = new googleMaps.maps.Marker({
      position: {
        lat: CSTMR_LTTD,
        lng: CSTMR_LNGTD,
      },
      map: map,
      title: 'Customer Location',
    });
  }
  