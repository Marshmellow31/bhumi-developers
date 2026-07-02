/**
 * Project documents (brochures / floor plans) can be served two ways:
 *   - local:        "/documents/foo.pdf"                            (file in /public)
 *   - Google Drive: "https://drive.google.com/file/d/<FILE_ID>/view"
 *
 * Set either form in data/projects.ts — components resolve the right
 * View / Download URLs through getDocumentUrls().
 */

const DRIVE_ID_RE =
  /drive\.google\.com\/(?:file\/d\/([\w-]+)|(?:open|uc)\?(?:[^#]*&)?id=([\w-]+))/;

export function getDriveFileId(url: string): string | null {
  const match = url.match(DRIVE_ID_RE);
  return match ? (match[1] ?? match[2]) : null;
}

export interface DocumentUrls {
  /** Opens the document for reading (Drive viewer for Drive files). */
  view: string;
  /** Forces a file download (Drive direct-download endpoint for Drive files). */
  download: string;
  isDrive: boolean;
}

export function getDocumentUrls(file: string): DocumentUrls {
  const id = getDriveFileId(file);
  if (!id) return { view: file, download: file, isDrive: false };
  return {
    view: `https://drive.google.com/file/d/${id}/view`,
    download: `https://drive.google.com/uc?export=download&id=${id}`,
    isDrive: true,
  };
}
