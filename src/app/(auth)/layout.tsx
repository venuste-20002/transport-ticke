"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative font-sans">
        <div className="z-50 absolute w-[100%] p-4">
          <div className="m-auto max-w-[500px]">
            <div className="flex justify-center flex-col py-[50px]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default layout;
