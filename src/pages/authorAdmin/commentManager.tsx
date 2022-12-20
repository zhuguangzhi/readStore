import React, { useEffect, useState } from 'react';
import { AdminHeader } from '@/pages/authorAdmin/components/adminHeader';
import { IconFont } from '@/components/IconFont';
import './style/commentManager.less';
import { Button, DatePicker, Form, Select } from 'antd';
import { useGetWorks } from '@/utils/authorAdmin/worksManager';
import { useAuth } from '@/hook/useAuth';
import locale from 'antd/es/date-picker/locale/zh_CN';

const SubIcon = () => (
  <IconFont width={'37px'} height={'44px'} icon={'comment2'} />
);
export default () => {
  // 作者书籍列表
  const [worksList, setWorkList] = useState<
    { key: string | number; label: string }[]
  >([{ key: 0, label: '所有书籍' }]);
  // 获取作者书籍列表
  const { data: worksDataList, isLoading: worksLoading } = useGetWorks({
    page: 1,
    page_size: 9999,
  });
  // const {} = useGetAdminComment({
  //
  // })
  // 获取评论列表
  const { setLoadingModel } = useAuth();

  useEffect(() => {
    setLoadingModel(worksLoading);
  }, [worksLoading]);
  useEffect(() => {
    if (!worksDataList) return;
    let arr = [{ key: 0, label: '所有书籍' }];
    worksDataList.data.forEach((works) => {
      arr.push({
        key: works.id,
        label: works.name,
      });
    });
    setWorkList(arr);
  }, [worksDataList]);

  return (
    <div className={'commentAdmin'}>
      <div style={{ paddingRight: '69px' }}>
        <AdminHeader subTitle={'评论管理'} subIcon={<SubIcon />} />
      </div>
      <div
        className={'admin_container commentAdmin_container'}
        id={'commentAdmin'}
      >
        <Form
          layout={'inline'}
          colon={false}
          initialValues={{ book_id: 0 }}
          className={'commentAdmin_container_form'}
          onFinish={() => {}}
        >
          <Form.Item label={'作品评论'} name={'book_id'}>
            <Select
              getPopupContainer={() =>
                document.getElementById('commentAdmin') as HTMLDivElement
              }
              style={{ width: 180 }}
            >
              {worksList?.map((item) => {
                return (
                  <Select.Option key={item.key} value={item.key}>
                    {item.label}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item label={'日期设置'}>
            <DatePicker.RangePicker
              locale={locale}
              getPopupContainer={() =>
                document.getElementById('commentAdmin') as HTMLDivElement
              }
            />
          </Form.Item>
          <Button type={'primary'} htmlType={'submit'}>
            查询
          </Button>
        </Form>
      </div>
    </div>
  );
};
