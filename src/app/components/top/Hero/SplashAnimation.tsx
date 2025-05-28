import gsap from 'gsap';
import Image from 'next/image';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

interface SplashAnimationProps {
  onFinish?: () => void;
}

const IMAGE_PATHS = [
  '/top/splash/splash-1.png',
  '/top/splash/splash-2.png',
  '/top/splash/splash-3.png',
  '/top/splash/splash-4.png',
  '/top/splash/splash-5.png',
  '/top/splash/splash-6.png',
];

export default function SplashAnimation({ onFinish }: SplashAnimationProps) {
  const [show, setShow] = useState(true);
  const [isVertical, setIsVertical] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const whiteCircleRef = useRef<HTMLDivElement>(null);
  const whiteBgRef = useRef<HTMLDivElement>(null);

  // 画面比率で縦長判定
  useEffect(() => {
    const checkVertical = () => {
      setIsVertical(window.innerHeight / window.innerWidth > 1.2);
    };
    checkVertical();
    window.addEventListener('resize', checkVertical);
    return () => window.removeEventListener('resize', checkVertical);
  }, []);

  useLayoutEffect(() => {
    console.log('[Splash] useLayoutEffect start', { isVertical, show });
    if (!containerRef.current) {
      console.log('[Splash] containerRef.current is null');
      return;
    }
    if (!logoRef.current || !whiteBgRef.current || !whiteCircleRef.current) {
      console.log('[Splash] logoRef/whiteBgRef/whiteCircleRef is null', {
        logo: logoRef.current,
        whiteBg: whiteBgRef.current,
        whiteCircle: whiteCircleRef.current,
      });
      setTimeout(() => {
        console.log('[Splash] setTimeout retry refs', {
          logo: logoRef.current,
          whiteBg: whiteBgRef.current,
          whiteCircle: whiteCircleRef.current,
        });
      }, 50);
      return;
    }
    console.log('[Splash] refs ready', {
      logo: logoRef.current,
      whiteBg: whiteBgRef.current,
      whiteCircle: whiteCircleRef.current,
    });
    const ctx = gsap.context(() => {
      if (isVertical) {
        console.log('[Splash] isVertical timeline start');
        // slots配列をDOM並び順に
        const slots = [
          '[data-splash="top-left"]', // 0: 上左
          '[data-splash="top-center"]', // 1: 上中央
          '[data-splash="top-right"]', // 2: 上右
          '[data-splash="bottom-left"]', // 3: 下左
          '[data-splash="bottom-center"]', // 4: 下中央
          '[data-splash="bottom-right"]', // 5: 下右
        ];
        const directions = [
          { x: '-100%' }, // 上左
          { y: '-100%' }, // 上中央
          { x: '100%' }, // 上右
          { x: '-100%' }, // 下左
          { y: '100%' }, // 下中央
          { x: '100%' }, // 下右
        ];
        const order = [0, 2, 1, 3, 5, 4]; // 上左→上右→上中央→下左→下右→下中央
        const tl = gsap.timeline();
        console.log('timeline start');
        // 1セット目: 上左→上右→上中央
        [0, 2, 1].forEach((idx, i) => {
          const selector = slots[idx];
          const el = containerRef.current?.querySelector(selector);
          if (!el) return;
          tl.fromTo(
            el,
            { ...directions[idx], opacity: 0 },
            { x: 0, y: 0, opacity: 1, duration: 0.35 },
            i * 0.2
          );
        });
        // 1セット目の3つ目が終わった後に0.75秒待機（0.25+0.5）
        tl.addLabel('afterFirstSet', '+=0.5');
        // 2セット目: 下左→下右→下中央
        [3, 5, 4].forEach((idx, i) => {
          const selector = slots[idx];
          const el = containerRef.current?.querySelector(selector);
          if (!el) {
            console.error('アニメーション対象が取得できません:', selector);
            return;
          }
          tl.fromTo(
            el,
            { ...directions[idx], opacity: 0 },
            { x: 0, y: 0, opacity: 1, duration: 0.35 },
            i === 0 ? 'afterFirstSet' : `afterFirstSet+=${i * 0.2}`
          );
        });
        // 白いぼかし円・ロゴ・白背景は従来通り
        console.log('whiteCircleRef', whiteCircleRef.current);
        if (!whiteCircleRef.current) {
          console.error('whiteCircleRefがnull');
          return;
        }
        tl.to(
          whiteCircleRef.current,
          {
            scale: 40,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.in',
          },
          '+=0.5'
        );
        console.log('whiteBgRef', whiteBgRef.current);
        if (!whiteBgRef.current) {
          console.error('whiteBgRefがnull');
          return;
        }
        tl.to(
          whiteBgRef.current,
          {
            opacity: 1,
            duration: 0.01,
          },
          '+=0.01'
        );
        console.log('logoRef', logoRef.current);
        if (!logoRef.current) {
          console.error('logoRefがnull');
          return;
        }
        tl.to(
          logoRef.current,
          {
            opacity: 1,
            duration: 0.7,
            onStart: () => {
              console.log('logoRef.current', logoRef.current);
            },
          },
          '+=0.2'
        );
        // 2秒間静止
        tl.to({}, { duration: 2.0 });
        // ロゴと白背景を同時にフェードアウト
        tl.to([logoRef.current, whiteBgRef.current], {
          opacity: 0,
          duration: 1.5,
          ease: 'power2.out',
          onComplete: () => {
            setShow(false);
            if (onFinish) onFinish();
          },
        });
      } else {
        console.log('[Splash] isHorizontal timeline start');
        // 横長: 3分割×2セット
        const slots = ['.splash-slot.left', '.splash-slot.center', '.splash-slot.right'];
        const tl = gsap.timeline();
        console.log('timeline start');
        // 1セット目: 左→右→中央
        [0, 2, 1].forEach((slotIdx, i) => {
          let direction = {};
          if (slotIdx === 0) direction = { x: '-100%' };
          else if (slotIdx === 2) direction = { x: '100%' };
          else direction = { y: '-100%' };
          tl.fromTo(
            `${slots[slotIdx]} .splash-img:nth-child(1)`,
            { ...direction, opacity: 0 },
            { x: 0, y: 0, opacity: 1, duration: 0.35 },
            i * 0.2
          );
        });
        // 1セット目の3つ目が終わった後に0.25秒待機
        tl.addLabel('afterFirstSet', '+=0.25');
        // 2セット目: 左→右→中央（中央のみ下から）
        [0, 2, 1].forEach((slotIdx, i) => {
          let direction = {};
          if (slotIdx === 0) direction = { x: '-100%' };
          else if (slotIdx === 2) direction = { x: '100%' };
          else if (slotIdx === 1 && i === 2) direction = { y: '100%' };
          else direction = { y: '-100%' };
          tl.fromTo(
            `${slots[slotIdx]} .splash-img:nth-child(2)`,
            { ...direction, opacity: 0 },
            { x: 0, y: 0, opacity: 1, duration: 0.35 },
            i === 0 ? 'afterFirstSet' : `afterFirstSet+=${i * 0.2}`
          );
        });
      }
      console.log('[Splash] timeline onComplete');
    }, containerRef);
    return () => {
      console.log('[Splash] useLayoutEffect cleanup');
      ctx.revert();
    };
  }, [isVertical, show, onFinish]);

  if (!show) {
    console.log('[Splash] show is false, return null');
    return null;
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {isVertical ? (
        // 縦長: 上下2段×3枚
        <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
          <div
            className="splash-row top"
            style={{ flex: 1, display: 'flex', position: 'relative', flexDirection: 'row' }}
          >
            <div
              className="splash-img left"
              data-splash="top-left"
              style={{ flex: 1, minWidth: 0, position: 'relative', opacity: 0 }}
            >
              <Image
                src={IMAGE_PATHS[0]}
                alt="splash-1"
                fill
                style={{ objectFit: 'cover' }}
                priority
                sizes="100vw"
              />
            </div>
            <div
              className="splash-img center"
              data-splash="top-center"
              style={{ flex: 1, minWidth: 0, position: 'relative', opacity: 0 }}
            >
              <Image
                src={IMAGE_PATHS[2]}
                alt="splash-3"
                fill
                style={{ objectFit: 'cover' }}
                priority
                sizes="100vw"
              />
            </div>
            <div
              className="splash-img right"
              data-splash="top-right"
              style={{ flex: 1, minWidth: 0, position: 'relative', opacity: 0 }}
            >
              <Image
                src={IMAGE_PATHS[1]}
                alt="splash-2"
                fill
                style={{ objectFit: 'cover' }}
                priority
                sizes="100vw"
              />
            </div>
          </div>
          <div
            className="splash-row bottom"
            style={{ flex: 1, display: 'flex', position: 'relative', flexDirection: 'row' }}
          >
            <div
              className="splash-img left"
              data-splash="bottom-left"
              style={{ flex: 1, minWidth: 0, position: 'relative', opacity: 0 }}
            >
              <Image
                src={IMAGE_PATHS[3]}
                alt="splash-4"
                fill
                style={{ objectFit: 'cover' }}
                priority
                sizes="100vw"
              />
            </div>
            <div
              className="splash-img center"
              data-splash="bottom-center"
              style={{ flex: 1, minWidth: 0, position: 'relative', opacity: 0 }}
            >
              <Image
                src={IMAGE_PATHS[5]}
                alt="splash-6"
                fill
                style={{ objectFit: 'cover' }}
                priority
                sizes="100vw"
              />
            </div>
            <div
              className="splash-img right"
              data-splash="bottom-right"
              style={{ flex: 1, minWidth: 0, position: 'relative', opacity: 0 }}
            >
              <Image
                src={IMAGE_PATHS[4]}
                alt="splash-5"
                fill
                style={{ objectFit: 'cover' }}
                priority
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      ) : (
        // 横長: 3分割×2セット
        <div
          style={{
            display: 'flex',
            width: '100vw',
            height: '100vh',
          }}
        >
          {/* 左スロット */}
          <div
            className="splash-slot left"
            style={{ flex: 1, height: '100%', display: 'flex', position: 'relative' }}
          >
            <div
              className="splash-img"
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                opacity: 0,
              }}
            >
              <Image
                src={IMAGE_PATHS[0]}
                alt="splash-1"
                fill
                style={{ objectFit: 'cover' }}
                priority
                sizes="100vw"
              />
            </div>
            <div
              className="splash-img"
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                opacity: 0,
              }}
            >
              <Image
                src={IMAGE_PATHS[3]}
                alt="splash-4"
                fill
                style={{ objectFit: 'cover' }}
                priority
                sizes="100vw"
              />
            </div>
          </div>
          {/* 中央スロット */}
          <div
            className="splash-slot center"
            style={{ flex: 1, height: '100%', display: 'flex', position: 'relative' }}
          >
            <div
              className="splash-img"
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                opacity: 0,
              }}
            >
              <Image
                src={IMAGE_PATHS[1]}
                alt="splash-2"
                fill
                style={{ objectFit: 'cover' }}
                priority
                sizes="100vw"
              />
            </div>
            <div
              className="splash-img"
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                opacity: 0,
              }}
            >
              <Image
                src={IMAGE_PATHS[4]}
                alt="splash-5"
                fill
                style={{ objectFit: 'cover' }}
                priority
                sizes="100vw"
              />
            </div>
          </div>
          {/* 右スロット */}
          <div
            className="splash-slot right"
            style={{ flex: 1, height: '100%', display: 'flex', position: 'relative' }}
          >
            <div
              className="splash-img"
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                opacity: 0,
              }}
            >
              <Image
                src={IMAGE_PATHS[2]}
                alt="splash-3"
                fill
                style={{ objectFit: 'cover' }}
                priority
                sizes="100vw"
              />
            </div>
            <div
              className="splash-img"
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                opacity: 0,
              }}
            >
              <Image
                src={IMAGE_PATHS[5]}
                alt="splash-6"
                fill
                style={{ objectFit: 'cover' }}
                priority
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      )}
      {/* 白いぼかし円 */}
      <div
        ref={whiteCircleRef}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #fff 60%, #fff8 100%)',
          transform: 'translate(-50%, -50%) scale(0.01)',
          opacity: 0,
          pointerEvents: 'none',
          filter: 'blur(8px)',
        }}
      />
      {/* 白背景＋ロゴ */}
      <div
        ref={whiteBgRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: '#fff',
          opacity: 0,
          zIndex: 2,
          pointerEvents: 'none',
          willChange: 'opacity',
        }}
      />
      <div
        ref={logoRef}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0,
          zIndex: 3,
        }}
      >
        <Image
          src="/assets/header/logo-header.png"
          alt="ロゴ"
          width={180}
          height={60}
          style={{ objectFit: 'contain' }}
        />
      </div>
    </div>
  );
}
