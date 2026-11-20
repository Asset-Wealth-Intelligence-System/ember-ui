import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import { inject as service } from '@ember/service';
export default class ReportBuilderExportOptionsComponent extends Component {
    @service intl;
    @tracked format = 'csv';

    @tracked exportOptions = [
        { value: 'csv', label: 'CSV' },
        { value: 'xlsx', label: this.intl.t('literal.ember-ui.excel-xlsx') },
        { value: 'json', label: 'JSON' },
    ];

    @action setFormat(val) {
        this.format = val;
    }

    @action export() {
        if (!this.args.disabled) this.args.onExport?.(this.format.value);
    }
}
