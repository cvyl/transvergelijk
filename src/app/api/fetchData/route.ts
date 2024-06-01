export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { scrapeData } from '../../utils/scrapeData';
import { HospitalData } from '../../../types/hospitalData';

export async function GET(request: NextRequest) {
    const data: HospitalData[] = await scrapeData();
    return NextResponse.json(data);
}
