// src/components/LessonPlanForm.tsx
import { useState } from 'react';
import axios from 'axios';
import LessonPlanView from './LessonPlanView';

interface FormData {
  subject: string;
  gradeLevel: string;
  durationMinutes: number;
  learningStyle: string;
  specialRequirements: string;
}

export default function LessonPlanForm() {
  const [form, setForm] = useState<FormData>({
    subject: '',
    gradeLevel: '',
    durationMinutes: 60,
    learningStyle: 'mixed',
    specialRequirements: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      // POST to your .NET backend on Railway
      // REPLACE the URL below with your actual Railway domain!
      const { data } = await axios.post('https://lesson-maker-api-production.up.railway.app/api/LessonPlan/generate', form);
      setResult(data);
    } catch (err) {
      console.error('Generation failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Create a Lesson Plan</h2>
      
      <input
        placeholder="Subject (e.g. Photosynthesis)"
        value={form.subject}
        onChange={e => setForm({ ...form, subject: e.target.value })}
      />
      
      <select
        value={form.gradeLevel}
        onChange={e => setForm({ ...form, gradeLevel: e.target.value })}
      >
        <option value="">Select Grade Level</option>
        <option value="K-2">K–2</option>
        <option value="3-5">Grade 3–5</option>
        <option value="6-8">Grade 6–8</option>
        <option value="9-12">Grade 9–12</option>
      </select>
      
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generating…' : 'Generate Lesson Plan'}
      </button>
      
      {/* We will uncomment this once we build the LessonPlanView component! */}
      {result && <LessonPlanView plan={result} />}
    </div>
  );
}