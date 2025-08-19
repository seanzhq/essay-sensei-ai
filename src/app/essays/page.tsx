"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from "../components/Sidebar";
import { greQuestions, getQuestionById } from "../data/questions";

interface Suggestion {
  sentence: string;
  suggestion: string;
  idx: number;
}

// Sample suggestions for demonstration
const getSampleSuggestions = (questionId: string): Suggestion[] => {
  const suggestions: Record<string, Suggestion[]> = {
    'technology-communication': [
      {
        sentence: "However, there are some drawbacks to this trend.",
        suggestion: "Use a clearer transition here to improve the flow between ideas.",
        idx: 1,
      },
      {
        sentence: "For instance, recent studies show people feel more lonely despite being constantly connected online.",
        suggestion: "Be more specific and concise with your example.",
        idx: 2,
      },
    ],
    'education-online-learning': [
      {
        sentence: "Online learning provides flexibility that traditional classrooms cannot match.",
        suggestion: "Consider adding a specific example to strengthen this claim.",
        idx: 1,
      },
    ],
    'social-media-mental-health': [
      {
        sentence: "Social media platforms are designed to be addictive.",
        suggestion: "Provide evidence or statistics to support this claim.",
        idx: 1,
      },
    ],
    'remote-work-productivity': [
      {
        sentence: "Many employees report higher satisfaction when working from home.",
        suggestion: "Include specific data or research to support this statement.",
        idx: 1,
      },
    ],
    'environmental-responsibility': [
      {
        sentence: "Individual actions may seem small, but they add up.",
        suggestion: "Use a more compelling transition to connect ideas.",
        idx: 1,
      },
    ],
    'artificial-intelligence-jobs': [
      {
        sentence: "AI will transform the job market in unprecedented ways.",
        suggestion: "Be more specific about which industries or job types.",
        idx: 1,
      },
    ],
    'standardized-testing': [
      {
        sentence: "Standardized tests provide a common measure for all students.",
        suggestion: "Address potential biases or limitations of this approach.",
        idx: 1,
      },
    ],
    'government-regulation': [
      {
        sentence: "Regulation is necessary to prevent market failures.",
        suggestion: "Provide specific examples of market failures.",
        idx: 1,
      },
    ],
  };
  
  return suggestions[questionId] || [];
};

const getSampleSummary = (questionId: string): string[] => {
  const summaries: Record<string, string[]> = {
    'technology-communication': [
      "Introduction is clear and engaging.",
      "Needs a stronger thesis statement.",
      "Try to vary sentence length for better flow.",
    ],
    'education-online-learning': [
      "Good use of specific examples.",
      "Consider addressing counterarguments more thoroughly.",
      "Work on smoother transitions between paragraphs.",
    ],
    'social-media-mental-health': [
      "Strong argument structure.",
      "Include more recent research or statistics.",
      "Consider the opposing viewpoint more fully.",
    ],
    'remote-work-productivity': [
      "Clear position statement.",
      "Add more concrete examples.",
      "Strengthen the conclusion.",
    ],
    'environmental-responsibility': [
      "Good balance of personal and societal perspectives.",
      "Include more specific environmental examples.",
      "Consider economic implications.",
    ],
    'artificial-intelligence-jobs': [
      "Thoughtful analysis of complex topic.",
      "Include more specific industry examples.",
      "Address both short-term and long-term impacts.",
    ],
    'standardized-testing': [
      "Balanced perspective on the issue.",
      "Include more specific educational examples.",
      "Consider alternative assessment methods.",
    ],
    'government-regulation': [
      "Good understanding of economic principles.",
      "Include more specific regulatory examples.",
      "Address both benefits and costs of regulation.",
    ],
  };
  
  return summaries[questionId] || [
    "Introduction is clear.",
    "Needs a stronger thesis statement.",
    "Try to vary sentence length for better flow.",
  ];
};

