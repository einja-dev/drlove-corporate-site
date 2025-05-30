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

// z-index定義
const Z_BG_BLACK = 100;
const Z_SLIDES = 102;
const Z_WHITE_CIRCLE = 103;
const Z_CATCH = 104; // ★ 追加: キャッチコピー
const Z_WHITE_BG = 105; // ↑1
const Z_LOGO = 106; // ↑1

// 共通アニメーションを関数化
function appendLogoAndWhiteBgTimeline(
  tl: gsap.core.Timeline,
  whiteCircle: HTMLDivElement,
  catchText: HTMLDivElement,
  whiteBg: HTMLDivElement,
  logo: HTMLDivElement,
  setShow: (b: boolean) => void,
  onFinish?: () => void
) {
  tl.to(
    whiteCircle,
    {
      scale: 40,
      opacity: 1,
      duration: 0.7,
      ease: 'power3.in',
      onStart: () => {
        console.log('[Splash] 白ぼかし円拡大開始', whiteCircle);
      },
      onComplete: () => {
        console.log('[Splash] 白ぼかし円拡大完了', whiteCircle);
        const splashImages = document.querySelectorAll('.splash-img');
        splashImages.forEach((el) => {
          (el as HTMLElement).style.opacity = '0';
          (el as HTMLElement).style.display = 'none';
        });
        // 黒背景も同様に非表示にする
        const blackBg = document.querySelector('.splash-black-bg') as HTMLElement | null;
        if (blackBg) {
          blackBg.style.opacity = '0';
          blackBg.style.display = 'none';
        }
      },
    },
    '+=0.5'
  );
  // キャッチコピー フェードイン（1文字ずつ）
  const line1 = catchText.querySelector('.catch-line1') as HTMLElement | null;
  const line2 = catchText.querySelector('.catch-line2') as HTMLElement | null;

  // 各行を文字ごと <span> に分割
  function splitLine(lineEl: HTMLElement | null): HTMLElement[] {
    if (!lineEl) return [];
    if (lineEl.dataset.split === 'done') return Array.from(lineEl.children) as HTMLElement[];
    const text = lineEl.textContent ?? '';
    lineEl.innerHTML = '';
    [...text].forEach((ch) => {
      const span = document.createElement('span');
      span.textContent = ch;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      lineEl.appendChild(span);
    });
    lineEl.dataset.split = 'done';
    return Array.from(lineEl.children) as HTMLElement[];
  }

  const chars1 = splitLine(line1);
  const chars2 = splitLine(line2);

  // Containerはタイムライン外で即可視化
  gsap.set(catchText, { opacity: 1 });

  // 1行目の文字を順番に
  if (chars1.length) {
    tl.fromTo(
      chars1,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', stagger: 0.05 }
    );
  }

  // 2行目の文字を 1秒遅れて順番に
  if (chars2.length) {
    tl.fromTo(
      chars2,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', stagger: 0.05 },
      '>+=0.5' // 1行目完了から1秒後に開始
    );
  }

  // 表示キープ
  tl.to({}, { duration: 1.0 });

  // キャッチコピー フェードアウト
  tl.to(catchText, {
    opacity: 0,
    duration: 0.5,
    ease: 'power2.in',
    onStart: () => console.log('[Splash] キャッチコピー フェードアウト', catchText),
    onComplete: () => {
      if (catchText) {
        catchText.style.display = 'none';
      }
    },
  });
  tl.to(
    whiteBg,
    {
      opacity: 1,
      duration: 0.01,
      onStart: () => {
        console.log('[Splash] 白背景表示開始', whiteBg);
      },
      onComplete: () => {
        console.log('[Splash] 白背景表示完了', whiteBg);
        if (whiteCircle && whiteCircle instanceof HTMLElement) {
          whiteCircle.style.opacity = '0';
          whiteCircle.style.display = 'none';
        }
      },
    },
    '+=0.01'
  );
  tl.to(
    logo,
    {
      opacity: 1,
      duration: 0.7,
      onStart: () => {
        console.log('[Splash] ロゴフェードイン開始', logo);
      },
      onComplete: () => {
        console.log('[Splash] ロゴフェードイン完了', logo);
      },
    },
    '+=0.2'
  );
  tl.to(
    {},
    {
      duration: 1.0,
      onStart: () => {
        console.log('[Splash] ロゴ静止開始');
      },
      onComplete: () => {
        console.log('[Splash] ロゴ静止終了');
      },
    }
  );
  tl.to([logo, whiteBg], {
    opacity: 0,
    duration: 1.5,
    ease: 'power2.out',
    onStart: () => {
      console.log('[Splash] ロゴ・白背景フェードアウト開始', whiteBg);
      if (!whiteBg) {
        console.error('[Splash] whiteBg is null at fadeout start');
      }
    },
    onComplete: () => {
      console.log('[Splash] ロゴ・白背景フェードアウト完了', whiteBg);
      if (!whiteBg) {
        console.error('[Splash] whiteBg is null at fadeout complete');
      }
      if (whiteBg && whiteBg instanceof HTMLElement) {
        whiteBg.style.display = 'none';
      }
      setShow(false);
      if (onFinish) onFinish();
    },
  });
  // タイムライン全体のonCompleteでも保険として呼ぶ
  tl.eventCallback('onComplete', () => {
    setShow(false);
    if (onFinish) onFinish();
  });
}

