import React, { Fragment, ReactElement, useCallback } from 'react';
import { UseNode } from '@/components/UseNode';
import { IconFont } from '@/components/IconFont';
import { numberToSerial } from '@/utils/format';
import './style/step.less';

export type stepItemsProps = {
  label: string;
  stepElement: ReactElement;
};
type ReadStepProps = {
  stepItems: stepItemsProps[];
  currentStep: number; //当前步骤
};
export const ReadStep = ({ stepItems, currentStep }: ReadStepProps) => {
  const computedColor = useCallback(
    (index: number) => {
      //当前步骤
      if (currentStep - 1 === index) return '#6C91F0';
      //    已完成步骤
      else if (currentStep - 1 > index) return '#3ADB8D';
    },
    [currentStep],
  );

  return (
    <div className={'step setFormLess'}>
      <div className={'step_tab'}>
        {stepItems.map((step, index) => {
          return (
            <Fragment key={index}>
              <span
                className={'step_tab_title'}
                style={{ color: computedColor(index) }}
              >
                <span className={'step_tab_title_serial'}>
                  {numberToSerial(index + 1)}
                </span>{' '}
                {step.label}
              </span>
              <UseNode rIf={index !== stepItems.length - 1}>
                <i>
                  <IconFont
                    width={'13px'}
                    height={'13px'}
                    color={'#C8CBD2'}
                    icon={'right'}
                  />
                </i>
              </UseNode>
            </Fragment>
          );
        })}
      </div>
      {stepItems[currentStep - 1].stepElement}
    </div>
  );
};
