import Component from '@glimmer/component';
import titleize from 'ember-cli-string-helpers/utils/titleize';

import { inject as service } from '@ember/service';
export default class LayoutResourcePanelHeaderActionsComponent extends Component {
    @service intl;
    get modelName() {
        if (this.args.modelName) return this.args.modelName;
        const model = this.args.resource;
        const modelName = model?.constructor?.modelName ?? model?._internalModel?.modelName;
        if (!modelName) {
            return this.intl.t('literal.ember-ui.resource');
        }

        const normalized = modelName.replace(/[-_]/g, ' ');
        return titleize(normalized);
    }
}
