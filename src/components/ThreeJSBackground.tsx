import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeJSBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    renderer?: THREE.WebGLRenderer;
    animationId?: number;
  }>({});

  useEffect(() => {
    if (!canvasRef.current) return;

    // Setup Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));    // Create uniforms for blurred color regions (66% white, 33% orange)
    const uniforms = {
      uTime: { value: 10 },
      uOrangeColor: { value: new THREE.Color('#ffeae5') }, // Primary orange accent
      uWhiteColor: { value: new THREE.Color('#f9f9f9') }, // Dominant white
      uWhiteThreshold: { value: 0.60 }, // 66% white coverage
      uOrangeThreshold: { value: 0.40 }, // 33% orange coverage
      uBlurAmount: { value: 0.4 }, // **BLUR CONTROL** - Increase for more blur (0.1-0.5 recommended)
      uVortexStrength: { value: 0.15 }, // Reduced vortex for cleaner regions
      uSpeed: { value: 0.5 }, // Slower for cleaner effect
      uNoiseIntensity: { value: 0.4 }, // Increased noise for organic blur
      uBoundaryWave: { value: 0.15 }, // Enhanced boundary distortion for blur
    };

    // Create shader material
    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,      fragmentShader: `
        uniform float uTime;
        uniform vec3 uOrangeColor;
        uniform vec3 uWhiteColor;
        uniform float uWhiteThreshold;
        uniform float uOrangeThreshold;
        uniform float uBlurAmount;
        uniform float uVortexStrength;
        uniform float uSpeed;
        uniform float uNoiseIntensity;
        uniform float uBoundaryWave;
        varying vec2 vUv;
        
        // Simplified noise function for boundary distortion
        vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
        
        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                           -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy));
          vec2 x0 = v - i + dot(i, C.xx);
          vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod(i, 289.0);
          vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
          vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
          m = m*m;
          m = m*m;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
          vec3 g;
          g.x = a0.x * x0.x + h.x * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }
        
        // Vortex transformation for boundary distortion
        vec2 vortex(vec2 uv, float strength, float time) {
          vec2 center = vec2(0.5, 0.5);
          vec2 delta = uv - center;
          float distance = length(delta);
          float angle = atan(delta.y, delta.x);
          
          // Create subtle spiral effect on boundaries
          angle += strength * distance * time * 0.3;
          
          return center + distance * vec2(cos(angle), sin(angle));
        }
        
        void main() {
          // Apply subtle vortex transformation
          vec2 distortedUv = vortex(vUv, uVortexStrength, uTime * uSpeed);
          
          // Create boundary noise for organic transitions
          float boundaryNoise = snoise(vec2(
            distortedUv.x * 4.0 + uTime * uSpeed * 0.5,
            distortedUv.y * 4.0 - uTime * uSpeed * 0.3
          )) * uBoundaryWave;
          
          // Additional noise layers for enhanced blur effect
          float detailNoise = snoise(vec2(
            distortedUv.x * 8.0 + uTime * uSpeed * 0.2,
            distortedUv.y * 8.0 - uTime * uSpeed * 0.4
          )) * uNoiseIntensity * 0.5;
          
          // Define the main gradient with enhanced noise influence
          float mainGradient = distortedUv.y + boundaryNoise + detailNoise;
          
          // Calculate transition boundary with blur control
          float transitionCenter = uOrangeThreshold;
          float blurRadius = uBlurAmount;
          
          // Create smooth, blurred transition using multiple smoothstep layers
          float blurFactor1 = smoothstep(transitionCenter - blurRadius, transitionCenter + blurRadius, mainGradient);
          float blurFactor2 = smoothstep(transitionCenter - blurRadius * 0.7, transitionCenter + blurRadius * 0.7, mainGradient + detailNoise * 0.3);
          float blurFactor3 = smoothstep(transitionCenter - blurRadius * 1.3, transitionCenter + blurRadius * 1.3, mainGradient - boundaryNoise * 0.2);
          
          // Combine blur factors for organic, natural transition
          float combinedBlur = (blurFactor1 + blurFactor2 + blurFactor3) / 3.0;
          
          // Apply additional noise-based blur for organic feel
          float noisyBlur = combinedBlur + (detailNoise * uBlurAmount * 0.3);
          noisyBlur = clamp(noisyBlur, 0.0, 1.0);
          
          // Smooth color mixing instead of hard boundaries
          vec3 finalColor = mix(uOrangeColor, uWhiteColor, noisyBlur);
          
          // Add subtle texture variation within each color region
          float textureNoise = snoise(vec2(
            distortedUv.x * 12.0,
            distortedUv.y * 12.0
          )) * 0.03;
          
          finalColor = mix(finalColor, finalColor * (1.0 + textureNoise), 0.5);
          
          // Subtle alpha variation for glassmorphism compatibility
          float alpha = 0.95 + detailNoise * 0.02;
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
    });    // Create enhanced geometry with more detail
    const geometry = new THREE.PlaneGeometry(25, 25, 32, 32);
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = Math.PI * 0.1; // Subtle rotation
    plane.position.set(0, 1.2, -1);
    scene.add(plane);    // Add secondary layer for depth with compatible uniforms
    const secondaryGeometry = new THREE.PlaneGeometry(30, 30, 16, 16);
    const secondaryMaterial = new THREE.ShaderMaterial({
      uniforms: {
        ...uniforms,
        uTime: { value: uniforms.uTime.value + 5 }, // Offset time
        uVortexStrength: { value: uniforms.uVortexStrength.value * 0.5 },
        uBoundaryWave: { value: uniforms.uBoundaryWave.value * 0.7 },
        uNoiseIntensity: { value: uniforms.uNoiseIntensity.value * 0.3 },
        uBlurAmount: { value: uniforms.uBlurAmount.value * 1.2 }, // Slightly more blur on secondary layer
      },
      vertexShader: material.vertexShader,
      fragmentShader: material.fragmentShader,
      transparent: true,
      opacity: 0.2,
    });
    
    const secondaryPlane = new THREE.Mesh(secondaryGeometry, secondaryMaterial);
    secondaryPlane.rotation.x = Math.PI * 0.08;
    secondaryPlane.position.set(0, 0.5, -2);
    scene.add(secondaryPlane);

    // Store references
    sceneRef.current = { scene, camera, renderer };    // Animation loop with enhanced effects
    function animate() {
      const animationId = requestAnimationFrame(animate);
      sceneRef.current.animationId = animationId;
      
      // Smooth time progression for both layers
      uniforms.uTime.value += 0.005;
      if (secondaryMaterial.uniforms.uTime) {
        secondaryMaterial.uniforms.uTime.value += 0.003;
      }
      
      // Subtle camera movement for parallax effect
      camera.position.x = Math.sin(uniforms.uTime.value * 0.1) * 0.1;
      camera.position.y = Math.cos(uniforms.uTime.value * 0.08) * 0.05;
      
      renderer.render(scene, camera);
    }

    // Start animation
    animate();

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
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      if (sceneRef.current.renderer) {
        sceneRef.current.renderer.dispose();
      }      if (geometry) geometry.dispose();
      if (secondaryGeometry) secondaryGeometry.dispose();
      if (material) material.dispose();
      if (secondaryMaterial) secondaryMaterial.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
};

export default ThreeJSBackground;
