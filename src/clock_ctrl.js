import {PanelCtrl, MetricsPanelCtrl} from 'app/plugins/sdk';
import moment from 'moment';
import _ from 'lodash';
import rendering from './rendering';

const panelDefaults = {
  clockType: '24 hour',
  fontSize: '60px',
  fontWeight: 'normal',
  bgColor: null
};

export class ClockCtrl extends MetricsPanelCtrl {
  constructor($scope, $injector) {
    super($scope, $injector);
    _.defaults(this.panel, panelDefaults);
    this.updateClock();

    this.events.on('render', this.onRender.bind(this));
    this.events.on('data-received', this._onDataReceived.bind(this));
  }

  onRender() {
      this.data = this.parseData(this.series);
  }

  _onDataReceived(data) {
      console.log(data);
      this.series = data;
      this.data = this.parseData(data);
      this.render(this.data);
  }

  parseData(data) {
    return _.map(data, (d ,i) => {
      return {
        title: `data ${i}`,
        items: _.map(d.row, (r, j) => {
          return {
            x: moment(r[0]),
            y: r[1]
          }
        })
      }
    })
  }


  link(scope, elem, attrs, ctrl) {
    console.log(scope, elem, attrs, ctrl);
    rendering(scope, elem, attrs, ctrl);
  }

  onInitEditMode() {
    this.addEditorTab('Options', 'public/plugins/test-clock-plugin/editor.html', 2);
  }

  updateClock() {
    this.time = moment().format('hh:mm:ss');
    this.$timeout(() => { this.updateClock(); }, 1000);
  }
}

ClockCtrl.templateUrl = 'module.html';
