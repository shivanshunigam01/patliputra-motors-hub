import api from "./api";

export interface AdminSettings {
  _id: string;
  address: string;
  email: string;
  primary_phone: string;
  whatsapp_number: string;
  working_hours: string;
  features: {
    emiCalculator: boolean;
    usedVehicles: boolean;
    cibilCheck: boolean;
    comparison: boolean;
  };
}


export const getAdminSettings = async () => {
  const response = await api.get("/settings");
  return response.data.data;
};
