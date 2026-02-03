import LoadingSpinner from "../../components/LoadingSpinner";

export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-slate-400">Loading profile...</p>
      </div>
    </div>
  );
}
