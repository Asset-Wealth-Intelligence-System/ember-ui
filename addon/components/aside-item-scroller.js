import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, computed, get } from '@ember/object';

import { inject as service } from '@ember/service';
export default class AsideItemScrollerComponent extends Component {
    @service intl;
    @tracked items = [];
    @tracked selected;

    constructor() {
        super(...arguments);

        if (typeof this.args.onInit === 'function') {
            this.args.onInit(this);
        }
    }

    @action onCreate() {
        const { onCreate } = this.args;

        if (typeof onCreate === 'function') {
            onCreate(this);
        }
    }

    @computed('args.{titleKey,items,items.[]}') get itemsGroupByTitleLetter() {
        const { titleKey, items } = this.args;
        const grouped = {};

        for (let i = 0; i < items.length; i++) {
            const item = items.objectAt(i);
            const title = get(item, titleKey);
            const firstLetter = title[0];

            if (!title || !firstLetter) {
                continue;
            }

            if (!grouped[firstLetter]) {
                grouped[firstLetter] = [];
            }

            grouped[firstLetter].pushObject(item);
        }

        return grouped;
    }

    @computed('itemsGroupByTitleLetter') get powerSelectGrouped() {
        const grouped = [];

        for (let groupName in this.itemsGroupByTitleLetter) {
            grouped.pushObject({
                groupName,
                options: this.itemsGroupByTitleLetter[groupName],
            });
        }

        return grouped;
    }

    @computed('args.resource') get resource() {
        return this.args.resource ?? 'item';
    }

    @computed('args.title') get title() {
        return this.args.title ?? this.intl.t('literal.ember-ui.directory');
    }
}
