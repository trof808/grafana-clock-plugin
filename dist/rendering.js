'use strict';

System.register(['jquery'], function (_export, _context) {
    "use strict";

    var $;
    function link(scope, elem, attrs, ctrl) {
        var data = void 0;
        var panel = ctrl.panel;

        elem = elem.find('.panel-content');

        ctrl.events.on('render', function () {
            render();
        });

        function render() {
            console.log(elem);
            console.log(panel);
        }
    }

    _export('default', link);

    return {
        setters: [function (_jquery) {
            $ = _jquery.default;
        }],
        execute: function () {}
    };
});
//# sourceMappingURL=rendering.js.map
