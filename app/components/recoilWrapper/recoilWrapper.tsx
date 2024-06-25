'use client'

import { userInfoState } from '@/app/atoms';
import { patchUserInfo } from '@/app/userInfo';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react';
import { RecoilRoot, useSetRecoilState } from 'recoil';


const InitializeUserInfo = () => {
  const setUserInfo = useSetRecoilState(userInfoState);
  const router = useRouter();
  
  useEffect(() => {
    const fetchUserInfo = async () => {
        const userData = await patchUserInfo(router);
        setUserInfo(userData);
    };

    fetchUserInfo();
  }, [setUserInfo]);

  return null;
};

const RecoilWrapper = (props: {children: ReactNode}) => {
  return (
    <RecoilRoot>
      <InitializeUserInfo />
      {props.children}
    </RecoilRoot>
  );
};

export default RecoilWrapper;