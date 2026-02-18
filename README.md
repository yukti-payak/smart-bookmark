 🏛️ SmartMark Vault

A private, secure digital library for archiving your web discoveries. This vault ensures your bookmarks are private, permanent, and accessible instantly through real-time synchronization.

🌐Live Demo : https://smart-bookmark-five-wheat.vercel.app/login

Google OAuth Login: Secure authentication via Google Cloud Console.
Private Vaults: Row Level Security (RLS) ensures bookmarks are strictly private to each user.
Real-time Sync: Instant UI updates across multiple tabs using Supabase Realtime.
Full CRUD Operations: Users can add and delete entries seamlessly with tactile UI feedback.
Vercel Deployment: Fully optimized production build with an active live URL.

🛠️ Tech Stack
- **Framework**: Next.js 15+ (App Router)
- **Database & Auth**: Supabase 
- **Styling**: Tailwind CSS 
- **Notifications**: React Hot Toast


🚀 Challenges & Solutions : 

 Mastering the Supabase Ecosystem : 
I conducted extensive research into Supabase to move beyond basic CRUD. I implemented **Row Level Security (RLS)** policies to ensure that `auth.uid() = user_id`, guaranteeing that one user can never see or delete another's archived entries.

Google OAuth Integration : 
Configuring the Google Cloud Console was a deep dive into secure authentication flows. I researched how to properly set up **OAuth 2.0 Client IDs**, managing secret keys securely through Vercel environment variables, and handling the complex `redirect_uri_mismatch` errors by aligning local and production callback paths.

Transitioning from Local to Production :
One of the most significant hurdles was synchronizing the live URL across three different platforms. I solved this by:
- Setting up dynamic `redirectTo` paths in the Next.js frontend.
- Configuring the production "Site URL" and wildcard redirect patterns in the Supabase Dashboard.
- Authorizing production JavaScript origins in the Google Cloud Console to enable secure live login.

Next.js 15+ Asynchronous APIs :
During development, I encountered breaking changes in Next.js 15 regarding asynchronous cookie handling. I researched and implemented the `await cookies()` pattern in the authentication middleware and route handlers to ensure the application remained stable in a modern production environment.



