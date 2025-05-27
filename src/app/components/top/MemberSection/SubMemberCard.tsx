import type React from 'react';
import { FlippableMemberCard } from './FlippableMemberCard';
import type { MemberCardType } from './MemberCardType';

type Props = {
  card: MemberCardType;
  refObj?: React.Ref<HTMLDivElement>;
  className?: string;
};

export const SubMemberCard: React.FC<Props> = ({ card, refObj, className }) => {
  return <FlippableMemberCard card={card} variant="sub" refObj={refObj} className={className} />;
};
