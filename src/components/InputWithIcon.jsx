export default function InputWithIcon({
  icon,
  placeholder,
  value,
  onChange,
  name,
  type = "text",
}) {
  return (
    <div className="relative w-full sm:max-w-[420px]">

      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        {icon}
      </div>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          w-full
          px-4 py-3 pl-12
          bg-black
          border border-[#444]
          rounded-[20px]
          text-white placeholder-white
          text-sm sm:text-base
          font-bree
          focus:outline-none
          focus:ring-2 focus:ring-[#D4AF37]
          focus:border-[#D4AF37]
          transition-colors
        "
      />
    </div>
  );
}
