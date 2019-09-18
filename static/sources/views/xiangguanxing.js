/**
 @name: xiangguanxing.js
 @editor: PyCharm
 @Date: 2019/6/25 15:25
 @Author: ly
 @Description: 相关性信息
 */
import {JetView} from "webix-jet";
import {getArea, getAreaA, getAreaB, option5, option6} from "../models/data";
import echarts from "echarts";
import "models/walden.js";

let e1, e2;

export default class XiangGuanXing extends JetView {
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
                                                let devList = $$('dev:listA');
                                                devList.clearAll();
                                                devList.define('data', res['dev']);
                                                devList.refresh();
                                            });
                                        }
                                    }
                                },
                                {
                                    view: 'list', width: 250, css: 'list', borderless: 1, select: 1, id: 'dev:listA',
                                    on: {
                                        onItemClick: function (id) {
                                            let name = $$('dev:listA').getItem(id)['value'];
                                            getAreaA(id).then(function (r) {
                                                let res = r.json();
                                                let d1 = res.data.map(function (item) {
                                                    return (item*100).toFixed(3);
                                                });
                                                e1.setOption({title: {subtext: name}, series: [{data: d1}]});
                                            });
                                        }
                                    }
                                }
                            ]
                        },
                        {width: 3},
                        {
                            rows: [
                                {
                                    cols: [
                                        {
                                            css: "date-picker date-picker-none", view: "datepicker", width: 260,
                                            value: new Date(), format: "%Y/%m/%d", id: "date:start", stringResult: 1,
                                            label: '起始时间'
                                        },
                                        {width: 30},
                                        {
                                            css: "date-picker date-picker-none", view: "datepicker", width: 260,
                                            value: new Date(), format: "%Y/%m/%d", id: "date:end", stringResult: 1,
                                            label: '结束时间'
                                        },
                                        {}
                                    ]
                                },
                                {
                                    view: 'datatable', yCount: 1, css: 'table', borderless: 1, id: 'cor:table',
                                    columns: [
                                        {id: '1', header: '相关系数', fillspace: 1},
                                        {id: '2', header: '峰荷出力互补度', fillspace: 1},
                                        {id: '3', header: '谷荷出力互补度', fillspace: 1},
                                        {id: '4', header: '日出力互补度', fillspace: 1},
                                        {id: '5', header: '最大出力比', fillspace: 1},
                                        {id: '6', header: '最小出力比', fillspace: 1},
                                        {id: '7', header: '出力波动比', fillspace: 1}
                                    ],
                                    data: [
                                        {1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: ''}
                                    ]
                                },
                                {
                                    cols: [
                                        {id: 'chart1', css: 'panel'},
                                        {width: 3},
                                        {id: 'chart2', css: 'panel'}
                                    ]
                                }
                            ]
                        },
                        {width: 3},
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
                                                let devList = $$('dev:listB');
                                                devList.clearAll();
                                                devList.define('data', res['dev']);
                                                devList.refresh();
                                            });
                                        }
                                    }
                                },
                                {
                                    view: 'list', width: 250, css: 'list', borderless: 1, select: 1, id: 'dev:listB',
                                    on: {
                                        onItemClick: function (id) {
                                            let name = $$('dev:listB').getItem(id)['value'];
                                            getAreaB(id).then(function (r) {
                                                let res = r.json();
                                                let d1 = res.data.map(function (item) {
                                                    return (item*100).toFixed(3);
                                                });
                                                e2.setOption({title: {subtext: name}, series: [{data: d1}]});
                                            });
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {height: 5}
            ]
        };
    }
    ready(_$view, _$url) {
        getArea('0').then(function (r) {
            let res = r.json();
            let devListA = $$('dev:listA');
            let devListB = $$('dev:listB');
            devListA.define('data', res['dev']);
            devListA.refresh();
            devListB.define('data', res['dev']);
            devListB.refresh();
        });
        webix.ajax().post('/xiangguan', {type: 'table'}).then(function (r) {
            let res = r.json();
            let data = [{
                1: res.cor_cof, 2: res.cor_peak, 3: res.cor_val, 4: res.cor_day,
                5: res.maxRatio, 6: res.minRatio, 7: res.varRatio
            }];
            $$('cor:table').clearAll();
            $$('cor:table').define('data', data);
        });
        setTimeout(function () {
            e1 = echarts.init($$('chart1').getNode(), 'walden');
            e2 = echarts.init($$('chart2').getNode(), 'walden');
            e1.setOption(option5);
            e2.setOption(option6);
        });
    }
}