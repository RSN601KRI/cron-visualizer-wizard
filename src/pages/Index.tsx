
import React from "react";
import CronVisualizer from "../components/CronVisualizer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-cron-dark-purple text-white py-8 text-center">
        <h1 className="text-4xl font-bold">Cron Expression Visualizer</h1>
      </header>
      <main className="container mx-auto py-8 px-4">
        <CronVisualizer />
      </main>
      <footer className="bg-cron-dark-purple text-white text-center py-4 mt-8">
        <p>© 2025 Cron Expression Visualizer</p>
      </footer>
    </div>
  );
};

export default Index;
