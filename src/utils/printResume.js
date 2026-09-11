/**
 * Prints a DOM node as a standalone US Letter page, which is how the resume
 * becomes a real PDF: the browser's "Save as PDF" keeps a selectable text
 * layer and live links, so applicant tracking systems can actually parse it.
 * (html2canvas produces a PNG, which parses as an empty document.)
 *
 * This works without copying any stylesheets because ResumeTemplate styles
 * every element inline — `outerHTML` carries the full appearance with it.
 *
 * @param {HTMLElement} node  The element to print, e.g. the ResumeTemplate ref.
 * @param {string} title      Document title. Chrome and Edge use this as the
 *                            suggested PDF filename; Safari and Firefox don't.
 */
export function printResumeNode(node, title = "Ryan_Sinha_Resume") {
  if (!node) return;

  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  iframe.style.cssText =
    "position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden;";

  iframe.srcdoc = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>${title}</title>
    <style>
      @page { size: Letter; margin: 0; }
      html, body { margin: 0; padding: 0; }
      * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    </style>
  </head>
  <body>${node.outerHTML}</body>
</html>`;

  iframe.onload = () => {
    const frameWindow = iframe.contentWindow;
    const cleanup = () => iframe.remove();

    // afterprint fires whether the user saves or cancels; the timeout is a
    // fallback for browsers that don't emit it from an iframe.
    frameWindow.addEventListener("afterprint", cleanup, { once: true });
    setTimeout(cleanup, 60000);

    frameWindow.focus();
    frameWindow.print();
  };

  document.body.appendChild(iframe);
}
