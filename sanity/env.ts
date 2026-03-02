export const apiVersion = '2026-02-23'

// כתבנו את הערכים ישירות כאן כדי לעקוף שגיאות הגדרה בשרת
export const dataset = "production"
export const projectId = "5f5qnfgy"

// הפונקציה נשארת כאן רק כדי לא לשבור ייבואים אחרים אם יש כאלו
export function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }
  return v
}