import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";

const { width } = Dimensions.get("window");

const CartSuccessAnimation = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("@/assets/images/add-cart.json")}
        autoPlay
        loop={false}
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.8)",
    zIndex: 999,
  },
  animation: {
    width: width * 0.6,
    height: width * 0.6,
  },
});

export default CartSuccessAnimation;
