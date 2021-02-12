import React, { useState } from 'react';

export default function useTimeLine(initialValue) {

  const [timeline, setTimeline] = useState(initialValue)

  //TIMELINE PROGRESS
  function lineProgress() {
    setTimeline(prev => prev + 140)
  }

  return { timeline, lineProgress };
}