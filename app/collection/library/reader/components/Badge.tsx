import React from "react";
import WordBadgeType from "@/app/shared/enums/word-badge-type.enums";

enum WordBadgeVisualStyle {
  NEW = "badge-new",
  LINK = "badge-link",
  KNOWN = "badge-known",
  UNIQUE = "badge-unique",
}

enum WordCounterVisualStyle {
  NEW = "badge-new-count",
  LINK = "badge-link-count",
  KNOWN = "badge-known-count",
  UNIQUE = "badge-unique-count",
}

type TBadgeProps = {
  state: WordBadgeType;
  count: number;
};

export default function Badge({ state, count }: TBadgeProps) {
  return (
    <div
      className={`${WordBadgeVisualStyle[state]} text-whiterounded-lg flex w-full  items-center justify-between rounded-2xl px-6  py-1 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 md:w-auto`}
    >
      {state.toLowerCase()}

      <span
        className={`${WordCounterVisualStyle[state]} ml-2 flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold`}
      >
        {count}
      </span>
    </div>
  );
}
