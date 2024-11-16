import React from "react";
import "./App.css";
import Background from "./components/Background";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App w-[100vw] h-[100vh] overflow-x-hidden overflow-y-scroll no-scrollbar">
        <Background />
        <RouterProvider router={router}></RouterProvider>
      </div>
    </QueryClientProvider>
  );
};

export default App;
