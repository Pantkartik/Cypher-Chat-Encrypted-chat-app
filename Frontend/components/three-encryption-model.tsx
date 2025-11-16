'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeEncryptionModel() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Detect dark mode
    const isDarkMode = document.documentElement.classList.contains('dark');

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(isDarkMode ? 0x111b21 : 0xe5ddd5, 0.1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    mountRef.current.appendChild(renderer.domElement);

    // Colors matching the website theme
    const colors = {
      primary: 0x25d366,      // WhatsApp green
      secondary: 0x0088cc,    // Signal blue
      accent: 0x34b7f1,       // WhatsApp accent blue
      background: 0xe5ddd5,   // Light background
      muted: 0xf0f0f0,       // Muted/received bubble
      darkBackground: 0x111b21, // Dark background
      darkCard: 0x222e35,     // Dark message bubble
      darkMuted: 0x2a3942     // Dark muted bubble
    };

    // Create floating encryption elements
    const elements: THREE.Mesh[] = [];
    const geometries = [
      new THREE.BoxGeometry(0.3, 0.3, 0.3),
      new THREE.SphereGeometry(0.2, 8, 8),
      new THREE.OctahedronGeometry(0.25),
      new THREE.TetrahedronGeometry(0.3)
    ];

    for (let i = 0; i < 20; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshPhongMaterial({
        color: i % 3 === 0 ? colors.primary : i % 3 === 1 ? colors.secondary : colors.accent,
        transparent: true,
        opacity: 0.4 + Math.random() * 0.3,
        emissive: i % 3 === 0 ? colors.primary : i % 3 === 1 ? colors.secondary : colors.accent,
        emissiveIntensity: 0.2 + Math.random() * 0.3,
        shininess: 100
      });
      
      const element = new THREE.Mesh(geometry, material);
      element.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15
      );
      element.rotation.set(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2);
      
      // Add floating animation data
      element.userData = {
        floatSpeed: 0.5 + Math.random() * 0.5,
        floatAmplitude: 1 + Math.random() * 2,
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02
        },
        initialY: element.position.y
      };
      
      scene.add(element);
      elements.push(element);
    }

    // Create central encryption sphere
    const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: colors.primary,
      transparent: true,
      opacity: 0.3,
      wireframe: true,
      emissive: colors.primary,
      emissiveIntensity: 0.1
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);



    // Create particle system for encryption effect
    const particleCount = 300;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors_array = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
      
      const color = isDarkMode ? 
        new THREE.Color(colors.primary).lerp(new THREE.Color(colors.accent), Math.random()) :
        new THREE.Color(colors.secondary).lerp(new THREE.Color(colors.primary), Math.random());
      colors_array[i * 3] = color.r;
      colors_array[i * 3 + 1] = color.g;
      colors_array[i * 3 + 2] = color.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors_array, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Theme-based colored lights
    const pointLight1 = new THREE.PointLight(isDarkMode ? 0x25d366 : 0x0088cc, 1.2, 25);
    pointLight1.position.set(-8, 8, 8);
    pointLight1.decay = 2;
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(isDarkMode ? 0x34b7f1 : 0x25d366, 1.2, 25);
    pointLight2.position.set(8, -8, -8);
    pointLight2.decay = 2;
    scene.add(pointLight2);

    // Accent lighting
    const spotLight = new THREE.SpotLight(isDarkMode ? 0x667781 : 0xa8b3bd, 0.8, 30, Math.PI / 6);
    spotLight.position.set(0, 15, 10);
    spotLight.target.position.set(0, 0, 0);
    spotLight.castShadow = true;
    scene.add(spotLight);
    scene.add(spotLight.target);

    // Camera position
    camera.position.set(0, 0, 15);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Animate floating cubes
      elements.forEach((cube, index) => {
        const userData = cube.userData;
        
        // Floating motion
        cube.position.y = userData.initialY + Math.sin(time * userData.floatSpeed + index) * userData.floatAmplitude;
        
        // Rotation
        cube.rotation.x += userData.rotationSpeed.x;
        cube.rotation.y += userData.rotationSpeed.y;
        cube.rotation.z += userData.rotationSpeed.z;
        
        // Pulsing effect
        const scale = 1 + Math.sin(time * 2 + index) * 0.1;
        cube.scale.set(scale, scale, scale);
      });

      // Rotate central sphere with varying speed
      const rotationSpeed = 0.005 + Math.sin(time * 0.5) * 0.002;
      sphere.rotation.x += rotationSpeed;
      sphere.rotation.y += rotationSpeed * 0.8;
      
      // Pulsing effect for central sphere
      const scale = 1 + Math.sin(time * 1.5) * 0.05;
      sphere.scale.setScalar(scale);

      // Animate particles with more dynamic movement
      const particlePositions = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        particlePositions[i * 3 + 1] += Math.sin(time + i * 0.1) * 0.01;
        particlePositions[i * 3] += Math.cos(time + i * 0.1) * 0.01;
      }
      particles.geometry.attributes.position.needsUpdate = true;
      camera.position.x = Math.cos(time * 0.1) * 15 + Math.sin(time * 0.2) * 0.5;
      camera.position.y = Math.cos(time * 0.15) * 0.3;
      camera.position.z = Math.sin(time * 0.1) * 15;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Theme change listener
    const themeObserver = new MutationObserver(() => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      renderer.setClearColor(isDarkMode ? 0x111b21 : 0xe5ddd5, 0.1);
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      themeObserver.disconnect();
      
      // Dispose of all geometries and materials
      elements.forEach(element => {
        element.geometry.dispose();
        (element.material as THREE.Material).dispose();
      });
      
      sphere.geometry.dispose();
      (sphere.material as THREE.Material).dispose();
      
      particles.geometry.dispose();
      (particles.material as THREE.Material).dispose();
      
      scene.clear();
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ 
        background: 'linear-gradient(135deg, rgba(37, 211, 102, 0.05) 0%, rgba(0, 136, 204, 0.05) 50%, rgba(52, 183, 241, 0.05) 100%)'
      }}
    />
  );
}