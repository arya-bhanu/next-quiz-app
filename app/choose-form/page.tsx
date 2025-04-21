import Link from "next/link";
import React from "react";

const ChooseForm = () => {
  return (
    <div className="m-auto">
      <h2 className="text-2xl">Choose how you wanted to create exercise</h2>
      <div className="flex items-center gap-5 flex-wrap text-center mt-5">
        <Link
          href="questions-form"
          className="hover:shadow-md border-2 transition rounded-lg px-5 py-5 flex-1"
        >
          opentdb.com
        </Link>
        <Link
          href="ai-generate"
          className="hover:shadow-md border-2 transition rounded-lg px-5 py-5 flex-1"
        >
          Google Gemini API
        </Link>
      </div>
    </div>
  );
};

export default ChooseForm;
