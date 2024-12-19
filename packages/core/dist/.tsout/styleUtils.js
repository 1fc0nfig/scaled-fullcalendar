const styleTexts = [];
const styleEls = new Map();
export function injectStyles(styleText) {
    styleTexts.push(styleText);
    styleEls.forEach((styleEl) => {
        appendStylesTo(styleEl, styleText);
    });
}
export function ensureElHasStyles(el) {
    if (el.isConnected && // sometimes true if SSR system simulates DOM
        el.getRootNode // sometimes undefined if SSR system simulates DOM
    ) {
        registerStylesRoot(el.getRootNode());
    }
}
function registerStylesRoot(rootNode) {
    let styleEl = styleEls.get(rootNode);
    if (!styleEl || !styleEl.isConnected) {
        styleEl = rootNode.querySelector('style[data-fullcalendar]');
        if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.setAttribute('data-fullcalendar', '');
            const nonce = getNonceValue();
            if (nonce) {
                styleEl.nonce = nonce;
            }
            const parentEl = rootNode === document ? document.head : rootNode;
            const insertBefore = rootNode === document
                ? parentEl.querySelector('script,link[rel=stylesheet],link[as=style],style')
                : parentEl.firstChild;
            parentEl.insertBefore(styleEl, insertBefore);
        }
        styleEls.set(rootNode, styleEl);
        hydrateStylesRoot(styleEl);
    }
}
function hydrateStylesRoot(styleEl) {
    for (const styleText of styleTexts) {
        appendStylesTo(styleEl, styleText);
    }
}
function appendStylesTo(styleEl, styleText) {
    const { sheet } = styleEl;
    const ruleCnt = sheet.cssRules.length;
    styleText.split('}').forEach((styleStr, i) => {
        styleStr = styleStr.trim();
        if (styleStr) {
            sheet.insertRule(styleStr + '}', ruleCnt + i);
        }
    });
}
// nonce
// -------------------------------------------------------------------------------------------------
let queriedNonceValue;
function getNonceValue() {
    if (queriedNonceValue === undefined) {
        queriedNonceValue = queryNonceValue();
    }
    return queriedNonceValue;
}
/*
TODO: discourage meta tag and instead put nonce attribute on placeholder <style> tag
*/
function queryNonceValue() {
    const metaWithNonce = document.querySelector('meta[name="csp-nonce"]');
    if (metaWithNonce && metaWithNonce.hasAttribute('content')) {
        return metaWithNonce.getAttribute('content');
    }
    const elWithNonce = document.querySelector('script[nonce]');
    if (elWithNonce) {
        return elWithNonce.nonce || '';
    }
    return '';
}
// main
// -------------------------------------------------------------------------------------------------
if (typeof document !== 'undefined') {
    registerStylesRoot(document);
}
//# sourceMappingURL=styleUtils.js.map