import { Dialog } from "@headlessui/react";

export default function Confirmation({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmLabel = "Confirm",
  confirmColor = "bg-blue-600",
}) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
          <Dialog.Title className="text-lg font-semibold text-gray-900">
            {title}
          </Dialog.Title>
          <p className="mt-2 text-sm text-gray-600">
            {message}
          </p>
          <div className="mt-4 flex justify-end space-x-2">
            <button onClick={onClose} className="btn bg-gray-500 text-white">
              Cancel
            </button>
            <button onClick={onConfirm} className={`btn ${confirmColor} text-white`}>
              {confirmLabel}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
