type Restaurant = {
  id: "sdfsd";
  adress: {
    city: "Landshut";
    lat: "48.5328052";
    lon: "12.149773";
    postcode: "84036";
    street: "Altstadt 34";
  };
  author: string;
  businessHours: [
    {
      closingHour: "23:00";
      day: "monday";
      openingHour: "09:00";
    },
    {
      closingHour: "22:00";
      day: "thuesday";
      openingHour: "11:30";
    }
  ];
  contactInfo: {
    email: string;
    phone: string;
  };
  cuisine: string;
  description: string;
  media: {
    coverPhoto: "https://firebasestorage.googleapis.com/v0/b/***REMOVED***/o/public%2Fimages%2FcoverPhoto-WTpxRrjqspaedb8EnBTMRO1KVDM2.jpg?alt=media&token=66eb5e45-21ce-4782-ad6d-fc5a2a188935";
    logo: "https://firebasestorage.googleapis.com/v0/b/***REMOVED***/o/public%2Fimages%2Flogo-WTpxRrjqspaedb8EnBTMRO1KVDM2.png?alt=media&token=50c1b9d5-c1f0-4b0b-bb1e-ed25c202a5e9";
  };
  name: string;
  priceClass: string;
};

export default Restaurant;
