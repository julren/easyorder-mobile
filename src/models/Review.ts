export interface RestaurantReview {
  id?: string;
  userID: string;
  restaurantID: string;
  restaurantName: string;
  logo: string;
  rating: number;
  text: string;
  reviewDate: any;
}
