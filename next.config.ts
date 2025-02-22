import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', //회원가입을 이미지 업로드 할때 사이즈 제한 기본은 1mb임 그래서 10mb로 제한 설정 이상이 되면 에러 발생
    },
  },
  async rewrites() {
    return [
      {
        source: '/upload/:slug',
        destination: `${process.env.NEXT_PUBLIC_BASE_URL}/upload/:slug`, // Matched parameters can be used in the destination
      },
    ];
  },
};

export default nextConfig;
