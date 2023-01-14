import React from 'react';
import { Modal, ModalProps } from 'antd';
import './style/modal.less';

interface ReadModelProps extends ModalProps {
  useTitle: boolean;
  children: React.ReactElement;
}
export const ReadModel = ({
  useTitle,
  closable = true,
  ...props
}: ReadModelProps) => {
  return (
    <Modal
      className={'readModal'}
      closable={closable}
      {...props}
      title={useTitle ? props.title : ''}
    />
  );
};
