import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { requireAdmin } from '@/lib/auth';
import { VEHICLE_PRICES, VEHICLE_LABELS } from '@/lib/pricing';

const VEHICLE_KEYS = ['economy', 'executive', 'suv', 'van'] as const;

/**
 * GET /api/pricing — public, returns current vehicle pricing.
 * Falls back to hardcoded values if the DB table doesn't exist yet.
 */
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('vehicle_pricing')
      .select('vehicle_key, label, price')
      .order('vehicle_key');

    if (!error && data && data.length > 0) {
      const prices: Record<string, number> = {};
      const labels: Record<string, string> = {};
      for (const row of data) {
        prices[row.vehicle_key] = Number(row.price);
        labels[row.vehicle_key] = row.label;
      }
      return NextResponse.json({ prices, labels, source: 'database' });
    }

    return NextResponse.json({
      prices: VEHICLE_PRICES,
      labels: VEHICLE_LABELS,
      source: 'default',
    });
  } catch {
    return NextResponse.json({
      prices: VEHICLE_PRICES,
      labels: VEHICLE_LABELS,
      source: 'default',
    });
  }
}

/**
 * PUT /api/pricing — admin only, updates vehicle pricing.
 * Body: { prices: { economy: 500, executive: 800, ... }, labels?: { economy: "Sedan", ... } }
 */
export async function PUT(request: NextRequest) {
  const auth = await requireAdmin();
  if (!auth) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { prices, labels } = body as {
      prices: Record<string, number>;
      labels?: Record<string, string>;
    };

    if (!prices || typeof prices !== 'object') {
      return NextResponse.json({ error: 'prices object is required' }, { status: 400 });
    }

    const upserts = VEHICLE_KEYS.map((key) => ({
      vehicle_key: key,
      label: labels?.[key] || VEHICLE_LABELS[key] || key,
      price: prices[key] ?? VEHICLE_PRICES[key],
      updated_at: new Date().toISOString(),
    }));

    const { error } = await supabaseAdmin
      .from('vehicle_pricing')
      .upsert(upserts, { onConflict: 'vehicle_key' });

    if (error) {
      console.error('Failed to update pricing:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Pricing updated successfully' });
  } catch (error: any) {
    console.error('Pricing update error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
