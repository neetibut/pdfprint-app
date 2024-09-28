// /models/FormSubmission.js

import mongoose from "mongoose";

const FormSubmissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
});

// Prevent model recompilation during hot reloads
export default mongoose.models.FormSubmission || mongoose.model('FormSubmission', FormSubmissionSchema);
