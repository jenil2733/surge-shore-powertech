import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { 
  Play, 
  Pause, 
  Layers, 
  Compass,
  RotateCcw
} from 'lucide-react';

interface Motor3DCanvasProps {
  className?: string;
  autoRotateSpeed?: number;
  initialExploded?: boolean;
}

export const Motor3DCanvas: React.FC<Motor3DCanvasProps> = ({
  className = '',
  autoRotateSpeed = 1.0,
  initialExploded = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Interactive UI state - strictly focused on Exploded View and 360 rotation
  const [isRotating, setIsRotating] = useState(true);
  const isRotatingRef = useRef(true);
  isRotatingRef.current = isRotating;

  const [explodedAmount, setExplodedAmount] = useState(initialExploded ? 1 : 0);
  const explodedAmountRef = useRef(initialExploded ? 1 : 0);
  explodedAmountRef.current = explodedAmount;

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const motorGroupRef = useRef<THREE.Group | null>(null);
  
  // Sub-component groups for exploded view
  const shaftGroupRef = useRef<THREE.Group | null>(null);
  const fanGroupRef = useRef<THREE.Group | null>(null);
  const cowlGroupRef = useRef<THREE.Group | null>(null);
  const frontShieldGroupRef = useRef<THREE.Group | null>(null);
  const rearShieldGroupRef = useRef<THREE.Group | null>(null);
  const statorBodyGroupRef = useRef<THREE.Group | null>(null);
  const copperCoilsGroupRef = useRef<THREE.Group | null>(null);
  const terminalBoxGroupRef = useRef<THREE.Group | null>(null);

  // Mouse interaction state (Orbit only, NO zoom)
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const rotationVelocityRef = useRef({ x: 0, y: 0 });

  // Helper to generate dynamic Surge Shore branded Nameplate Texture with logo & specs
  const createNameplateTexture = useCallback(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    // Metallic silver-brushed background
    const bgGradient = ctx.createLinearGradient(0, 0, 512, 256);
    bgGradient.addColorStop(0, '#E2E8F0');
    bgGradient.addColorStop(0.5, '#F8FAFC');
    bgGradient.addColorStop(1, '#CBD5E1');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 512, 256);

    // Border and rivets
    ctx.strokeStyle = '#0F172A';
    ctx.lineWidth = 6;
    ctx.strokeRect(6, 6, 500, 244);

    // Rivet dots in 4 corners
    ctx.fillStyle = '#475569';
    [ [18, 18], [494, 18], [18, 238], [494, 238] ].forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
    });

    // Top Header Banner with Surge Shore signature navy
    ctx.fillStyle = '#00205B';
    ctx.fillRect(16, 16, 480, 52);

    // Brand Name on plate
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 24px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('SURGE SHORE', 32, 49);

    ctx.fillStyle = '#FF6B00';
    ctx.font = 'bold 19px sans-serif';
    ctx.fillText('POWERTECH LLP', 230, 49);

    // Spec table
    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('TYPE: 3-PHASE TEFC S1', 30, 96);
    ctx.fillText('FRAME: 80 / 90L', 280, 96);

    ctx.fillText('HP / KW: 1.0 HP / 0.75 kW', 30, 132);
    ctx.fillText('RPM: 1440 (4 POLE)', 280, 132);

    ctx.fillText('VOLTS: 415 V ± 10%', 30, 168);
    ctx.fillText('INS. CL: CLASS F (155°C)', 280, 168);

    ctx.fillText('EFFICIENCY: 84.5% (IE2)', 30, 204);
    ctx.fillText('DUTY: S1 CONTINUOUS', 280, 204);

    // Serial & Quality Stamp
    ctx.fillStyle = '#00205B';
    ctx.font = 'italic bold 13px sans-serif';
    ctx.fillText('RAJKOT, GUJARAT, INDIA • 100% PURE COPPER', 30, 234);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Helper to generate dynamic Surge Shore Terminal Box Badge Texture
  const createTerminalBoxLogoTexture = useCallback(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    // Deep corporate navy background matching motor
    ctx.fillStyle = '#091C44';
    ctx.fillRect(0, 0, 512, 512);

    // Gold/Orange outer border
    ctx.strokeStyle = '#FF6B00';
    ctx.lineWidth = 14;
    ctx.strokeRect(16, 16, 480, 480);

    // Inner subtle silver line
    ctx.strokeStyle = '#94A3B8';
    ctx.lineWidth = 4;
    ctx.strokeRect(36, 36, 440, 440);

    // Hexagon Logo Emblem Drawing
    const cx = 256;
    const cy = 200;
    const r = 90;

    // Draw stylized hexagonal emblem in center
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3 - Math.PI / 6;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.strokeStyle = '#FF6B00';
    ctx.lineWidth = 8;
    ctx.stroke();

    // Inner Hexagon
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3 - Math.PI / 6;
      const x = cx + (r - 20) * Math.cos(angle);
      const y = cy + (r - 20) * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = '#00205B';
    ctx.fill();

    // Inner S / Lightning monogram
    ctx.fillStyle = '#FF6B00';
    ctx.font = '900 68px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('S', cx, cy);

    // SURGE SHORE Text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 42px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('SURGE SHORE', 256, 360);

    // POWERTECH LLP Subtitle
    ctx.fillStyle = '#FF6B00';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText('POWERTECH LLP', 256, 410);

    // Location / Quality
    ctx.fillStyle = '#94A3B8';
    ctx.font = 'bold 18px monospace';
    ctx.fillText('RAJKOT • INDIA', 256, 450);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Helper to generate circular emblem for fan cowl rear
  const createCowlLogoTexture = useCallback(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    ctx.fillStyle = '#00205B';
    ctx.beginPath();
    ctx.arc(128, 128, 120, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#FF6B00';
    ctx.lineWidth = 10;
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('SURGE SHORE', 128, 120);

    ctx.fillStyle = '#FF6B00';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('POWERTECH', 128, 150);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Initialize Three.js Scene
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight || 480;

    // Scene with transparent background matching page seamlessly
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = null;

    // Camera with locked fixed distance (no zoom)
    const initialAspect = width / height;
    const isMobileInit = initialAspect < 1.0;
    const camera = new THREE.PerspectiveCamera(isMobileInit ? 46 : 38, initialAspect, 0.1, 100);
    camera.position.set(isMobileInit ? 10 : 7.5, isMobileInit ? 6.5 : 5, isMobileInit ? 14 : 10.5);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer with full alpha transparency
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    // Studio Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Key Light (Crisp White)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.3);
    keyLight.position.set(12, 16, 14);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    // Fill Light (Soft Sky Blue)
    const fillLight = new THREE.DirectionalLight(0xe0f2fe, 1.5);
    fillLight.position.set(-10, 12, 8);
    scene.add(fillLight);

    // Rim Light (Surge Shore Orange Highlights)
    const rimLight = new THREE.DirectionalLight(0xff6b00, 1.8);
    rimLight.position.set(-14, 6, -12);
    scene.add(rimLight);

    // Copper Windings Point Light
    const copperPointLight = new THREE.PointLight(0xff8822, 1.8, 10);
    copperPointLight.position.set(0, 0, 0);
    scene.add(copperPointLight);

    // Ground Floor Shadow Receiver (only casts soft contact shadow)
    const groundGeo = new THREE.PlaneGeometry(60, 60);
    const groundMat = new THREE.ShadowMaterial({
      opacity: 0.15,
      transparent: true
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2.8;
    ground.receiveShadow = true;
    scene.add(ground);

    // Subtle Radial Platform Rings
    const ringGeo = new THREE.RingGeometry(4.2, 4.3, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x0b2559, side: THREE.DoubleSide, transparent: true, opacity: 0.12 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.y = -2.78;
    scene.add(ringMesh);

    const ringGeo2 = new THREE.RingGeometry(4.55, 4.62, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xff6b00, side: THREE.DoubleSide, transparent: true, opacity: 0.22 });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.x = -Math.PI / 2;
    ringMesh2.position.y = -2.78;
    scene.add(ringMesh2);

    // Master Motor Group
    const masterMotorGroup = new THREE.Group();
    motorGroupRef.current = masterMotorGroup;
    scene.add(masterMotorGroup);

    // ==========================================
    // MATERIALS CONFIGURATION
    // ==========================================
    const castNavyMaterial = new THREE.MeshStandardMaterial({
      color: 0x071b40, // Surge Shore Signature Industrial Cast Iron Navy
      roughness: 0.38,
      metalness: 0.65
    });

    const shieldMaterial = new THREE.MeshStandardMaterial({
      color: 0x0d285c,
      roughness: 0.35,
      metalness: 0.7
    });

    const cowlMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a1f47,
      roughness: 0.3,
      metalness: 0.75
    });

    const copperMaterial = new THREE.MeshStandardMaterial({
      color: 0xd97706, // 100% Pure Copper Class F
      roughness: 0.22,
      metalness: 0.88,
      emissive: 0x5a2300,
      emissiveIntensity: 0.25
    });

    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.12,
      metalness: 0.95
    });

    const fanPolyMaterial = new THREE.MeshStandardMaterial({
      color: 0xff6b00, // Vibrant Polypropylene Orange Fan
      roughness: 0.5,
      metalness: 0.1
    });

    // ==========================================
    // 1. STATOR BODY GROUP
    // ==========================================
    const statorBodyGroup = new THREE.Group();
    statorBodyGroupRef.current = statorBodyGroup;
    masterMotorGroup.add(statorBodyGroup);

    // Stator Outer Cylinder
    const statorGeo = new THREE.CylinderGeometry(1.8, 1.8, 3.4, 32, 1, true);
    statorGeo.rotateX(Math.PI / 2);
    const statorMesh = new THREE.Mesh(statorGeo, castNavyMaterial);
    statorMesh.castShadow = true;
    statorMesh.receiveShadow = true;
    statorBodyGroup.add(statorMesh);

    // Radial Cooling Ribs / Fins
    const numFins = 18;
    for (let i = 0; i < numFins; i++) {
      const angle = (i / numFins) * Math.PI * 2;
      // Skip top center for terminal box and bottom center for footings
      if ((angle > 1.2 && angle < 1.94) || (angle > 4.3 && angle < 5.1)) continue;

      const finGeo = new THREE.BoxGeometry(0.08, 0.4, 3.2);
      const finMesh = new THREE.Mesh(finGeo, castNavyMaterial);
      finMesh.position.set(Math.cos(angle) * 1.9, Math.sin(angle) * 1.9, 0);
      finMesh.rotation.z = angle - Math.PI / 2;
      finMesh.castShadow = true;
      statorBodyGroup.add(finMesh);
    }

    // Nameplate with Surge Shore Branding on Stator Side
    const nameplateTexture = createNameplateTexture();
    const nameplateGeo = new THREE.PlaneGeometry(1.55, 0.82);
    const nameplateMat = new THREE.MeshStandardMaterial({
      map: nameplateTexture,
      roughness: 0.3,
      metalness: 0.5,
      side: THREE.DoubleSide
    });
    const nameplateMesh = new THREE.Mesh(nameplateGeo, nameplateMat);
    nameplateMesh.position.set(1.86, 0.4, 0);
    nameplateMesh.rotation.y = Math.PI / 2;
    statorBodyGroup.add(nameplateMesh);

    // Base Feet Mounting Bed
    const footMat = castNavyMaterial;
    const leftFoot = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.4, 3.0), footMat);
    leftFoot.position.set(-1.35, -1.8, 0);
    leftFoot.castShadow = true;
    statorBodyGroup.add(leftFoot);

    const rightFoot = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.4, 3.0), footMat);
    rightFoot.position.set(1.35, -1.8, 0);
    rightFoot.castShadow = true;
    statorBodyGroup.add(rightFoot);

    // Bolt holes on footings
    [ [-1.35, 1.1], [-1.35, -1.1], [1.35, 1.1], [1.35, -1.1] ].forEach(([x, z]) => {
      const boltMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.45, 12), chromeMaterial);
      boltMesh.position.set(x, -1.75, z);
      statorBodyGroup.add(boltMesh);
    });

    // ==========================================
    // 2. TOP TERMINAL BOX GROUP WITH SURGE SHORE LOGO
    // ==========================================
    const terminalBoxGroup = new THREE.Group();
    terminalBoxGroupRef.current = terminalBoxGroup;
    masterMotorGroup.add(terminalBoxGroup);

    const tBoxBody = new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 0.9, 1.4),
      new THREE.MeshStandardMaterial({ color: 0x091c44, roughness: 0.3, metalness: 0.7 })
    );
    tBoxBody.position.set(0, 2.2, 0);
    tBoxBody.castShadow = true;
    terminalBoxGroup.add(tBoxBody);

    const tBoxLid = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 0.15, 1.5),
      new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.3, metalness: 0.8 })
    );
    tBoxLid.position.set(0, 2.7, 0);
    terminalBoxGroup.add(tBoxLid);

    // Surge Shore Official Logo Plaque on Top of Terminal Box Lid
    const tBoxLogoTex = createTerminalBoxLogoTexture();
    const tBoxLogoMat = new THREE.MeshStandardMaterial({
      map: tBoxLogoTex,
      roughness: 0.25,
      metalness: 0.4,
      side: THREE.DoubleSide
    });
    const tBoxLogoMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 1.3), tBoxLogoMat);
    tBoxLogoMesh.rotation.x = -Math.PI / 2;
    tBoxLogoMesh.position.set(0, 2.78, 0);
    terminalBoxGroup.add(tBoxLogoMesh);

    // Cable Glands / Brass Nipples
    const glandMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.4, 16), chromeMaterial);
    glandMesh.rotation.z = Math.PI / 2;
    glandMesh.position.set(0.8, 2.2, 0);
    terminalBoxGroup.add(glandMesh);

    // Lifting Eye Bolt on Top Stator
    const eyeBoltGroup = new THREE.Group();
    eyeBoltGroup.position.set(0, 2.0, -1.0);
    const eyeRing = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.08, 12, 24), chromeMaterial);
    eyeRing.rotation.y = Math.PI / 2;
    eyeBoltGroup.add(eyeRing);
    statorBodyGroup.add(eyeBoltGroup);

    // ==========================================
    // 3. INTERNAL 100% PURE COPPER COILS GROUP
    // ==========================================
    const copperCoilsGroup = new THREE.Group();
    copperCoilsGroupRef.current = copperCoilsGroup;
    masterMotorGroup.add(copperCoilsGroup);

    // Stator Core Iron Lamination (Internal)
    const coreGeo = new THREE.CylinderGeometry(1.68, 1.68, 2.4, 28, 1, true);
    coreGeo.rotateX(Math.PI / 2);
    const coreMesh = new THREE.Mesh(
      coreGeo,
      new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.7, metalness: 0.6 })
    );
    copperCoilsGroup.add(coreMesh);

    // Front & Rear Copper Winding Overhang Coils
    const numCoilBundles = 16;
    for (let i = 0; i < numCoilBundles; i++) {
      const angle = (i / numCoilBundles) * Math.PI * 2;
      
      // Front Coil Loops
      const coilF = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.12, 12, 16, Math.PI), copperMaterial);
      coilF.position.set(Math.cos(angle) * 1.25, Math.sin(angle) * 1.25, 1.3);
      coilF.rotation.z = angle + Math.PI / 2;
      copperCoilsGroup.add(coilF);

      // Rear Coil Loops
      const coilR = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.12, 12, 16, Math.PI), copperMaterial);
      coilR.position.set(Math.cos(angle) * 1.25, Math.sin(angle) * 1.25, -1.3);
      coilR.rotation.z = angle + Math.PI / 2;
      copperCoilsGroup.add(coilR);

      // Longitudinal Slot Wires
      const wireGeo = new THREE.CylinderGeometry(0.06, 0.06, 2.6, 8);
      wireGeo.rotateX(Math.PI / 2);
      const wireMesh = new THREE.Mesh(wireGeo, copperMaterial);
      wireMesh.position.set(Math.cos(angle) * 1.35, Math.sin(angle) * 1.35, 0);
      copperCoilsGroup.add(wireMesh);
    }

    // ==========================================
    // 4. ROTATING SHAFT & ROTOR GROUP
    // ==========================================
    const shaftGroup = new THREE.Group();
    shaftGroupRef.current = shaftGroup;
    masterMotorGroup.add(shaftGroup);

    // Precision EN8E Steel Shaft
    const shaftGeo = new THREE.CylinderGeometry(0.4, 0.4, 7.6, 32);
    shaftGeo.rotateX(Math.PI / 2);
    const shaftMesh = new THREE.Mesh(shaftGeo, chromeMaterial);
    shaftMesh.position.set(0, 0, 0.4);
    shaftMesh.castShadow = true;
    shaftGroup.add(shaftMesh);

    // Shaft Keyway Slot
    const keywayMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.14, 0.14, 1.4),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.9 })
    );
    keywayMesh.position.set(0, 0.38, 3.2);
    shaftGroup.add(keywayMesh);

    // Squirrel Cage Rotor Aluminum/Silicon Core
    const rotorGeo = new THREE.CylinderGeometry(1.05, 1.05, 2.2, 24);
    rotorGeo.rotateX(Math.PI / 2);
    const rotorMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.6, metalness: 0.7 });
    const rotorMesh = new THREE.Mesh(rotorGeo, rotorMat);
    rotorMesh.castShadow = true;
    shaftGroup.add(rotorMesh);

    // Rotor End Rings & Copper Balance Bars
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const barGeo = new THREE.CylinderGeometry(0.04, 0.04, 2.3, 6);
      barGeo.rotateX(Math.PI / 2);
      const barMesh = new THREE.Mesh(barGeo, copperMaterial);
      barMesh.position.set(Math.cos(angle) * 0.98, Math.sin(angle) * 0.98, 0);
      shaftGroup.add(barMesh);
    }

    // Shielded Bearings (6205 C3)
    const bearingGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.4, 24);
    bearingGeo.rotateX(Math.PI / 2);
    const bearingFront = new THREE.Mesh(bearingGeo, chromeMaterial);
    bearingFront.position.set(0, 0, 1.6);
    shaftGroup.add(bearingFront);

    const bearingRear = new THREE.Mesh(bearingGeo, chromeMaterial);
    bearingRear.position.set(0, 0, -1.6);
    shaftGroup.add(bearingRear);

    // ==========================================
    // 5. FRONT END SHIELD GROUP
    // ==========================================
    const frontShieldGroup = new THREE.Group();
    frontShieldGroupRef.current = frontShieldGroup;
    masterMotorGroup.add(frontShieldGroup);

    const fShieldGeo = new THREE.CylinderGeometry(1.82, 1.82, 0.4, 32);
    fShieldGeo.rotateX(Math.PI / 2);
    const fShieldMesh = new THREE.Mesh(fShieldGeo, shieldMaterial);
    fShieldMesh.position.set(0, 0, 1.85);
    fShieldMesh.castShadow = true;
    frontShieldGroup.add(fShieldMesh);

    // Front Hub Collar
    const fHubMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.75, 0.75, 0.5, 24),
      shieldMaterial
    );
    fHubMesh.rotation.x = Math.PI / 2;
    fHubMesh.position.set(0, 0, 2.1);
    frontShieldGroup.add(fHubMesh);

    // ==========================================
    // 6. REAR END SHIELD GROUP
    // ==========================================
    const rearShieldGroup = new THREE.Group();
    rearShieldGroupRef.current = rearShieldGroup;
    masterMotorGroup.add(rearShieldGroup);

    const rShieldGeo = new THREE.CylinderGeometry(1.82, 1.82, 0.4, 32);
    rShieldGeo.rotateX(Math.PI / 2);
    const rShieldMesh = new THREE.Mesh(rShieldGeo, shieldMaterial);
    rShieldMesh.position.set(0, 0, -1.85);
    rShieldMesh.castShadow = true;
    rearShieldGroup.add(rShieldMesh);

    // ==========================================
    // 7. BI-DIRECTIONAL COOLING FAN GROUP
    // ==========================================
    const fanGroup = new THREE.Group();
    fanGroupRef.current = fanGroup;
    masterMotorGroup.add(fanGroup);

    const fanHub = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.35, 18), fanPolyMaterial);
    fanHub.rotation.x = Math.PI / 2;
    fanHub.position.set(0, 0, -2.4);
    fanGroup.add(fanHub);

    // Fan Impeller Blades
    const numBlades = 10;
    for (let i = 0; i < numBlades; i++) {
      const angle = (i / numBlades) * Math.PI * 2;
      const bladeMesh = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.7, 0.25), fanPolyMaterial);
      bladeMesh.position.set(Math.cos(angle) * 1.0, Math.sin(angle) * 1.0, -2.4);
      bladeMesh.rotation.z = angle + 0.3;
      bladeMesh.castShadow = true;
      fanGroup.add(bladeMesh);
    }

    // ==========================================
    // 8. FAN COWL HOOD GROUP WITH SURGE SHORE MEDALLION
    // ==========================================
    const cowlGroup = new THREE.Group();
    cowlGroupRef.current = cowlGroup;
    masterMotorGroup.add(cowlGroup);

    const cowlGeo = new THREE.CylinderGeometry(1.86, 1.86, 1.3, 32, 1, true);
    cowlGeo.rotateX(Math.PI / 2);
    const cowlMesh = new THREE.Mesh(cowlGeo, cowlMaterial);
    cowlMesh.position.set(0, 0, -2.6);
    cowlMesh.castShadow = true;
    cowlGroup.add(cowlMesh);

    // Rear Mesh Guard / Vents
    const ventCap = new THREE.Mesh(
      new THREE.CircleGeometry(1.84, 24),
      new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        roughness: 0.7,
        wireframe: true,
        side: THREE.DoubleSide
      })
    );
    ventCap.position.set(0, 0, -3.25);
    cowlGroup.add(ventCap);

    // Surge Shore Logo Round Emblem on rear cowl center
    const cowlLogoTex = createCowlLogoTexture();
    const cowlLogoMat = new THREE.MeshStandardMaterial({
      map: cowlLogoTex,
      roughness: 0.3,
      metalness: 0.4,
      side: THREE.DoubleSide
    });
    const cowlLogoMesh = new THREE.Mesh(new THREE.CircleGeometry(0.85, 32), cowlLogoMat);
    cowlLogoMesh.position.set(0, 0, -3.26);
    cowlLogoMesh.rotation.y = Math.PI;
    cowlGroup.add(cowlLogoMesh);

    // Initial Isometric Orientation
    masterMotorGroup.rotation.y = -Math.PI / 4;
    masterMotorGroup.rotation.x = Math.PI / 12;

    // ==========================================
    // RENDER / ANIMATION LOOP
    // ==========================================
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Dynamic camera framing based on viewport aspect ratio and exploded factor
      if (cameraRef.current) {
        const cam = cameraRef.current;
        const aspect = cam.aspect;
        const isMobile = aspect < 1.0;
        const isTablet = aspect >= 1.0 && aspect < 1.35;

        const baseDist = isMobile ? 18.0 : isTablet ? 15.0 : 13.0;
        const explodeOffset = (explodedAmountRef.current || 0) * (isMobile ? 5.0 : 3.0);
        const targetDist = baseDist + explodeOffset;

        const fovTarget = isMobile ? 46 : isTablet ? 42 : 38;
        if (Math.abs(cam.fov - fovTarget) > 0.5) {
          cam.fov = fovTarget;
          cam.updateProjectionMatrix();
        }

        // Target coordinates in isometric perspective
        const targetX = targetDist * 0.55;
        const targetY = targetDist * 0.36;
        const targetZ = targetDist * 0.75;

        cam.position.x += (targetX - cam.position.x) * 0.08;
        cam.position.y += (targetY - cam.position.y) * 0.08;
        cam.position.z += (targetZ - cam.position.z) * 0.08;
        cam.lookAt(0, 0, 0);
      }

      // Continuous working shaft and cooling fan rotation
      const spinSpeed = 12.0;
      if (shaftGroupRef.current) {
        shaftGroupRef.current.rotation.z += spinSpeed * delta;
      }
      if (fanGroupRef.current) {
        fanGroupRef.current.rotation.z += spinSpeed * delta;
      }

      // 360 Auto-Orbit Rotation
      if (isRotatingRef.current && !isDraggingRef.current && masterMotorGroup) {
        masterMotorGroup.rotation.y += (autoRotateSpeed * 0.45) * delta;
      }

      // Damping on manual drag
      if (!isDraggingRef.current) {
        rotationVelocityRef.current.x *= 0.92;
        rotationVelocityRef.current.y *= 0.92;
        if (masterMotorGroup) {
          masterMotorGroup.rotation.y += rotationVelocityRef.current.x;
          masterMotorGroup.rotation.x += rotationVelocityRef.current.y;
          // Clamp X pitch so motor doesn't flip upside down
          masterMotorGroup.rotation.x = Math.max(-0.8, Math.min(0.8, masterMotorGroup.rotation.x));
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Window Resize Handling
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || 480;
      const aspect = w / h;
      cameraRef.current.aspect = aspect;
      cameraRef.current.fov = aspect < 1.0 ? 46 : aspect < 1.35 ? 42 : 38;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [createNameplateTexture, createTerminalBoxLogoTexture, createCowlLogoTexture, autoRotateSpeed]);

  // Handle Exploded View Part Translations
  useEffect(() => {
    const factor = explodedAmount;

    if (frontShieldGroupRef.current) {
      frontShieldGroupRef.current.position.z = factor * 2.2;
    }
    if (shaftGroupRef.current) {
      shaftGroupRef.current.position.z = factor * 4.2;
    }
    if (cowlGroupRef.current) {
      cowlGroupRef.current.position.z = -factor * 3.8;
    }
    if (fanGroupRef.current) {
      fanGroupRef.current.position.z = -factor * 2.6;
    }
    if (rearShieldGroupRef.current) {
      rearShieldGroupRef.current.position.z = -factor * 1.5;
    }
    if (terminalBoxGroupRef.current) {
      terminalBoxGroupRef.current.position.y = factor * 1.8;
    }
    if (copperCoilsGroupRef.current) {
      copperCoilsGroupRef.current.position.x = factor * 0.4;
    }
  }, [explodedAmount]);

  // Mouse & Touch Drag Handlers for 360° Orbit (No Zoom)
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !motorGroupRef.current) return;

    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;

    motorGroupRef.current.rotation.y += deltaX * 0.008;
    motorGroupRef.current.rotation.x += deltaY * 0.008;
    motorGroupRef.current.rotation.x = Math.max(-0.8, Math.min(0.8, motorGroupRef.current.rotation.x));

    rotationVelocityRef.current = {
      x: deltaX * 0.004,
      y: deltaY * 0.004
    };

    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || !motorGroupRef.current || e.touches.length !== 1) return;

    const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
    const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

    motorGroupRef.current.rotation.y += deltaX * 0.008;
    motorGroupRef.current.rotation.x += deltaY * 0.008;
    motorGroupRef.current.rotation.x = Math.max(-0.8, Math.min(0.8, motorGroupRef.current.rotation.x));

    rotationVelocityRef.current = {
      x: deltaX * 0.004,
      y: deltaY * 0.004
    };

    previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  // Reset to default isometric angle
  const handleResetAngle = () => {
    if (!motorGroupRef.current) return;
    motorGroupRef.current.rotation.set(Math.PI / 12, -Math.PI / 4, 0);
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-[520px] sm:h-[600px] lg:h-[640px] overflow-visible bg-transparent select-none ${className}`}
    >
      {/* 3D WebGL Canvas (No Zoom, 360 Orbit Drag Only) */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing block bg-transparent outline-none overflow-visible"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />

      {/* Top Left: Surge Shore 3D Model Identity & Orbit Instruction */}
      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 pointer-events-none flex flex-col gap-1">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 text-slate-800 shadow-sm pointer-events-auto">
          <Layers className="w-3.5 h-3.5 text-[#FF6B00]" />
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#00205B] font-display">
            Surge Shore 3D Motor
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#00205B]/10 text-[#00205B] font-bold">
            TEFC S1
          </span>
        </div>

        <div className="text-[11px] text-slate-500 font-mono flex items-center gap-2 font-medium px-2">
          <span>Drag to Orbit 360°</span>
        </div>
      </div>

      {/* Top Right: Reset Orientation & Orbit Play/Pause */}
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 flex items-center gap-2">
        {/* 360 Auto-Rotate Toggle */}
        <button
          onClick={() => setIsRotating(!isRotating)}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-sm ${
            isRotating ? 'text-[#00205B]' : 'text-slate-500 hover:text-slate-900'
          }`}
          title="Toggle 360° Auto Rotation"
        >
          {isRotating ? <Pause className="w-3.5 h-3.5 text-[#FF6B00]" /> : <Play className="w-3.5 h-3.5 text-[#FF6B00]" />}
          <span className="hidden sm:inline">{isRotating ? 'Auto Orbit' : 'Paused'}</span>
        </button>

        {/* Reset View Angle */}
        <button
          onClick={handleResetAngle}
          className="p-2 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 hover:bg-white text-slate-700 shadow-sm transition-all cursor-pointer"
          title="Reset View Angle"
        >
          <Compass className="w-4 h-4 text-slate-600" />
        </button>
      </div>

      {/* Bottom Center: Exploded View Control Bar (Polished responsive design for mobile & desktop) */}
      <div 
        id="exploded-view-controls"
        className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-1/2 sm:-translate-x-1/2 sm:w-auto sm:min-w-[460px] max-w-lg z-20 p-2.5 sm:px-4.5 sm:py-3 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-xl flex flex-col gap-2"
      >
        {/* Top row: Label, % indicator & Fast Preset Buttons */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#00205B]/5 border border-[#00205B]/10 flex items-center justify-center text-[#FF6B00] shrink-0">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] sm:text-xs font-black text-[#00205B] uppercase tracking-wider font-display whitespace-nowrap">
                Exploded View
              </span>
              <span className="px-1.5 py-0.5 rounded-md bg-[#00205B] text-white text-[10px] sm:text-[11px] font-bold font-mono">
                {Math.round(explodedAmount * 100)}%
              </span>
            </div>
          </div>

          {/* Quick Presets Segmented Pills */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl text-[10.5px] sm:text-[11px] font-bold shrink-0">
            <button
              onClick={() => setExplodedAmount(0)}
              className={`px-2 sm:px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                explodedAmount === 0 
                  ? 'bg-white text-[#00205B] shadow-xs font-black' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              0%
            </button>
            <button
              onClick={() => setExplodedAmount(0.5)}
              className={`px-2 sm:px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                explodedAmount > 0.3 && explodedAmount < 0.7 
                  ? 'bg-white text-[#00205B] shadow-xs font-black' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              50%
            </button>
            <button
              onClick={() => setExplodedAmount(1)}
              className={`px-2 sm:px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                explodedAmount === 1 
                  ? 'bg-white text-[#00205B] shadow-xs font-black' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              100%
            </button>
          </div>
        </div>

        {/* Bottom row: Interactive Slider Track with subtle labels */}
        <div className="flex items-center gap-2 w-full">
          <span className="text-[10px] font-bold text-slate-400 font-mono shrink-0">0%</span>
          <div className="relative flex-1 flex items-center">
            <input
              type="range"
              min="0"
              max="1"
              step="0.005"
              value={explodedAmount}
              onChange={(e) => setExplodedAmount(parseFloat(e.target.value))}
              className="w-full accent-[#FF6B00] cursor-pointer h-2 sm:h-2.5 rounded-full appearance-none shadow-inner bg-slate-200"
              style={{
                background: `linear-gradient(to right, #FF6B00 0%, #FF6B00 ${explodedAmount * 100}%, #E2E8F0 ${explodedAmount * 100}%, #E2E8F0 100%)`
              }}
            />
          </div>
          <span className="text-[10px] font-bold text-slate-400 font-mono shrink-0">100%</span>
        </div>
      </div>
    </div>
  );
};
