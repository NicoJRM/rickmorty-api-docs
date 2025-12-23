import { MapPin, Globe, Tv } from "lucide-react";

type Props = {
  originName?: string;
  locationName?: string;
  episodeCount?: number;
};

export function CharacterDetails({ originName, locationName, episodeCount }: Props) {
  return (
    <section className="rounded-2xl border bg-white p-8 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Character Details</h2>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-cyan-50 p-3 text-cyan-700">
            <Globe className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Origin</p>
            <p className="mt-1 text-slate-900">{originName || "Unknown"}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Last Known Location</p>
            <p className="mt-1 text-slate-900">{locationName || "Unknown"}</p>
          </div>
        </div>

        <div className="flex items-start gap-4 md:col-span-2">
          <div className="rounded-xl bg-slate-50 p-3 text-slate-700">
            <Tv className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Episodes</p>
            <p className="mt-1 text-slate-900">{episodeCount}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
