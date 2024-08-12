'use client';
import { useState } from 'react';

// components
import Button from '@/components/common/Button';

interface ConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

const ConfirmationModal = ({
  isOpen,
  onConfirm,
  onCancel,
  message,
}: ConfirmationModalProps) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm();
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end">
          <Button variant="secondary" onClick={onCancel} customClass="mr-2">
            Cancel
          </Button>
          <Button variant="error" onClick={handleConfirm} loading={loading}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
