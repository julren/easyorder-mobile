import { Rating } from "./Rating";

export interface Restaurant {
  id?: string;
  address: {
    city: string;
    lat: string;
    lon: string;
    geohash: string;
    postcode: string;
    street: string;
  };
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

  rating: Rating;
}
