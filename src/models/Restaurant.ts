export interface Restaurant {
  id?: string;
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

  avgRating?: number;
  ratingDistribution?: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  totalRatingPoints?: number;
  totalNumRatings?: number;
}
