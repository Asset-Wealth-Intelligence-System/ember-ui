import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

const UNITS = ['second', 'minute', 'hour', 'day', 'week', 'month', 'year'];
const RELATIVE_RE = new RegExp(`^\\s*(\\d+)\\s+(${UNITS.join('|')})s?\\s+(ago|from now)\\s*$`, 'i');
const JUST_NOW_RE = /^\s*(just now|now)\s*$/i;

/**
 * Re-renders English relative-time strings produced by the API (Carbon `diffForHumans`,
 * e.g. "2 hours ago", "3 days from now") in the active locale using `Intl.RelativeTimeFormat`.
 *
 * Anything that is not a relative-time phrase is returned untouched, so this can wrap
 * arbitrary server-provided descriptions safely: `{{relative-time-literal item.description}}`.
 */
export default class RelativeTimeLiteralHelper extends Helper {
    @service intl;

    compute([text]) {
        if (typeof text !== 'string') {
            return text;
        }

        // touch the locale so the helper recomputes when the user switches language
        const locale = this.intl.primaryLocale;

        if (JUST_NOW_RE.test(text)) {
            return this.format(0, 'second', locale) ?? text;
        }

        const match = RELATIVE_RE.exec(text);
        if (!match) {
            return text;
        }

        const value = parseInt(match[1], 10);
        const unit = match[2].toLowerCase();
        const sign = match[3].toLowerCase() === 'ago' ? -1 : 1;

        return this.format(sign * value, unit, locale) ?? text;
    }

    format(value, unit, locale) {
        try {
            const formatter = new Intl.RelativeTimeFormat(locale ?? 'en', { numeric: 'auto' });
            return formatter.format(value, unit);
        } catch {
            return null;
        }
    }
}
