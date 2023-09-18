import React from "react";

type TBadgeProps = {
  badge: EBadges;
  count: number;
};

enum EBadges {
  NEW = "NEW",
  LINK = "LINK",
  KNOWN = "KNOWN",
  UNIQUE = "UNIQUE",
}

enum EBadgesType {
  NEW = "badge-new",
  LINK = "badge-link",
  KNOWN = "badge-known",
  UNIQUE = "badge-unique",
}

enum EBadgeCount {
  NEW = "badge-new-count",
  LINK = "badge-link-count",
  KNOWN = "badge-known-count",
  UNIQUE = "badge-unique-count",
}

export default function Badge({ badge, count }: TBadgeProps) {
  return (
    <div
      className={`${EBadgesType[badge]} inline-flex items-center px-3 py-1 text-sm font-medium text-center text-whiterounded-lg rounded-2xl focus:ring-4 focus:outline-none text-white`}
    >
      {badge.toLowerCase()}
      <span
        className={`${EBadgeCount[badge]} inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold rounded-full`}
      >
        {count}
      </span>
    </div>
  );
}
