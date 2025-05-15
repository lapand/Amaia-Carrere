import { useEffect, useState } from "react";

/**
 * Détecte si l'appareil utilise un pointeur tactile (coarse pointer),
 * c'est-à-dire qu'il s'agit d'un dispositif à interface tactile (ex: smartphone, tablette).
 *
 * @returns `true` si l'appareil a un pointeur tactile, `false` sinon.
 *
 * @remarks
 * Ce hook utilise `window.matchMedia('(pointer: coarse)')` pour détecter
 * la présence d’un dispositif tactile. Cela couvre la plupart des cas modernes
 * et est plus fiable que la vérification de `'ontouchstart' in window` ou `navigator.maxTouchPoints`.
 *
 * ⚠️ **Important pour les tests dans Chrome DevTools** :
 * Lorsque vous activez la "Device Toolbar" pour simuler un mobile, ce test renverra généralement `false`
 * sauf si vous activez explicitement le mode tactile :
 * DevTools → More tools → Sensors → Touch → "Force enabled".
 */
const useIsTouchDevice = () => {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  return isTouch;
};

export default useIsTouchDevice;