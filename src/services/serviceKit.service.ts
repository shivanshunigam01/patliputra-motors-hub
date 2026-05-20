import api from "./api";

export interface ServiceKitEnquiryPayload {
  kit_id: string;
  customer_name: string;
  customer_mobile: string;
  customer_email?: string;
  customer_district?: string;
  machine_model?: string;
  message?: string;
}

export interface ServiceKitEnquiryResponse {
  id: string;
  enquiry_number: string;
  kit_title: string;
}

export async function submitServiceKitEnquiry(
  payload: ServiceKitEnquiryPayload
): Promise<ServiceKitEnquiryResponse> {
  try {
    const res = await api.post<{ success: boolean; data: ServiceKitEnquiryResponse; error?: { message?: string } }>(
      "/service-kit-enquiries",
      payload
    );
    if (!res.data?.success) {
      throw new Error(res.data?.error?.message || "Submission failed");
    }
    return res.data.data;
  } catch (err: unknown) {
    if (err && typeof err === "object" && "response" in err) {
      const ax = err as { response?: { data?: { error?: { message?: string } } } };
      const msg = ax.response?.data?.error?.message;
      if (msg) throw new Error(msg);
    }
    throw err;
  }
}
