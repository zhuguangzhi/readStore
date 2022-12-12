// 删除 确认弹窗
import { CheckboxChangeEvent } from 'antd/es/checkbox';

type popupProps = {
  ids: number[];
  title: string;
  open: boolean;
};

export class DelPopup<T extends popupProps> {
  state: T;
  setState: (arg: popupProps) => void;

  constructor(_state: T, _setState: (arg: popupProps) => void) {
    this.state = _state;
    this.setState = _setState;
  }
  //改变多选框
  onChangeCheckBox = (value: CheckboxChangeEvent, id: number) => {
    let arr = [...this.state.ids];
    if (value.target.checked) arr.push(id);
    else arr.splice(arr.indexOf(id), 1);
    this.setState({ ...this.state, ids: arr });
  };

  //删除按钮点击
  onDelChange = (title?: string, id?: number) => {
    this.setState({
      ids: id ? [id] : [...this.state.ids],
      title: title || '',
      open: true,
    });
  };

  //   初始化
  clearPopup = () => {
    this.setState({
      title: '',
      ids: [],
      open: false,
    });
  };
}
