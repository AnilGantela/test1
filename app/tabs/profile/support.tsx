import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For icons

export default function SupportScreen() {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  const handleEmailSupport = () => {
    Linking.openURL("mailto:support@pricepick.com?subject=Support Request");
  };

  const handleCallSupport = () => {
    Linking.openURL("tel:+1234567890");
  };

  const handleMessageSupport = () => {
    // Open WhatsApp with a predefined message (You can change the URL for different messaging platforms)
    Linking.openURL("https://wa.me/11234567890?text=I%20need%20support");
  };

  const toggleAnswer = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Support</Text>

      {/* Frequently Asked Questions Section */}
      <Text style={styles.faqTitle}>Frequently Asked Questions</Text>

      <TouchableOpacity
        style={styles.faqItem}
        onPress={() => toggleAnswer(0)} // Toggle first question
      >
        <Text style={styles.faqQuestion}>1. How do I track my order?</Text>
      </TouchableOpacity>
      {activeQuestion === 0 && (
        <Text style={styles.faqAnswer}>
          You can track your order by visiting the "Orders" section in your
          profile.
        </Text>
      )}

      <TouchableOpacity
        style={styles.faqItem}
        onPress={() => toggleAnswer(1)} // Toggle second question
      >
        <Text style={styles.faqQuestion}>2. How do I reset my password?</Text>
      </TouchableOpacity>
      {activeQuestion === 1 && (
        <Text style={styles.faqAnswer}>
          To reset your password, click on "Forgot Password" on the login
          screen.
        </Text>
      )}

      <TouchableOpacity
        style={styles.faqItem}
        onPress={() => toggleAnswer(2)} // Toggle third question
      >
        <Text style={styles.faqQuestion}>
          3. How can I update my billing details?
        </Text>
      </TouchableOpacity>
      {activeQuestion === 2 && (
        <Text style={styles.faqAnswer}>
          You can update your billing details in the "Account Settings" section
          under "Billing".
        </Text>
      )}

      <Text style={styles.supportSectionTitle}>Need Help?</Text>
      <Text style={styles.description}>
        Need help? Feel free to reach out to us through the options below.
      </Text>

      {/* Support Options Section */}
      <View style={styles.supportOptions}>
        {/* Email Support */}
        <TouchableOpacity style={styles.button} onPress={handleEmailSupport}>
          <Ionicons name="mail" size={24} color="white" />
          <Text style={styles.buttonText}>Email Support</Text>
        </TouchableOpacity>

        {/* Phone Support */}
        <TouchableOpacity style={styles.button} onPress={handleCallSupport}>
          <Ionicons name="call" size={24} color="white" />
          <Text style={styles.buttonText}>Call Support</Text>
        </TouchableOpacity>

        {/* Messaging Support */}
        <TouchableOpacity style={styles.button} onPress={handleMessageSupport}>
          <Ionicons name="chatbubbles" size={24} color="white" />
          <Text style={styles.buttonText}>Message Support</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.supportDetails}>
        If you have any issues with your order or need further assistance, feel
        free to contact our support team.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center", // Centers vertically
    alignItems: "center", // Centers horizontally
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center", // Center text
  },
  description: {
    fontSize: 16,
    textAlign: "center", // Center text
    marginBottom: 30,
    color: "#555",
  },
  faqTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
    color: "#333",
    textAlign: "center", // Center text
  },
  faqItem: {
    marginBottom: 10,
    width: "100%",
    alignItems: "center", // Centering question text
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007BFF",
    textAlign: "center", // Center text
  },
  faqAnswer: {
    fontSize: 14,
    color: "#555",
    marginLeft: 20,
    marginTop: 5,
    textAlign: "center", // Center text
  },
  supportOptions: {
    width: "100%",
    marginTop: 30,
    alignItems: "center", // Center buttons
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    width: "80%", // Make buttons take up 80% of the width
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  supportSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center", // Center text
  },
  supportDetails: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
    textAlign: "center", // Center text
  },
});
