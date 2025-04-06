"use client";
import { useParams } from 'next/navigation';
import React from 'react';

export default function TutorDetailPage() {
  const { slug } = useParams();

  return (
    <div className="lingo-container pt-[100px] flex flex-col relative">
      <h1>Tutor Details for: {slug}</h1>
    </div>
  );
}