const GREWritingAssistant: React.FC = () => {
  const [currentQuestionId, setCurrentQuestionId] = useState<string>("technology-communication");
  const [essay, setEssay] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/auth');
    }
  }, [isAuthenticated, router]);

  const currentQuestion = getQuestionById(currentQuestionId) || greQuestions[0];
  const sampleSuggestions = getSampleSuggestions(currentQuestionId);
  const sampleSummary = getSampleSummary(currentQuestionId);

  // Simulate parsing sentences for highlighting (in real app, use NLP)
  const sentences = essay.split(/(?<=[.!?])\s+/);

  const handleQuestionSelect = (questionId: string) => {
    setCurrentQuestionId(questionId);
    setEssay("");
    setSubmitted(false);
    setHoveredIdx(null);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <Sidebar
        questions={greQuestions}
        currentQuestionId={currentQuestionId}
        onQuestionSelect={handleQuestionSelect}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-5 shadow-sm bg-white">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-blue-600">✏️</span>
            <span className="text-2xl font-semibold">GRE Writing Assistant</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Current: <span className="font-medium">{currentQuestion.title}</span>
            </div>
            <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center text-gray-500 font-bold">
              U
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            {/* Main Writing Area */}
            <section className="lg:col-span-2 bg-white rounded-2xl shadow p-8 flex flex-col">
              {/* Question Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-gray-700 text-lg font-semibold">Question</div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                      currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {currentQuestion.difficulty}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {currentQuestion.category}
                    </span>
                  </div>
                </div>
                <div className="text-gray-900 text-base border-l-4 border-blue-400 pl-4 italic leading-relaxed">
                  {currentQuestion.prompt}
                </div>
              </div>

              {/* Text Area (Essay Writing) */}
              <div className="flex-1">
                <div className="text-gray-600 mb-2">Your Answer</div>
                <div className="relative">
                  <textarea
                    className="w-full min-h-[300px] max-h-[500px] p-4 rounded-xl border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none resize-vertical text-gray-800 text-base font-medium shadow-sm transition"
                    placeholder="Start writing your essay here..."
                    value={essay}
                    onChange={(e) => {
                      setEssay(e.target.value);
                      setSubmitted(false);
                    }}
                    disabled={submitted}
                  />
                </div>

                {/* In-place sentence highlighting */}
                {essay && (
                  <div className="mt-4 text-base text-gray-800 leading-relaxed space-y-1">
                    {sentences.map((sentence, idx) => {
                      const found = sampleSuggestions.find(
                        (s) => s.sentence === sentence.trim()
                      );
                      const isHovered = hoveredIdx === idx;
                      return (
                        <span
                          key={idx}
                          className={
                            found
                              ? `transition cursor-pointer underline decoration-dotted underline-offset-4 decoration-blue-400 ${
                                  isHovered ? "bg-blue-50 decoration-blue-600" : ""
                                }`
                              : ""
                          }
                          onMouseEnter={() => found && setHoveredIdx(idx)}
                          onMouseLeave={() => setHoveredIdx(null)}
                        >
                          {sentence + " "}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end mt-6">
                <button
                  className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-blue-700 disabled:opacity-60 transition text-base"
                  disabled={!essay || submitted}
                  onClick={() => setSubmitted(true)}
                >
                  {submitted ? "Submitted" : "Submit for Analysis"}
                </button>
              </div>

              {/* Summary of Improvements */}
              {(submitted || essay) && (
                <div className="mt-8">
                  <div className="bg-blue-50 border-l-4 border-blue-400 rounded-xl p-5 shadow text-blue-900">
                    <div className="text-lg font-bold mb-3 flex items-center">
                      <span className="mr-2">💡</span>Summary of Improvements
                    </div>
                    <ul className="list-disc list-inside space-y-2 text-base">
                      {sampleSummary.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </section>

            {/* Sidebar: Sentence-level Suggestions */}
            <aside className="lg:col-span-1">
              <div className="sticky top-8 bg-white rounded-2xl shadow p-6">
                <div className="text-lg font-semibold mb-4 flex items-center">
                  <span className="mr-2">📝</span>Sentence-level Suggestions
                </div>
                {sampleSuggestions.length === 0 ? (
                  <div className="text-gray-500 text-base">No suggestions yet. Write your essay to see suggestions.</div>
                ) : (
                  <ul className="space-y-4">
                    {sampleSuggestions.map((s, i) => (
                      <li
                        key={i}
                        className={`p-4 rounded-xl transition border border-transparent ${
                          hoveredIdx === s.idx ? "bg-blue-50 border-blue-300" : ""
                        }`}
                        onMouseEnter={() => setHoveredIdx(s.idx)}
                        onMouseLeave={() => setHoveredIdx(null)}
                      >
                        <div className="font-medium text-gray-700 text-sm mb-2">{s.sentence}</div>
                        <div className="text-blue-700 text-sm flex items-start">
                          <span className="mr-2 mt-0.5">🔎</span>
                          <span>{s.suggestion}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GREWritingAssistant;