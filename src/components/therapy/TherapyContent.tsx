
import { useState } from "react";
import TherapyDashboard from "./TherapyDashboard";

interface TherapyContentProps {
  currentPath?: string;
}

const TherapyContent = ({ currentPath }: TherapyContentProps) => {
  // For now, just show the main therapy dashboard
  // In the future, we can add routing logic based on currentPath
  return <TherapyDashboard />;
};

export default TherapyContent;
