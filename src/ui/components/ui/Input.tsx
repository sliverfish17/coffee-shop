import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...rest }, ref) => (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-medium text-white mb-1">{label}</label>
      )}
      <input
        ref={ref}
        {...rest}
        className={`w-full px-4 py-2 md:py-3 bg-zinc-800 border ${
          error ? "border-red-500" : "border-zinc-600"
        } rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 ${
          error ? "focus:ring-red-500" : "focus:ring-blue-500"
        } transition duration-200 ease-in-out`}
        autoComplete="off"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
);

Input.displayName = "Input";
