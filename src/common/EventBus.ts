class EventBus {
  private static busInstance: EventBus = new EventBus();
  protected list: { [key: string]: Function };
  private timer: NodeJS.Timer | null = null; //定时器

  constructor() {
    //  收集订阅信息，调度中心
    this.list = {};
  }

  //单例
  static instance(): EventBus {
    return this.busInstance;
  }

  //订阅
  on(name: string, fn: Function) {
    this.list[name] = fn;
  }

  //  发布
  emit(name: string, data?: unknown) {
    if (!this.list[name] || this.timer) return;
    //节流
    this.timer = setTimeout(() => {
      this.list[name](data);
      clearTimeout(this.timer as NodeJS.Timer);
      this.timer = null;
    }, 300);
  }

  //  取消订阅
  off(name: string) {
    if (!this.list[name]) return;
    delete this.list[name];
  }
}

//返回eventBus实例
export default EventBus.instance();
