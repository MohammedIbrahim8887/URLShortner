import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./hooks/useTheme.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster.tsx";

// Create a new instance of the QueryClient
const queryClient = new QueryClient();

// Render the root React component to the 'root' element in the HTML document
ReactDOM.createRoot(document.getElementById("root")!).render(
  // Enable React's Strict Mode for better development checks and warnings
  <React.StrictMode>
    {/* Provide the QueryClient instance to be used in the application */}
    <QueryClientProvider client={queryClient}>
      {/* Wrap the entire application with the ThemeProvider, which enables theme switching */}
      <ThemeProvider>
        {/* Render the main App component, which serves as the entry point of the application */}
        <App />
        {/* Render the Toaster component, which provides toast notifications */}
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
