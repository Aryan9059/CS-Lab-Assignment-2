import { ComponentType, SVGProps } from "react";

interface CategoryIconProps {
  icon: ComponentType<SVGProps<SVGSVGElement> & { className?: string }>;
  label: string;
  active?: boolean;
}

export default function CategoryIcon({
  icon: Icon,
  label,
  active = false,
}: CategoryIconProps) {
  return (
    <button className="flex flex-col items-center gap-2 group cursor-pointer transition-all duration-200">
      <div
        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 ${
          active
            ? "bg-[#4A1080] shadow-lg shadow-purple-300/40"
            : "bg-white border-2 border-[#E8620A]/20 group-hover:border-[#4A1080] group-hover:bg-[#4A1080]/5"
        }`}
      >
        <Icon
          className={`w-6 h-6 transition-colors ${
            active
              ? "text-white"
              : "text-[#4A1080] group-hover:text-[#4A1080]"
          }`}
        />
      </div>
      <span
        className={`text-xs font-medium transition-colors ${
          active
            ? "text-[#4A1080]"
            : "text-[#6B7280] group-hover:text-[#4A1080]"
        }`}
      >
        {label}
      </span>
    </button>
  );
}
