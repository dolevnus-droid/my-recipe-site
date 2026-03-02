'use client';

import React from 'react';

const conversions = [
  {
    category: "קמחים ואבקות",
    items: [
      { name: "קמח רגיל / תופח", cup: "1 כוס", grams: "140 גרם" },
      { name: "קורנפלור", cup: "1 כוס", grams: "140 גרם" },
      { name: "אבקת סוכר", cup: "1 כוס", grams: "120 גרם" },
      { name: "קקאו", cup: "1 כוס", grams: "140 גרם" },
      { name: "אבקת אפייה / סודה לשתייה", cup: "1 כף", grams: "10 גרם" },
    ]
  },
  {
    category: "סוכרים וממתיקים",
    items: [
      { name: "סוכר לבן", cup: "1 כוס", grams: "200 גרם" },
      { name: "סוכר חום דחוס", cup: "1 כוס", grams: "240 גרם" },
      { name: "דבש / סילאן / גלוקוזה", cup: "1 כוס", grams: "320 גרם" },
      { name: "דבש / סילאן", cup: "1 כף", grams: "20 גרם" },
    ]
  },
  {
    category: "שומנים",
    items: [
      { name: "חמאה", cup: "1 כוס", grams: "226 גרם" },
      { name: "שמן צמחי", cup: "1 כוס", grams: "200 גרם" },
      { name: "חמאה", cup: "1 כף", grams: "14 גרם" },
    ]
  },
  {
    category: "נוזלים ומוצרי חלב",
    items: [
      { name: "מים / חלב / מיץ", cup: "1 כוס", grams: "240 מ״ל" },
      { name: "שמנת מתוקה", cup: "1 כוס", grams: "240 מ״ל" },
      { name: "יוגורט / שמנת חמוצה", cup: "1 כוס", grams: "240 גרם" },
    ]
  }
];

export default function ConversionsPage() {
  return (
    <main style={{ direction: 'rtl', backgroundColor: '#FDFCFB', minHeight: '100vh', padding: '60px 20px', color: '#434641' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Assistant:wght@200;300;400;600&display=swap');
        body { font-family: 'Assistant', sans-serif; }
        .conversion-card { background: white; border-radius: 20px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.02); border: 1px solid #F1EDE8; margin-bottom: 30px; }
        .conversion-table { width: 100%; border-collapse: collapse; }
        .conversion-table th { text-align: right; color: #6B705C; padding: 12px; border-bottom: 2px solid #F9F7F4; font-weight: 600; }
        .conversion-table td { padding: 12px; border-bottom: 1px solid #F9F7F4; color: #8A8D84; }
        .back-link { display: inline-block; margin-bottom: 40px; color: #6B705C; text-decoration: none; font-weight: 600; transition: 0.3s; }
        .back-link:hover { transform: translateX(5px); }
      `}</style>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <a href="/" className="back-link">← חזרה למתכונים</a>
        
        <header style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '42px', fontWeight: '200', color: '#6B705C', margin: 0 }}>המרת מידות באפייה</h1>
          <p style={{ color: '#8A8D84', marginTop: '10px' }}>המדריך המלא למעבר בין כוסות לגרמים</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
          {conversions.map((section, idx) => (
            <div key={idx} className="conversion-card">
              <h3 style={{ color: '#6B705C', marginBottom: '20px', borderRight: '3px solid #A4AC86', paddingRight: '15px' }}>
                {section.category}
              </h3>
              <table className="conversion-table">
                <thead>
                  <tr>
                    <th>מצרך</th>
                    <th>מידה</th>
                    <th>משקל/נפח</th>
                  </tr>
                </thead>
                <tbody>
                  {section.items.map((item, i) => (
                    <tr key={i}>
                      <td>{item.name}</td>
                      <td>{item.cup}</td>
                      <td style={{ fontWeight: '600' }}>{item.grams}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <footer style={{ marginTop: '60px', textAlign: 'center', color: '#A4AC86', fontSize: '14px' }}>
          <p>המידות מתייחסות לכוס מדידה בינלאומית סטנדרטית (240 מ"ל)</p>
        </footer>
      </div>
    </main>
  );
}