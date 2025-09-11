import rainCloudImg from "@/assets/icon-rain.webp";

export function DailyForecastGrid() {
    return (
        <div className="grid grid-cols-3 md:grid-cols-7 gap-4">
            <div className="bg-surface py-4 px-2.5 rounded-3xl border flex flex-col items-center gap-4">
                <span className="font-medium text-center">Tue</span>
                <img alt="rain" src={rainCloudImg} className="size-15" />
                <div className="w-full flex items-center justify-between font-medium text-sm">
                    <span>20°</span>
                    <span className="text-neutral-200">14°</span>
                </div>
            </div>
            <div className="bg-surface py-4 px-2.5 rounded-3xl border flex flex-col items-center gap-4">
                <span className="font-medium text-center">Wed</span>
                <img alt="rain" src={rainCloudImg} className="size-15" />
                <div className="w-full flex items-center justify-between font-medium text-sm">
                    <span>20°</span>
                    <span className="text-neutral-200">14°</span>
                </div>
            </div>
            <div className="bg-surface py-4 px-2.5 rounded-3xl border flex flex-col items-center gap-4">
                <span className="font-medium text-center">Thur</span>
                <img alt="rain" src={rainCloudImg} className="size-15" />
                <div className="w-full flex items-center justify-between font-medium text-sm">
                    <span>20°</span>
                    <span className="text-neutral-200">14°</span>
                </div>
            </div>
            <div className="bg-surface py-4 px-2.5 rounded-3xl border flex flex-col items-center gap-4">
                <span className="font-medium text-center">Fri</span>
                <img alt="rain" src={rainCloudImg} className="size-15" />
                <div className="w-full flex items-center justify-between font-medium text-sm">
                    <span>20°</span>
                    <span className="text-neutral-200">14°</span>
                </div>
            </div>
            <div className="bg-surface py-4 px-2.5 rounded-3xl border flex flex-col items-center gap-4">
                <span className="font-medium text-center">Sat</span>
                <img alt="rain" src={rainCloudImg} className="size-15" />
                <div className="w-full flex items-center justify-between font-medium text-sm">
                    <span>20°</span>
                    <span className="text-neutral-200">14°</span>
                </div>
            </div>
            <div className="bg-surface py-4 px-2.5 rounded-3xl border flex flex-col items-center gap-4">
                <span className="font-medium text-center">Sun</span>
                <img alt="rain" src={rainCloudImg} className="size-15" />
                <div className="w-full flex items-center justify-between font-medium text-sm">
                    <span>20°</span>
                    <span className="text-neutral-200">14°</span>
                </div>
            </div>
            <div className="bg-surface py-4 px-2.5 rounded-3xl border flex flex-col items-center gap-4">
                <span className="font-medium text-center">Mon</span>
                <img alt="rain" src={rainCloudImg} className="size-15" />
                <div className="w-full flex items-center justify-between font-medium text-sm">
                    <span>20°</span>
                    <span className="text-neutral-200">14°</span>
                </div>
            </div>
        </div>
    );
}
