import $ from 'jquery';

export default function link(scope, elem, attrs, ctrl) {
    let data;
    const panel = ctrl.panel;

    elem = elem.find('.panel-content');

    ctrl.events.on('render', function () {
        render();
    });

    function render() {
        console.log(elem);
        console.log(panel);
    }
}
