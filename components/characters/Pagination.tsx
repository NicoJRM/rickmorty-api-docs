import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
  currentPage: number;
  totalPages: number;
  q?: string;
};

export function Pagination({ currentPage, totalPages, q }: Props) {
  const query = q ? `&q=${encodeURIComponent(q)}` : "";

  return (
    <div className="mt-12 flex items-center justify-center gap-4">
      <Button
        variant="outline"
        disabled={currentPage <= 1}
        asChild={currentPage > 1}
      >
        {currentPage > 1 ? (
          <Link href={`/?page=${currentPage - 1}${query}`}>← Prev</Link>
        ) : (
          <span>← Prev</span>
        )}
      </Button>

      <span className="text-sm text-slate-600">
        Page <b>{currentPage}</b> of <b>{totalPages}</b>
      </span>

      <Button
        variant="outline"
        disabled={currentPage >= totalPages}
        asChild={currentPage < totalPages}
      >
        {currentPage < totalPages ? (
          <Link href={`/?page=${currentPage + 1}${query}`}>Next →</Link>
        ) : (
          <span>Next →</span>
        )}
      </Button>
    </div>
  );
}
