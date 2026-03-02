import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: "5f5qnfgy", // המזהה שלך
  dataset: "production",  // ה-dataset שלך
  apiVersion: "2024-02-24", 
  useCdn: false, 
})