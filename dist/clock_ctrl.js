'use strict';

System.register(['app/plugins/sdk', 'moment', 'lodash', './rendering'], function (_export, _context) {
  "use strict";

  var PanelCtrl, MetricsPanelCtrl, moment, _, rendering, _createClass, panelDefaults, ClockCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appPluginsSdk) {
      PanelCtrl = _appPluginsSdk.PanelCtrl;
      MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
    }, function (_moment) {
      moment = _moment.default;
    }, function (_lodash) {
      _ = _lodash.default;
    }, function (_rendering) {
      rendering = _rendering.default;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      panelDefaults = {
        clockType: '24 hour',
        fontSize: '60px',
        fontWeight: 'normal',
        bgColor: null
      };

      _export('ClockCtrl', ClockCtrl = function (_MetricsPanelCtrl) {
        _inherits(ClockCtrl, _MetricsPanelCtrl);

        function ClockCtrl($scope, $injector, $rootScope) {
          _classCallCheck(this, ClockCtrl);

          var _this = _possibleConstructorReturn(this, (ClockCtrl.__proto__ || Object.getPrototypeOf(ClockCtrl)).call(this, $scope, $injector));

          _this.$rootScope = $rootScope;
          _this.hiddenSeries = {};

          var panelDefaults = {
            pieType: 'hist',
            legend: {
              show: true, // disable/enable legend
              values: true
            },
            links: [],
            datasource: null,
            maxDataPoints: 3,
            interval: null,
            targets: [{}],
            cacheTimeout: null,
            nullPointMode: 'connected',
            legendType: 'Under graph',
            breakPoint: '50%',
            aliasColors: {},
            format: 'short',
            valueName: 'current',
            strokeWidth: 1,
            fontSize: '80%',
            histData: {},
            combine: {
              threshold: 0.0,
              label: 'Others'
            }
          };
          _.defaults(_this.panel, panelDefaults);
          _.defaults(_this.panel.legend, panelDefaults.legend);
          _this.updateClock();

          _this.events.on('render', _this.onRender.bind(_this));
          _this.events.on('data-received', _this._onDataReceived.bind(_this));
          return _this;
        }

        _createClass(ClockCtrl, [{
          key: 'onRender',
          value: function onRender() {
            this.data = this.parseData(this.series);
            this.panel.histData = this.data;
          }
        }, {
          key: '_onDataReceived',
          value: function _onDataReceived(data) {
            console.log(data);
            this.series = data;
            this.data = this.parseData(data);
            this.panel.histData = data;
            this.render(this.data);
          }
        }, {
          key: 'parseData',
          value: function parseData(data) {
            return _.map(data, function (d, i) {
              return {
                title: 'data ' + i,
                items: _.map(d.rows, function (r, j) {
                  return {
                    x: moment(r[0]),
                    y: r[1]
                  };
                })
              };
            });
          }
        }, {
          key: 'link',
          value: function link(scope, elem, attrs, ctrl) {
            console.log(scope, elem, attrs, ctrl);
            rendering(scope, elem, attrs, ctrl);
          }
        }, {
          key: 'onInitEditMode',
          value: function onInitEditMode() {
            this.addEditorTab('Options', 'public/plugins/test-clock-plugin/editor.html', 2);
          }
        }, {
          key: 'updateClock',
          value: function updateClock() {
            var _this2 = this;

            this.time = moment().format('hh:mm:ss');
            this.$timeout(function () {
              _this2.updateClock();
            }, 1000);
          }
        }]);

        return ClockCtrl;
      }(MetricsPanelCtrl));

      _export('ClockCtrl', ClockCtrl);

      ClockCtrl.templateUrl = 'module.html';
    }
  };
});
//# sourceMappingURL=clock_ctrl.js.map
