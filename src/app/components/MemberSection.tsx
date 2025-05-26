'use client';
import { useFadeInOnScroll } from '@/app/hooks/useFadeInOnScroll';
import { css } from '@/styled-system/css';
import Image from 'next/image';
import { SectionTitle } from './SectionTitle';

const message = {
  memberName1: '水池 愛香',
  memberNameEn1: 'Aika Mizuike',
  menberDescription1:
    '愛香さんの経歴、説明が入ります。愛香さんの経歴、説明が入ります。愛香さんの経歴、説明が入ります。',
  menberSubDescription1:
    '愛香さんの経歴、説明が入ります。愛香さんの経歴、説明が入ります。愛香さんの経歴、説明が入ります。',
  memberName2: '長谷川 エミ',
  memberNameEn2: 'Emi Hasegawa',
  menberDescription2:
    '私は過去の経験から、見た目に強く悩み、美容整形に出会ったことで初めて「笑顔になれる自分」に出会えた。',
  menberSubDescription2:
    '自分を幸せにする「ミッション」は衝撃でした。そこからDr.Loveに出会えて、「世の中の人を幸せにする」ミッションに共感できた。',
  memberName3: '松崎 星哉',
  memberNameEn3: 'Seiya Matsuzaki',
  menberDescription3:
    '自信がある日もある。でも、将来が不安で眠れない夜もある。そんな自分に、そっと寄り添ってくれる存在がいたら…そう思ったことが、何度もありました。',
  menberSubDescription3:
    '心の病に向き合えない。誰にも話せずに苦しんでいる人たち。そして、それに気づきながらも、何もできなかった自分。',
};

const sectionStyle = css({
  width: '100%',
  margin: '0 auto',
  background: 'background',
  display: 'flex',
  flexDirection: 'column',
  gap: '48px',
  zIndex: 1,
  borderTopLeftRadius: '40px',
  borderTopRightRadius: '40px',
  boxShadow: '0 -16px 32px -8px rgba(0,0,0,0.10)',
  padding: '64px 16px',
  sm: {
    padding: '64px 24px',
  },
  md: {
    padding: '80px 40px',
    gap: '64px',
  },
});

const mainCardStyle = css({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '24px',
  overflow: 'hidden',
  width: '100%',
  minHeight: '340px',
  height: 'auto',
  background: 'none',
  boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
  padding: '40px 24px 0',
  justifyContent: 'space-between',
  sm: {
    flexDirection: 'row',
    padding: '48px 40px',
  },

  lg: {
    padding: '60px 64px',
  },
});

const mainBgStyle = css({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  zIndex: 0,
  objectFit: 'cover',
});

const mainImgStyle = css({
  width: '100%',
  height: 'auto',
  borderRadius: '24px',
  objectFit: 'cover',
});

const mainTextWrap = css({
  position: 'relative',
  zIndex: 2,
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '100%',
  justifyContent: 'center',
});

const mainNameStyle = css({
  color: '#FF8A5C',
  fontFamily: 'Noto Serif JP',
  fontWeight: '700',
  fontSize: '24px',
  letterSpacing: '0.1em',
  marginRight: '8px',
});
const mainNameEnStyle = css({
  color: '#FF8A5C',
  fontSize: '16px',
  fontWeight: '700',
});
const mainDescStyle = css({
  color: '#444',
  fontSize: '16px',
  lineHeight: '1.8',
});

const mainImgWrapper = css({
  position: 'relative',
  aspectRatio: '4 / 3',
  zIndex: 1,
  width: 'clamp(300px, 130%, 500px)',
  right: '-10%',

  sm: {
    position: 'absolute',
    width: 'clamp(400px, 67%, 600px)',
    right: '-23%',
    bottom: '0',
    margin: 0,
  },
  md: {
    width: 'clamp(400px, 60%, 600px)',
    aspectRatio: '6 / 5',
    right: '-20%',
  },
});

const subCardStyle = css({
  position: 'relative',
  borderRadius: '24px',
  overflow: 'hidden',
  width: '100%',
  background: 'none',
  boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: '48px 24px 0',
  gap: '16px',

  sm: {
    padding: '48px 40px 0',
  },

  lg: {
    padding: '60px 64px 0',
  },
});
const subBgStyle = css({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  zIndex: 0,
  objectFit: 'cover',
});
const subNameStyle = (color: string) =>
  css({
    color,
    fontFamily: 'Noto Serif JP',
    fontWeight: '700',
    fontSize: '20px',
    marginRight: '8px',
  });
const subNameEnStyle = (color: string) =>
  css({
    color,
    fontFamily: 'M+ 1m',
    fontSize: '13px',
    fontWeight: '700',
  });
const subDescStyle = css({
  color: '#444',
  fontFamily: 'M+ 1m',
  fontSize: '15px',
  lineHeight: '1.8',
  marginBottom: '16px',
  zIndex: 2,
});

const imageWrapper = css({
  position: 'relative',
  aspectRatio: '4 / 3',
  width: 'clamp(300px, 100%, 459px)',
  zIndex: 3,
  overflow: 'hidden',
  display: 'block',
  height: '100%',
  right: '-6%',
});

