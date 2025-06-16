"use client";

import { Bounded } from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { View } from "@react-three/drei";
import Scene from "./Scene";
import clsx from "clsx";
import { Cabin } from 'next/font/google';

const cabin = Cabin({
  subsets: ['latin'],
  display: 'swap',
});

export type AlternatingTextProps = SliceComponentProps<Content.AlternatingTextSlice>;

const AlternatingText = ({ slice }: AlternatingTextProps): JSX.Element => {
  const customTextData = [
    {
      heading: "Tỉnh táo dịu dàng, không cần cà phê",
      body: "Không cần đến cốc cà phê nặng bụng, chỉ một ly trà là đủ đánh thức tinh thần. Vị mát từ thảo mộc thiên nhiên giúp bạn tỉnh táo tự nhiên, không mất nước, không lo cồn ruột.",
      background: "/bg1.png"
    },
    {
      heading: "Thả lỏng cơ thể, cân bằng bên trong",
      body: "Mỗi ngụm trà là một khoảng dừng êm dịu giữa guồng quay bận rộn. Công thức phối thảo mộc giúp làm mát gan, hỗ trợ tiêu hóa, và đưa bạn trở về trạng thái thư thái tự nhiên.",
      background: "/bg2.png"
    },
    {
      heading: "Uống trà – để cơ thể được thở",
      body: "Hương vị nhẹ nhàng từ trà xanh, sài hồ, thảo quyết minh và bạc hà giúp thanh lọc từ bên trong, tạo cảm giác thoáng bụng, đầu óc nhẹ tênh. Tốt cho gan, tốt cho tâm trí.",
      background: "/bg3.png"
    }
  ];

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`alternating-text-container relative text-sky-950 ${cabin.className}`}
    >
      <div>
        <div className="relative z-[100] grid">
          <View className="alternating-text-view absolute left-0 top-0 h-screen w-full">
            <Scene />
          </View>

          {customTextData.map((item, index) => (
            <div
              key={index}
              className="alternating-section grid h-screen place-items-center gap-x-12 md:grid-cols-2"
            >
              <div
                className={clsx(
                  index % 2 === 0 ? "col-start-1" : "md:col-start-2",
                  "relative p-8 max-w-xl text-white overflow-visible"
                )}
              >
                {/* Lớp glass container */}
                <div className="absolute inset-0 flex items-center justify-center z-0">
                  {/* Background image (không blur) */}
                  <div 
                    className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-80 rounded-3xl"
                    style={{ backgroundImage: `url(${item.background})` }}
                  />
                  
                  {/* Hiệu ứng glass iOS tinh tế */}
                  <div className="absolute inset-0 rounded-3xl overflow-hidden
                    bg-white/5 backdrop-blur-[2px] border border-white/20
                    shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.15)]
                    before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15)_0%,transparent_70%)]
                    after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(135deg,rgba(255,255,255,0.1)_0%,transparent_50%)]">
                  </div>
                </div>

                {/* Nội dung text */}

<div className="relative z-20 p-8 rounded-2xl backdrop-blur-sm shadow-lg">
  <h2
    className="text-5xl font-extrabold mb-6 text-orange-600"
    style={{
      textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)',
    }}
  >
    {item.heading}
  </h2>

  <p
    className="text-xl text-orange-400 font-medium"
    style={{
      textShadow: '1.5px 1.5px 4px rgba(0, 0, 0, 0.7)',
    }}
  >
    {item.body}
  </p>
</div>




              </div>
            </div>
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default AlternatingText;