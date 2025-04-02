import { forwardRef } from "react";

interface FileSelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  previewUrl?: string;
}

export const FileSelect = forwardRef<HTMLInputElement, FileSelectProps>(
  ({ label, error, previewUrl, ...rest }, ref) => {
    console.log(previewUrl);
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-sm font-medium text-white mb-1">{label}</label>
        )}
        <input
          type="file"
          accept="image/*"
          ref={ref}
          {...rest}
          className="text-white bg-zinc-800 p-2 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        {previewUrl && (
          <img
            src={previewUrl}
            alt="preview"
            className="mt-2 max-h-48 object-contain rounded border border-white"
          />
        )}
      </div>
    );
  }
);

FileSelect.displayName = "FileSelect";
