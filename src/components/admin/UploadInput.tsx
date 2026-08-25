type UploadInputProps = {
  label: string;
  name: string;
  accept?: string;
  multiple?: boolean;
  help?: string;
};

export function UploadInput({
  label,
  name,
  accept,
  multiple,
  help,
}: UploadInputProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#f8fafc]">{label}</span>
      <input
        name={name}
        type="file"
        accept={accept}
        multiple={multiple}
        className="block w-full rounded-xl border border-blue-300/15 bg-black/20 px-3 py-2 text-sm text-slate-400 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white"
      />
      {help ? <span className="mt-1 block text-xs text-[#64748b]">{help}</span> : null}
    </label>
  );
}
