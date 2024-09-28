// /app/api/get-submissions/route.js

import { connectToDatabase } from "../lib/mongodb"; // Adjust path as necessary
import FormSubmission from "../models/FormSubmission"; // Define the same Mongoose model

export async function GET() {
  try {
    // Connect to the database
    await connectToDatabase();

    // Fetch all submissions, sorted by submission date
    const submissions = await FormSubmission.find().sort({ submittedAt: -1 }).exec();

    // Serialize the data
    const serializedSubmissions = submissions.map(sub => ({
      id: sub._id.toString(),
      name: sub.name,
      email: sub.email,
      message: sub.message,
      submittedAt: sub.submittedAt,
    }));

    return new Response(JSON.stringify({ submissions: serializedSubmissions }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
