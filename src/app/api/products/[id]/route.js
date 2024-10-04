import { NextResponse } from 'next/server';
import clientPromise from '../../../../../lib/mongodb';
export async function GET(request, { params }) {
    const { id } = params;
    try {
        const client = await clientPromise;
        const db = client.db('trippyway');
        const packageData = await db.collection('packages').findOne({ id: id });

        if (!packageData) {
            return NextResponse.json({ message: 'Package not found' }, { status: 404 });
        }
        return NextResponse.json(packageData, { status: 200 });
    } catch (error) {
        console.error('Error fetching package:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}