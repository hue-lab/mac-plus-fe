import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

const TURNSTILE_SCRIPT_ID = 'cloudflare-turnstile-script';

function loadTurnstileScript(callback, errorCallback) {
  if (typeof window === 'undefined') {
    return;
  }

  if (window.turnstile) {
    callback();
    return;
  }

  const existingScript = document.getElementById(TURNSTILE_SCRIPT_ID);
  if (existingScript) {
    existingScript.addEventListener('load', callback, { once: true });
    existingScript.addEventListener('error', errorCallback, { once: true });
    return;
  }

  const script = document.createElement('script');
  script.id = TURNSTILE_SCRIPT_ID;
  script.src =
    'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
  script.async = true;
  script.defer = true;
  script.addEventListener('load', callback, { once: true });
  script.addEventListener('error', errorCallback, { once: true });
  document.head.appendChild(script);
}

const TurnstileWidget = forwardRef(function TurnstileWidget(
  { className = '', onToken, onExpire, onError },
  ref,
) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const callbacksRef = useRef({ onToken, onExpire, onError });
  const siteKey = process.env.TURNSTILE_SITE_KEY;

  useEffect(() => {
    callbacksRef.current = { onToken, onExpire, onError };
  }, [onToken, onExpire, onError]);

  useImperativeHandle(ref, () => ({
    reset() {
      if (window.turnstile && widgetIdRef.current !== null) {
        window.turnstile.reset(widgetIdRef.current);
      }
    },
  }));

  useEffect(() => {
    if (!siteKey) {
      return undefined;
    }

    let cancelled = false;
    loadTurnstileScript(
      () => {
        if (
          cancelled ||
          !containerRef.current ||
          !window.turnstile ||
          widgetIdRef.current !== null
        ) {
          return;
        }

        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token) => callbacksRef.current.onToken?.(token),
          'expired-callback': () => {
            callbacksRef.current.onToken?.('');
            callbacksRef.current.onExpire?.();
          },
          'error-callback': () => {
            callbacksRef.current.onToken?.('');
            callbacksRef.current.onError?.();
          },
        });
      },
      () => {
        if (!cancelled) {
          callbacksRef.current.onToken?.('');
          callbacksRef.current.onError?.();
        }
      },
    );

    return () => {
      cancelled = true;
      if (window.turnstile && widgetIdRef.current !== null) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey]);

  if (!siteKey) {
    return null;
  }

  return <div className={className} ref={containerRef} />;
});

export default TurnstileWidget;
