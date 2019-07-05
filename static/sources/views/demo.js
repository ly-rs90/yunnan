import {JetView} from "webix-jet";

webix.ui({
    view: 'popup', id: 'tongji', width: 120,
    body: {
        view: 'list', autoheight: 1, select: 1, css: 'list', borderless: 1, id: 'tongji:list',
        data: [
            {id: 'jiben', value: '基本统计信息'},
            {id: 'xiangguanxing', value: '相关性信息'}
        ],
        on: {
            onItemClick: function (id) {
                $$('tongji').hide();
                $$('pinggu:list').unselectAll();
                $$('top').$scope.show('./' + id);
            }
        }
    }
});

webix.ui({
    view: 'popup', id: 'pinggu', width: 120,
    body: {
        view: 'list', autoheight: 1, select: 1, css: 'list', borderless: 1, id: 'pinggu:list',
        data: [
            {id: 'rinei', value: '日内评估'},
            {id: 'shishi', value: '实时评估'}
        ],
        on: {
            onItemClick: function (id) {
                $$('pinggu').hide();
                $$('tongji:list').unselectAll();
                $$('top').$scope.show('./' + id);
            }
        }
    }
});

export default class Demo extends JetView{
    config() {
        return {
            id: 'top',
            rows: [
                {
                    view: "toolbar", padding: 3, css: "toolbar", borderless: 1,
                    elements: [
                        {view: "icon", icon: "bookmark", width: 30, css: 'header-icon'},
                        {view: "label", label: "云南互补耦合建模界面", css: 'header-label'}
                    ]
                },
                {
                    css: 'bg',
                    cols: [
                        {
                            view: 'button', value: '耦合分区', width: 120, height: 50,
                            click: function () {
                                this.getTopParentView().$scope.show('./fenqujieguo');
                                $$('tongji:list').unselectAll();
                                $$('pinggu:list').unselectAll();
                            }
                        },
                        {
                            view: 'button', value: '功率预测', width: 120, height: 50,
                            click: function () {
                                this.getTopParentView().$scope.show('./gonglvyuce');
                                $$('tongji:list').unselectAll();
                                $$('pinggu:list').unselectAll();
                            }
                        },
                        {
                            view: 'button', value: '统计分析', width: 120, height: 50, popup: 'tongji'
                        },
                        {
                            view: 'button', value: '消纳评估', width: 120, height: 50, popup: 'pinggu'
                        }
                    ]
                },
                {$subview: true}
            ]
        };
    }
    ready(_$view, _$url) {

    }
}
