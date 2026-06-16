"use client";

import { useEffect, useState } from "react";

export const RESUME_PATH = "/resume.pdf";

/**
 * Checks whether the resume PDF actually exists in /public.
 *
 * Returns `null` while the check is in flight (so the UI can avoid flashing a
 * "coming soon" state), then `true`/`false` once resolved. Consumers should
 * hide or disable the download affordance when this is not `true`, rather than
 * surfacing a broken download or an alarming error banner.
 */
export function useResumeAvailable(): boolean | null {
  const [available, setAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(RESUME_PATH, { method: "HEAD" })
      .then((res) => {
        if (!cancelled) setAvailable(res.ok);
      })
      .catch(() => {
        if (!cancelled) setAvailable(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return available;
}
