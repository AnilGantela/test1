import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import RazorpayCheckout from "react-native-razorpay";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

export default function OrderPayment() {
  const { cart } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useUser();
  const cartItems = JSON.parse(cart as string);

  const totalAmount = cartItems.reduce((total, item) => {
    const discount = item.discount ? (item.price * item.discount) / 100 : 0;
    return total + (item.price - discount) * item.quantity;
  }, 0);

  const [loading, setLoading] = useState(true);
  const [razorpayOrder, setRazorpayOrder] = useState<any>(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const payload = {
          userId: user?.id,
          products: cartItems.map((item: any) => ({
            productId: item.productId,
            name: item.productName,
            quantity: item.quantity,
            price: item.price,
          })),
          totalAmount,
          method: "razorpay",
          deliveryAddress: {
            name: `${user?.firstName} ${user?.lastName}`,
            phone: user?.phone || "9110769027",
            addressLine1: "N/A",
            addressLine2: "",
            city: "City",
            state: "State",
            pincode: "000000",
          },
        };

        const res = await axios.post(
          "https://pricepick-1032723282466.us-central1.run.app/orders/create",
          payload
        );

        const order = res.data.razorpayOrder;
        setRazorpayOrder(order);
        setLoading(false);

        const options = {
          description: "Order Payment",
          image: "https://your-logo-url.com/logo.png", // Update with your logo URL
          currency: "INR",
          key: "rzp_test_PmOzNNhyHH3O6Y", // Replace with your Razorpay key
          amount: order.amount, // Amount in paisa (₹500 = 50000)
          name: "PricePick",
          order_id: order.id,
          prefill: {
            name: `${user?.firstName} ${user?.lastName}`,
            email: user?.primaryEmailAddress?.emailAddress,
            contact: user?.phone,
          },
          theme: { color: "#5A5AFF" },
        };

        // Open Razorpay Checkout for payment
        RazorpayCheckout.open(options)
          .then(async (response) => {
            // Payment Success
            const verifyRes = await axios.post(
              "https://pricepick-1032723282466.us-central1.run.app/orders/verify",
              {
                razorpay_order_id: order.id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }
            );

            if (verifyRes.data.success) {
              Alert.alert("✅ Payment Successful");
              router.push("/tabs/profile/orders"); // Redirect to orders page
            } else {
              Alert.alert("❌ Payment verification failed");
              router.push("/tabs/cart"); // Redirect to cart page
            }
          })
          .catch((error) => {
            console.log("❌ Payment Cancelled or Failed", error);
            Alert.alert("⚠️ Payment Cancelled");
            router.push("/tabs/cart"); // Redirect to cart page
          });
      } catch (error) {
        console.error("Order creation failed", error);
        Alert.alert("Error", "Something went wrong. Please try again.");
        router.push("/tabs/cart"); // Redirect to cart page on failure
      }
    };

    if (user) createOrder();
  }, [user]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#5A5AFF" />
      </View>
    );
  }

  return null; // Nothing to render here
}
