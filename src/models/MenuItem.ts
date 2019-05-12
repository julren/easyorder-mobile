import { Rating } from "react-native-ratings";

export interface MenuItem {
  id?: string;
  categoryID: string;
  description: string;
  name: string;
  photo: string;
  photoThumb: string;
  price: number;
  rating: Rating;
}
