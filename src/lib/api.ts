export const createCibilOrder = async (payload: {
  customer_name: string;
  mobile: string;
  pan: string;
  dob: string;
  linked_lead_id?: string | null;
}) => {
  return apiRequest<{
    razorpay_key_id: string;
    order: {
      id: string;
      amount: number;
      currency: string;
    };
    payment_id: string;
  }>("/cibil/create-order", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const verifyCibilPayment = async (payload: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}) => {
  return apiRequest<{
    id: string;
    customer_name: string;
    mobile: string;
    pan: string;
    cibil_score: number;
    score_band: string;
    checked_at: string;
  }>("/cibil/verify-and-check", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
