
export default function VehiclesPage() {
    return (
        <div>
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-[#0A0A0A] mb-2">Vehicles</h2>
                    <p className="text-[#2B2F35]">Manage your fleet and pricing</p>
                </div>
                <button className="px-4 py-2 bg-[#0A0A0A] text-white rounded-xl font-medium hover:bg-[#2B2F35] flex items-center gap-2">
                    <i className="ri-add-line"></i> Add Vehicle
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-[#DDE2E9] shadow-sm p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                    <i className="ri-roadster-line text-3xl"></i>
                </div>
                <h3 className="text-xl font-bold text-[#0A0A0A] mb-2">Vehicle Management</h3>
                <p className="text-[#2B2F35] max-w-md mx-auto mb-6">
                    This module is currently under development. Soon you will be able to manage your fleet, update prices, and set vehicle availability here.
                </p>
                <button className="px-6 py-3 bg-white border border-[#DDE2E9] text-[#0A0A0A] font-medium rounded-xl hover:bg-gray-50 transition-colors" disabled>
                    Feature Coming Soon
                </button>
            </div>
        </div>
    );
}
