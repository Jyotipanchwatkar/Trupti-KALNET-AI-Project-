"use client";

import { useState } from "react";
import TopicInput from "@/components/TopicInput";
import ExplanationCard from "@/components/ExplanationCard";

export default function Home() {

  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleExplain(topic: string) {

    if (!topic) {
      alert("Please enter a topic");
      return;
    }

    setLoading(true);

    try {

      const res = await fetch("/api/explain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ topic })
      });

      const data = await res.json();

      setExplanation(data.explanation);

    } catch (error) {

      alert("Something went wrong");

    }

    setLoading(false);
  }

  return (
    <main className="max-w-xl mx-auto mt-20">

      <h1 className="text-2xl font-bold mb-6">
        AI Study Topic Explainer
      </h1>

      <TopicInput onExplain={handleExplain} />

      {loading && (
        <p className="mt-4">
          Generating explanation...
        </p>
      )}

      {explanation && (
        <ExplanationCard explanation={explanation} />
      )}

    </main>
  );

}