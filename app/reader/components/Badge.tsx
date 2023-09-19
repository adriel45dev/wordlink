import React from "react";

type TBadgeProps = {
  state: EWordState;
  count: number;
};

enum EWordState {
  NEW = "NEW",
  LINK = "LINK",
  KNOWN = "KNOWN",
  UNIQUE = "UNIQUE",
}

enum EWordStateBadge {
  NEW = "badge-new",
  LINK = "badge-link",
  KNOWN = "badge-known",
  UNIQUE = "badge-unique",
}

enum EWordStateBadgeCount {
  NEW = "badge-new-count",
  LINK = "badge-link-count",
  KNOWN = "badge-known-count",
  UNIQUE = "badge-unique-count",
}

export default function Badge({ state, count }: TBadgeProps) {
  return (
    <div
      className={`${EWordStateBadge[state]} inline-flex items-center px-3 py-1 text-sm font-medium text-center text-whiterounded-lg rounded-2xl focus:ring-4 focus:outline-none text-white`}
    >
      {state.toLowerCase()}
      <span
        className={`${EWordStateBadgeCount[state]} inline-flex items-center justify-center w-8 h-8 ml-2 text-xs font-semibold rounded-full`}
      >
        {count}
      </span>
    </div>
  );
}
