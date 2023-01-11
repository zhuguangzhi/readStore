// 合同申请
import {
  signProcessProps,
  worksListProps,
} from '@/type/authorAdmin/worksManager';
import { QueryClient, useMutation, useQueryClient } from 'react-query';
import { AuthorContract, ErrorCheck } from '@/common/api';
import { message } from 'antd';

const queryKey = ['getWorks'];
// 申请签约
export const useApplySign = () => {
  const queryClient = useQueryClient();
  let param: signProcessProps;
  return useMutation(
    ['applySign'],
    (p: signProcessProps) => {
      param = p;
      return AuthorContract.signApply(p);
    },
    {
      onSuccess(val) {
        if (!ErrorCheck(val)) return;
        // 变为签约中
        setSignMutateStatus(2, param, queryClient);
        message.success('提交成功');
      },
    },
  );
};
// 申请签约下一步
export const useSignStep = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ['signStep'],
    (p: signProcessProps) => AuthorContract.signApplyStep(p),
    // (p:signProcessProps)=>AuthorPersonal.getPersonalInfo(),
    {
      onSuccess(val) {
        ErrorCheck(val);
      },
      onMutate(target) {
        setSignMutateStatus(1, target, queryClient);
      },
    },
  );
};
// 申请信息审核
export const useAuthorInfoAudit = () => {
  const queryClient = useQueryClient();
  let param: signProcessProps;
  return useMutation(
    ['authorInfoAudit'],
    (p: signProcessProps) => {
      param = p;
      return AuthorContract.authorInfoAudit(p);
    },
    {
      onSuccess(val) {
        if (!ErrorCheck(val)) return;
        // 变为签约中
        setSignMutateStatus(2, param, queryClient);
        message.success('提交成功');
      },
    },
  );
};
// 信息审核下一步
export const useAuditInfoStep = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ['auditInfoStep'],
    (p: signProcessProps) => AuthorContract.authorInfoStep(p),
    // (p:signProcessProps)=>AuthorPersonal.getPersonalInfo(),
    {
      onSuccess(val) {
        ErrorCheck(val);
      },
      onMutate(target) {
        // 合同签署初始状态为5
        setSignMutateStatus(5, target, queryClient);
      },
    },
  );
};
// 申请合同
export const useApplyContract = () => {
  const queryClient = useQueryClient();
  let param: signProcessProps;
  return useMutation(
    ['contractApply'],
    (p: signProcessProps) => {
      param = p;
      return AuthorContract.contractApply(p);
    },
    {
      onSuccess(val) {
        if (!ErrorCheck(val)) return;
        // 变为签署中
        setSignMutateStatus(6, param, queryClient);
        message.success('提交成功');
      },
    },
  );
};

// // 修改作品的签约流程
// const setSignMutate = (flow:2|3,target:signProcessProps,queryClient:QueryClient)=>{
//     queryClient.setQueriesData(queryKey,(old?:worksListProps)=>{
//         if (!old) return {} as worksListProps
//         const data = old.data.map((item)=>{
//             if (item.id===target.book_id) item.signing_flow.flow = flow
//             return item
//         })
//         return  {
//             ...old,data
//         }
//     })
// }
// 修改作品的签约流程状态
const setSignMutateStatus = (
  status: 1 | 2 | 3 | 4 | 5 | 6 | 7,
  target: signProcessProps,
  queryClient: QueryClient,
) => {
  queryClient.setQueriesData(queryKey, (old?: worksListProps) => {
    if (!old) return {} as worksListProps;
    const data = old.data.map((item) => {
      if (item.id === target.book_id) item.signing_flow.flow_status = status;
      return item;
    });
    return {
      ...old,
      data,
    };
  });
};
