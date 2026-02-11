import { createClient } from "@/lib/supabase/server";

export default async function TestConnectionPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-500 mb-4">
          Connection Error
        </h1>
        <pre className="bg-muted p-4 rounded overflow-auto text-red-400">
          {JSON.stringify(error, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Supabase Connection Status</h1>
      <div className="p-4 border rounded-lg bg-card">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="font-medium">Connected successfully</span>
        </div>

        {user ? (
          <div>
            <h2 className="text-lg font-semibold mb-2">User Session Active</h2>
            <pre className="bg-muted p-4 rounded overflow-auto text-xs">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        ) : (
          <p className="text-muted-foreground">
            No active user session found (Anonymous).
          </p>
        )}
      </div>
    </div>
  );
}
