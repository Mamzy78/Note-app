import React from "react";

export default function TextSizeModal({ isOpen, onClose, selectedSize, onSelect }) {
  if (!isOpen) return null;

  const options = [
    { label: "Base", value: "base", size: "16px" },
    { label: "Medium", value: "medium", size: "18px" },
    { label: "Bold", value: "bold", size: "22px" },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white p-4 rounded-lg w-72 shadow-xl">
        <h2 className="text-lg font-bold mb-4">Select Text Size</h2>
        <div className="space-y-3">
          {options.map(option => (
            <label key={option.value} className="flex items-center justify-between">
              <input
                type="radio"
                name="text-size"
                value={option.value}
                checked={selectedSize === option.value}
                onChange={() => onSelect(option.value)}
              />
              <span style={{ fontSize: option.size }}>{option.label}</span>
            </label>
          ))}
        </div>
        <button className="mt-4 w-full bg-purple-color-app text-white p-2 rounded" onClick={onClose}>
          Confirm
        </button>
      </div>
    </div>
  );
}
