import { Suspense } from "react";
import TabDecider from "./TabDecider";
import { QueryClient } from "@tanstack/react-query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getPostRecommends } from "../_lib/getPostRecommends";

export default async function TabDeciderSuspense() {
  const queryClient = new QueryClient();
  //로딩 창을 만들고 싶으면 prefetchInfiniteQuery을 사용하면 안됨
  //왜냐하면 미리 데이터를 가져오기 때문에 로딩 창이 안 보임
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['posts', 'recommends'],
    queryFn: getPostRecommends,
    initialPageParam: 0,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <TabDecider />
    </HydrationBoundary>
  );
}