import React from "react";

const PriorityChip = ({ priority }) => {
  const getPriorityColor = () => {
    switch (priority) { //checking task based on priority condition
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityLabel = () => {
    switch (priority) {
      case "high":
        return "High";
      case "medium":
        return "Medium";
      case "low":
        return "Low";
      default:
        return priority;
    }
  };

  return (
    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor()}`}>
      {getPriorityLabel()}
    </span>
  );
};

export default PriorityChip;
