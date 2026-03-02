'use client';
import { useEffect } from 'react';

export default function AdUnit() {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Ads error", e);
    }
  }, []);

  return (
    <div className="no-print" style={{ margin: '30px 0', textAlign: 'center', overflow: 'hidden' }}>
      <p style={{ fontSize: '10px', color: '#ccc', marginBottom: '5px' }}>פרסומת</p>
      {/* כאן נכנס הקוד הספציפי למודעה שגוגל נותנים לך */}
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
           data-ad-slot="XXXXXXXXXX"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
}