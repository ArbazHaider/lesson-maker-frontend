import { PDFDownloadLink } from '@react-pdf/renderer';
import { LessonPlanPDF } from './LessonPlanPDF';

export default function LessonPlanView({ plan }: { plan: any }) {
  return (
    <div className="view-container" style={{ marginTop: '20px', padding: '20px', borderTop: '2px solid #eee' }}>
      <h3>Your Lesson Plan is Ready! 🎉</h3>
      
      {/* This is the download button snippet you provided */}
      <PDFDownloadLink document={<LessonPlanPDF plan={plan} />} fileName={`${plan.title || 'lesson-plan'}.pdf`}>
        {({ loading }) => 
          loading ? (
            <button disabled>Preparing PDF…</button>
          ) : (
            <button style={{ backgroundColor: '#10b981', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Download PDF
            </button>
          )
        }
      </PDFDownloadLink>
    </div>
  );
}