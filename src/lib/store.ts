import { METRIC_UNITS, type Units } from "@/utils/units";
import { useAtom } from "jotai/react";
import { atomWithStorage } from "jotai/utils";

const unitsAtom = atomWithStorage<Units>("units", METRIC_UNITS);

export const useUnitsStore = () => useAtom(unitsAtom);
