type Restaurant = {
  id: string;
  adress: {
    city: string;
    lat: string;
    lon: string;
    postcode: string;
    street: string;
  };
  author: string;
  businessHours: {
    closingHour: string;
    day: string;
    openingHour: string;
  }[];
  contactInfo: {
    email: string;
    phone: string;
  };
  cuisine: string;
  description: string;
  media: {
    coverPhoto: string;
    logo: string;
  };
  name: string;
  priceClass: number;
  rating: {
    overall: number;
    numberOfRatings: number;
    distribution: {
      starRating: number;
      numberOfRatings: number;
      percentage: number;
    }[];
  };
};
