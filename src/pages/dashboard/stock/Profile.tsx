import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getStockProfile } from "../../../lib/data";
import type { StockProfile } from "../../../lib/definitions";

const Profile = () => {
    const { id } = useParams<{ id: string }>();
    const [profile, setProfile] = useState<StockProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!id) return;
            try {
                setIsLoading(true);
                const data = await getStockProfile(Number(id));
                setProfile(data);
            } catch (error) {
                console.error("Failed to fetch profile:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [id]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="p-8 text-center text-gray-500">
                No profile information available for this stock.
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8 p-6">
            {/* Header / Basic Info */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile.name} ({profile.symbol})</h1>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">location_on</span>
                        {profile.headquarters || "Unknown Location"}
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">language</span>
                        <a href={profile.website || "#"} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {profile.website ? new URL(profile.website).hostname : "No Website"}
                        </a>
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">groups</span>
                        {profile.employees ? `${profile.employees.toLocaleString()} Employees` : "N/A Employees"}
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">event</span>
                        Founded {profile.founded || "N/A"}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Description */}
                <div className="lg:col-span-2 space-y-6">
                    <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Business Description</h2>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm">
                            {profile.description || "No description available."}
                        </p>
                    </section>
                </div>

                {/* Sidebar Details */}
                <div className="space-y-6">
                    <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4">Company Details</h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Sector</p>
                                <p className="text-sm text-gray-700">{profile.sector || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Industry</p>
                                <p className="text-sm text-gray-700">{profile.industry || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Exchange</p>
                                <p className="text-sm text-gray-700">{profile.exchange || "NGX"}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Currency</p>
                                <p className="text-sm text-gray-700">{profile.currency || "NGN"}</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* Executives */}
            <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-6 font-primary">Key Executives</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-50 text-xs text-gray-400 uppercase font-bold tracking-wider">
                                <th className="pb-4 pr-4">Name</th>
                                <th className="pb-4 pr-4">Title</th>
                                <th className="pb-4 pr-4 text-center">Age</th>
                                <th className="pb-4 pr-4 text-right">Since</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {profile.executives && profile.executives.length > 0 ? (
                                profile.executives.map((exec) => (
                                    <tr key={exec.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-4 pr-4 text-sm font-bold text-gray-900">{exec.name}</td>
                                        <td className="py-4 pr-4 text-sm text-gray-600">{exec.title || "N/A"}</td>
                                        <td className="py-4 pr-4 text-sm text-gray-600 text-center">{exec.age || "--"}</td>
                                        <td className="py-4 pr-4 text-sm text-gray-600 text-right">{exec.since || "--"}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="py-8 text-center text-sm text-gray-400 italic">
                                        No executive information available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default Profile;

