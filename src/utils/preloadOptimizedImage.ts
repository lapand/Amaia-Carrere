const DEVICE_SIZES = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];
const IMAGE_SIZES = [16, 32, 48, 64, 96, 128, 256, 384];

const VALID_WIDTHS = [...DEVICE_SIZES, ...IMAGE_SIZES].sort((a, b) => a - b);

/**
 * Retourne la plus petite largeur valide supérieure ou égale à la valeur cible,
 * en se basant sur `deviceSizes` et `imageSizes` configurés dans next.config.js.
 *
 * @param targetWidth - La largeur visée
 * @returns La largeur valide la plus proche supérieure ou égale
 */
const getClosestValidWidth = (targetWidth: number): number => {
  for (const size of VALID_WIDTHS) {
    if (targetWidth <= size) return size;
  }
  return VALID_WIDTHS[VALID_WIDTHS.length - 1];
};

/**
 * Calcule une largeur "idéale" pour l’image à précharger en fonction du viewport
 * et de la règle CSS `sizes`, puis l’aligne sur une taille supportée par Next.js.
 *
 * @param sizes - Valeur CSS de type "80vw", "100vw", etc.
 * @returns Une largeur adaptée au viewport, arrondie à la valeur valide la plus proche
 */
const getIdealWidth = (sizes: string = '100vw') => {
  if (typeof window === 'undefined') return 1200;

  const vw = window.innerWidth;

  const vwMatch = sizes.match(/^(\d+)(vw)$/);
  if (vwMatch) {
    const ratio = parseInt(vwMatch[1], 10) / 100;
    const target = vw * ratio;
    return getClosestValidWidth(target);
  }

  return getClosestValidWidth(vw);
};

/**
 * Précharge une image optimisée comme le ferait le composant Next.js <Image />,
 * en générant manuellement une URL vers le loader interne de Next.
 *
 * ⚠️ Si `width` est fourni dans les options, alors `sizes` est ignoré.
 *
 * @param imageUrl - L’URL de base de l’image (ex : depuis un CMS headless)
 * @param options - Options de préchargement
 * @param options.width - Largeur manuelle souhaitée. Doit correspondre à une taille supportée (sinon sera ajustée)
 * @param options.sizes - Valeur CSS `sizes` (ex : "80vw"). Ignorée si `width` est défini.
 * @param options.quality - Qualité de l’image (0–100). Par défaut : 100
 * @param options.debug - Si true, affiche des logs utiles en console
 */
export const preloadOptimizedImage = (
  imageUrl: string,
  options: {
    width?: number;
    sizes?: string;
    quality?: number;
    debug?: boolean;
  } = {}
) => {
  if (!imageUrl || typeof window === 'undefined') return;

  const rawWidth = options.width ?? getIdealWidth(options.sizes);
  const width = getClosestValidWidth(rawWidth);
  const quality = options.quality ?? 100;

  const url = new URL('/_next/image', window.location.origin);
  url.searchParams.set('url', imageUrl);
  url.searchParams.set('w', width.toString());
  url.searchParams.set('q', quality.toString());

  const img = new window.Image();
  img.src = url.toString();

  if (options.debug) {
    console.log('[preloadOptimizedImage] Debug info:');
    console.log('→ Original image URL:', imageUrl);
    console.log('→ Final preload URL:', img.src);
    console.log('→ Viewport width:', window.innerWidth);
    console.log('→ Sizes (CSS):', options.sizes ?? 'default: 100vw');
    console.log('→ Requested width:', rawWidth);
    console.log('→ Validated width:', width);
    console.log('→ Quality:', quality);
  }
};
