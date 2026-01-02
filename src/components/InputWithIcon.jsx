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
          font-['Noto_Sans_Georgian']
          focus:outline-none
          focus:ring-2 focus:ring-purple-600
        "
      />
    </div>
  );
}
