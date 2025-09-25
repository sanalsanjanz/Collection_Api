// pages/api/collect.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer } from '../../lib/supabaseServer';
import { addMonths, parseISO } from 'date-fns';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).end();
    const { admin_id, member_id, amount, num_months = 1, start_month, reason = 'monthly collection' } = req.body;
    if (!admin_id || !member_id || !amount || !start_month) return res.status(400).json({ error: 'missing fields' });

    // we evenly distribute amount per month if you want; here we assume the UI sends amount per month * num_months OR you intend to split
    // For simplicity, treat `amount` as total paid; we'll assign equal amounts per month:
    const perMonth = Number(amount) / Number(num_months);

    const inserts = [];
    let monthDate = parseISO(start_month); // expects 'YYYY-MM-01'
    for (let i = 0; i < num_months; i++) {
        inserts.push({
            admin_id,
            member_id,
            amount: perMonth,
            reason,
            for_month: monthDate.toISOString().slice(0, 10) // YYYY-MM-DD
        });
        monthDate = addMonths(monthDate, 1);
    }

    const { data, error } = await supabaseServer.from('collections').insert(inserts).select();
    if (error) return res.status(500).json({ error: error.message });
    res.json({ collections: data });
}
