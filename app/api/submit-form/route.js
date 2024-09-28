// /app/api/submit-form/route.js

import { connectToDatabase } from "@lib/mongodb"; // Adjust path as necessary
import FormSubmission from "@models/FormSubmission"; // Define a Mongoose model

export async function POST(request) {
  try {
    const data = await request.json();

    // Basic validation
    if (!data.name || !data.email || !data.message) {
      return new Response(JSON.stringify({ error: 'All fields are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Connect to the database
    await connectToDatabase();

    // Create a new form submission
    const newSubmission = new FormSubmission({
      name: data.name,
      email: data.email,
      message: data.message,
      submittedAt: new Date(),
    });

    await newSubmission.save();

    return new Response(JSON.stringify({ success: true }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error submitting form:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
