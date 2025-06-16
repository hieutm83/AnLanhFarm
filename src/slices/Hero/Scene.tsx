"use client";

import { Environment } from "@react-three/drei";
import FloatingCan from "@/components/FloatingCan";
import { useRef } from "react";
import { Group, Vector3 } from "three";
import ScrollTrigger from "gsap/ScrollTrigger";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useStore } from "@/hooks/useStore";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {};

export default function Scene({}: Props) {
  const isReady = useStore((state) => state.isReady);

  const can1ref = useRef<Group>(null);
  const can2ref = useRef<Group>(null);

  const can1GroupRef = useRef<Group>(null);
  const can2GroupRef = useRef<Group>(null);

  const groupRef = useRef<Group>(null);

  const FLOAT_SPEED = 1.5;

  useGSAP(() => {
    if (
      !can1ref.current ||
      !can2ref.current ||
      !can1GroupRef.current ||
      !can2GroupRef.current ||
      !groupRef.current
    )
      return;

    isReady();

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    const can1InitialPos = isMobile ? { x: -0.3, y: 0.5, z: -0.8 } : { x: -1.5, y: 0, z: 0 };
    const can2InitialPos = isMobile ? { x: 0.3, y: -0.5, z: 0.2 } : { x: 1.5, y: 0, z: 0 };
    const can1ScrollPos = isMobile ? { x: -1, y: -0.6, z: -0.2 } : { x: -0.2, y: -0.7, z: -2 };
    const can2ScrollPos = isMobile ? { x: -0.8, y: 0.4, z: -0.6 } : { x: 1, y: -0.2, z: -1 };
    const canScale = isMobile ? 0.7 : 1;

    // Set initial state
    gsap.set(can1ref.current.position, can1InitialPos);
    gsap.set(can1ref.current.rotation, { z: -0.5 });
    gsap.set(can1ref.current.scale, { x: canScale, y: canScale, z: canScale });

    gsap.set(can2ref.current.position, can2InitialPos);
    gsap.set(can2ref.current.rotation, { z: 0.5 });
    gsap.set(can2ref.current.scale, { x: canScale, y: canScale, z: canScale });

    // Intro animation
    const introTl = gsap.timeline({
      defaults: {
        duration: 3,
        ease: "back.out(1.4)",
      },
    });

    if (window.scrollY < 20) {
      introTl
        .from(can1GroupRef.current.position, { y: -5, x: 1 }, 0)
        .from(can1GroupRef.current.rotation, { z: 3 }, 0)
        .from(can2GroupRef.current.position, { y: 5, x: 1 }, 0)
        .from(can2GroupRef.current.rotation, { z: 3 }, 0);
    }

    // Scroll animation
    const scrollTl = gsap.timeline({
      defaults: { duration: 2 },
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    scrollTl
      .to(groupRef.current.rotation, { y: Math.PI * 2 })
      .to(can1ref.current.position, can1ScrollPos, 0)
      .to(can1ref.current.rotation, { z: 0.3 }, 0)
      .to(can2ref.current.position, can2ScrollPos, 0)
      .to(can2ref.current.rotation, { z: 0 }, 0)
      .to(
        groupRef.current.position,
        {
          x: 1,
          duration: 3,
          ease: "sine.inOut",
        },
        1.3
      );
  });

  return (
    <group ref={groupRef}>
      <group ref={can1GroupRef}>
        <FloatingCan
          ref={can1ref}
          flavor="blackCherry"
          floatSpeed={FLOAT_SPEED}
        />
      </group>

      <group ref={can2GroupRef}>
        <FloatingCan
          ref={can2ref}
          flavor="grape"
          floatSpeed={FLOAT_SPEED}
        />
      </group>

      <Environment files="/hdr/lobby.hdr" environmentIntensity={1.5} />
    </group>
  );
}
