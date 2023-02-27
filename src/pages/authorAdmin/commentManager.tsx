import React, { useEffect, useMemo, useState } from 'react';
import { AdminHeader } from '@/pages/authorAdmin/components/adminHeader';
import { IconFont } from '@/components/IconFont';
import './style/commentManager.less';
import { Button, DatePicker, Form, Select } from 'antd';
import { useGetWorks } from '@/utils/authorAdmin/worksManager';
import { useAuth } from '@/hook/useAuth';
// import locale from 'antd/es/date-picker/locale/zh_CN';
import { useGetAdminComment } from '@/utils/authorAdmin/commentManager';
import moment from 'moment';
import { Values } from 'async-validator';
import { commentProps } from '@/type/book';
import { DefaultNoData } from '@/components/defaultNoData';
import { ReadPagination } from '@/components/module/ReadPagination';
import { UseNode } from '@/components/UseNode';
import { useReply } from '@/utils/read';
import { stopProp } from '@/common/publicFn';

const SubIcon = () => (
  <IconFont width={'37px'} height={'44px'} icon={'comment2'} />
);
export default () => {
  // 日期格式
  const dateFormat = 'YYYY-MM-DD';
  // 作者书籍列表
  const [worksList, setWorkList] = useState<
    { key: string | number; label: string }[]
  >([{ key: 0, label: '所有作品' }]);
  //选中的书籍key
  const [selectBookKey, setSelect] = useState(0);
  const [page, setPage] = useState(1);
  // 当前回复的评论id
  const [replyCommentId, setReply] = useState<number | null>(null);
  //是否空
  const [noData, setNoData] = useState(false);
  // 获取默认时间，本月第一天和最后一天
  const getTime = useMemo(() => {
    const now = new Date(); // 当前日期
    const nowYear = now.getFullYear(); //当前年
    const nowMonth = now.getMonth(); //当前月 （值为0~11）
    const firstDay = new Date(nowYear, nowMonth, 1); // 本月开始时间
    const LastDay = new Date(nowYear, nowMonth + 1, 0); // 本月结束时间
    return [moment(firstDay, dateFormat), moment(LastDay, dateFormat)];
  }, []);
  // 时间存储
  const [savaDate, setSaveDate] = useState({
    startData: getTime[0].format(dateFormat),
    endData: getTime[1].format(dateFormat),
  });
  // 获取作者书籍列表
  const { data: worksDataList, isLoading: worksLoading } = useGetWorks({
    page: 1,
    page_size: 9999,
  });
  // 获取评论列表
  const { data: commentData, isLoading: commentLoading } = useGetAdminComment({
    book_id: selectBookKey,
    end_date: savaDate.endData,
    start_date: savaDate.startData,
    page_size: 10,
    page: page,
  });
  const { setLoadingModel } = useAuth();
  // 回复
  const { mutate: replyComment } = useReply();
  // 查询评论
  const searchComment = (value: Values) => {
    setSelect(value.book_id);
    setSaveDate({
      startData: value.date[0].format(dateFormat),
      endData: value.date[1].format(dateFormat),
    });
  };

  //发送评论
  const sendReply = (value: Values, commentInfo: commentProps) => {
    replyComment({
      book_id: commentInfo.book_id,
      comment_id: replyCommentId as number,
      content: value.content,
    });
  };

  useEffect(() => {
    setLoadingModel(worksLoading || commentLoading);
  }, [worksLoading, commentLoading]);
  useEffect(() => {
    if (!worksDataList) return;
    let arr = [{ key: 0, label: '所有作品' }];
    worksDataList.data.forEach((works) => {
      arr.push({
        key: works.id,
        label: works.name,
      });
    });
    setWorkList(arr);
  }, [worksDataList]);
  useEffect(() => {
    if (!commentData || commentLoading) return;
    if (commentData.data.length === 0) setNoData(true);
    else setNoData(false);
  }, [commentData, commentLoading]);

  const CommentItem = ({ item }: { item: commentProps }) => {
    return (
      <div
        className="commentAdmin_box_item"
        onClick={(e) => stopProp(e, () => {})}
      >
        <img
          className={'commentAdmin_box_item_img'}
          src={item.user_image_url}
          alt=""
        />
        <div className="commentAdmin_box_item_info">
          <div className={'justify_between'}>
            {/*用户名*/}
            <p className={'font_16 font_bold'}>{item.user_nickname}</p>
            {/*  回复*/}
            <p
              className={'commentAdmin_box_item_info_msg cursor'}
              onClick={() => setReply(item.id)}
            >
              回复
            </p>
          </div>
          <div>
            <span className={'commentAdmin_box_item_info_msg'}>
              #{item.book_title} &nbsp;&nbsp;&nbsp;
            </span>
            <span>{item.content}</span>
          </div>
          <p className={'commentAdmin_box_item_info_time'}>
            {item.create_time}
          </p>
        </div>
        <UseNode rIf={replyCommentId === item.id}>
          {/*   评论框*/}
          <Form
            className={'commentAdmin_box_item_reply'}
            onFinish={(value) => sendReply(value, item)}
          >
            <Form.Item name={'content'}>
              <textarea
                className={'commentAdmin_box_item_reply_input'}
                placeholder={'说点什么吧~'}
              />
            </Form.Item>
            <button
              className={'commentAdmin_box_item_reply_btn'}
              type={'submit'}
            >
              发送
            </button>
          </Form>
        </UseNode>
      </div>
    );
  };

  return (
    <div className={'commentAdmin'}>
      <div style={{ paddingRight: '69px' }}>
        <AdminHeader subTitle={'评论管理'} subIcon={<SubIcon />} />
      </div>
      <div
        className={'admin_container commentAdmin_container'}
        id={'commentAdmin'}
        onClick={() => setReply(null)}
      >
        <Form
          layout={'inline'}
          colon={false}
          initialValues={{ book_id: 0, date: getTime }}
          className={'commentAdmin_container_form'}
          onFinish={searchComment}
        >
          <Form.Item label={'作品评论'} name={'book_id'}>
            <Select
              // getPopupContainer={() =>
              //   document.getElementById('commentAdmin') as HTMLDivElement
              // }
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
          <Form.Item label={'日期设置'} name={'date'}>
            <DatePicker.RangePicker
              inputReadOnly={true}
              format={dateFormat}
              // getPopupContainer={() =>
              //   document.getElementById('commentAdmin') as HTMLDivElement
              // }
              onChange={() => setPage(1)}
            />
          </Form.Item>
          <Button type={'primary'} htmlType={'submit'}>
            查询
          </Button>
        </Form>
        {noData ? (
          <DefaultNoData
            type={'authorNoData'}
            text={'暂无评论'}
            className={'authorNoData'}
          />
        ) : (
          <div className={'commentAdmin_box'}>
            {commentData?.data.map((comment) => {
              return <CommentItem item={comment} key={comment.id} />;
            })}
            <ReadPagination
              current={page}
              pageSize={10}
              hideOnSinglePage={true}
              total={commentData?.page_info.total || 0}
              onChange={(val) => setPage(val)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
