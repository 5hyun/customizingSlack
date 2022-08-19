import React, { CSSProperties, FC, useCallback } from 'react';
import { CreateModal } from '@components/Menu/styles';

interface Props {
  show: boolean;
  onCloseModal: (e: any) => void;
  style?: CSSProperties;
  closeButton?: boolean;
  children: any;
}

const Menu: FC<Props> = ({ children, show, onCloseModal, closeButton }) => {
  const stopPropagation = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  if (!show) return null;

  return (
    <div>
      <CreateModal onClick={onCloseModal}>
        <div onClick={stopPropagation}>{children}</div>
      </CreateModal>
    </div>
  );
};

Menu.defaultProps = {
  closeButton: true,
};

export default Menu;
