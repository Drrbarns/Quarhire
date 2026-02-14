'use client';

import { useState } from 'react';

interface StatusCheckButtonProps {
    clientReference: string;
}

export default function StatusCheckButton({ clientReference }: StatusCheckButtonProps) {
    const [isChecking, setIsChecking] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [showPayload, setShowPayload] = useState(false);

    const handleCheck = async () => {
        setIsChecking(true);
        setResult(null);

        try {
            const response = await fetch('/api/hubtel/status-check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ clientReference })
            });

            const data = await response.json();
            setResult(data);
        } catch (error: any) {
            setResult({ error: true, message: error.message });
        } finally {
            setIsChecking(false);
        }
    };

    return (
        <div className="inline-block">
            {!result ? (
                <button
                    onClick={handleCheck}
                    disabled={isChecking}
                    className="text-xs text-[#0074C8] hover:underline font-medium disabled:opacity-50 flex items-center gap-1"
                >
                    {isChecking ? (
                        <>
                            <i className="ri-loader-4-line animate-spin"></i>
                            Checking...
                        </>
                    ) : (
                        <>
                            <i className="ri-search-line"></i>
                            Check Status
                        </>
                    )}
                </button>
            ) : (
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${result.status === 'Paid' ? 'bg-green-100 text-green-800' :
                                result.status === 'Unpaid' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-gray-100 text-gray-800'
                            }`}>
                            {result.status || 'Error'}
                        </span>
                        <button
                            onClick={() => setShowPayload(!showPayload)}
                            className="text-xs text-[#0074C8] hover:underline"
                        >
                            {showPayload ? 'Hide' : 'View'} Response
                        </button>
                        <button
                            onClick={() => { setResult(null); setShowPayload(false); }}
                            className="text-xs text-gray-400 hover:text-gray-600"
                        >
                            <i className="ri-refresh-line"></i>
                        </button>
                    </div>

                    {showPayload && (
                        <pre className="p-2 bg-gray-900 text-green-400 rounded text-[10px] overflow-auto max-w-sm max-h-40">
                            {JSON.stringify(result, null, 2)}
                        </pre>
                    )}
                </div>
            )}
        </div>
    );
}
