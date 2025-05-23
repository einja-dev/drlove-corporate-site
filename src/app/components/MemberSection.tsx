import Image from 'next/image';
import { css } from '../../../styled-system/css';
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
  maxWidth: '1120px',
  margin: '0 auto',
  padding: '96px 0',
  background: '#fff',
  display: 'flex',
  flexDirection: 'column',
  gap: '64px',
});

const mainCardStyle = css({
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  borderRadius: '24px',
  overflow: 'hidden',
  width: '100%',
  height: '340px',
  background: 'none',
  boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
});

const mainBgStyle = css({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  zIndex: 0,
  objectFit: 'cover',
});

const mainImgWrap = css({
  position: 'relative',
  height: '100%',
  width: '270px',
  minWidth: '270px',
  zIndex: 2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
const mainImgStyle = css({
  height: '92%',
  width: 'auto',
  borderRadius: '24px',
  objectFit: 'cover',
  boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
});

const mainTextWrap = css({
  position: 'relative',
  zIndex: 2,
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  marginLeft: '32px',
  width: 'calc(100% - 270px)',
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
  fontFamily: 'M+ 1m',
  fontSize: '16px',
  fontWeight: '700',
});
const mainDescStyle = css({
  color: '#444',
  fontFamily: 'M+ 1m',
  fontSize: '16px',
  lineHeight: '1.8',
});

const subCardsWrap = css({
  display: 'flex',
  gap: '40px',
  width: '100%',
});

const subCardStyle = css({
  position: 'relative',
  borderRadius: '24px',
  overflow: 'hidden',
  width: '100%',
  height: '340px',
  background: 'none',
  boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  padding: '40px 32px 0 32px',
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
  maxWidth: '90%',
});
const subImgStyle = css({
  position: 'absolute',
  left: '50%',
  bottom: '-40px',
  transform: 'translateX(-50%)',
  borderRadius: '24px',
  width: '180px',
  height: '180px',
  objectFit: 'cover',
  zIndex: 3,
  boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
  background: '#fff',
  border: '4px solid #fff',
});

export default function MemberSection() {
  return (
    <section className={sectionStyle} id="member">
      <SectionTitle en="MEMBER" jp="メンバー紹介" />
      <div className={mainCardStyle}>
        <Image src="/figma-assets/bg_maincard.png" alt="bg" fill className={mainBgStyle} />
        <div className={mainImgWrap}>
          <Image src="/figma-assets/main_face.png" alt="水池愛香" fill className={mainImgStyle} />
        </div>
        <div className={mainTextWrap}>
          <div>
            <span className={mainNameStyle}>水池 愛香</span>
            <span className={mainNameEnStyle}>- Aika Mizuike -</span>
          </div>
          <div className={mainDescStyle}>
            愛香さんの経歴、説明が入ります。愛香さんの経歴、説明が入ります。愛香さんの経歴、説明が入ります。愛香さんの経歴、説明が入ります。愛香さんの経歴、説明が入ります。愛香さんの経歴、説明が入ります。愛香さんの経歴、説明が入ります。愛香さんの経歴、説明が入ります。
            <br />
            <br />
            愛香さんの経歴、説明が入ります。愛香さんの経歴、説明が入ります。愛香さんの経歴、説明が入ります。愛香さんの経歴、説明が入ります。愛香さんの経歴、説明が入ります。愛香さんの経歴、説明が入ります。
            <br />
            <br />
            愛香さんの経歴、説明が入ります。愛香さんの経歴、説明が入ります。愛香さんの経歴、説明が入ります。
          </div>
        </div>
      </div>
      <div className={subCardsWrap}>
        <div className={subCardStyle}>
          <Image src="/figma-assets/bg_leftcard.png" alt="bg" fill className={subBgStyle} />
          <div style={{ zIndex: 2, position: 'relative', width: '100%' }}>
            <span className={subNameStyle('#3B5B9B')}>長谷川 エミ</span>
            <span className={subNameEnStyle('#3B5B9B')}>- Emi Hasegawa -</span>
          </div>
          <div className={subDescStyle}>
            私は過去の経験から、見た目に強く悩み、美容整形に出会ったことで初めて「笑顔になれる自分」に出会えた。
            <br />
            <br />
            自分を幸せにする「ミッション」は衝撃でした。そこからDr.Loveに出会えて、「世の中の人を幸せにする」ミッションに共感できた。
            <br />
            <br />
            私が感じた「新しい自分に出会える喜び」を他の中の人たちにも感じてほしいし、Dr.Loveを通して感じてほしい。
            <br />
            <br />
            日本の未来をもっと明るく幸せが溢れる世の中にするために。心も身体も元気になるために。
            <br />
            <br />
            Dr.Loveを通してもっと世界を幸せにします。
          </div>
          <Image
            src="/figma-assets/left_face.png"
            alt="長谷川エミ"
            width={180}
            height={180}
            className={subImgStyle}
          />
        </div>
        <div className={subCardStyle}>
          <Image src="/figma-assets/bg_rightcard.png" alt="bg" fill className={subBgStyle} />
          <div style={{ zIndex: 2, position: 'relative', width: '100%' }}>
            <span className={subNameStyle('#3CB48A')}>松崎 星哉</span>
            <span className={subNameEnStyle('#3CB48A')}>- Seiya Matsuzaki -</span>
          </div>
          <div className={subDescStyle}>
            自信がある日もある。でも、将来が不安で眠れない夜もある。そんな自分に、そっと寄り添ってくれる存在がいたら…そう思ったことが、何度もありました。
            <br />
            <br />
            心の病に向き合えない。誰にも話せずに苦しんでいる人たち。そして、それに気づきながらも、何もできなかった自分。
            <br />
            <br />
            このままじゃダメだと思った。本気で向き合って、変えていきたい。誰もが、ひとりじゃないと思える社会をつくりたい。
            <br />
            <br />
            Dr.Loveは、その第一歩です。
          </div>
          <Image
            src="/figma-assets/right_face.png"
            alt="松崎星哉"
            width={180}
            height={180}
            className={subImgStyle}
          />
        </div>
      </div>
    </section>
  );
}
