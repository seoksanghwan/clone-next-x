'use client';

import { useQuery } from '@tanstack/react-query';
import { getPostRecommends } from '@/app/(afterLogin)/home/_lib/getPostRecommends';
import Post from '@/app/(afterLogin)/_component/Post';
import { Post as IPost } from '@/model/Post';

export default function PostRecommends() {
  const { data } = useQuery<IPost[]>({
    queryKey: ['posts', 'recommends'],
    queryFn: getPostRecommends,
    staleTime: 60000, // 기본적으로는 0초로 설정되어있음
    gcTime: 60000, // 기본적으로는 5분로 설정되어있음 garbage collection 시간
  });
  //항상 staleTime은 gcTime보다 짧아야함
  //gcTime은 데이터가 캐시에 남아있는 시간

  return data?.map((post) => <Post key={post.postId} post={post} />);
}
