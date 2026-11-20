import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import literalKey from '../utils/literal-key';

/**
 * Translates a hardcoded English UI string at render time.
 *
 * Usage: `{{t-literal item.title}}` or `{{t-literal item.description ns="registry"}}`
 *
 * Looks up `literal.<ns>.<slug(text)>` in the active locale and falls back to the
 * original text when no translation exists, so untranslated strings render unchanged.
 */
export default class TLiteralHelper extends Helper {
    @service intl;

    compute([text], { ns = 'registry' } = {}) {
        if (typeof text !== 'string' || text.trim() === '') {
            return text;
        }

        // touch the locale so the helper recomputes when the user switches language
        this.intl.primaryLocale;

        const key = literalKey(text, ns);
        if (this.intl.exists(key)) {
            return this.intl.t(key);
        }

        return text;
    }
}