export default function SplashAnimation3({ onFinish }: SplashAnimationProps) {
  const [show, setShow] = useState(true);
  const [isVertical, setIsVertical] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const whiteCircleRef = useRef<HTMLDivElement>(null);
  const whiteBgRef = useRef<HTMLDivElement>(null);
  const catchTextRef = useRef<HTMLDivElement>(null);

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
    if (
      !logoRef.current ||
      !whiteBgRef.current ||
      !whiteCircleRef.current ||
      !catchTextRef.current
    ) {
      console.log('[Splash] logoRef/whiteBgRef/whiteCircleRef is null', {
        logo: logoRef.current,
        whiteBg: whiteBgRef.current,
        whiteCircle: whiteCircleRef.current,
        catchText: catchTextRef.current,
      });
      setTimeout(() => {
        console.log('[Splash] setTimeout retry refs', {
          logo: logoRef.current,
          whiteBg: whiteBgRef.current,
          whiteCircle: whiteCircleRef.current,
          catchText: catchTextRef.current,
        });
      }, 50);
      return;
    }
    console.log('[Splash] refs ready', {
      logo: logoRef.current,
      whiteBg: whiteBgRef.current,
      whiteCircle: whiteCircleRef.current,
      catchText: catchTextRef.current,
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
        // 1セット目の3つ目が終わった後に0.2秒待機
        tl.addLabel('afterFirstSet', '+=0.4');
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
        // 白ぼかし円の直前でHeroイメージ背景を表示
        appendLogoAndWhiteBgTimeline(
          tl,
          whiteCircleRef.current!,
          catchTextRef.current!,
          whiteBgRef.current!,
          logoRef.current!,
          setShow,
          onFinish
        );
        tl.eventCallback('onComplete', () => {
          console.log('[Splash] timeline onComplete (final)');
          setShow(false);
          if (onFinish) onFinish();
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
        // 1セット目の3つ目が終わった後に0.6秒待機
        tl.addLabel('afterFirstSet', '+=0.6');
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
        // 白ぼかし円の直前でHeroイメージ背景を表示
        appendLogoAndWhiteBgTimeline(
          tl,
          whiteCircleRef.current!,
          catchTextRef.current!,
          whiteBgRef.current!,
          logoRef.current!,
          setShow,
          onFinish
        );
        tl.eventCallback('onComplete', () => {
          console.log('[Splash] timeline onComplete (final)');
          setShow(false);
          if (onFinish) onFinish();
        });
      }
      console.log('[Splash] timeline onComplete');
    }, containerRef);
    return () => {
      console.log('[Splash] useLayoutEffect cleanup');
      ctx.revert();
    };
  }, [isVertical, onFinish, show]);

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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* 黒背景は常に最下層 */}
      <div
        className="splash-black-bg"
        style={{
          position: 'absolute',
          inset: 0,
          background: '#000',
          zIndex: Z_BG_BLACK,
        }}
      />
      {isVertical ? (
        // 縦長: 上下2段×3枚
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            zIndex: Z_SLIDES,
            pointerEvents: 'none',
          }}
        >
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
            position: 'absolute',
            inset: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            zIndex: Z_SLIDES,
            pointerEvents: 'none',
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
          zIndex: Z_WHITE_CIRCLE,
        }}
      />
      {/* キャッチコピー */}
      <div
        ref={catchTextRef}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 'clamp(24px, 4vw, 48px)',
          opacity: 0,
          zIndex: Z_CATCH,
          pointerEvents: 'none',
          whiteSpace: 'pre-line',
          lineHeight: '3',
          width: '100%',
          textAlign: 'center',
          fontFamily: 'Yu Mincho, serif',
          color: '#444444',
        }}
      >
        {/* 1行目 */}
        <span className="catch-line1" data-split="done" style={{ display: 'block' }}>
          {['人', '生', 'に', 'お', 'け', 'る', 'ど', 'ん', 'な', '悩', 'み', 'に', 'も', '、'].map(
            (ch, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: 文字重複のためindex併用
              <span
                key={ch + i}
                style={{
                  display: 'inline-block',
                  opacity: 0,
                  textShadow: '2px 2px 6px rgba(0,0,0,0.18), 0 1px 0 #fff',
                }}
              >
                {ch}
              </span>
            )
          )}
        </span>
        {/* 2行目 */}
        <span className="catch-line2" data-split="done" style={{ display: 'block' }}>
          {['私', 'た', 'ち', 'が', '寄', 'り', '添', 'い', 'ま', 'す', '。'].map((ch, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: 文字重複のためindex併用
            <span
              key={ch + i}
              style={{
                display: 'inline-block',
                opacity: 0,
                textShadow: '2px 2px 6px rgba(0,0,0,0.18), 0 1px 0 #fff',
              }}
            >
              {ch}
            </span>
          ))}
        </span>
      </div>
      {/* 白背景＋ロゴ */}
      <div
        ref={whiteBgRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: '#fff',
          opacity: 0,
          zIndex: Z_WHITE_BG,
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
          zIndex: Z_LOGO,
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
