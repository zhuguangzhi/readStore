import React from 'react';
import { Modal, ModalProps } from 'antd';
import './style/modal.less';

interface ReadModelProps extends ModalProps {
  useTitle: boolean;
  children: React.ReactElement;
}
export const ReadModel = ({ useTitle, ...props }: ReadModelProps) => {
  return (
    <Modal
      className={'readModal'}
      closable={false}
      {...props}
      title={useTitle ? props.title : ''}
    />
  );
};
