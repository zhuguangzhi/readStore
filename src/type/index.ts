import { ChangeEvent } from 'react';

//输入框onChange返回类型
export type inputEvent = ChangeEvent<HTMLInputElement>;

//作者签约类型
export type contractType = 'minimum' | 'buyout' | 'hierarchy';
