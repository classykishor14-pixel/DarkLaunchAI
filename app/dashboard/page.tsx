import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Sparkles, Calendar, Code, ExternalLink } from 'lucide-react';
import { TestEmailButton } from '@/components/TestEmailButton';
import { CodeActions } from '@/components/CodeActions';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/');
  }

  const user = await currentUser();
  const primaryEmail = user?.emailAddresses[0]?.emailAddress;
  const firstName = user?.firstName;

  const { data: generations, error } = await supabase
    .from('generations')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Supabase Error:", error.message || JSON.stringify(error));
  }

  return (
    <main className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-[#020205] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl font-bold tracking-tight">Your Generations</h1>
          </div>
          <TestEmailButton email={primaryEmail} firstName={firstName} />
        </div>

        {!generations || generations.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 text-center shadow-xl">
            <Code className="w-16 h-16 text-gray-500 mb-4" />
            <h3 className="text-xl font-medium text-gray-300 mb-2">No generations yet</h3>
            <p className="text-gray-500 mb-6">Head over to the AI engine to build your first landing page.</p>
            <a href="/" className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:from-cyan-400 hover:to-purple-500 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300">
              Start Building
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {generations.map((gen: any) => (
              <div key={gen.id} className="flex flex-col p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 shadow-xl transition-all duration-300 group">
                <p className="text-lg font-medium text-gray-200 mb-6 line-clamp-3 flex-grow leading-relaxed">
                  "{gen.prompt}"
                </p>
                <div className="mt-auto">
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(gen.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <CodeActions code={gen.generated_code} projectId={gen.id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
