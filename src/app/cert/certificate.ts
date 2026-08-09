export const CERT_TEMPLATE_SRC = "/aimto-assets/certificate-template.png";

/** Native template pixel size */
export const CERT_WIDTH = 1536;
export const CERT_HEIGHT = 1024;

/** Name line geometry measured on the template (px) */
export const NAME_LINE = {
  y: 536,
  xStart: 423,
  xEnd: 1108,
} as const;

export const NAME_COLOR = "#0e1843";
export const NAME_MAX_FONT = 54;
export const NAME_MIN_FONT = 22;
export const NAME_FONT_FAMILY =
  "'Space Grotesk', 'Rethink Sans', system-ui, sans-serif";

export function slugifyName(name: string): string {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "participant";
}

export function drawNameOnCertificate(
  ctx: CanvasRenderingContext2D,
  name: string,
) {
  const displayName = name.trim();
  if (!displayName) return;

  const maxWidth = NAME_LINE.xEnd - NAME_LINE.xStart - 24;
  const centerX = (NAME_LINE.xStart + NAME_LINE.xEnd) / 2;
  const baselineY = NAME_LINE.y - 14;

  let fontSize = NAME_MAX_FONT;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = NAME_COLOR;

  while (fontSize > NAME_MIN_FONT) {
    ctx.font = `700 ${fontSize}px ${NAME_FONT_FAMILY}`;
    if (ctx.measureText(displayName).width <= maxWidth) break;
    fontSize -= 1;
  }

  ctx.font = `700 ${fontSize}px ${NAME_FONT_FAMILY}`;
  if (ctx.measureText(displayName).width > maxWidth) {
    const scale = maxWidth / ctx.measureText(displayName).width;
    ctx.save();
    ctx.translate(centerX, baselineY);
    ctx.scale(scale, scale);
    ctx.fillText(displayName, 0, 0);
    ctx.restore();
    return;
  }

  ctx.fillText(displayName, centerX, baselineY);
}

export async function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality?: number,
): Promise<Blob> {
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, type, quality),
  );
  if (!blob) {
    throw new Error("Could not export certificate image.");
  }
  return blob;
}

export function triggerDownload(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}
