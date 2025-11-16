'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

export default function Scroll3DAnimation() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationGroupsRef = useRef<THREE.Group[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [localScrollProgress, setLocalScrollProgress] = useState(0);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  useEffect(() => {
    if (!mountRef.current) return;

    // Intersection Observer to detect when component is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the component is visible
        rootMargin: '0px 0px -200px 0px' // Start a bit earlier
      }
    );

    if (mountRef.current) {
      observer.observe(mountRef.current);
    }

    return () => {
      if (mountRef.current) {
        observer.unobserve(mountRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!mountRef.current || !isVisible) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(isDarkMode ? 0x0a0a0a : 0xf8f9fa, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    mountRef.current.appendChild(renderer.domElement);

    // Store references
    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    // Create multiple animation groups for layered effects
    const mainGroup = new THREE.Group();
    const secondaryGroup = new THREE.Group();
    const particleGroup = new THREE.Group();
    
    scene.add(mainGroup);
    scene.add(secondaryGroup);
    scene.add(particleGroup);
    
    animationGroupsRef.current = [mainGroup, secondaryGroup, particleGroup];

    // Create floating encryption elements with advanced geometries
    const geometries = [
      new THREE.BoxGeometry(0.8, 0.8, 0.8),
      new THREE.TetrahedronGeometry(0.6),
      new THREE.OctahedronGeometry(0.5),
      new THREE.IcosahedronGeometry(0.4),
      new THREE.DodecahedronGeometry(0.3),
      new THREE.TorusGeometry(0.3, 0.1, 8, 16),
      new THREE.ConeGeometry(0.3, 0.8, 8),
      new THREE.CylinderGeometry(0.2, 0.4, 0.8, 8)
    ];

    const colors = isDarkMode 
      ? [0x25d366, 0x34b7f1, 0x667781, 0x128c7e, 0x075e54]
      : [0x0088cc, 0x25d366, 0x34b7f1, 0x667781, 0x4a90e2];

    // Main group - large elements
    for (let i = 0; i < 15; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshPhongMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        transparent: true,
        opacity: 0.7,
        shininess: 100,
        emissive: colors[Math.floor(Math.random() * colors.length)],
        emissiveIntensity: 0.1
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      
      // Add custom animation properties
      mesh.userData = {
        originalPosition: mesh.position.clone(),
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02
        },
        floatAmplitude: Math.random() * 2 + 1,
        floatSpeed: Math.random() * 0.5 + 0.5,
        phaseOffset: Math.random() * Math.PI * 2,
        scrollMultiplier: Math.random() * 0.5 + 0.5
      };
      
      mainGroup.add(mesh);
    }

    // Secondary group - medium elements
    for (let i = 0; i < 25; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshPhongMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        transparent: true,
        opacity: 0.5,
        shininess: 80,
        wireframe: Math.random() > 0.7
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      );
      mesh.scale.setScalar(Math.random() * 0.5 + 0.3);
      
      mesh.userData = {
        originalPosition: mesh.position.clone(),
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.03,
          y: (Math.random() - 0.5) * 0.03,
          z: (Math.random() - 0.5) * 0.03
        },
        floatAmplitude: Math.random() * 1.5 + 0.5,
        floatSpeed: Math.random() * 0.7 + 0.3,
        phaseOffset: Math.random() * Math.PI * 2,
        scrollMultiplier: Math.random() * 0.3 + 0.2
      };
      
      secondaryGroup.add(mesh);
    }

    // Advanced particle system
    const particleCount = 1500;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors_array = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
      
      // Store original positions for scroll-based movement
      originalPositions[i * 3] = positions[i * 3];
      originalPositions[i * 3 + 1] = positions[i * 3 + 1];
      originalPositions[i * 3 + 2] = positions[i * 3 + 2];
      
      const color = new THREE.Color(colors[Math.floor(Math.random() * colors.length)]);
      colors_array[i * 3] = color.r;
      colors_array[i * 3 + 1] = color.g;
      colors_array[i * 3 + 2] = color.b;
      
      sizes[i] = Math.random() * 0.1 + 0.05;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors_array, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    particleGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
    particleGeometry.setAttribute('originalPosition', new THREE.BufferAttribute(originalPositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    particleGroup.add(particles);

    // Advanced lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(15, 15, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Multiple colored point lights
    const pointLights = [
      { color: 0x25d366, intensity: 1.5, position: [-15, 10, 10], distance: 30 },
      { color: 0x34b7f1, intensity: 1.2, position: [15, -10, -10], distance: 25 },
      { color: 0x667781, intensity: 0.8, position: [0, 15, -15], distance: 20 },
      { color: 0x128c7e, intensity: 1.0, position: [-10, 0, 15], distance: 25 }
    ];

    pointLights.forEach(lightData => {
      const pointLight = new THREE.PointLight(lightData.color, lightData.intensity, lightData.distance);
      pointLight.position.set(...lightData.position);
      scene.add(pointLight);
    });

    // Spotlight for dramatic effect
    const spotLight = new THREE.SpotLight(0xffffff, 1.2, 50, Math.PI / 8);
    spotLight.position.set(0, 20, 0);
    spotLight.target.position.set(0, 0, 0);
    spotLight.castShadow = true;
    scene.add(spotLight);
    scene.add(spotLight.target);

    camera.position.set(0, 0, 20);

    // Animation loop with scroll-based transformations
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001;
      
      // Animate main group elements
      mainGroup.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh) {
          const userData = child.userData;
          
          // Base floating animation
          child.position.y = userData.originalPosition.y + 
            Math.sin(time * userData.floatSpeed + userData.phaseOffset + index) * userData.floatAmplitude;
          
          // Scroll-based vertical movement
          child.position.y += localScrollProgress * userData.scrollMultiplier * 10;
          
          // Rotation based on time and scroll
          child.rotation.x += userData.rotationSpeed.x + localScrollProgress * 0.01;
          child.rotation.y += userData.rotationSpeed.y + localScrollProgress * 0.005;
          child.rotation.z += userData.rotationSpeed.z;
          
          // Scale pulsing
          const scale = 1 + Math.sin(time * 2 + index) * 0.15 + localScrollProgress * 0.2;
          child.scale.setScalar(scale);
        }
      });

      // Animate secondary group elements
      secondaryGroup.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh) {
          const userData = child.userData;
          
          child.position.y = userData.originalPosition.y + 
            Math.sin(time * userData.floatSpeed + userData.phaseOffset + index * 0.5) * userData.floatAmplitude;
          
          child.position.y -= localScrollProgress * userData.scrollMultiplier * 5;
          
          child.rotation.x += userData.rotationSpeed.x;
          child.rotation.y += userData.rotationSpeed.y;
          child.rotation.z += userData.rotationSpeed.z;
          
          const scale = 1 + Math.sin(time * 1.5 + index) * 0.1;
          child.scale.setScalar(scale);
        }
      });

      // Animate particles
    const particlePositions = particles.geometry.attributes.position.array as Float32Array;
    const particleVelocities = particles.geometry.attributes.velocity.array as Float32Array;
    const originalPositions = particles.geometry.attributes.originalPosition.array as Float32Array;
    
    for (let i = 0; i < particleCount; i++) {
      // Create dramatic particle movement based on scroll
      const scrollInfluence = localScrollProgress * 2; // Amplify scroll effect
      const particleIndex = i * 3;
      
      // Base movement with scroll influence
      particlePositions[particleIndex] += particleVelocities[particleIndex] + scrollInfluence * 0.05;
      particlePositions[particleIndex + 1] += particleVelocities[particleIndex + 1] + scrollInfluence * 0.1;
      particlePositions[particleIndex + 2] += particleVelocities[particleIndex + 2] + scrollInfluence * 0.03;
      
      // Create spiral motion when scrolling
      if (localScrollProgress > 0.1) {
        const spiralRadius = localScrollProgress * 2;
        const spiralSpeed = time * 0.5 + i * 0.01;
        particlePositions[particleIndex] += Math.cos(spiralSpeed) * spiralRadius * 0.1;
        particlePositions[particleIndex + 2] += Math.sin(spiralSpeed) * spiralRadius * 0.1;
      }
      
      // Boundary wrapping with scroll influence
      const boundary = 25 + localScrollProgress * 10;
      if (particlePositions[particleIndex] > boundary) {
        particlePositions[particleIndex] = -boundary;
        // Reset to original position for smooth transition
        particlePositions[particleIndex + 1] = originalPositions[particleIndex + 1];
      }
      if (particlePositions[particleIndex] < -boundary) particlePositions[particleIndex] = boundary;
      if (particlePositions[particleIndex + 1] > boundary) {
        particlePositions[particleIndex + 1] = -boundary;
      }
      if (particlePositions[particleIndex + 1] < -boundary) particlePositions[particleIndex + 1] = boundary;
      if (particlePositions[particleIndex + 2] > boundary) particlePositions[particleIndex + 2] = -boundary;
      if (particlePositions[particleIndex + 2] < -boundary) particlePositions[particleIndex + 2] = boundary;
    }
      
      particles.geometry.attributes.position.needsUpdate = true;

      // Camera movement based on scroll and time
      camera.position.x = Math.cos(time * 0.1) * 20 + localScrollProgress * 5;
      camera.position.y = Math.sin(time * 0.15) * 5 + localScrollProgress * 3;
      camera.position.z = Math.sin(time * 0.1) * 20 + 20;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Scroll event listener - only active when component is visible
    const handleScroll = () => {
      if (!isVisible) return;
      
      const rect = mountRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      // Calculate progress based on element's position in viewport
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Start animation when element is 200px from top, complete when fully visible
      const startOffset = 200;
      const endOffset = windowHeight - 200;
      
      let progress = 0;
      if (elementTop <= startOffset && elementTop >= -elementHeight + endOffset) {
        const totalDistance = startOffset + elementHeight - endOffset;
        const currentDistance = startOffset - elementTop;
        progress = Math.max(0, Math.min(1, currentDistance / totalDistance));
      }
      
      setLocalScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Resize handler
    const handleResize = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (mountRef.current) {
        observer.unobserve(mountRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of all geometries and materials
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach(material => material.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
      
      if (particles.geometry) particles.geometry.dispose();
      if (particles.material) particles.material.dispose();
      
      renderer.dispose();
    };
  }, [isDarkMode, localScrollProgress]);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ 
        background: isDarkMode 
          ? 'linear-gradient(135deg, rgba(10, 10, 10, 0.1) 0%, rgba(37, 211, 102, 0.05) 50%, rgba(52, 183, 241, 0.05) 100%)'
          : 'linear-gradient(135deg, rgba(248, 249, 250, 0.1) 0%, rgba(0, 136, 204, 0.05) 50%, rgba(37, 211, 102, 0.05) 100%)'
      }}
    />
  );
}