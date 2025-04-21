"use client";
import { useRouter } from "next/navigation";
import React from "react";

const AiGenerate = () => {
  const router = useRouter();
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.localStorage.clear();
    window.sessionStorage.clear();
    const formData = new FormData(event.currentTarget);
    const time = formData.get("time") as unknown;
    const number_questions = formData.get("number_questions") as unknown;
    const topic = formData.get("topic") as unknown;
    window.localStorage.setItem("TIME", JSON.stringify(Number(time) * 60));
    window.localStorage.setItem(
      "GEMINI_STATE",
      JSON.stringify({
        number_questions,
        topic,
        time,
      })
    );
    setTimeout(() => {
      router.push("/quiz");
    });
  };
  return (
    <div className="py-10 flex justify-center">
      <form
        onSubmit={handleFormSubmit}
        className="w-full max-w-3xl flex flex-col items-center gap-5"
      >
        <fieldset className="fieldset shadow-md w-full">
          <legend className="fieldset-legend">Enter your topic prompt</legend>
          <input
            id="topic"
            name="topic"
            type="text"
            className="input w-full"
            placeholder="Type here"
            required
          />
        </fieldset>
        <fieldset className="fieldset shadow-md w-full">
          <legend className="fieldset-legend">Set your time limit</legend>
          <input
            type="number"
            name="time"
            id="time"
            className="input w-full"
            placeholder="Enter your time limit (minutes)"
            required
            defaultValue={10}
            min={1}
            max={20}
          />
        </fieldset>
        <fieldset className="fieldset shadow-md w-full">
          <legend className="fieldset-legend">
            Set your number of questions
          </legend>
          <input
            type="number"
            className="input w-full"
            name="number_questions"
            id="number_questions"
            placeholder="Enter your number of questions"
            required
            defaultValue={10}
            min={5}
            max={20}
          />
        </fieldset>
        <button className="btn btn-primary">Let&apos;s Practice</button>
      </form>
    </div>
  );
};

export default AiGenerate;
