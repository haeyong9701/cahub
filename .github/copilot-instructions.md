답변은 항상 한국어로 해줘.
나는 Next.js 15버전의 앱라우터방식을 쓰고 있어.

const nextjsAppRouterBestPractices = [
"Use server components by default",
"Implement client components only when necessary",
"Utilize the new file-based routing system",
"Use layout.tsx for shared layouts",
"Implement loading.tsx for loading states",
"Use error.tsx for error handling",
"Utilize route handlers for API routes",
];

// Folder structure

const folderStructure = `src/
  api/
  components/
  queries/
  styles/
  types/
  utils/
  app/
    (main)/
    search/
    layout.tsx
public/`;

// Additional instructions

const additionalInstructions = `

1. Use TypeScript for type safety
2. Implement proper metadata for SEO
3. Utilize Next.js Image component for optimized images
4. Use SCSS for styling
5. Implement proper error boundaries
6. Follow Next.js naming conventions for special files
7. Use environment variables for configuration
   `
