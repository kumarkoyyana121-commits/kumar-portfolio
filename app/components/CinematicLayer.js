'use client';
import { useEffect, useRef } from 'react';

export default function CinematicLayer() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let THREE, renderer, scene, camera, particles, animId;
    let mouseX = 0, mouseY = 0;

    const init = async () => {
      THREE = await import('three');

      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;

      // Particles
      const count = 200;
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const sizes = new Float32Array(count);
      const speeds = new Float32Array(count);
      const offsets = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

        // warm orange + white mix
        const isOrange = Math.random() > 0.4;
        colors[i * 3] = isOrange ? 0.98 : 1.0;
        colors[i * 3 + 1] = isOrange ? 0.45 : 0.95;
        colors[i * 3 + 2] = isOrange ? 0.09 : 0.85;

        sizes[i] = Math.random() * 8 + 2;
        speeds[i] = Math.random() * 0.3 + 0.1;
        offsets[i] = Math.random() * Math.PI * 2;
      }

      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const mat = new THREE.PointsMaterial({
        size: 0.08,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      });

      particles = new THREE.Points(geo, mat);
      scene.add(particles);

      // Store speeds/offsets for animation
      particles.userData = { speeds, offsets, positions: positions.slice() };

      const animate = () => {
        animId = requestAnimationFrame(animate);
        const t = Date.now() * 0.001;
        const pos = geo.attributes.position.array;
        const { speeds: sp, offsets: off, positions: orig } = particles.userData;

        for (let i = 0; i < count; i++) {
          pos[i * 3 + 1] = orig[i * 3 + 1] + Math.sin(t * sp[i] + off[i]) * 0.5;
          pos[i * 3] = orig[i * 3] + Math.cos(t * sp[i] * 0.7 + off[i]) * 0.3;
        }
        geo.attributes.position.needsUpdate = true;

        // Mouse parallax
        camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      };
      animate();
    };

    init();

    const handleMouse = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleResize = () => {
      if (!renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouse);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('resize', handleResize);
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  );
}
