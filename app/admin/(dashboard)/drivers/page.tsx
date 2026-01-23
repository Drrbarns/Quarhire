
import { supabaseAdmin } from '@/lib/supabase/admin';
import DriverForm from './driver-form';

export default async function DriversPage() {
    // Fetch drivers from Supabase
    const { data: drivers, error } = await supabaseAdmin
        .from('drivers')
        .select('*')
        .order('name', { ascending: true });

    // Note: If table doesn't exist yet, this will error. 
    // We should handle that gracefully or show empty state if migration not run.

    return (
        <div>
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-[#0A0A0A] mb-2">Drivers</h2>
                    <p className="text-[#2B2F35]">Manage your fleet drivers</p>
                </div>
                <DriverForm />
            </div>

            <div className="bg-white rounded-2xl border border-[#DDE2E9] shadow-sm overflow-hidden">
                {error ? (
                    <div className="p-12 text-center">
                        <div className="inline-block p-4 rounded-full bg-red-100 text-red-500 mb-4">
                            <i className="ri-database-2-line text-3xl"></i>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Driver Database Not Found</h3>
                        <p className="text-gray-500 max-w-md mx-auto mb-6">
                            It seems the drivers table hasn't been created yet. Please run the migration script provided in SUPABASE_DRIVERS_SETUP.md.
                        </p>
                    </div>
                ) : drivers && drivers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                        {drivers.map((driver: any) => (
                            <div key={driver.id} className="border border-[#DDE2E9] rounded-xl p-6 hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold text-lg">
                                            {driver.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#0A0A0A]">{driver.name}</h4>
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded textxs font-medium ${driver.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                {driver.status}
                                            </span>
                                        </div>
                                    </div>
                                    <button className="text-gray-400 hover:text-[#0074C8]">
                                        <i className="ri-more-2-fill"></i>
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-[#2B2F35]">
                                        <i className="ri-phone-line text-gray-400"></i>
                                        {driver.phone}
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-[#2B2F35]">
                                        <i className="ri-roadster-line text-gray-400"></i>
                                        {driver.vehicle_model || 'No vehicle'}
                                        {driver.vehicle_plate && <span className="text-gray-400">({driver.vehicle_plate})</span>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-12 text-center text-gray-500">
                        <i className="ri-steering-2-line text-4xl mb-4 block text-gray-300"></i>
                        <p>No drivers added yet. Click "Add Driver" to start.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
