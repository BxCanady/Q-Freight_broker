"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import * as THREE from "three";

export default function CoinLogo() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fallbackRef = useRef<HTMLImageElement | null>(null);
  const flipRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const fallbackImage = fallbackRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      return;
    }

    let disposed = false;
    let frameId = 0;
    let isFlipping = false;
    let flipStart = 0;
    let flipEnd = 0;
    let flipStartedAt = 0;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;pointer-events:none";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
    camera.position.set(0, 0, 4.2);

    scene.add(new THREE.AmbientLight(0xffffff, 1.5));
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(-3, 4, 5);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0xe9652d, 18, 8);
    rimLight.position.set(2, -1, 3);
    scene.add(rimLight);

    const coin = new THREE.Group();
    coin.scale.set(0.92, 1, 1);
    scene.add(coin);

    const edgeMaterial = new THREE.MeshStandardMaterial({
      color: 0xb85a27,
      metalness: 0.88,
      roughness: 0.25,
    });
    const capMaterial = new THREE.MeshStandardMaterial({
      color: 0xd5d8dc,
      metalness: 0.78,
      roughness: 0.32,
    });
    const bodyGeometry = new THREE.CylinderGeometry(1, 1, 0.13, 96);
    const body = new THREE.Mesh(bodyGeometry, [
      edgeMaterial,
      capMaterial,
      capMaterial,
    ]);
    body.rotation.x = Math.PI / 2;
    coin.add(body);

    const faceGeometry = new THREE.CircleGeometry(0.94, 96);
    const frontMaterial = new THREE.MeshBasicMaterial({
      transparent: true,
      side: THREE.DoubleSide,
      toneMapped: false,
    });
    const backMaterial = frontMaterial.clone();
    const frontFace = new THREE.Mesh(faceGeometry, frontMaterial);
    frontFace.position.z = 0.067;
    const backFace = new THREE.Mesh(faceGeometry, backMaterial);
    backFace.position.z = -0.067;
    backFace.rotation.y = Math.PI;
    coin.add(frontFace, backFace);

    const logoTexture = new THREE.TextureLoader().load(
      "/logo-coin.png",
      (texture) => {
        if (disposed) {
          texture.dispose();
          return;
        }
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        frontMaterial.map = texture;
        backMaterial.map = texture;
        frontMaterial.needsUpdate = true;
        backMaterial.needsUpdate = true;
        renderer.render(scene, camera);
      },
    );
    logoTexture.colorSpace = THREE.SRGBColorSpace;

    const renderFrame = (time: number) => {
      frameId = 0;
      if (disposed) return;

      if (isFlipping) {
        const progress = Math.min((time - flipStartedAt) / 900, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        coin.rotation.y = flipStart + (flipEnd - flipStart) * easedProgress;
        isFlipping = progress < 1;
      }

      renderer.render(scene, camera);
      if (isFlipping) frameId = requestAnimationFrame(renderFrame);
    };

    const flip = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }
      flipStart = coin.rotation.y;
      flipEnd = flipStart + Math.PI * 3;
      flipStartedAt = performance.now();
      isFlipping = true;
      if (!frameId) frameId = requestAnimationFrame(renderFrame);
    };
    flipRef.current = flip;
    const homeLink = container.closest("a");
    homeLink?.addEventListener("focus", flip);

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      if (!isFlipping) renderer.render(scene, camera);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    if (fallbackImage) fallbackImage.style.opacity = "0";
    flip();

    return () => {
      disposed = true;
      flipRef.current = null;
      homeLink?.removeEventListener("focus", flip);
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      bodyGeometry.dispose();
      faceGeometry.dispose();
      edgeMaterial.dispose();
      capMaterial.dispose();
      frontMaterial.dispose();
      backMaterial.dispose();
      logoTexture.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      if (fallbackImage) fallbackImage.style.opacity = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-16 w-16 flex-shrink-0 drop-shadow-[0_8px_12px_rgba(204,85,0,0.4)] sm:h-20 sm:w-20 md:h-[5.5rem] md:w-[5.75rem]"
      aria-hidden="true"
      onPointerEnter={() => flipRef.current?.()}
    >
      <Image
        ref={fallbackRef}
        src="/logo-coin.png"
        alt=""
        width={330}
        height={360}
        className="absolute inset-0 h-full w-full object-contain transition-opacity"
      />
    </div>
  );
}
