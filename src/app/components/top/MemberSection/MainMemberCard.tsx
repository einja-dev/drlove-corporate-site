import { FlippableMemberCard } from '@/app/components/top/MemberSection/FlippableMemberCard';
import type { MemberCardType } from '@/app/components/top/MemberSection/MemberCardType';
import type React from 'react';

type Props = {
  card: MemberCardType;
  refObj?: React.Ref<HTMLElement>;
  className?: string;
};

export const MainMemberCard: React.FC<Props> = ({ card, refObj, className }) => {
  return <FlippableMemberCard card={card} variant="main" refObj={refObj} className={className} />;
};
