"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from "../contexts/AuthContext";
import { useType } from "../contexts/TypeContext";
import TopBar from "../components/TopBar";


export default function Scenario() {
  const { typeResult, scenarioResult, inputJob } = useType();

  return (
    <>
      <TopBar />
        <div className="flex flex-col items-center justify-start h-screen space-y-8 pt-12 px-4">
          <div className="flex flex-col md:flex-row md:space-x-8 items-center justify-center w-full max-w-4xl space-y-6 md:space-y-0">
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md w-full md:w-1/2">
              <div className="text-3xl font-bold text-gray-700">あなたの性格</div>
              <div className="text-3xl font-bold text-blue-600 mt-4">{typeResult}</div>
            </div>

            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md w-full md:w-1/2">
              <div className="text-3xl font-bold text-gray-700">あなたのなりたい職業</div>
              <div className="text-3xl font-bold text-blue-600 mt-4">{inputJob}</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl w-full space-y-4">
            <div className="text-xl font-bold text-gray-700">あなたのシナリオ</div>
            <div className="">
              <div>{scenarioResult}</div>
            </div>
          </div>
          <div className="flex flex-row items-center space-x-4 pb-10">
            <label className="text-2xl mr-10 -ml-20">
              他の職業で占う:
              <input
                type="text"
                onChange={(e) => setUserJob(e.target.value)}
                className="border rounded px-2 py-1 mt-2"
              />
            </label>
            <Link href="/" className="group relative inline-flex h-[calc(48px+8px)] items-center justify-center rounded-full bg-neutral-950 py-1 pl-6 pr-14 font-medium text-neutral-50">
              <button className="z-10 pr-2"><span>おしまい</span></button>
              <div className="absolute right-1 inline-flex h-12 w-12 items-center justify-end rounded-full bg-neutral-700 transition-[width] group-hover:w-[calc(100%-8px)]">
                <div className="mr-3.5 flex items-center justify-center">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-neutral-50"
                  >
                    <path
                      d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </Link>
          </div>
      </div>
    </>
  );
}