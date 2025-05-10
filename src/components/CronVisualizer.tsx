
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CronExpressionEvaluator from "./CronExpressionEvaluator";
import RecurrencePatternGenerator from "./RecurrencePatternGenerator";

const CronVisualizer = () => {
  const [activeTab, setActiveTab] = useState<"evaluator" | "generator">("evaluator");

  return (
    <div className="space-y-8">
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            onClick={() => setActiveTab("evaluator")}
            className={`px-4 py-2 text-sm font-medium border rounded-l-lg ${
              activeTab === "evaluator"
                ? "bg-cron-purple text-white border-cron-purple"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
            }`}
          >
            Cron Expression Evaluator
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("generator")}
            className={`px-4 py-2 text-sm font-medium border rounded-r-lg ${
              activeTab === "generator"
                ? "bg-cron-purple text-white border-cron-purple"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
            }`}
          >
            Recurrence Pattern Generator
          </button>
        </div>
      </div>

      {activeTab === "evaluator" && (
        <Card>
          <CardHeader className="bg-cron-light-purple">
            <CardTitle className="text-xl text-cron-dark-purple">Part 1: Cron Expression Evaluator</CardTitle>
            <CardDescription>Parse and understand your cron expressions</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <CronExpressionEvaluator />
          </CardContent>
        </Card>
      )}

      {activeTab === "generator" && (
        <Card>
          <CardHeader className="bg-cron-light-purple">
            <CardTitle className="text-xl text-cron-dark-purple">Part 2: Recurrence Pattern Generator</CardTitle>
            <CardDescription>Generate cron expressions from human-readable patterns</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <RecurrencePatternGenerator />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CronVisualizer;
