export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  iconColor = "text-blue-600",
  bgColor = "bg-blue-50",
  badge,
  onClick
}) => {
  return <div
    onClick={onClick}
    className={`bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all ${onClick ? "cursor-pointer hover:border-blue-300" : ""}`}
  >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
            {badge && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                {badge}
              </span>}
          </div>
          <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 font-sans tracking-tight">
            {value}
          </h4>
        </div>
        <div className={`p-3 rounded-xl ${bgColor} ${iconColor}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>

      {(subtitle || trend) && <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-100">
          {subtitle && <span className="text-slate-600 font-medium">{subtitle}</span>}
          {trend && <span
    className={`font-bold flex items-center gap-0.5 ${trend.isPositive ? "text-emerald-600" : "text-rose-600"}`}
  >
              {trend.isPositive ? "\u2191" : "\u2193"} {trend.value}
            </span>}
        </div>}
    </div>;
};
