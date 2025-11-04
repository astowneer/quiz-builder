"use client";

import { useState } from "react";

type QuestionType = "boolean" | "input" | "checkbox";

interface CheckboxOption {
  text: string;
  isCorrect: boolean;
}

interface QuizQuestion {
  type: QuestionType;
  question: string;
  options?: CheckboxOption[];
  answer?: string;
}

export default function CreateQuizPage() {
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState<QuizQuestion[]>([
    { type: "input", question: "", answer: "" },
  ]);

  function addQuestion() {
    setQuestions((prev) => [
      ...prev,
      { type: "input", question: "", answer: "" },
    ]);
  }

  function updateQuestion(
    index: number,
    field: keyof QuizQuestion,
    value: any
  ) {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, [field]: value } : q))
    );
  }

  function removeOption(qIndex: number, optIndex: number) {
    const q = questions[qIndex];
    if (!q.options) return;
    const newOptions = q.options.filter((_, i) => i !== optIndex);
    updateQuestion(qIndex, "options", newOptions);
  }

  function addOption(index: number) {
    const q = questions[index];
    if (q.type !== "checkbox") return;
    const newOptions = q.options
      ? [...q.options, { text: "", isCorrect: false }]
      : [{ text: "", isCorrect: false }];
    updateQuestion(index, "options", newOptions);
  }

  function updateOption(qIndex: number, optIndex: number, value: string) {
    const q = questions[qIndex];
    if (!q.options) return;
    const newOptions = [...q.options];
    newOptions[optIndex].text = value;
    updateQuestion(qIndex, "options", newOptions);
  }

  function toggleCorrectOption(qIndex: number, optIndex: number) {
    const q = questions[qIndex];
    if (!q.options) return;
    const newOptions = [...q.options];
    newOptions[optIndex].isCorrect = !newOptions[optIndex].isCorrect;
    updateQuestion(qIndex, "options", newOptions);
  }

  function removeQuestion(index: number) {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <article className="w-[800px] m-auto space-y-5 py-10">
      <h2 className="text-2xl font-bold mb-5">Create Quiz</h2>

      <label className="relative text-white w-full">
        <input
          required
          className="peer w-full bg-red-700 p-2 rounded-xl text-white shadow-xl focus:outline-none"
          name="quizTitle"
          type="text"
          placeholder=""
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
        />
        <span className="absolute -top-2 left-2 text-xs text-white/70  transition-all peer-placeholder-shown:block hidden">
          Quiz Title
        </span>
      </label>
      <form className="space-y-5">
        {questions.map((q, index) => (
          <section
            key={index}
            className="bg-red-700 rounded-xl shadow-xl p-5 space-y-3"
          >
            <div className="flex justify-between text-white/70 border-b border-red-900 pb-2 mb-2">
              <div>Question {index + 1}</div>
              <button type="button" onClick={() => removeQuestion(index)}>
                Remove
              </button>
            </div>
            <div className="space-y-2">
              <label className="block">
                <span className="text-white/70">Question Text</span>
                <input
                  type="text"
                  className="w-full p-2 rounded-md bg-transparent border-b-4 border-red-900 text-white focus:border-white outline-none"
                  value={q.question}
                  onChange={(e) =>
                    updateQuestion(index, "question", e.target.value)
                  }
                />
              </label>
              <label className="block">
                <span className="text-white/70">Question Type</span>
                <select
                  className="w-full p-2 rounded-md bg-transparent border-b-4 border-red-900 text-white focus:border-white outline-none"
                  value={q.type}
                  onChange={(e) =>
                    updateQuestion(
                      index,
                      "type",
                      e.target.value as QuestionType
                    )
                  }
                >
                  <option value="input">Input</option>
                  <option value="boolean">Boolean</option>
                  <option value="checkbox">Checkbox (Multiple Choice)</option>
                </select>
              </label>
              {q.type === "boolean" && (
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`boolean-${index}`}
                      value="true"
                      checked={q.answer === "true"}
                      onChange={(e) =>
                        updateQuestion(index, "answer", e.target.value)
                      }
                    />
                    True
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`boolean-${index}`}
                      value="false"
                      checked={q.answer === "false"}
                      onChange={(e) =>
                        updateQuestion(index, "answer", e.target.value)
                      }
                    />
                    False
                  </label>
                </div>
              )}
              {q.type === "input" && (
                <input
                  type="text"
                  className="w-full p-2 rounded-md bg-transparent border-b-4 border-red-900 text-white focus:border-white outline-none"
                  placeholder="Answer"
                  value={q.answer || ""}
                  onChange={(e) =>
                    updateQuestion(index, "answer", e.target.value)
                  }
                />
              )}

              {q.type === "checkbox" && (
                <div className="space-y-2">
                  {q.options?.map((opt, optIndex) => (
                    <div key={optIndex} className="flex gap-2 items-center">
                      <input
                        type="text"
                        className="p-2 rounded-md bg-transparent border-b-4 border-red-900 text-white focus:border-white outline-none flex-1"
                        placeholder="Option text"
                        value={opt.text}
                        onChange={(e) =>
                          updateOption(index, optIndex, e.target.value)
                        }
                      />
                      <label className="flex items-center gap-1 text-white/70">
                        <input
                          type="checkbox"
                          checked={opt.isCorrect}
                          onChange={() => toggleCorrectOption(index, optIndex)}
                        />
                        Correct
                      </label>
                      <button
                        type="button"
                        onClick={() => removeOption(index, optIndex)}
                        className="text-red-900 hover:text-white"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addOption(index)}
                    className="text-white hover:text-white/70"
                  >
                    + Add Option
                  </button>
                </div>
              )}
            </div>
          </section>
        ))}

        <div className="flex justify-center mt-5">
          <button
            type="button"
            onClick={addQuestion}
            className="uppercase border-b-4 font-bold text-red-900 hover:text-white leading-8 border-red-900 hover:border-white transition-colors duration-500 ease-in px-5 py-2 rounded-xl"
          >
            Add Question
          </button>
        </div>

        <div className="flex justify-end mt-5">
          <button
            type="submit"
            className="text-xl mt-5 shadow-lg bg-red-700 block w-fit py-2 px-5 rounded-xl mb-10 hover:bg-red-800 duration-300 ease-in"
          >
            Submit Quiz
          </button>
        </div>
      </form>
    </article>
  );
}
