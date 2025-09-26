// pages/api/unpaid.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer } from '../../lib/supabaseServer';

// define the expected types
interface Collection {
    id: string;
    for_month: string;
}

interface Member {
    id: string;
    admin_id: string;
    active: boolean;
    collections?: Collection[];
    // add other member fields if needed
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { admin_id, month } = req.query; // month in format 'YYYY-MM' or '2025-09'
    if (!admin_id || !month) {
        return res.status(400).json({ error: 'admin_id and month required' });
    }

    // convert to first day for for_month comparison
    const monthStart = `${String(month)}-01`;

    // query members + their collections
    const { data: members, error: e2 } = await supabaseServer
        .from('members')
        .select('id, admin_id, active, collections (id, for_month)')
        .eq('admin_id', admin_id)
        .eq('active', true);

    if (e2) {
        return res.status(500).json({ error: e2.message });
    }

    const membersTyped: Member[] = (members ?? []) as Member[];

    // filter members without collections for monthStart
    const unpaid = membersTyped.filter((m) => {
        const hasCollectionForMonth = (m.collections ?? []).some((c) =>
            c.for_month?.startsWith(monthStart)
        );
        return !hasCollectionForMonth;
    });

    res.json({ unpaid });
}
