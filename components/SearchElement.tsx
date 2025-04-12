import { Text, View, TouchableOpacity, Linking } from "react-native";
import React, { Component } from "react";
import { styles } from "@/styles/searchelement-style";

export class SearchElement extends Component {
  handlePress = () => {
    const { itemDetails } = this.props;
    if (itemDetails?.productLink) {
      Linking.openURL(itemDetails.productLink);
    }
  };

  render() {
    const { itemDetails } = this.props;
    const truncatedTitle =
      itemDetails?.title.length > 50
        ? itemDetails.title.substring(0, 50) + "..."
        : itemDetails.title;

    return (
      <TouchableOpacity
        style={styles.elementContainer}
        onPress={this.handlePress}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.itemName}>{truncatedTitle}</Text>
          <Text style={styles.retailerName}>
            {itemDetails?.shopname || itemDetails?.retailer}
          </Text>
        </View>
        <View style={styles.priceText}>
          <Text style={styles.priceValue}>₹ {itemDetails?.price}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default SearchElement;
