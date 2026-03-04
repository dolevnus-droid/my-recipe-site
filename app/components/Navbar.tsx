import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#FDFCFB]/90 backdrop-blur-md border-b border-gray-100 no-print">
      {/* max-w-7xl מנצל יותר רוחב מהקוד הקודם */}
      <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
        
        {/* לוגו - פונט קצת יותר גדול ודומיננטי */}
        <Link href="/" className="text-2xl font-light tracking-tighter text-[#5C5F58] hover:opacity-80 transition-opacity">
          BAKE <span className="font-bold text-[#6B705C]">&</span> BALANCE
        </Link>

        {/* קישורי הניווט - הגדלתי פונט (text-lg) והוספתי ריווח (gap-10) */}
        <div className="flex gap-10 text-lg font-medium">
          <Link href="/" className="text-[#6B705C] hover:text-black transition-colors relative group">
            מתכונים
            <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-[#6B705C] transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/conversions" className="text-[#8A8D84] hover:text-black transition-colors relative group">
            המרת מידות
            <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-[#6B705C] transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/about" className="text-[#8A8D84] hover:text-black transition-colors relative group">
            קצת עלי
            <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-[#6B705C] transition-all group-hover:w-full"></span>
          </Link>
        </div>
      </div>
    </header>
  );
}