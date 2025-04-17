import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "85%",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  itemName: {
    flex: 1,
  },
  itemPrice: {
    fontWeight: "600",
  },
  summary: {
    borderTopWidth: 1,
    borderColor: "#ddd",
    marginTop: 10,
    paddingTop: 10,
  },
  grandTotal: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 5,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    padding: 10,
    borderColor: "#999",
    borderWidth: 1,
    borderRadius: 5,
  },
  cancelText: {
    color: "#666",
  },
  payButton: {
    backgroundColor: "#0aada8",
    padding: 10,
    borderRadius: 5,
  },
  payText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default styles;
