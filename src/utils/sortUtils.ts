/**
 * Shared sorting helpers for Barangay Bugo Portal
 * - Alphabetical ordering (A-Z) for Programs & Certificates
 * - First-Come, First-Served (FCFS) ordering for Applications (earliest at top, latest at bottom)
 */

export function sortProgramsAlphabetically<T extends readonly any[]>(items: T): T {
  return [...items].sort((a, b) =>
    String((a as any)?.title || '')
      .trim()
      .localeCompare(String((b as any)?.title || '').trim(), undefined, {
        sensitivity: 'base',
        numeric: true,
      })
  ) as unknown as T;
}

export function getApplicationQueueTimestamp(app: {
  submittedAt?: string | null;
  createdAt?: string | null;
  submissionDate?: string | null;
  id?: string | null;
}): number {
  if (app?.submittedAt) {
    const parsed = Date.parse(app.submittedAt);
    if (!Number.isNaN(parsed)) return parsed;
  }
  if (app?.createdAt) {
    const parsed = Date.parse(app.createdAt);
    if (!Number.isNaN(parsed)) return parsed;
  }
  if (app?.id) {
    const match = String(app.id).match(/(\d{12,15})/);
    if (match) {
      const epochMs = Number(match[1]);
      if (Number.isFinite(epochMs) && epochMs > 0) return epochMs;
    }
  }
  if (app?.submissionDate) {
    const parsed = Date.parse(app.submissionDate);
    if (!Number.isNaN(parsed)) return parsed;
  }
  return 0;
}

export function sortApplicationsFCFS<T extends readonly any[]>(applications: T): T {
  return [...applications].sort((a, b) => {
    const timeA = getApplicationQueueTimestamp(a as any);
    const timeB = getApplicationQueueTimestamp(b as any);
    if (timeA !== timeB) {
      return timeA - timeB; // Earliest (first-come) at index 0 (top), latest at bottom
    }
    const idCmp = String((a as any)?.id || '').localeCompare(String((b as any)?.id || ''));
    if (idCmp !== 0) return idCmp;
    return String((a as any)?.referenceCode || '').localeCompare(String((b as any)?.referenceCode || ''));
  }) as unknown as T;
}

export function formatShortQueueDateTime(app: {
  submittedAt?: string | null;
  submissionDate?: string | null;
}): string {
  if (app?.submittedAt) {
    const d = new Date(app.submittedAt);
    if (!Number.isNaN(d.getTime())) {
      return d.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      });
    }
  }
  return app?.submissionDate || '—';
}
