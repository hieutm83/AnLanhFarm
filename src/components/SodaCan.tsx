"use client";

import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload("/Soda-can.gltf");

const flavorTextures = {
  lemonLime: "/labels/lemon-lime.png",
  grape: "/labels/grape.png",
  blackCherry: "/labels/cherry.png",
  strawberryLemonade: "/labels/strawberry.png",
  watermelon: "/labels/watermelon.png",
};

const metalMaterial = new THREE.MeshStandardMaterial({
  roughness: 0.3,
  metalness: 1,
  color: "#bbbbbb",
});

export type SodaCanProps = {
  flavor?: keyof typeof flavorTextures;
  scale?: number;
};

export function SodaCan({
  flavor = "blackCherry",
  scale = 0.8,
  ...props
}: SodaCanProps) {
  const { nodes } = useGLTF("/Soda-can.gltf");

  const labels = useTexture(flavorTextures);
  
  // Fixes upside down labels
  labels.strawberryLemonade.flipY = false;
  labels.blackCherry.flipY = false;
  labels.watermelon.flipY = false;
  labels.grape.flipY = false;
  labels.lemonLime.flipY = false;

  labels[flavor].minFilter = THREE.LinearFilter;
  labels[flavor].magFilter = THREE.LinearFilter;
  

  const label = labels[flavor];

  return (
    <group {...props} dispose={null} scale={scale} rotation={[0, -Math.PI/ 2, 0]}>
<mesh
  castShadow
  receiveShadow
  geometry={(nodes.can as THREE.Mesh).geometry}
>
<meshStandardMaterial roughness={0.9} metalness={0} map={label} color="#f5f5dc" />
</mesh>
    </group>
  );
}