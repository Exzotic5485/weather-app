import { getDay } from "@/utils/time";
import { METRIC_UNITS, type Units } from "@/utils/units";
import { atom } from "jotai";
import { useAtom } from "jotai/react";
import { atomWithStorage } from "jotai/utils";

const unitsAtom = atomWithStorage<Units>("units", METRIC_UNITS);

export const useUnitsStore = () => useAtom(unitsAtom);

const dayAtom = atom(getDay());

export const useDayStore = () => useAtom(dayAtom);
