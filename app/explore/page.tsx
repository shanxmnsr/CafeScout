
import { Suspense } from "react";
import ExploreClient from "./ExploreClient";

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="p-4">Loading explore...</div>}>
      <ExploreClient />
    </Suspense>
  );
}