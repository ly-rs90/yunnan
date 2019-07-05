/**
 @name: fenqujieguo.js
 @editor: PyCharm
 @Date: 2019/6/24 16:43
 @Author: ly
 @Description: 分区结果
 */
import {JetView} from "webix-jet";
import {getSvg, getArea} from "../models/data";

export default class FenQuJieGuo extends JetView {
    config() {
        return {
            css: 'bg',
            rows: [
                {
                    cols: [
                        {
                            rows: [
                                {
                                    view: 'combo', css: 'combo combo-opt', value: '0', label: '分区选择',
                                    options: [
                                        {id: '0', value: '全网'},
                                        {id: '1', value: '分区1'},
                                        {id: '2', value: '分区2'},
                                        {id: '3', value: '分区3'},
                                        {id: '4', value: '分区4'}
                                    ],
                                    on: {
                                        onChange: function (id) {
                                            getArea(id).then(function (r) {
                                                let res = r.json();
                                                let capTable = $$('cap:table');
                                                let devList = $$('dev:list');
                                                capTable.clearAll();
                                                let capData = {1: '', 2: '', 3: '', 4: ''};
                                                if (res['t_cap']) {
                                                    capData[1] = parseFloat(res['t_cap'])*100 + 'MW';
                                                }
                                                if (res['w_cap']) {
                                                    capData[2] = parseFloat(res['w_cap'])*100 + 'MW';
                                                }
                                                if (res['s_cap']) {
                                                    capData[3] = parseFloat(res['s_cap'])*100 + 'MW';
                                                }
                                                if (res['h_cap']) {
                                                    capData[4] = parseFloat(res['h_cap'])*100 + 'MW';
                                                }
                                                capTable.define('data', capData);

                                                devList.clearAll();
                                                devList.define('data', res['dev']);
                                                devList.refresh();
                                            });
                                        }
                                    }
                                },
                                {view: 'list', width: 250, css: 'list', borderless: 1, select: 1, id: 'dev:list'}
                            ]
                        },
                        {width: 3},
                        {
                            rows: [
                                {
                                    view: 'datatable', yCount: 1, css: 'table', borderless: 1, id: 'cap:table',
                                    columns: [
                                        {id: 1, header: '总装机容量', fillspace: 1},
                                        {id: 2, header: '风电装机容量', fillspace: 1},
                                        {id: 3, header: '光伏装机容量', fillspace: 1},
                                        {id: 4, header: '水电装机容量', fillspace: 1}
                                    ]
                                },
                                {id: 'svg',}
                            ]
                        }
                    ]
                },
                {height: 5}
            ]
        };
    }
    ready(_$view, _$url) {
        webix.ajax().get('/svg/main.svg').then(function (r) {
            let svgDoc = r.rawxml();
            let svg = svgDoc.children[0];
            let svgContainer = $$('svg');
            svg.setAttribute('width', svgContainer.$width);
            svg.setAttribute('height', svgContainer.$height);
            svgContainer.$view.appendChild(svg);
        });
        getArea('0').then(function (r) {
            let res = r.json();
            let capTable = $$('cap:table');
            let devList = $$('dev:list');
            capTable.clearAll();
            let capData = {1: '', 2: '', 3: '', 4: ''};
            if (res['t_cap']) {
                capData[1] = parseFloat(res['t_cap'])*100 + 'MW';
            }
            if (res['w_cap']) {
                capData[2] = parseFloat(res['w_cap'])*100 + 'MW';
            }
            if (res['s_cap']) {
                capData[3] = parseFloat(res['s_cap'])*100 + 'MW';
            }
            if (res['h_cap']) {
                capData[4] = parseFloat(res['h_cap'])*100 + 'MW';
            }
            capTable.define('data', capData);

            devList.clearAll();
            devList.define('data', res['dev']);
            devList.refresh();
        });
    }
}