import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DATE_FORMATS,
    DAYS,
    formatDate,
    getDaysToNextWeekDay,
    getNextTimeByDay,
} from "@/utils/time";
import { useNavigate } from "@tanstack/react-router";

export function DaySelect() {
    const navigate = useNavigate();

    const handleDaySelect = (day: string) => {
        navigate({
            hash: getNextTimeByDay(Number(day)),
            hashScrollIntoView: {
                behavior: "smooth",
                block: "start",
                inline: "start",
            },
        });
    };

    return (
        <Select onValueChange={handleDaySelect}>
            <SelectTrigger>
                <SelectValue placeholder="Wednesday" />
            </SelectTrigger>
            <SelectContent className="w-54" side="bottom" align="end">
                {[...DAYS.entries()]
                    .sort(
                        ([a], [b]) =>
                            getDaysToNextWeekDay(a) - getDaysToNextWeekDay(b),
                    )
                    .map(([i, day]) => (
                        <SelectItem
                            key={day}
                            value={String(i)}
                            className="data-[show-date=true]:[&_span]:inline"
                            data-show-date
                        >
                            {day}{" "}
                            <span className="text-xs text-muted-foreground hidden">
                                {formatDate(
                                    getNextTimeByDay(i),
                                    DATE_FORMATS.SHORT,
                                )}
                            </span>
                        </SelectItem>
                    ))}
            </SelectContent>
        </Select>
    );
}
