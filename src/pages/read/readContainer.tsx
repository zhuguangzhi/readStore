import React from 'react';

type ReadContainerProps = {
  container: string;
};
export const ReadContainer = ({ container }: ReadContainerProps) => {
  return <p dangerouslySetInnerHTML={{ __html: container }}></p>;
};
