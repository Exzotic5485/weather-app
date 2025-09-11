import drizzleImg from "@/assets/icon-drizzle.webp";
import fogImg from "@/assets/icon-fog.webp";
import overcastImg from "@/assets/icon-overcast.webp";
import partlyCloudyImg from "@/assets/icon-partly-cloudy.webp";
import rainImg from "@/assets/icon-rain.webp";
import snowImg from "@/assets/icon-snow.webp";
import thunderImg from "@/assets/icon-storm.webp";
import sunnyImg from "@/assets/icon-sunny.webp";

const ICON_MAP: Record<string, (number | [number, number])[]> = {
    [sunnyImg]: [0, 1],
    [partlyCloudyImg]: [2],
    [overcastImg]: [3],
    [drizzleImg]: [[50, 59]],
    [rainImg]: [[60, 69]],
    [fogImg]: [[40, 49]],
    [thunderImg]: [[95, 99]],
    [snowImg]: [[70, 79]],
};

export function weatherCodeToIconSrc(code: number) {
    for (const [src, ranges] of Object.entries(ICON_MAP)) {
        for (const range of ranges) {
            if (typeof range === "number") {
                if (range === code) return src;
            } else {
                if (code >= range[0] && code <= range[1]) return src;
            }
        }
    }

    return sunnyImg;
}
