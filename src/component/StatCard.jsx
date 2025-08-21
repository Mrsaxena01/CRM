import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StatCard = ({ title, value, icon, secondaryText, colorTheme = "primary" }) => {
  const getColorClasses = (theme) => {
    const base = {
      iconBg: "bg-white/20",
      hoverIconBg: "hover:bg-white/30",
      text: "text-white",
      iconText: "text-white",
    };

    const themes = {
      success: {
        bg: "bg-emerald-500",
        hoverBg: "hover:bg-emerald-400",
        shadow: "hover:shadow-emerald-500/40",
        border: "border-emerald-500",
        ...base,
      },
      warning: {
        bg: "bg-amber-500",
        hoverBg: "hover:bg-amber-400",
        shadow: "hover:shadow-amber-500/40",
        border: "border-amber-500",
        ...base,
      },
      danger: {
        bg: "bg-red-500",
        hoverBg: "hover:bg-red-400",
        shadow: "hover:shadow-red-500/40",
        border: "border-red-500",
        ...base,
      },
      info: {
        bg: "bg-blue-500",
        hoverBg: "hover:bg-blue-400",
        shadow: "hover:shadow-blue-500/40",
        border: "border-blue-500",
        ...base,
      },
      purple: {
        bg: "bg-purple-500",
        hoverBg: "hover:bg-purple-400",
        shadow: "hover:shadow-purple-500/40",
        border: "border-purple-500",
        ...base,
      },
      primary: {
        bg: "bg-[#0ef]",
        hoverBg: "hover:bg-[#0ef]/90",
        shadow: "hover:shadow-[#0ef]/40",
        border: "border-[#0ef]",
        iconBg: "bg-[#081b29]/20",
        hoverIconBg: "hover:bg-[#081b29]/30",
        text: "text-[#081b29]",
        iconText: "text-[#081b29]",
      },
    };

    return themes[theme] || themes.primary;
  };

  const colors = getColorClasses(colorTheme);

  return (
    <div className={`rounded-xl p-5 flex items-center gap-4 transition-all duration-300 
      ${colors.bg} ${colors.hoverBg} ${colors.shadow} ${colors.border} shadow-lg hover:scale-[1.03]`}>
      <div className={`p-4 rounded-full shrink-0 transition-colors duration-300 
        ${colors.iconBg} ${colors.hoverIconBg}`}>
        <FontAwesomeIcon icon={icon} className={`${colors.iconText} text-2xl hover:scale-110 transition-transform`} />
      </div>
      <div className="flex flex-col justify-center">
        <h3 className={`text-sm font-semibold truncate ${colors.text} opacity-90`}>{title}</h3>
        <p className={`text-2xl font-bold mt-1 ${colors.text}`}>{value || "0"}</p>
        {secondaryText && (
          <p className={`text-xs mt-1 truncate ${colors.text} opacity-75`}>{secondaryText}</p>
        )}
      </div>
    </div>
  );
};

export default StatCard;