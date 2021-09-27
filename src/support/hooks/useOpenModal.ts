import React, { useState } from 'react';

export default function useOpenModal(modalName = '') {
  const [openModalName, setModalName] = useState(modalName);

  const setModalWithType = (e: React.ChangeEvent<HTMLElement | HTMLDivElement>) => {
    const type = e.currentTarget.dataset.type || '';
    setModalName(type);
  };

  const setModal = (modalName: string) => {
    setModalName(modalName);
  };

  const onCloseModal = () => setModalName('');

  return {
    openModalName,
    setModalWithType,
    setModal,
    onCloseModal
  };
}
