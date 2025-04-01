// 声明所有模块
declare module 'next/link';
declare module 'lucide-react';
declare module '@/components/Logo';
declare module '@/components/HomeTeleprompter';
declare module '@/components/ui/button';

// 添加JSX命名空间
declare namespace JSX {
  interface IntrinsicElements {
    // HTML元素
    div: any;
    nav: any;
    a: any;
    button: any;
    svg: any;
    path: any;
    h1: any;
    h2: any;
    h3: any;
    p: any;
    ul: any;
    li: any;
    span: any;
    footer: any;
  }
} 