export default function MemberSection() {
  const fadeInTitleRef = useFadeInOnScroll();
  const fadeInMainRef = useFadeInOnScroll(0.01);
  const fadeInSub1Ref = useFadeInOnScroll(0.01);
  const fadeInSub2Ref = useFadeInOnScroll(0.03);
  return (
    <section className={sectionStyle} id="member">
      <div ref={fadeInTitleRef}>
        <SectionTitle en="MEMBER" jp="メンバー紹介" />
      </div>
      <div
        className={css({
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '40px',
          md: {
            gridTemplateColumns: '1fr',
            gap: '48px',
          },
          lg: {
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
          },
        })}
      >
        <div className={`${mainCardStyle} ${css({ gridColumn: '1 / -1' })}`} ref={fadeInMainRef}>
          <Image src="/figma-assets/bg_maincard.png" alt="bg" fill className={mainBgStyle} />
          <div className={mainTextWrap}>
            <div>
              <span className={mainNameStyle}>水池 愛香</span>
              <span className={mainNameEnStyle}>- Aika Mizuike -</span>
            </div>
            <pre className={mainDescStyle}>
              <div className={css({ xl: { width: '70%' } })}>
                私は、人生の序盤で"死と隣り合わせ"の毎日を生きてきました。 <br />
                母は統合失調症を患い、その原因は父の浮気と単身赴任による母の深い孤独でした。
                <br />
                <br />
                本来支えとなるはずの父が不在だったため、 <br />
                幼い私は母を支える"ヤングケアラー"の役割を担っていました。 <br />
                母の自殺を何度も止め、弟そして自分の命を守ることが私の日常でした。
              </div>
              <div className={css({ md: { width: '70%' } })}>
                <br />
                当時の母の病院に行きたくない気持ちも、周りの病院を信じる希望も、私は理解していました。
                処方される薬の扱い方ひとつで薬が命を奪う現実を母で知った私は、精神科医ではなく、
                "病を患う前に心を守る"方法を探すと決意し、18歳で父と福祉事業を立ち上げました。
                <br />
                <br />
                母を従事させ、回復の兆しが見えた頃、私は本来の自分の夢を追いかけ上京しました。
                しかし半年後、母は私の部屋で自ら命を絶ちました。
                <br />
              </div>
              <div className={css({ sm: { width: '65%' } })}>
                <br />
                相談できる環境、誰かにわかってもらえる実感が命を救うのだと。
                私はもう誰にも私と同じ思いをして母のように病を患い死を選んでほしくないです。
                まずは私から"1人で抱え込まない社会"の実現を目指し、
                今世の中に蔓延っている世代間の負の連鎖を断ち切り、連鎖の始まりを阻止したい。
                それぞれに寄り添い心を育て、自分を愛する事で人と健やかな関係を築けるように。
                <br />
                <br />
                そんな思いからDr. Loveを立ち上げました。
              </div>
            </pre>
          </div>
          <div className={mainImgWrapper}>
            <Image
              src="/top/member/aika_1.png"
              alt="水池愛香"
              fill
              className={mainImgStyle}
              style={{ objectFit: 'cover', objectPosition: 'top', width: '100%', height: '100%' }}
            />
          </div>
        </div>
        <div className={subCardStyle} ref={fadeInSub1Ref}>
          <Image src="/figma-assets/bg_rightcard.png" alt="bg" fill className={subBgStyle} />
          <div style={{ zIndex: 2, position: 'relative', width: '100%' }}>
            <span className={subNameStyle('#4EE06A')} style={{ color: '#4EE06A' }}>
              松崎 星哉
            </span>
            <span className={subNameEnStyle('#4EE06A')} style={{ color: '#4EE06A' }}>
              - Seiya Matsuzaki -
            </span>
          </div>
          <div className={subDescStyle}>
            自信がある日もある。
            <br />
            でも、将来が不安で眠れない夜もある。
            <br />
            そんな自分に、そっと寄り添ってくれる存在がいたら…
            <br />
            そう思ったことが、何度もありました。
            <br />
            <br />
            心の病と向き合う友人。 <br />
            誰にも話せずに苦しんでいる人たち。 <br />
            そして、それに気づきながらも、何もできなかった自分。
            <br />
            <br />
            私が感じた「新しい自分に出会える喜び」を他の中の人たちにも感じてほしいし、Dr.Loveを通して感じてほしい。
            <br />
            <br />
            Dr.Loveは、その第一歩です。
          </div>
          <div className={imageWrapper}>
            <Image
              src="/top/member/seiya_1.png"
              alt="松崎星哉"
              fill
              style={{ objectFit: 'cover', objectPosition: 'top', width: '100%', height: '100%' }}
            />
          </div>
        </div>
        <div className={subCardStyle} ref={fadeInSub2Ref}>
          <Image src="/figma-assets/bg_leftcard.png" alt="bg" fill className={subBgStyle} />
          <div className={css({ display: 'flex', flexDirection: 'column', gap: '16px' })}>
            <div style={{ zIndex: 2, position: 'relative', width: '100%' }}>
              <span className={subNameStyle('#618BFF')} style={{ color: '#618BFF' }}>
                長谷川 エミ
              </span>
              <span className={subNameEnStyle('#618BFF')} style={{ color: '#618BFF' }}>
                - Emi Hasegawa -
              </span>
            </div>
            <div className={subDescStyle}>
              心の奥底から悩みを抱えた経験や、もう既に同様なビジョンを掲げて生きていた背景から強く共鳴した。
              <br />
              <br />
              医薬品研究者の夢見て大学進学するも新しい美容の文化を韓国から日本へ取り入れるために大学を中退、術後ケア専門サロン「インディバケアプラチナム」開業。
              <br />
              自分自身の美容整形の経験を強みに日本へアフターケアの文化を広めた。 <br />
              後にグリークヨーグルト専門店「milkygreek」共同開業。
              日本中にグリークヨーグルト旋風を起こした。
              <br />
              <br />
              サロン、飲食店経営の経験から「世の中の問題、課題改善」をDr.Loveを通してもっと深いミッションに人生を懸けて挑む。
            </div>
          </div>
          <div className={imageWrapper}>
            <Image
              src="/top/member/emi_1.png"
              alt="長谷川エミ"
              fill
              style={{ objectFit: 'cover', objectPosition: 'top', width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
