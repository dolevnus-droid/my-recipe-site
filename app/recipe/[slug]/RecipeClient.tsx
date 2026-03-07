'use client';

import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { useEffect, useMemo, useState } from 'react';
import AdUnit from '@/sanity/components/AdUnit';

// הגדרת הטיפוסים (Types)
type RecipeClientProps = { 
  params: { slug: string } 
};

type Recipe = {
  _id: string;
  title: string;
  imageUrl?: string;
  description?: string;
  ingredients?: string[];
  instructions?: string;
  prepTime?: number;
  difficulty?: string;
  categories?: string[];
};

type Comment = {
  _id: string;
  name: string;
  comment: string;
  rating?: number;
  reply?: string;
  _createdAt: string;
};

type CommentForm = {
  name: string;
  comment: string;
  rating: number;
};

// שינוי שם הפונקציה ל-RecipeClient כדי שיתאים לייבוא ב-page.tsx
export default function RecipeClient({ params }: RecipeClientProps) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [multiplier, setMultiplier] = useState(1);
  const [comments, setComments] = useState<Comment[]>([]);
  const [formData, setFormData] = useState<CommentForm>({ name: '', comment: '', rating: 5 });
  const [hoverRating, setHoverRating] = useState(0);
  const [commentStatus, setCommentStatus] = useState('');

  const slug = params.slug;

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await client.fetch<{
          recipe: Recipe;
          comments: Comment[];
        }>(
          `{\n            "recipe": *[_type == "recipe" && slug.current == $slug][0]{\n              _id,\n              title,\n              "imageUrl": mainImage.asset->url,\n              description,\n              ingredients,\n              instructions,\n              prepTime,\n              difficulty,\n              categories\n            },\n            "comments": *[_type == "comment" && recipe._ref in *[_type == "recipe" && slug.current == $slug]._id && approved == true] | order(_createdAt desc) {\n              _id,\n              name,\n              comment,\n              rating,\n              reply,\n              _createdAt\n            }\n          }`,
          { slug }
        );

        setRecipe(data.recipe);
        setComments(data.comments);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [slug]);

  const averageRating = useMemo(() => {
    if (comments.length === 0) return null;
    return (comments.reduce((acc, curr) => acc + (curr.rating ?? 5), 0) / comments.length).toFixed(1);
  }, [comments]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCommentStatus('שולח תגובה...');

    if (!recipe?._id) {
      setCommentStatus('אין מתכון לתלות אליו את התגובה. נסה לרענן את העמוד.');
      return;
    }

    try {
      const res = await fetch('/api/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          comment: formData.comment,
          rating: formData.rating,
          recipeId: recipe._id,
        }),
      });

      if (res.ok) {
        setCommentStatus('התגובה נשלחה וממתינה לאישור המערכת. תודה!');
        setFormData({ name: '', comment: '', rating: 5 });
      } else {
        setCommentStatus('אופס, קרתה שגיאה בשליחה. נסו שוב מאוחר יותר.');
      }
    } catch (error) {
      console.error(error);
      setCommentStatus('שגיאת תקשורת. בדקו את החיבור לאינטרנט.');
    }
  };


  const formatIngredient = (text: string) => {
    if (multiplier === 1) return text;
    return text.replace(/(\d+(\.\d+)?)/g, (match) => {
      const num = parseFloat(match);
      return (num * multiplier).toString();
    });
  };

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#FDFCFB' }}>
      <div className="loader"></div>
    </div>
  );

  if (!recipe) return <div style={{ textAlign: 'center', padding: '100px' }}>המתכון לא נמצא...</div>;

  const whatsappText = encodeURIComponent(`היי! תראו את המתכון ל${recipe.title}: ${typeof window !== 'undefined' ? window.location.href : ''}`);

  return (
    <main style={{ direction: 'rtl', backgroundColor: '#FDFCFB', minHeight: '100vh', color: '#434641', paddingBottom: '100px' }}>

      <div className="no-print" style={{ width: '100%', height: '60vh', position: 'relative', overflow: 'hidden' }}>
        <img 
          src={recipe.imageUrl} 
          alt={recipe.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', animation: 'fadeIn 1.5s ease' }} 
        />
        <div style={{ 
          position: 'absolute', 
          bottom: 0, 
          width: '100%', 
          height: '200px', 
          background: 'linear-gradient(to top, #FDFCFB, transparent)' 
        }}></div>
      </div>

      <article style={{ maxWidth: '900px', margin: '-80px auto 0', padding: '0 30px', position: 'relative', zIndex: 10 }}>
        
        <div style={{ 
          backgroundColor: 'white', 
          padding: '40px', 
          borderRadius: '30px', 
          boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '15px', flexWrap: 'wrap' }}>
            {recipe.categories?.map((cat: string) => (
              <span key={cat} style={{ 
                backgroundColor: '#F1EDE8', 
                color: '#6B705C', 
                padding: '4px 12px', 
                borderRadius: '20px', 
                fontSize: '12px', 
                fontWeight: '600' 
              }}>
                {cat}
              </span>
            ))}
          </div>

          <h1 style={{ fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: '300', color: '#5C5F58', marginBottom: '15px', letterSpacing: '-1px' }}>
            {recipe.title}
          </h1>

          {averageRating && (
            <div style={{ marginBottom: '15px', color: '#FFB100', fontSize: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
               <div>
                {'★'.repeat(Math.round(Number(averageRating)))}{'☆'.repeat(5 - Math.round(Number(averageRating)))}
              </div>
              <span style={{ fontSize: '14px', color: '#8A8D84' }}>({averageRating} מתוך {comments.length} דירוגים)</span>
            </div>
          )}

          <p style={{ fontSize: '19px', color: '#8A8D84', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto 25px' }}>
            {recipe.description}
          </p>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '30px', 
            padding: '20px 0', 
            borderTop: '1px solid #F1EDE8', 
            borderBottom: '1px solid #F1EDE8',
            marginBottom: '25px',
            color: '#6B705C',
            fontSize: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🕒</span>
              <strong>זמן הכנה:</strong> {recipe.prepTime || '--'} דק&apos;
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>👨‍🍳</span>
              <strong>קושי:</strong> {recipe.difficulty || 'בינוני'}
            </div>
          </div>
          
          <div className="no-print" style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
            <button onClick={() => window.print()} className="btn-secondary">🖨️ הדפסה</button>
            <a href={`https://wa.me/?text=${whatsappText}`} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">📱 שיתוף בוואטסאפ</a>
          </div>
        </div>

        <div className="no-print" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p style={{ fontSize: '14px', color: '#8A8D84', marginBottom: '12px', fontWeight: '600' }}>שינוי כמות מצרכים:</p>
          <div style={{ 
            display: 'inline-flex', 
            background: '#F1EDE8', 
            padding: '4px', 
            borderRadius: '50px',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)' 
          }}>
            <button 
              onClick={() => setMultiplier(1)} 
              style={{ 
                padding: '8px 24px', 
                borderRadius: '50px', 
                border: 'none', 
                cursor: 'pointer', 
                transition: '0.3s',
                backgroundColor: multiplier === 1 ? 'white' : 'transparent',
                color: multiplier === 1 ? '#6B705C' : '#8A8D84',
                fontWeight: multiplier === 1 ? '600' : '400',
                boxShadow: multiplier === 1 ? '0 2px 8px rgba(0,0,0,0.05)' : 'none'
              }}
            >
              כמות רגילה
            </button>
            <button 
              onClick={() => setMultiplier(2)} 
              style={{ 
                padding: '8px 24px', 
                borderRadius: '50px', 
                border: 'none', 
                cursor: 'pointer', 
                transition: '0.3s',
                backgroundColor: multiplier === 2 ? 'white' : 'transparent',
                color: multiplier === 2 ? '#6B705C' : '#8A8D84',
                fontWeight: multiplier === 2 ? '600' : '400',
                boxShadow: multiplier === 2 ? '0 2px 8px rgba(0,0,0,0.05)' : 'none'
              }}
            >
              כמות כפולה (x2)
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'start' }}>
          
          <div style={{ backgroundColor: '#F9F7F4', padding: '40px', borderRadius: '25px', border: '1px solid #F1EDE8' }}>
            <h3 style={{ fontSize: '24px', color: '#6B705C', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>🥣</span> מצרכים
            </h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {recipe.ingredients?.map((item: string, i: number) => (
                <li key={i} className="ingredient-item">
                  <input type="checkbox" id={`ing-${i}`} />
                  <label htmlFor={`ing-${i}`}>{formatIngredient(item)}</label>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ padding: '10px' }}>
            <AdUnit />
            <h3 style={{ fontSize: '24px', color: '#6B705C', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>👩‍🍳</span> אופן ההכנה
            </h3>
            <div style={{ whiteSpace: 'pre-line', lineHeight: '2', fontSize: '18px', color: '#4A4D46' }}>
              {recipe.instructions}
            </div>
          </div>
        </div>

        <section className="no-print" style={{ marginTop: '80px', borderTop: '1px solid #F1EDE8', paddingTop: '60px' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '28px', color: '#5C5F58', textAlign: 'center', marginBottom: '40px' }}>שאלות ותגובות</h3>
            
            <form onSubmit={handleCommentSubmit} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', marginBottom: '50px' }}>
              <div style={{ display: 'grid', gap: '15px' }}>
                <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                  <p style={{ marginBottom: '10px', fontWeight: '600', color: '#6B705C' }}>דרגו את המתכון:</p>
                  <div style={{ fontSize: '30px', cursor: 'pointer', display: 'flex', justifyContent: 'center', gap: '5px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span 
                        key={star}
                        onClick={() => setFormData({...formData, rating: star})}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        style={{ 
                          color: (hoverRating || formData.rating) >= star ? '#FFB100' : '#DCD7D0',
                          transition: 'color 0.2s'
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <input 
                  type="text" 
                  placeholder="השם שלכם" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  style={{ padding: '12px 20px', borderRadius: '12px', border: '1px solid #F1EDE8', outline: 'none', fontSize: '16px' }}
                />
                <textarea 
                  placeholder="מה תרצו לשאול או לשתף?" 
                  value={formData.comment}
                  onChange={(e) => setFormData({...formData, comment: e.target.value})}
                  required
                  style={{ padding: '12px 20px', borderRadius: '12px', border: '1px solid #F1EDE8', outline: 'none', fontSize: '16px', minHeight: '120px', resize: 'vertical' }}
                />
                <button type="submit" className="btn-secondary" style={{ backgroundColor: '#6B705C', color: 'white', border: 'none' }}>שלח תגובה ודירוג</button>
              </div>
              {commentStatus && <p style={{ textAlign: 'center', marginTop: '15px', color: '#6B705C', fontWeight: '600' }}>{commentStatus}</p>}
            </form>

            <div style={{ display: 'grid', gap: '25px' }}>
              {comments.length > 0 ? comments.map((c) => (
                <div key={c._id} style={{ padding: '20px', borderBottom: '1px solid #F1EDE8' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div>
                      <strong>{c.name}</strong>
                      <div style={{ color: '#FFB100', fontSize: '14px', marginTop: '2px' }}>
                        {'★'.repeat(c.rating || 5)}{'☆'.repeat(5 - (c.rating || 5))}
                      </div>
                    </div>
                    <span style={{ fontSize: '12px', color: '#A0A39C' }}>{new Date(c._createdAt).toLocaleDateString('he-IL')}</span>
                  </div>
                  <p style={{ fontSize: '16px', lineHeight: '1.5' }}>{c.comment}</p>
                  
                  {c.reply && (
                    <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#F9F7F4', borderRadius: '12px', borderRight: '4px solid #6B705C', marginRight: '20px' }}>
                      <strong style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#6B705C' }}>תשובת צוות האתר:</strong>
                      <p style={{ fontSize: '15px', margin: 0 }}>{c.reply}</p>
                    </div>
                  )}
                </div>
              )) : (
                <p style={{ textAlign: 'center', color: '#A0A39C' }}>עוד אין תגובות למתכון זה. תהיו הראשונים לכתוב!</p>
              )}
            </div>
          </div>
        </section>

        <div className="no-print" style={{ textAlign: 'center', marginTop: '80px' }}>
          <Link href="/" style={{ color: '#8A8D84', textDecoration: 'none', fontSize: '16px', borderBottom: '1px solid #DCD7D0', paddingBottom: '4px' }}>
            ← חזרה לכל המתכונים
          </Link>
        </div>
      </article>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Assistant:wght@200;300;400;600&display=swap');
        body { font-family: 'Assistant', sans-serif; }
        .btn-secondary { padding: 12px 25px; border-radius: 50px; border: 1px solid #DCD7D0; background: white; color: #6B705C; cursor: pointer; transition: all 0.3s ease; font-weight: 600; }
        .btn-secondary:hover { background: #F9F7F4; transform: translateY(-2px); }
        .btn-whatsapp { padding: 12px 25px; border-radius: 50px; background: #25D366; color: white; text-decoration: none; font-weight: 600; transition: all 0.3s ease; }
        .btn-whatsapp:hover { opacity: 0.9; transform: translateY(-2px); }
        .ingredient-item { display: flex; align-items: center; gap: 12px; padding: 15px 0; border-bottom: 1px dashed #E5E1DB; }
        .ingredient-item input[type="checkbox"]:checked + label { color: #A0A39C; text-decoration: line-through; }
        .loader { border: 3px solid #F3F3F3; border-top: 3px solid #6B705C; border-radius: 50%; width: 30px; height: 30px; animation: spin 1s linear infinite; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: scale(1.05); } to { opacity: 1; transform: scale(1); } }
        @media print { .no-print { display: none !important; } article { margin: 0 auto !important; box-shadow: none !important; padding-top: 20px !important; } }
      `}</style>
    </main>
  );
}