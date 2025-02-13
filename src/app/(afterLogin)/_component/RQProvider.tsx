'use client';

import React, { useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type Props = {
  children: React.ReactNode;
};

function RQProvider({ children }: Props) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        // react-query 전역 설정
        queries: {
          refetchOnWindowFocus: false, //다른탭 갔다가 탭 전환하고 다시 돌 아올 경우 데이터를 새로 가지고온다
          retryOnMount: true, // 컴포넌트가 언마운트 되었다가 다시 마운트 되었을 때 데이터를 새로 가지고온다
          refetchOnReconnect: false, // 네트워크 재연결 시 데이터를 새로 가지고온다
          retry: false, // 데이터를 가지고오는데 실패했을 때 재시도 횟수
        },
      },
    }),
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools
        initialIsOpen={process.env.NEXT_PUBLIC_MODE === 'local'}
      />
    </QueryClientProvider>
  );
}

export default RQProvider;
