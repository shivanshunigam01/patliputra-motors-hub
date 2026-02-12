import React, { createContext, useContext, useEffect, useState } from "react";
import { getAdminSettings, AdminSettings } from "@/services/settings.service";

interface AdminSettingsContextType {
  settings: AdminSettings | null;
  loading: boolean;
}

const AdminSettingsContext = createContext<AdminSettingsContextType>({
  settings: null,
  loading: true,
});

export const AdminSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getAdminSettings();
        setSettings(data);
      } catch (error) {
        console.error("Failed to fetch admin settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return (
    <AdminSettingsContext.Provider value={{ settings, loading }}>
      {children}
    </AdminSettingsContext.Provider>
  );
};

export const useAdminSettings = () => useContext(AdminSettingsContext);
