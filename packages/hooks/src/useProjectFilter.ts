"use client";

import { useMemo, useState } from "react";

/**
 * Generic local filtering helper. Keeps filtering state out of Redux —
 * it is purely a local UI concern.
 */
export function useProjectFilter<T, C extends string>(
  items: readonly T[],
  getCategory: (item: T) => readonly C[],
  allCategory: C,
): {
  category: C;
  setCategory: (category: C) => void;
  filteredItems: readonly T[];
} {
  const [category, setCategory] = useState<C>(allCategory);

  const filteredItems = useMemo(
    () =>
      category === allCategory
        ? items
        : items.filter((item) => getCategory(item).includes(category)),
    [items, getCategory, category, allCategory],
  );

  return { category, setCategory, filteredItems };
}
