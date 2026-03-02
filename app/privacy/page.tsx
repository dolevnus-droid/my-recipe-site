export default function PrivacyPolicy() {
  return (
    <main style={{ 
      direction: 'rtl', 
      padding: '60px 20px', 
      maxWidth: '800px', 
      margin: '0 auto', 
      fontFamily: 'Assistant, sans-serif',
      lineHeight: '1.8',
      color: '#434641'
    }}>
      <h1 style={{ color: '#6B705C', fontSize: '32px', marginBottom: '30px' }}>מדיניות פרטיות (Privacy Policy)</h1>
      
      <p>ברוכים הבאים לאתר <strong>Bake & Balance</strong>. הפרטיות שלכם חשובה לנו מאוד.</p>

      <h2 style={{ color: '#6B705C', fontSize: '22px', marginTop: '30px' }}>1. מידע שאנו אוספים</h2>
      <p>האתר אינו דורש הרשמה ואינו אוסף מידע אישי מזהה באופן ישיר. עם זאת, אנו משתמשים בשירותי צד שלישי (כמו Google AdSense) העשויים לאסוף מידע טכני על הגלישה שלכם.</p>

      <h2 style={{ color: '#6B705C', fontSize: '22px', marginTop: '30px' }}>2. עוגיות (Cookies) ופרסומות גוגל</h2>
      <p>
        ספקים חיצוניים, כולל גוגל, משתמשים בעוגיות כדי להציג מודעות בהתבסס על ביקורים קודמים של משתמשים באתר זה או באתרים אחרים.
        שימוש של גוגל בעוגיות לפרסום (DoubleClick cookie) מאפשר לה ולשותפיה להציג מודעות למשתמשים בהתבסס על הביקור שלהם באתרים שלכם ו/או באתרים אחרים באינטרנט.
      </p>
      <p>
        באפשרותכם לבטל את השימוש בפרסום מותאם אישית על ידי ביקור ב- 
        <a href="https://www.google.com/settings/ads" target="_blank" style={{ color: '#6B705C' }}> הגדרות המודעות של גוגל</a>.
      </p>

      <h2 style={{ color: '#6B705C', fontSize: '22px', marginTop: '30px' }}>3. הסכמה</h2>
      <p>השימוש באתר מהווה הסכמה למדיניות פרטיות זו.</p>

      <div style={{ marginTop: '50px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
        <a href="/" style={{ color: '#8A8D84', textDecoration: 'none' }}>→ חזרה לדף הבית</a>
      </div>
    </main>
  );
}