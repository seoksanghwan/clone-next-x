'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { getFollowingPosts } from '@/app/(afterLogin)/home/_lib/getFollowingPosts';
import Post from '@/app/(afterLogin)/_component/Post';
import { Post as IPost } from '@/model/Post';

export default function FollowingPosts() {
  /*
  isPending, isLoading을 이용하여 로딩 창을 만들 수 있으나,
  useSuspenseQuery를 이용하여 로딩 창을 만들 수 있음
  useSuspenseQuery를 사용하면 컴포넌트에 설정한 Suspense를 인식해서 로딩 창을 보여줌,
  탭을 이용한 페이지로 인해서 로딩컴포넌트를 중복을 사용하는 것보다, 효율적임
  */
  const { data } = useSuspenseQuery<IPost[]>({
    queryKey: ['posts', 'followings'],
    queryFn: getFollowingPosts,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });

  return data?.map((post) => <Post key={post.postId} post={post} />);
}
