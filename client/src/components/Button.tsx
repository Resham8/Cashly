export function Button({
  children,
  label,
  variant = "primary",
  size = "default",
  className = "",
  fullWidth,
  onClick,
  disabled = false,
  ...props
}: {
  children?: React.ReactNode;
  label: string;
  variant?: "primary" | "secondary" | "gradient";
  size?: "sm" | "default" | "lg";
  className?: string;
  fullWidth?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}) {
  const baseClasses =
    "relative inline-flex items-center justify-center font-semibold transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0f172a] disabled:opacity-40 disabled:cursor-not-allowed overflow-hidden group ";

  const variantClasses = {
    primary:
      "bg-[#00b9f1] text-white hover:bg-[#0095c7] focus:ring-[#00b9f1]/60 shadow-lg shadow-[#00b9f1]/25 hover:shadow-xl hover:shadow-[#00b9f1]/30 hover:-translate-y-0.5 active:translate-y-0 rounded-xl border border-[#00b9f1]/20",

    secondary:
      "bg-[#1e293b] text-[#f1f5f9] hover:bg-[#334155] focus:ring-[#94a3b8]/60 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-0.5 active:translate-y-0 rounded-xl border border-[#334155] hover:border-[#475569]",

    gradient:
      "bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] bg-size-200 hover:bg-pos-100 text-white focus:ring-[#1e293b]/60 shadow-lg shadow-black/25 hover:shadow-xl hover:shadow-black/40 hover:-translate-y-0.5 active:translate-y-0 rounded-xl border border-[#1e293b]/30",
  };

  const sizeClasses = {
    sm: "px-5 py-2.5 text-sm min-h-[40px]",
    default: "px-6 py-3 text-base min-h-[48px]",
    lg: "px-9 py-4 text-lg min-h-[56px]",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${
        sizeClasses[size]
      } ${className} ${fullWidth ? "w-full" : ""}`}
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundSize: variant === "gradient" ? "200% 100%" : undefined,
        backgroundPosition: variant === "gradient" ? "left center" : undefined,
      }}
      {...props}
    >
      <span>{children}</span>
      <span className="relative z-10 flex items-center gap-2">{label}</span>
    </button>
  );
}
