export interface Rating {
  avgRating: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  totalRatingPoints: number;
  totalNumRatings: number;
}
