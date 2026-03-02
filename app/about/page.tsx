import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-right" dir="rtl">
      
      {/* כפתור חזרה קטן ועדין */}
      <div className="mb-12">
        <Link href="/" className="text-sm text-gray-400 hover:text-amber-600 transition-colors flex items-center gap-1 group">
          <span className="group-hover:-translate-x-1 transition-transform">→</span>
          <span className="border-b border-transparent hover:border-amber-600">חזרה למתכונים</span>
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">קצת עלי</h1>

      <div className="flex flex-col md:flex-row-reverse gap-10 items-start">
        
        {/* חלק הטקסט */}
        <div className="flex-1 space-y-6 text-lg leading-relaxed text-gray-700">
          
          <div className="bg-amber-50 p-6 rounded-2xl border-r-4 border-amber-200 shadow-sm">
            <p className="text-xl font-semibold text-gray-800">
              אני שירה, עובדת הייטק ביום וקוסמת בלילה. ✨
            </p>
            <p className="mt-2">
              לקח לי לא מעט זמן להבין איך משלבים הכל יחד, אבל כנראה שכשעושים את מה שאוהבים אז זה אפשרי ואפילו טעים :)
            </p>
          </div>

          <p>
            לקחת קמח, סוכר, שמן, ביצים... לערבב בקערה אחת פשוטה, להכניס לתנור. זה כל מה שצריך כדי שהקסם יקרה.
          </p>

          <p>
            ברגע שגיליתי את זה, התמכרתי לאפייה! קחו לכם רגע לחשוב על זה – איך מכמה דברים פשוטים שיש בכל בית אפשר להכין בכל רגע נתון עוגה או עוגיות, ואפילו להגיע לקינוח מרשים במיוחד. 
            <strong> אם זה לא קסם – אז אני לא יודעת מה כן.</strong>
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-8 underline decoration-amber-200 decoration-4 underline-offset-8">
            הבלוג שלי והניסויים שבדרך
          </h3>
          <p>
            הבלוג שלי עוסק באפייה בעיקר, אבל גם בניסויים במטבח. למשל – האם יש כמות מדויקת של שמרים כדי להגיע למאפה איכותי ומוצלח במיוחד? מה יקרה אם נשים קצת יותר או קצת פחות?
          </p>

          <p>
            מזמינה אתכם להיסחף איתי ולגלות את קסמי המטבח. יחד נכין קינוחים ביתיים (גם כאלה שמכינים עם תינוק על הידיים..), קינוחי רושם, אבל גם נעז וננסה דברים חדשים.
          </p>
          
          <div className="bg-gray-100 p-6 rounded-2xl border border-dashed border-gray-300 mt-10 text-center">
            <p className="font-bold text-gray-800 mb-2">זהו בלוג אינטראקטיבי!</p>
            <p className="text-gray-600">
              אתם יותר ממוזמנים להשתתף, להציע רעיונות לניסויים, לשאול שאלות ולשתף בידע וביצירות המהממות שלכם.
            </p>
          </div>
        </div>

        {/* חלק התמונה - עובד עכשיו עם התמונה ב-public */}
        <div className="w-full md:w-80 flex-shrink-0 sticky top-20">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 border-8 border-white bg-white group">
            {/* השתמשתי בתגית <img> פשוטה כדי לעקוף בעיות Build */}
            <img 
              src="/shira-roses.jpg" 
              alt="שירה - בייק אנד באלאנס" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
          </div>
          <p className="text-center text-xs text-gray-400 mt-4 italic">
           
          </p>
        </div>

      </div>
    </main>
  );
}