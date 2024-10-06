import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';

export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db('trippyway');

        const { memberData, selectedPackage } = await request.json();

        console.log('Received data:', { memberData, selectedPackage });

        const query = { id: selectedPackage };

        const update = {
            $addToSet: {
                memberData: { $each: memberData.members }
            },
        };

        const result = await db.collection('packages').updateOne(query, update);
        console.log('Update result:', result);
        if (result.modifiedCount === 0) {
            return NextResponse.json({ message: 'No package found to update or no new members added' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Members Added Successfully' });
    } catch (error) {
        console.error('Error updating member data:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
