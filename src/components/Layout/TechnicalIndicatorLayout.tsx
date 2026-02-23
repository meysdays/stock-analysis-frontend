import type { ReactNode } from "react";

interface TechnicalIndicatorLayoutProps {
    title: string;
    description: string;
    // tabs: { label: string; href: string }[]; // Removed
    leftCards: ReactNode[];
    rightContent: ReactNode;
}

const TechnicalIndicatorLayout = ({
    title,
    description,
    // tabs, // Removed
    leftCards,
    rightContent,
}: TechnicalIndicatorLayoutProps) => {
    return (
        <div className="h-full bg-background-1 text-primary">
            <main className="p-4 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-primary mb-2">{title}</h1>
                    <p className="text-secondary max-w-6xl leading-relaxed">
                        {description}
                    </p>
                </div>

                <div className="grid grid-cols-12 gap-6 items-stretch">
                    {/* Left Column Cards */}
                    <div className="col-span-12 lg:col-span-3 flex flex-col gap-6">
                        {leftCards.map((card, index) => (
                            <div key={index}>
                                {card}
                            </div>
                        ))}
                    </div>

                    {/* Right Column Content (usually a Chart) */}
                    <div className="col-span-12 lg:col-span-9 flex flex-col">
                        {rightContent}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TechnicalIndicatorLayout;
