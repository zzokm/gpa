import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeJSBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    renderer?: THREE.WebGLRenderer;
    animationId?: number;
    scrollY?: number;
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
      uTime: { value: 50 },
      uOrangeColor: { value: new THREE.Color('#ffe0d8') }, // Brighter orange accent
      uWhiteColor: { value: new THREE.Color('#f9f9f9') }, // Dominant white
      uWhiteThreshold: { value: 0.55 }, // Increased white coverage to create smaller orange patches
      uOrangeThreshold: { value: 0.45 }, // Adjusted threshold for tighter transitions
      uBlurAmount: { value: 0.2 }, // Further reduced blur for smaller, more defined patches
      uVortexStrength: { value: 0.38 }, // Increased for more scattered effect
      uSpeed: { value: 0.5 }, // Slightly faster for more dynamic patterns
      uNoiseIntensity: { value: 0.85 }, // Increased noise for more scattered smaller patches
      uBoundaryWave: { value: 0.28 }, // Enhanced boundary distortion for more complex patterns
      uScatterFactor: { value: 5.2 }, // Significantly increased to create smaller, more frequent patterns
      uMicroPatchesFrequency: { value: 7.5 }, // New parameter for micro-patches frequency
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
        uniform float uScatterFactor;
        uniform float uMicroPatchesFrequency;
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
        
        // Flow transformation with enhanced scattering for much smaller, more frequent patterns
        vec2 flowEffect(vec2 uv, float strength, float time, float scatter) {
          // Create directional flow that moves content off-screen
          // This prevents circular accumulation by using a consistent flow direction
          
          // Base UV coordinate
          vec2 flowUv = uv;
          
          // Multiple layers of high frequency wave patterns for many small scattered patches
          flowUv.x += sin(uv.y * scatter * 1.2 + time * 0.22) * strength * 0.12;
          flowUv.y += cos(uv.x * (scatter - 0.5) + time * 0.33) * strength * 0.09;
          
          // Additional layers of even smaller wave patterns for micro-scattering
          flowUv.x += sin(uv.y * scatter * 2.3 - time * 0.17) * strength * 0.07;
          flowUv.y += cos(uv.x * scatter * 2.0 + time * 0.28) * strength * 0.06;
          
          // Ultra-fine detail layer for tiny patches
          flowUv.x += sin(uv.y * scatter * 3.8 + time * 0.11) * strength * 0.04;
          flowUv.y += cos(uv.x * scatter * 3.5 - time * 0.14) * strength * 0.035;
          
          // Add dynamic flow movement to prevent static areas and create more variation
          flowUv.x += sin(time * 0.22 + uv.x * 1.5) * strength * 0.04;
          flowUv.y += cos(time * 0.31 + uv.y * 1.3) * strength * 0.03;
          
          return flowUv;
        }
        
        void main() {
          // Apply enhanced flowing transformation with scatter factor for more distributed patterns
          vec2 distortedUv = flowEffect(vUv, uVortexStrength, uTime * uSpeed, uScatterFactor);
          
          // Create continuously moving boundary noise with much higher frequencies for smaller patches
          float boundaryNoise = snoise(vec2(
            distortedUv.x * 6.5 + uTime * uSpeed * 0.32, 
            distortedUv.y * 6.8 - uTime * uSpeed * 0.28
          )) * uBoundaryWave;
          
          // Higher frequency detail noise for much finer grain patterns
          float detailNoise = snoise(vec2(
            distortedUv.x * 12.5 + uTime * uSpeed * 0.18,
            distortedUv.y * 13.0 - uTime * uSpeed * 0.22
          )) * uNoiseIntensity * 0.5;
          
          // Add scattered high-frequency noise to create smaller, more distributed patches
          float extraNoise = snoise(vec2(
            distortedUv.x * 22.0 - uTime * uSpeed * 0.12,
            distortedUv.y * 20.0 + uTime * uSpeed * 0.14
          )) * uNoiseIntensity * 0.3;
          
          // Additional scattered micro-detail noise layer
          float microNoise = snoise(vec2(
            distortedUv.x * 28.0 + uTime * uSpeed * 0.06,
            distortedUv.y * 26.0 - uTime * uSpeed * 0.09
          )) * uNoiseIntensity * 0.2;
          
          // New ultra-fine micro patch layer for tiny frequent details
          float microPatchNoise = snoise(vec2(
            distortedUv.x * uMicroPatchesFrequency * 5.0 - uTime * uSpeed * 0.04,
            distortedUv.y * uMicroPatchesFrequency * 4.8 + uTime * uSpeed * 0.05
          )) * uNoiseIntensity * 0.15;
          
          // Define the main gradient with enhanced scatter noise patterns
          // Use scattered noise patterns with different frequencies to create smaller, distributed orange patches
          float mainGradient = distortedUv.y + boundaryNoise * 0.6 + detailNoise * 0.5 + extraNoise * 0.35 + microNoise * 0.25 + microPatchNoise * 0.3;
          
          // Create multiple sub-gradients at different frequencies for scattered patches
          float scatterGradient1 = mainGradient + microNoise * 0.7 - detailNoise * 0.35 + microPatchNoise * 0.4;
          float scatterGradient2 = mainGradient - extraNoise * 0.5 + boundaryNoise * 0.45 - microPatchNoise * 0.3;
          float scatterGradient3 = mainGradient + (sin(distortedUv.x * 25.0) * 0.025) - (cos(distortedUv.y * 22.0) * 0.02);
          float scatterGradient4 = mainGradient - microPatchNoise * 0.6 + extraNoise * 0.25;
          float scatterGradient5 = mainGradient + (cos(distortedUv.x * 40.0 + uTime * 0.1) * 0.015);
          
          // Calculate transition boundary with tighter blur control for smaller patches
          float transitionCenter = uOrangeThreshold;
          float blurRadius = uBlurAmount;
          
          // Create multiple transition layers at different frequencies for many tiny orange patches
          float blurFactor1 = smoothstep(transitionCenter - blurRadius, transitionCenter + blurRadius, mainGradient);
          float blurFactor2 = smoothstep(transitionCenter - blurRadius * 0.6, transitionCenter + blurRadius * 0.6, scatterGradient1);
          float blurFactor3 = smoothstep(transitionCenter - blurRadius * 0.8, transitionCenter + blurRadius * 0.8, scatterGradient2);
          float blurFactor4 = smoothstep(transitionCenter - blurRadius * 0.4, transitionCenter + blurRadius * 0.4, scatterGradient3);
          float blurFactor5 = smoothstep(transitionCenter - blurRadius * 0.25, transitionCenter + blurRadius * 0.25, mainGradient + microNoise * 0.6);
          float blurFactor6 = smoothstep(transitionCenter - blurRadius * 0.3, transitionCenter + blurRadius * 0.35, scatterGradient4);
          float blurFactor7 = smoothstep(transitionCenter - blurRadius * 0.2, transitionCenter + blurRadius * 0.2, scatterGradient5);
          
          // Combine blur factors with weighted distribution to create many small scattered patches
          float combinedBlur = (blurFactor1 * 0.15 + blurFactor2 * 0.15 + blurFactor3 * 0.15 + 
                               blurFactor4 * 0.15 + blurFactor5 * 0.15 + blurFactor6 * 0.15 + blurFactor7 * 0.1);
          
          // Apply additional scattered micro noise patterns to break up into many tiny areas
          float noisyBlur = combinedBlur + (microNoise * uBlurAmount * 0.12) + (extraNoise * uBlurAmount * 0.08) + 
                            (microPatchNoise * uBlurAmount * 0.15);
                            
          // High frequency detail breakup for tiny patches
          noisyBlur += sin(distortedUv.x * 50.0 + uTime * 0.07) * sin(distortedUv.y * 48.0 - uTime * 0.05) * uBlurAmount * 0.05;
                            
          // Ensure proper clamping to prevent color artifacts
          noisyBlur = clamp(noisyBlur, 0.0, 1.0);
          
          // Smooth color mixing with enhanced brightness for orange patches
          vec3 finalColor = mix(uOrangeColor, uWhiteColor, noisyBlur);
          
          // Enhance brightness of orange areas using noise patterns
          // This makes orange patches appear more vibrant
          float brightnessFactor = (1.0 - noisyBlur) * 0.18; // Only brightens orange areas
          finalColor += uOrangeColor * brightnessFactor;
          
          // Add ultra-fine micro-texture variation within each color region
          float textureNoise = snoise(vec2(
            distortedUv.x * 32.0 + uTime * 0.05,
            distortedUv.y * 28.0 - uTime * 0.06
          )) * 0.035;
          
          // Secondary fine texture for even more detail
          float secondaryTexture = snoise(vec2(
            distortedUv.x * 48.0 - uTime * 0.03,
            distortedUv.y * 42.0 + uTime * 0.04
          )) * 0.025;
          
          // Apply more texture variation to orange regions for scattered effect
          float orangeTextureIntensity = (1.0 - noisyBlur) * 0.8; // More texture in orange areas
          finalColor = mix(finalColor, finalColor * (1.0 + textureNoise + secondaryTexture), 0.35 + orangeTextureIntensity * 0.25);
          
          // Subtle alpha variation for glassmorphism compatibility
          float alpha = 0.96 + microNoise * 0.02;
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
    });    // Create significantly larger geometry to cover scrollable area
    // Using much larger dimensions to ensure coverage of scrollable content
    const geometry = new THREE.PlaneGeometry(100, 100, 32, 32);
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = Math.PI * 0.1; // Subtle rotation
    plane.position.set(0, 0, -2); // Position further back to ensure full coverage
    scene.add(plane);    // Add secondary layer for depth with compatible uniforms
    const secondaryGeometry = new THREE.PlaneGeometry(120, 120, 16, 16);
    const secondaryMaterial = new THREE.ShaderMaterial({
      uniforms: {
        ...uniforms,
        uTime: { value: uniforms.uTime.value + 5 }, // Offset time
        uVortexStrength: { value: uniforms.uVortexStrength.value * 0.65 },
        uBoundaryWave: { value: uniforms.uBoundaryWave.value * 0.85 },
        uNoiseIntensity: { value: uniforms.uNoiseIntensity.value * 0.45 },
        uBlurAmount: { value: uniforms.uBlurAmount.value * 1.05 }, // Slightly more blur on secondary layer
        uScatterFactor: { value: uniforms.uScatterFactor.value * 0.95 }, // Slightly different scatter pattern for depth
        uMicroPatchesFrequency: { value: uniforms.uMicroPatchesFrequency.value * 0.9 }, // Slightly different micro pattern
      },
      vertexShader: material.vertexShader,
      fragmentShader: material.fragmentShader,
      transparent: true,
      opacity: 0.2,
    });
    
    const secondaryPlane = new THREE.Mesh(secondaryGeometry, secondaryMaterial);
    secondaryPlane.rotation.x = Math.PI * 0.08;
    secondaryPlane.position.set(0, 0, -4); // Position even further back
    scene.add(secondaryPlane);

    // Store references
    sceneRef.current = { scene, camera, renderer };    // Animation loop with enhanced effects and scroll awareness
    function animate() {
      const animationId = requestAnimationFrame(animate);
      sceneRef.current.animationId = animationId;
      
      // Smooth time progression for both layers
      uniforms.uTime.value += 0.005;
      if (secondaryMaterial.uniforms.uTime) {
        secondaryMaterial.uniforms.uTime.value += 0.003;
      }
      
      // Get current scroll position
      const currentScrollY = window.scrollY;
      
      // Update stored scroll position for reference
      sceneRef.current.scrollY = currentScrollY;
      
      // Calculate scroll-adjusted camera position
      // This ensures the background moves appropriately with scrolling
      const scrollFactor = currentScrollY * 0.002;
      
      // Subtle camera movement for parallax effect, now adjusted for scroll position
      camera.position.x = Math.sin(uniforms.uTime.value * 0.1) * 0.1;
      
      // Y position now factors in scroll position to ensure coverage of scrolled content
      camera.position.y = Math.cos(uniforms.uTime.value * 0.08) * 0.05 - scrollFactor;
      
      renderer.render(scene, camera);
    }

    // Start animation
    animate();

    // Handle window resize with enhanced coverage for scrollable content
    const handleResize = () => {
      // Get document height to ensure we cover the entire scrollable area
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
      
      // Adjust camera for both width and full document height
      camera.aspect = window.innerWidth / window.innerHeight;
      
      // Adjust camera field of view based on document height vs viewport height ratio
      // This ensures the background covers the entire scrollable area
      const heightRatio = docHeight / window.innerHeight;
      camera.fov = Math.max(40, Math.min(60, 40 + heightRatio * 5));
      
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Handle scroll to ensure background stays visible throughout the document
    const handleScroll = () => {
      // No need to do anything here as the animate loop will handle camera adjustment
      // This is just to ensure scroll events are being monitored
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    // Call resize handler immediately to set up proper dimensions
    handleResize();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
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
        // Ensure the canvas renders immediately, even before images and other resources
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        // Use hardware acceleration to improve performance on mobile
        transform: 'translateZ(0)',
        // Ensure smooth transition from CSS background color to ThreeJS
        transition: 'opacity 0.3s ease-in',
        opacity: 1,
        // Background color is set in CSS to #fcede9
      }}
    />
  );
};

export default ThreeJSBackground;
