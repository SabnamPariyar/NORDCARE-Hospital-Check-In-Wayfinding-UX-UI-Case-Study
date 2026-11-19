/**
 * NORDCARE ambient GPU shader.
 * Three.js ShaderMaterial renders a gentle flowing field under an animated SVG route.
 * The page remains fully functional if Three.js or WebGL is unavailable.
 */
const canvas = document.querySelector('#hero-shader');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (canvas) {
  try {
    const THREE = await import('https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js');
    const renderer = new THREE.WebGLRenderer({ canvas, alpha:true, antialias:false, powerPreference:'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1,1.4));
    renderer.setClearColor('#edf7f1',0);
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1,1,1,-1,.1,10);
    camera.position.z = 1;
    const uniforms = {
      uTime: {value: 0},
      uMouse: {value:new THREE.Vector2(.52,.45)},
      uResolution: {value:new THREE.Vector2(1,1)}
    };
    const material = new THREE.ShaderMaterial({
      transparent:true,depthWrite:false,uniforms,
      vertexShader: `varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position.xy,0.0,1.0);}`,
      fragmentShader: `
        precision mediump float;
        varying vec2 vUv;
        uniform float uTime;
        uniform vec2 uMouse;
        uniform vec2 uResolution;
        float wobble(vec2 p) {return sin(p.x*7.7+uTime*.16+sin(p.y*4.2))*sin(p.y*8.4-uTime*.22+p.x*2.0);}
        void main(){
          vec2 uv=vUv;
          float aspect=uResolution.x/max(1.0,uResolution.y);
          vec2 p=vec2(uv.x*aspect,uv.y);
          vec2 m=vec2(uMouse.x*aspect,uMouse.y);
          float d1=length(p-vec2(aspect*.58,.52));
          float d2=length(p-vec2(aspect*.75,.73));
          float d3=length(p-vec2(aspect*.29,.27));
          float wave=wobble(uv)*.065+sin(uv.x*8.0+uv.y*5.0-uTime*.18)*.035;
          float field=(1.0-smoothstep(.05,.57,d1+wave))*.7+(1.0-smoothstep(.01,.36,d2-wave))*.42;
          float mist=(1.0-smoothstep(.04,.42,d3+wave))*.25;
          float light=(1.0-smoothstep(.02,.45,length(p-m+vec2(.01,.02))))*.13;
          vec3 base=vec3(.91,.975,.937);
          vec3 deep=vec3(.22,.66,.55);
          vec3 lilac=vec3(.68,.74,.91);
          vec3 color=mix(base,deep,clamp(field*.5,0.0,.58));
          color=mix(color,lilac,mist);
          color+=light*vec3(.14,.25,.17);
          float alpha=clamp(field*.72+mist*.5+light,.0,.66);
          gl_FragColor=vec4(color,alpha);
        }`
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2,2),material);
    scene.add(mesh);
    const resize=()=>{
      const rect=canvas.getBoundingClientRect();
      const w=Math.max(1,Math.floor(rect.width)),h=Math.max(1,Math.floor(rect.height));
      renderer.setSize(w,h,false);
      uniforms.uResolution.value.set(w,h);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const hero=document.querySelector('.hero');
    hero.addEventListener('pointermove',e=>{
      const r=hero.getBoundingClientRect();
      const x=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width));
      const y=Math.max(0,Math.min(1,1-(e.clientY-r.top)/r.height));
      uniforms.uMouse.value.lerp(new THREE.Vector2(x,y),.08);
    },{passive:true});
    if(reduced){renderer.render(scene,camera);}else{
      const clock=new THREE.Clock();
      let visible=true;
      const onView=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;});
      onView.observe(hero);
      let last=0;
      const tick=(ms)=>{
        requestAnimationFrame(tick);
        if(document.hidden || !visible || ms-last<33) return;
        last=ms;
        uniforms.uTime.value=clock.getElapsedTime();
        renderer.render(scene,camera);
      };
      requestAnimationFrame(tick);
    }
  } catch (error) {
    // The CSS background and animated SVG remain visible as an accessible fallback.
    canvas.style.display='none';
  }
}
