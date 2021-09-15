import * as React from 'react';

export const useModal = (defaultOpen: boolean) => {
  const [visible, setVisible] = React.useState(defaultOpen);

  const showModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  return {
    showModal,
    closeModal,
    visible,
    setVisible,
  };
};
