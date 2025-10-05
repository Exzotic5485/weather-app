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

type DaySelectProps = {
    value: number;
    onValueChange: (value: number) => unknown;
};

export function DaySelect({ value, onValueChange }: DaySelectProps) {
    return (
        <Select
            value={String(value)}
            onValueChange={(v) => onValueChange(Number(v))}
        >
            <SelectTrigger>
                <SelectValue />
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
