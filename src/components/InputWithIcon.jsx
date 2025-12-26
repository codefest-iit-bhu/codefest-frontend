export default function InputWithIcon({
  icon,
  placeholder,
  value,
  onChange,
  name,
  type = "text",
}) {
  return (
    <div className="relative w-full max-w-[420px]">
      {/* Icon */}
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        {icon}
      </div>

      {/* Input */}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 pl-12
                   bg-[#000000]
                   border border-[#444]
                   rounded-[20px]
                   text-white placeholder-white
                   font-['Noto_Sans_Georgian']
                   focus:outline-none focus:ring-2 focus:ring-purple-600"
      />
    </div>
  );
}
