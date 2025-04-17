import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useUser } from "@clerk/clerk-expo";

export default function OrdersScreen() {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleTrackOrder = (orderId: string) => {
    Linking.openURL(`https://your-order-tracking-url.com/order/${orderId}`);
  };

  const parseDecimal = (value: any) => {
    if (!value) return "0";
    if (typeof value === "object" && "$numberDecimal" in value)
      return value.$numberDecimal;
    return value.toString?.() || "0";
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `https://pricepick-1032723282466.us-central1.run.app/orders/user/${user?.id}`
        );
        setOrders(res.data);
      } catch (error) {
        console.error("❌ Error fetching orders", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchOrders();
    }
  }, [user?.id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={{ marginTop: 10 }}>Loading your orders...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Your Orders</Text>
      <Text style={styles.description}>
        View your past orders and track their status.
      </Text>

      {orders.length === 0 ? (
        <Text style={styles.noOrdersText}>No orders found.</Text>
      ) : (
        orders.map((order) => (
          <View key={order._id} style={styles.orderItem}>
            <Text style={styles.orderId}>Order ID: {order._id}</Text>
            <Text style={styles.orderStatus}>Status: {order.status}</Text>
            <Text style={styles.orderDate}>
              Date: {new Date(order.createdAt).toLocaleDateString()}
            </Text>
            <Text style={styles.orderTotal}>
              Total: ₹{parseDecimal(order.totalAmount)}
            </Text>

            <Text style={styles.sectionTitle}>Delivery Address</Text>
            <Text style={styles.addressText}>
              {order.deliveryAddress.name}, {order.deliveryAddress.phone}
            </Text>
            <Text style={styles.addressText}>
              {order.deliveryAddress.addressLine1},{" "}
              {order.deliveryAddress.addressLine2}
            </Text>
            <Text style={styles.addressText}>
              {order.deliveryAddress.city}, {order.deliveryAddress.state} -{" "}
              {order.deliveryAddress.pincode}
            </Text>

            <Text style={styles.sectionTitle}>Products</Text>
            {order.products.map((product) => (
              <View key={product._id} style={styles.productItem}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productDetails}>
                  Price: ₹{product.price} x {product.quantity}
                </Text>
              </View>
            ))}

            <Text style={styles.sectionTitle}>Payment Details</Text>
            <Text style={styles.paymentText}>
              Payment Method: {order.paymentId.method}
            </Text>
            <Text style={styles.paymentText}>
              Payment Status:{" "}
              {order.paymentId.status === "paid" ? "Paid" : "Pending"}
            </Text>
            <Text style={styles.paymentText}>
              Amount Paid: ₹{parseDecimal(order.paymentId.amount)}
            </Text>

            <TouchableOpacity
              style={styles.trackButton}
              onPress={() => handleTrackOrder(order._id)}
            >
              <Text style={styles.trackButtonText}>Track Order</Text>
            </TouchableOpacity>
          </View>
        ))
      )}

      <Text style={styles.supportSectionTitle}>Need Help?</Text>
      <Text style={styles.supportDetails}>
        If you have any issues with your order, feel free to contact our support
        team.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#555",
  },
  noOrdersText: {
    textAlign: "center",
    color: "#777",
    fontSize: 16,
    marginTop: 30,
  },
  orderItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  orderStatus: {
    fontSize: 14,
    color: "#555",
  },
  orderDate: {
    fontSize: 14,
    color: "#555",
  },
  orderTotal: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
  },
  addressText: {
    fontSize: 14,
    color: "#555",
  },
  productItem: {
    marginTop: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  productDetails: {
    fontSize: 14,
    color: "#555",
  },
  paymentText: {
    fontSize: 14,
    color: "#555",
  },
  trackButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  trackButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  supportSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  supportDetails: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
});
