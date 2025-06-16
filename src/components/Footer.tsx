import React from "react";
import { Cabin } from 'next/font/google';

const cabin = Cabin({
  subsets: ['latin'],
  display: 'swap',
});

type Props = {};

export default function Footer({}: Props) {
  return (
    <footer className={`bg-[#FE6334] text-[#FEE832] text-center px-4 py-10 space-y-6 ${cabin.className}`}>
      <div className="space-y-2 text-xl md:text-2xl font-semibold">
        <p className="text-2xl font-bold">CÔNG TY CP ĐT TM XNK THÁI HƯNG</p>
        <p>Thửa đất số 10, tờ bản đồ số 19, thôn Bến Hiệp, xã Quỳnh Giao, Quỳnh Phụ, Thái Bình</p>
        <p>Điện thoại: 0909 123 456</p>
        <p>Email: lienhe@tralanh.vn</p>
      </div>

      <div className="flex justify-center gap-8 pt-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <img src="/icons/facebook.svg" alt="Facebook" className="h-10 w-10 hover:opacity-80" />
        </a>
        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
          <img src="/icons/tiktok.svg" alt="TikTok" className="h-10 w-10 hover:opacity-80" />
        </a>
        <a href="https://shopee.vn" target="_blank" rel="noopener noreferrer">
          <img src="/icons/shopee.svg" alt="Shopee" className="h-10 w-10 hover:opacity-80" />
        </a>
      </div>
    </footer>
  );
}
