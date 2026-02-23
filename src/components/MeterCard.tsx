import React from "react";
import { ChevronRight } from "lucide-react";

export interface MeterSegment {
    color: string;
    widthPercent: number;
}

export interface MeterCardProps {
    title: string;
    value: React.ReactNode;
    min: number;
    max: number;
    current: number;
    leftLabel: string;
    rightLabel: string;
    segments?: MeterSegment[];
    trackBackground?: string; // e.g. "linear-gradient(...)"
    className?: string;
    subtitle?: string; // For things like "Bitcoin    Altcoin" secondary labels above the track if needed
}

const MeterCard: React.FC<MeterCardProps> = ({
    title,
    value,
    min,
    max,
    current,
    leftLabel,
    rightLabel,
    segments,
    trackBackground,
    className = "",
    subtitle
}) => {
    // Calculate dot position (clamped between 0 and 100)
    let percentage = ((current - min) / (max - min)) * 100;
    percentage = Math.max(0, Math.min(100, percentage));

    return (
        <div className={`bg-surface-1 rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between ${className}`}>
            <div className="mb-6">
                <div className="flex items-center text-sm font-semibold text-primary mb-1 group cursor-pointer w-fit leading-none">
                    {title}
                    <ChevronRight className="w-4 h-4 text-secondary ml-1 group-hover:text-primary transition-colors" />
                </div>
                <div className="text-2xl font-bold text-primary flex items-baseline gap-2">
                    {value}
                </div>
            </div>

            <div className="mt-auto">
                <div className="flex justify-between w-full text-xs text-secondary font-medium mb-2">
                    <span>{leftLabel}</span>
                    <span>{rightLabel}</span>
                </div>

                {subtitle && (
                    <div className="flex justify-between w-full text-[10px] text-secondary/70 font-medium mb-1">
                        <span>{subtitle.split('|')[0]}</span>
                        <span>{subtitle.split('|')[1]}</span>
                    </div>
                )}

                <div className="w-full h-1.5 bg-background-2 rounded-full relative">
                    {/* Render segments if provided */}
                    {segments && segments.map((seg, i) => {
                        const leftPos = segments.slice(0, i).reduce((acc, s) => acc + s.widthPercent, 0);
                        return (
                            <div
                                key={i}
                                className="absolute top-0 h-full first:rounded-l-full last:rounded-r-full"
                                style={{
                                    left: `${leftPos}%`,
                                    width: `${seg.widthPercent}%`,
                                    backgroundColor: seg.color
                                }}
                            />
                        );
                    })}

                    {/* Render continuous background if provided instead of segments */}
                    {!segments && trackBackground && (
                        <div
                            className="absolute top-0 left-0 w-full h-full rounded-full"
                            style={{ background: trackBackground }}
                        />
                    )}

                    {/* Indicator Dot */}
                    <div
                        className="absolute top-1/2 w-3.5 h-3.5 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_4px_rgba(0,0,0,0.3)] transition-all duration-300"
                        style={{ left: `${percentage}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default MeterCard;
