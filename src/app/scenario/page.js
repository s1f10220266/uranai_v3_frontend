"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from "../contexts/AuthContext";
import { useType } from "../contexts/TypeContext";


export default function Scenasio() {
  const { typeResult, scenarioResult } = useType();

  return (
<div>あなたのシナリオ {scenarioResult}</div>
  );
}
