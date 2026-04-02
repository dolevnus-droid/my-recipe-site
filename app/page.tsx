'use client';

import { client } from '@/sanity/lib/client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('הכל');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // עדכון ה-Query: מושכים את isFeatured ומסדרים לפיו קודם
        const query = `*[_type == "recipe" && defined(slug.current)] | order(isFeatured desc, _createdAt desc){
          _id,
          title,
          "slug": slug.current,
          "imageUrl": mainImage.asset->url,
          description,
          categories,
          isFeatured,
          "ratings": *[_type == "comment" && recipe._ref == ^._id && approved == true].rating
        }`;
        
        const data = await client.fetch(query, {}, { next: { revalidate: 0 } });
        
        const processedData = data.map((r: any) => {
          const validRatings = r.ratings?.filter((n: any) => typeof n === 'number') || [];
          const avg = validRatings.length > 0 
            ? validRatings.reduce((a: number, b: number) => a + b, 0) / validRatings.length 
            : null;
          return {
            ...r,
            averageRating: avg ? Math.round(avg * 10) / 10 : null
          };
        });

        setRecipes(processedData);
        setFilteredRecipes(processedData);
        
        const allCategories = processedData.reduce((acc: string[], recipe: any) => {
          if (recipe.categories && Array.isArray(recipe.categories)) {
            return [...acc, ...recipe.categories];
          }
          return acc;
        }, []);

        const uniqueCategories = Array.from(new Set(allCategories)) as string[];
        setCategories(['הכל', ...uniqueCategories]);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filterByCategory = (cat: string) => {
    setActiveCategory(cat);
    if (cat === 'הכל') {
      setFilteredRecipes(recipes);
    } else {
      setFilteredRecipes(recipes.filter(r => r.categories?.includes(cat)));
    }
  };

  return (
    <main style={{ 
      direction: 'rtl', 
      backgroundColor: '#FDFCFB', 
      minHeight: '100vh', 
      fontFamily: "'Assistant', sans-serif",
      color: '#434641' 
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Assistant:wght@200;300;400;600&display=swap');
        
        .recipe-card { 
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); 
          border: 1px solid #F1EDE8; 
          background: white; 
          border-radius: 32px; 
          overflow: hidden; 
          display: flex; 
          flex-direction: column; 
          box-shadow: 0 10px 30px rgba(0,0,0,0.02); 
          text-decoration: none; 
          color: inherit;
          height: 100%;
          position: relative;
        }
        .recipe-card:hover { 
          transform: translateY(-8px); 
          box-shadow: 0 20px 40px rgba(107, 112, 92, 0.08) !important; 
        }

        /* עיצוב למתכון נבחר */
        .featured-card {
           border: 1px solid #A4AC86;
           box-shadow: 0 15px 35px rgba(164, 172, 134, 0.1);
        }

        .featured-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          background: #6B705C;
          color: white;
          padding: 6px 16px;
          border-radius: 50px;
          font-size: 13px;
          font-weight: 600;
          z-index: 10;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        
        .recipe-image-container { 
          overflow: hidden; 
          position: relative; 
          height: 280px; 
          width: 100%;
        }
        
        .recipe-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover; 
          transition: transform 0.6s ease;
        }

        .recipe-card:hover img { transform: scale(1.05); }
        
        .category-btn {
          padding: 10px 25px;
          border-radius: 50px;
          border: 1px solid #EAE7E2;
          background: white;
          color: #8A8D84;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 15px;
        }
        .category-btn.active {
          background: #6B705C;
          color: white;
          border-color: #6B705C;
          box-shadow: 0 4px 12px rgba(107, 112, 92, 0.15);
          font-weight: 700;
        }
      `}</style>

      {/* הדר דף הבית */}
      <header style={{ padding: '60px 20px 40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: '200', color: '#6B705C', margin: 0, letterSpacing: '6px' }}>
          Bake & Balance
        </h1>
        <div style={{ width: '40px', height: '2px', backgroundColor: '#A4AC86', margin: '24px auto', opacity: 0.6 }}></div>
        <p style={{ fontSize: '22px', color: '#8A8D84', fontWeight: '300' }}>
          אפייה ביתית באיזון מושלם
        </p>
      </header>

      {/* תפריט קטגוריות */}
      {!loading && categories.length > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '60px', flexWrap: 'wrap', padding: '0 20px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => filterByCategory(cat)}
              className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* גריד מתכונים */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px 60px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px', color: '#8A8D84' }}>טוען מתכונים מתוקים...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '40px' }}>
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe: any) => (
                <a 
                  href={`/recipe/${recipe.slug}`} 
                  key={recipe.slug} 
                  className={`recipe-card ${recipe.isFeatured ? 'featured-card' : ''}`}
                >
                  {/* תגית למתכון נבחר */}
                  {recipe.isFeatured && <div className="featured-badge">מומלץ לפסח ✨</div>}

                  <div className="recipe-image-container">
                    <img 
                      src={recipe.imageUrl} 
                      alt={recipe.title}
                    />
                  </div>

                  <div style={{ padding: '35px 30px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '28px', margin: '0 0 10px 0', color: '#434641', fontWeight: '400' }}>
                      {recipe.title}
                    </h3>

                    {/* דירוג כוכבים */}
                    {recipe.averageRating && (
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px', marginBottom: '15px', color: '#FFB100', fontSize: '16px' }}>
                        <span>{'★'.repeat(Math.round(recipe.averageRating))}</span>
                        <span style={{ color: '#8A8D84', fontSize: '12px', fontWeight: '400' }}>({recipe.averageRating})</span>
                      </div>
                    )}

                    <p style={{ fontSize: '16px', color: '#8A8D84', lineHeight: '1.6', height: '50px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {recipe.description}
                    </p>
                    <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #F8F5F2', color: '#6B705C', fontSize: '14px', fontWeight: '600' }}>
                      למתכון המלא ←
                    </div>
                  </div>
                </a>
              ))
            ) : (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '100px', color: '#8A8D84' }}>
                <p>לא נמצאו מתכונים בקטגוריה זו.</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* פוטר */}
      <footer style={{ 
        textAlign: 'center', 
        padding: '40px 20px', 
        borderTop: '1px solid #F1EDE8',
        marginTop: '20px'
      }}>
        <div style={{ marginBottom: '10px' }}>
          <a 
            href="/privacy" 
            style={{ 
              color: '#8A8D84', 
              fontSize: '13px', 
              textDecoration: 'none',
              fontWeight: '400'
            }}
          >
            מדיניות פרטיות
          </a>
        </div>
        <div style={{ color: '#C2C0BA', fontSize: '11px', fontStyle: 'italic' }}>
          Bake & Balance 2026 © | כל הזכויות שמורות לשירה נוסבוים
        </div>
      </footer>
    </main>
  );
}