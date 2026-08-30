import React, { createContext } from 'react';
import { useRegisterSW } from "virtual:pwa-register/react";

export const ServiceWorkerContext = createContext<ReturnType<typeof useRegisterSW> | null>(null);

export const ServiceWorkerProvider = ({ children }: { children: React.ReactNode }) => {
    const {
        needRefresh,
        offlineReady,
        updateServiceWorker,
    } = useRegisterSW({
        immediate: true,
        onNeedRefresh() {
        updateServiceWorker(true);
        },
    });

  return (
    <ServiceWorkerContext value={{
        needRefresh,
        offlineReady,
        updateServiceWorker,
    }}>
      {children}
    </ServiceWorkerContext>
  );
};

