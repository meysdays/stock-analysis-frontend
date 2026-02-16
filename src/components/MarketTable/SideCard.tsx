interface CardProps {
    title?: string;
    value?: string | number;
    toolTip?: string;
}

const SideCard = ({ title, value }: CardProps) => {
    return (
        <div className="flex-1 bg-slate-900 p-3 rounded-xl border border-slate-800/60 shadow-inner flex flex-col justify-center items-center">
            <div className="flex w-full justify-between items-center mb-1">
                <h3 className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">{title}</h3>
            </div>

            <p className="text-lg font-mono font-bold text-slate-200">{value}</p>
        </div>
    );
};

export default SideCard;