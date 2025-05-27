'use client';
import { MainMemberCard } from '@/app/components/top/MemberSection/MainMemberCard';
import type { MemberCardType } from '@/app/components/top/MemberSection/MemberCardType';
import { SubMemberCard } from '@/app/components/top/MemberSection/SubMemberCard';
import { SectionTitle } from '@/app/components/ui/SectionTitle';
import { useFadeInOnScroll } from '@/app/hooks/useFadeInOnScroll';
import { css } from '@/styled-system/css';

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

export default function MemberSection() {
  const fadeInTitleRef = useFadeInOnScroll();
  const fadeInMainRef = useFadeInOnScroll(0.01);
  const fadeInSub1Ref = useFadeInOnScroll(0.01);
  const fadeInSub2Ref = useFadeInOnScroll(0.03);

  // メインカード用card
  const mainCard: MemberCardType = {
    name: '水池 愛香',
    nameEn: 'Aika Mizuike',
    desc: (
      <>
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
      </>
    ),
    image: '/top/member/aika_1.png',
    imageAlt: '水池愛香',
    bgImage: '/figma-assets/bg_maincard.png',
    mainColor: '#FF8A5C',
    backImage: '/top/member/aika_2.png',
    backDesc: (
      <>
        18歳で就労継続支援A型の福祉事業を起業し、上京。 <br />
        幼い頃からの夢だったグラビアやアイドル活動をスタートさせる一方、 <br />
        ロングブレスインストラクターとして7年間で1,000人以上の心と体のケアに携わる。 <br />
        <br />
        23歳ではクラウドファンディングを活用し、大きな胸の女性向けファッションブランド「Charlie
        Style」を立ち上げ、 <br />
        西武百貨店でのPOPUP開催やファッションショーを通じて「自分らしく美しくある」ことを提案。
        <br />
        <br />
        25歳で発信力を高めるためYouTubeに挑戦し、徹底的な分析で100万再生超の動画を毎月輩出、 <br />
        10ヶ月で登録者10万人を突破。現在は横動画で877万再生を達成。 <br />
        <br />
        <div className={css({ sm: { width: '65%' }, xl: { width: '100%' } })}>
          YouTube運用代行会社「YouMedia」を設立し、 <br />
          「井川意高が熔ける日本を斬る」など著名人のチャンネルも多数プロデュース。 <br />
          <br />
          講師を務めた「為国辰弥らのSNSの学校」への登壇を機に、Nontitleシーズン5への挑戦を決意。{' '}
          <br />
          母のように苦しむ人々を1人にしない社会の実現を目指し、
          <br />
          「Dr. Love」を構想・創業。
        </div>
      </>
    ),
  };

  // サブカード1用card
  const subCard1: MemberCardType = {
    name: '松崎 星哉',
    nameEn: 'Seiya Matsuzaki',
    desc: (
      <>
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
      </>
    ),
    image: '/top/member/seiya_1.png',
    imageAlt: '松崎星哉',
    bgImage: '/figma-assets/bg_rightcard.png',
    color: '#4EE06A',
    backImage: '/top/member/seiya_2.png',
    backImageWrapperClassName: css({
      '& > img': {
        transform: 'scale(1.3) translate(-10%,11%)',
      },
    }),
    backDesc: (
      <>
        このサービスには誰もが救われる可能性があると感じました。
        <br />
        恋愛や外見、心のケアまで寄り添えるこの仕組みは、
        <br />
        まさに"世のため人のため"に必要なものだと確信し、 参加を決めました。
        <br />
        <br />
        中学時代はバスケ部に所属し、高卒後は社会に出て、挑戦と挫折を繰り返してきました。
        <br />
        多くの人に支えられながら、一歩ずつ前に進んできた経験が、今の原動力になっています。
        <br />
        <br />
        営業職として結果を出してきた経験があり、対話力と向上心には自信があります。
        <br />
        人と真剣に向き合う姿勢を武器に、より多くの人を支えるサービスを広げていきたいです。
        <br />
      </>
    ),
  };

  // サブカード2用card
  const subCard2: MemberCardType = {
    name: '長谷川 エミ',
    nameEn: 'Emi Hasegawa',
    desc: (
      <>
        私は過去の経験から、見た目に強く悩み、美容整形に出会ったことで初めて「笑顔になれる自分」に出会えた。{' '}
        <br /> <br />
        自分を幸せにする「ミッション」は達成できた。 <br />
        そこからDr.Loveに出会えて、 <br />
        「世の中の人を幸せにする」ミッションに改めて出会えた。 <br /> <br />
        私が感じた「新しい自分に出会える喜び」を世の中の人たちにも感じてほしい。Dr.Loveを通して感じてほしい。{' '}
        <br /> <br />
        日本の未来をもっと明るく幸せが溢れる世の中にするために。心も身体も美しくなるために。 <br />
        <br />
        Dr.Loveを通してもっと世界を幸せにします。
      </>
    ),
    image: '/top/member/emi_1.png',
    imageAlt: '長谷川エミ',
    bgImage: '/figma-assets/bg_leftcard.png',
    color: '#618BFF',
    backImage: '/top/member/emi_2.png',
    backImageWrapperClassName: css({
      right: '5%',
    }),
    backDesc: (
      <>
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
      </>
    ),
  };

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
        <MainMemberCard
          card={mainCard}
          refObj={fadeInMainRef}
          className={`${css({ gridColumn: '1 / -1' })}`}
        />
        <SubMemberCard card={subCard1} refObj={fadeInSub1Ref} />
        <SubMemberCard card={subCard2} refObj={fadeInSub2Ref} />
      </div>
    </section>
  );
}
