import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('trippyway');
        const packages = await db.collection('packages').find({}).toArray();

        return NextResponse.json(packages, { status: 200 });
    } catch (error) {
        console.error('Error fetching packages:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
