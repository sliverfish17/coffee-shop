import { forwardRef } from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, ...rest }, ref) => (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-medium text-white">{label}</label>
      )}
      <select
        ref={ref}
        {...rest}
        className={`bg-zinc-800 text-white p-2 rounded-md border ${
          error ? "border-red-500" : "border-zinc-600"
        } focus:outline-none focus:ring-2 ${
          error ? "focus:ring-red-500" : "focus:ring-blue-500"
        } transition`}
      >
        <option value="">-- Виберіть --</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
);

Select.displayName = "Select";
