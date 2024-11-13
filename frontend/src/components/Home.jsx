import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo1 } from "./Logo1";
export function Home() {
  const [error, setError] = useState(null);
  const [courseId, setCourseId] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const courses = [
    "FSDT",
    "AHCT",
    "PMLT",
    "AIMT",
    "BSNT",
    "LAQT",
    "CPCT",
    "CPMT",
    "DOCT",
    "ESLT",
    "FPWT",
    "FSIT",
    "FSQT",
    "MMDT",
    "MMPT",
    "OHST",
    "QEMT",
    "SCMT",
  ];

  const handleJoin = () => {
    const TrimmedCourseId = courseId.trim();
    const TrimmedUserName = userName.trim();

    if (TrimmedCourseId && TrimmedUserName) {
      if (courses.includes(TrimmedCourseId)) {
        setError(null);
        navigate(`/chatroom/${TrimmedCourseId}/${TrimmedUserName}`);
      } else {
        setError("Invalid course ID. Please enter a valid course ID");
      }
    } else {
      setError("Please enter both a course ID and username");
    }
  };

  return (
    <div className="home flex flex-col justify-center items-center w-screen h-screen m">
      {error && (
        <div
          role="alert"
          className="alert alert-error fixed top-2 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md flex items-center justify-between p-4 rounded-lg shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <div>
        <Logo1 className="border-solid" />
      </div>
      <div className="flex mt-4 flex-col rounded-lg w-[450px]  items-center justify-center shadow-2xl">
        {/* <h1>Welcome to Lambton College Chat </h1> */}
        <div className="flex flex-row">
          <input
            type="text"
            className="rounded-lg"
            placeholder={`Enter Course ID`}
            value={courseId}
            onChange={(e) => setCourseId(e.target.value.toUpperCase())}
          />
          <input
            type="text"
            className="rounded-lg"
            placeholder="Enter Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <button className="btn btn-neutral" onClick={handleJoin}>
          Join Chat
        </button>
      </div>
    </div>
  );
}
