export interface PrintableReportColumn {
  label: string;
  align?: 'left' | 'right';
}

export interface PrintableReportOptions {
  title: string;
  subtitle?: string;
  generatedLabel?: string;
  columns: PrintableReportColumn[];
  rows: string[][];
}

function escapeHtml(value: string): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function buildPrintableReportHtml(options: PrintableReportOptions): string {
  const {
    title,
    subtitle = 'Republic of the Philippines • Barangay Bugo, Cagayan de Oro City',
    generatedLabel = `Generated on ${new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })} • ${options.rows.length} ${options.rows.length === 1 ? 'record' : 'records'}`,
    columns,
    rows
  } = options;

  const headCells = columns
    .map(
      col =>
        `<th style="text-align:${col.align === 'right' ? 'right' : 'left'}">${escapeHtml(col.label)}</th>`
    )
    .join('');

  const bodyRows =
    rows.length === 0
      ? `<tr><td colspan="${columns.length}" style="text-align:center;color:#6b7280;padding:24px;">No records available for this report.</td></tr>`
      : rows
          .map(
            row =>
              `<tr>${columns
                .map(
                  (col, idx) =>
                    `<td style="text-align:${col.align === 'right' ? 'right' : 'left'}">${escapeHtml(row[idx] ?? '—')}</td>`
                )
                .join('')}</tr>`
          )
          .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(title)}</title>
  <style>
    @page { size: auto; margin: 14mm; }
    * { box-sizing: border-box; }
    body {
      font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #111827;
      background: #ffffff;
      margin: 0;
      padding: 0;
      font-size: 11px;
      line-height: 1.45;
    }
    .report-header {
      text-align: center;
      border-bottom: 2px solid #111827;
      padding-bottom: 10px;
      margin-bottom: 14px;
    }
    .report-subtitle {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #4b5563;
      margin: 0;
    }
    .report-title {
      font-size: 17px;
      font-weight: 800;
      color: #111827;
      margin: 4px 0 2px;
    }
    .report-meta {
      font-size: 10px;
      color: #6b7280;
      margin: 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    thead { display: table-header-group; }
    tr { break-inside: avoid; page-break-inside: avoid; }
    th {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      color: #374151;
      border-bottom: 1.5px solid #9ca3af;
      padding: 6px 8px;
      background: #f9fafb;
    }
    td {
      border-bottom: 1px solid #e5e7eb;
      padding: 6px 8px;
      vertical-align: top;
      color: #111827;
      word-break: break-word;
    }
    .report-footer {
      margin-top: 18px;
      padding-top: 8px;
      border-top: 1px solid #e5e7eb;
      display: flex;
      justify-content: space-between;
      font-size: 9px;
      color: #6b7280;
    }
  </style>
</head>
<body>
  <div class="report-header">
    <p class="report-subtitle">${escapeHtml(subtitle)}</p>
    <h1 class="report-title">${escapeHtml(title)}</h1>
    <p class="report-meta">${escapeHtml(generatedLabel)}</p>
  </div>
  <table>
    <thead>
      <tr>${headCells}</tr>
    </thead>
    <tbody>
      ${bodyRows}
    </tbody>
  </table>
  <div class="report-footer">
    <span>Barangay Bugo Resident &amp; Disaster Records System</span>
    <span>Printed ${escapeHtml(new Date().toLocaleString('en-US'))}</span>
  </div>
</body>
</html>`;
}

export function printReportDocument(options: PrintableReportOptions): boolean {
  try {
    const html = buildPrintableReportHtml(options);
    const iframe = document.createElement('iframe');
    iframe.setAttribute('aria-hidden', 'true');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.style.opacity = '0';

    const cleanup = () => {
      setTimeout(() => {
        if (iframe.parentNode) {
          iframe.parentNode.removeChild(iframe);
        }
      }, 1500);
    };

    iframe.onload = () => {
      try {
        const win = iframe.contentWindow;
        if (!win) {
          cleanup();
          window.print();
          return;
        }
        win.onafterprint = cleanup;
        win.focus();
        win.print();
        setTimeout(cleanup, 60000);
      } catch {
        cleanup();
        window.print();
      }
    };

    document.body.appendChild(iframe);
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(html);
      doc.close();
    } else {
      iframe.srcdoc = html;
    }
    return true;
  } catch {
    window.print();
    return false;
  }
}
