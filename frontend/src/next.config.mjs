/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost', pathname: '/api/proxy/media/**' },
      { protocol: 'http', hostname: 'localhost', pathname: '/solarina/media/**' }, 
      { protocol: 'http', hostname: 'nginx', pathname: '/solarina/media/**' },
      { protocol: 'http', hostname: 'solarina.ir', pathname: '/solarina/media/**' },
      { protocol: 'https', hostname: 'solarina.ir', pathname: '/solarina/media/**' },
      { protocol: 'http', hostname: 'easytg.ir', pathname: '/solarina/media/**' },
      { protocol: 'https', hostname: 'easytg.ir', pathname: '/solarina/media/**' },
      { protocol: 'http', hostname: '185.204.168.255', pathname: '/solarina/media/**' },
      { protocol: 'http', hostname: '103.130.147.37', pathname: '/solarina/media/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '**' },
      { protocol: 'https', hostname: 'tailwindcss.com', pathname: '**' },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
