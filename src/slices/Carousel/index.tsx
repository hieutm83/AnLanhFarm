"use client";

import FloatingCan from "@/components/FloatingCan";
import { SodaCanProps } from "@/components/SodaCan";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Center, Environment, View } from "@react-three/drei";
import { useRef, useState } from "react";
import { ArrowIcon } from "./ArrowIcon";
import clsx from "clsx";
import { WavyCircles } from "./WavyCircles";
import { Group } from "three";
import gsap from "gsap";

const SPINS_ON_CHANGE = 1;

const FLAVORS: {
  flavor: SodaCanProps["flavor"];
  color: string;
  name: string;
  price: string;
}[] = [
  { flavor: "blackCherry", color: "#98E2D7", name: "Trà Thư Dạ", price: "129.000đ" },
  { flavor: "grape", color: "#f2d6d9", name: "Trà Khởi An", price: "129.000đ" },
];

export type CarouselProps = SliceComponentProps<Content.CarouselSlice>;

const Carousel = ({ slice }: CarouselProps): JSX.Element => {
  const [currentFlavorIndex, setCurrentFlavorIndex] = useState(0);
  const sodaCanRef = useRef<Group>(null);

  function changeFlavor(index: number) {
    if (!sodaCanRef.current) return;
    const nextIndex = (index + FLAVORS.length) % FLAVORS.length;

    const tl = gsap.timeline();

    tl.to(
      sodaCanRef.current.rotation,
      {
        y:
          index > currentFlavorIndex
            ? `-=${Math.PI * 2 * SPINS_ON_CHANGE}`
            : `+=${Math.PI * 2 * SPINS_ON_CHANGE}`,
        ease: "power2.inOut",
        duration: 1,
      },
      0,
    )

.to(
  ".wavy-circles-outer, .-wavy-circles-inner",
  {
    color: FLAVORS[nextIndex].color,
    ease: "power2.inOut",
    duration: 1,
  },
  0,
)


      .to(
        ".text-wrapper, .price-text",
        {
          duration: 0.2,
          y: -10,
          opacity: 0,
        },
        0,
      )
      .to({}, { onStart: () => setCurrentFlavorIndex(nextIndex) }, 0.5)
      .to(
        ".text-wrapper, .price-text",
        {
          duration: 0.2,
          y: 0,
          opacity: 1,
        },
        0.7,
      );
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="carousel grid-rows-[auto, 4fr, auto] relative grid h-screen justify-center overflow-hidden bg-white py-12 text-white"
      style={{ fontFamily: "'Baloo', sans-serif" }}
    >
<div
  className="background pointer-events-none absolute inset-0"
  style={{ backgroundColor: "#c0f0f5" }} //
/>
<WavyCircles
  className="wavy-circles-outer absolute left-1/2 top-1/2 h-[120vmin] -translate-x-1/2 -translate-y-1/2 text-[#98E2D7]"
/>


<div className="relative text-center">
  <h2 className="text-6xl font-black text-orange-500">
    Anlanh
  </h2>
  <div className="text-lg font-black text-orange-500">
    Farm
  </div>
</div>


      <div className="grid grid-cols-[auto,auto,auto] items-center">
        <ArrowButton
          onClick={() => changeFlavor(currentFlavorIndex - 1)}
          direction="left"
          label="Vị trước"
        />

        <View className="aspect-square h-[70vmin] min-h-40">
          <Center position={[0, 0, 1.5]}>
            <FloatingCan
              floatIntensity={0.3}
              rotationIntensity={1}
              flavor={FLAVORS[currentFlavorIndex].flavor}
              ref={sodaCanRef}
            />
          </Center>
          <Environment
            files="/hdr/lobby.hdr"
            environmentIntensity={0.6}
            environmentRotation={[0, 3, 0]}
          />
          <directionalLight intensity={6} position={[0, 1, 1]} />
        </View>

        <ArrowButton
          onClick={() => changeFlavor(currentFlavorIndex + 1)}
          direction="right"
          label="Vị tiếp theo"
        />
      </div>
<div className="text-area relative mx-auto text-center">
  <h2
  className="text-wrapper text-2xl font-bold text-orange-600"
    style={{
    }}
  >
    {FLAVORS[currentFlavorIndex].name}
  </h2>
<div
  className="price-text mt-1 text-lg font-bold text-orange-600"
  style={{
  }}
>
  Giá: {FLAVORS[currentFlavorIndex].price}
</div>

</div>



    </section>
  );
};

type ArrowButtonProps = {
  direction?: "right" | "left";
  label: string;
  onClick: () => void;
};

function ArrowButton({ label, direction = "right", onClick }: ArrowButtonProps) {
  return (
    <button
      onClick={onClick}
      className="size-12 rounded-full border-2 border-white bg-white/10 p-3 opacity-85 ring-white focus:outline-none focus-visible:opacity-100 focus-visible:ring-4 md:size-16 lg:size-20"
    >
      <ArrowIcon className={clsx(direction === "right" && "-scale-x-100")} />
      <span className="sr-only">{label}</span>
    </button>
  );
}

export default Carousel;