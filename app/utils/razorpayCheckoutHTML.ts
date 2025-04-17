// utils/razorpayCheckoutHTML.ts
export const getRazorpayHTML = (
  orderId: string,
  key: string,
  amount: number,
  user: any
) => `
  <html>
    <head>
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    </head>
    <body>
      <script>
        var options = {
          "key": "${key}",
          "amount": "${amount}",
          "currency": "INR",
          "name": "PricePick",
          "description": "Order Payment",
          "order_id": "${orderId}",
          "handler": function (response) {
            window.ReactNativeWebView.postMessage(JSON.stringify(response));
          },
          "prefill": {
            "name": "${user?.name}",
            "email": "${user?.email}",
            "contact": "${user?.phone}"
          },
          "theme": {
            "color": "#5A5AFF",
          },
          "modal": {
            "ondismiss": function() {
              window.ReactNativeWebView.postMessage(JSON.stringify({ cancelled: true }));
            }
          }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
      </script>
    </body>
  </html>
`;
