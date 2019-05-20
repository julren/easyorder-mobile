import React, { Component } from "react";
import { Container, Separator } from "../../../components";
import ReviewRatingDistributionChart from "../../../components/rating/ReviewRatingDistributionChart";
import MenuItemReviewsList from "../../../components/rating/menuItem/MenuItemReviewsList";
import { MenuItem } from "../../../models";
import firebase, { firebaseMenuItemReviews } from "../../../config/firebase";
import { MenuItemReview } from "../../../models/MenuItemReview";
import LeaveMenuItemReviewButton from "../../../components/rating/menuItem/LeaveMenuItemReviewButton";

interface IProps {
  menuItem: MenuItem;
}

interface IState {
  reviews: MenuItemReview[];
}

class MenuItemReviewsTab extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      reviews: []
    };
  }

  componentDidMount() {
    this.getMenuItemReviews();
  }

  getMenuItemReviews = async () => {
    return await firebaseMenuItemReviews
      .where("menuItemID", "==", this.props.menuItem.id)
      .get()
      .then(querySnapshot => {
        let reviews = [];
        if (querySnapshot.empty) {
          console.log("No reviews for menuItemID ", this.props.menuItem.id);
        } else {
          querySnapshot.forEach(doc => {
            reviews.push({ id: doc.id, ...doc.data() });
          });
        }
        console.log("reviews", reviews);
        this.setState({ reviews: reviews });
      });
  };

  render() {
    const { reviews } = this.state;
    const { menuItem } = this.props;
    return (
      <Container>
        <ReviewRatingDistributionChart rating={menuItem.rating} />
        <Separator borderBottom borderTop heading="Bewertungen" />
        <MenuItemReviewsList menuItemReviews={reviews} />
        <LeaveMenuItemReviewButton
          onChange={this.getMenuItemReviews}
          menuItem={menuItem}
        />
      </Container>
    );
  }
}

export default MenuItemReviewsTab;
