// hooks/useNotification.ts
import { useState } from 'react';

export const useNotification = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | ''>('');
  const [onConfirmCallback, setOnConfirmCallback] = useState<() => void | null>(
    () => null,
  );

  const [modalMessage, setModalMessage] = useState('');

  const openModal = (message: string, confirmCallback: () => void) => {
    setModalMessage(message);
    setOnConfirmCallback(() => confirmCallback);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const confirmAction = () => {
    if (onConfirmCallback) onConfirmCallback();
    closeModal();
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
  };

  const closeToast = () => {
    setToastMessage('');
    setToastType('');
  };

  return {
    isModalOpen,
    toastMessage,
    toastType,
    openModal,
    closeModal,
    confirmAction,
    showToast,
    closeToast,
    modalMessage,
  };
};
