// src/components/QuickStats.jsx
import React from "react";

const QuickStats = () => {
  const stats = [
    { icon: "👥", number: "1000+", label: "Total Patients" },
    { icon: "📅", number: "5+", label: "Years Experience" },
    { icon: "⭐", number: "4.7", label: "Rated" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 ">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-zinc-100 p-4 rounded-lg flex items-center gap-4 hover:bg-blue-500 hover:text-white transition-colors"
        >
          <div className="text-2xl sm:text-3xl">{stat.icon}</div>
          <div>
            <p className="text-base sm:text-lg font-bold">{stat.number}</p>
            <p className="text-xs sm:text-sm">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;