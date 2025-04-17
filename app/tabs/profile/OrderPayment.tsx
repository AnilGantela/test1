// app/tabs/profile/OrderWebPayment.tsx
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import { WebView } from "react-native-webview";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getRazorpayHTML } from "../../utils/razorpayCheckoutHTML";
import { useUser } from "@clerk/clerk-expo";

export default function OrderWebPayment() {
  const { cart } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useUser();

  const [orderData, setOrderData] = useState<any>(null);

  const cartItems = JSON.parse(cart as string);

  const totalAmount = cartItems.reduce((total, item) => {
    const discount = item.discount ? (item.price * item.discount) / 100 : 0;
    return total + (item.price - discount) * item.quantity;
  }, 0);

  useEffect(() => {
    const createOrder = async () => {
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
      setOrderData(res.data);
    };

    if (user) createOrder();
  }, [user]);

  const handleWebViewMessage = async (event: any) => {
    const data = JSON.parse(event.nativeEvent.data);

    // Check if payment was canceled
    if (data.cancelled) {
      Alert.alert("⚠️ Payment Cancelled", "You cancelled the payment.");
      router.push("/tabs/cart"); // Send back to Cart screen
      return;
    }

    console.log("💳 Payment Received", data);

    try {
      const res = await axios.post(
        "https://pricepick-1032723282466.us-central1.run.app/orders/verify",
        {
          razorpay_order_id: orderData?.razorpayOrder?.id,
          razorpay_payment_id: data.razorpay_payment_id,
          razorpay_signature: data.razorpay_signature,
        }
      );

      if (res.data.success) {
        Alert.alert("✅ Payment Successful");
        router.push("/tabs/profile/orders");
      } else {
        Alert.alert("❌ Payment Verification Failed");
      }
    } catch (err) {
      console.error("Verification failed", err);
      Alert.alert("Error verifying payment");
    }
  };

  if (!orderData) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  const userData = {
    name: `${user?.firstName} ${user?.lastName}`,
    email: user?.primaryEmailAddress?.emailAddress,
    phone: user?.phone,
  };

  return (
    <WebView
      originWhitelist={["*"]}
      source={{
        html: getRazorpayHTML(
          orderData.razorpayOrder.id,
          "rzp_test_PmOzNNhyHH3O6Y",
          orderData.razorpayOrder.amount,
          userData
        ),
      }}
      onMessage={handleWebViewMessage}
    />
  );
}
