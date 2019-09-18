/**
 @name: fenqujieguo.js
 @editor: PyCharm
 @Date: 2019/6/25 14:43
 @Author: ly
 @Description: 基本统计信息
 */
import {JetView} from "webix-jet";
import {getArea, getStatisticsPc, getStatisticsArea, convertData, option3, option4, option13, option14} from "../models/data";
import echarts from "echarts";
import "models/walden.js";

let e1, e2, e3, e4;

export default class JiBen extends JetView {
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
                                                let devList = $$('dev:list');
                                                devList.clearAll();
                                                devList.define('data', res['dev']);
                                                devList.refresh();
                                            });
                                            getStatisticsArea(id).then(function (r) {
                                                let res = r.json();
                                                let data = [];
                                                let data1 = []
                                                let tData = [
                                                    {
                                                        1: convertData(res.area.day_max, 'WM', 100),
                                                        2: convertData(res.area.day_min, 'MW', 100),
                                                        3: convertData(res.area.pe_va, 'MW', 100),
                                                        4: res.area.day_assur,
                                                        5: convertData(res.area.day_mean, 'MW', 100),
                                                        6: convertData(res.area.day_var, 'MW²', 10000),
                                                        7: convertData(res.area.mean_flu, 'MW', 100),
                                                        8: res.area.max_flu
                                                    }
                                                ];
                                                $$('area:table').clearAll();
                                                $$('area:table').define('data', tData);
                                                for (let i = 0; i < res.area.x.length; i++) {
                                                    data.push([(res.area.x[i]*100).toFixed(3), res.area.y[i]]);
                                                }
                                                for (let i = 0; i < res.area.x1.length; i++) {
                                                    data1.push([(res.area.x1[i]*100).toFixed(3), res.area.y1[i]]);
                                                }
                                                e1.setOption({series: [{data: data}]});
                                                e2.setOption({series: [{data: data1}]});
                                            });
                                        }
                                    }
                                },
                                {
                                    view: 'list', width: 250, css: 'list', borderless: 1, select: 1, id: 'dev:list',
                                    on: {
                                        onItemClick: function (id) {
                                            getStatisticsPc(id).then(function (r) {
                                                let res = r.json();
                                                let name = $$('dev:list').getItem(id)['value'];
                                                let data = [];
                                                let data1 = [];
                                                let tData = [
                                                    {
                                                        1: convertData(res.pc.day_max, 'WM', 100),
                                                        2: convertData(res.pc.day_min, 'MW', 100),
                                                        3: convertData(res.pc.pe_va, 'MW', 100),
                                                        4: res.pc.day_assur,
                                                        5: convertData(res.pc.day_mean, 'MW', 100),
                                                        6: convertData(res.pc.day_var, 'MW²', 10000),
                                                        7: convertData(res.pc.mean_flu, 'MW', 100),
                                                        8: res.pc.max_flu
                                                    }
                                                ];
                                                $$('pc:table').clearAll();
                                                $$('pc:table').define('data', tData);
                                                for (let i = 0; i < res.pc.x.length; i++) {
                                                    data.push([(res.pc.x[i]*100).toFixed(3), res.pc.y[i]]);
                                                }
                                                for (let i = 0; i < res.pc.x1.length; i++) {
                                                    data1.push([(res.pc.x1[i]*100).toFixed(3), res.pc.y1[i]]);
                                                }
                                                e3.setOption({title: {subtext: name},series: [{data: data}]});
                                                e4.setOption({title: {subtext: name},series: [{data: data1}]});
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
                                    view: 'datatable', yCount: 1, css: 'table',
                                    borderless: 1, id: 'area:table',
                                    columns: [
                                        {id: 1, header: '日最大出力', fillspace: 1},
                                        {id: 2, header: '日最小出力', fillspace: 1},
                                        {id: 3, header: '出力峰谷差', fillspace: 1},
                                        {id: 4, header: '日出力保证率', fillspace: 1},
                                        {id: 5, header: '日平均出力', fillspace: 1},
                                        {id: 6, header: '方差', fillspace: 1},
                                        {id: 7, header: '平均出力波动', fillspace: 1},
                                        {id: 8, header: '出力最大变化率', fillspace: 1}
                                    ],
                                    data: [{1:'',2:'',3:'',4:'',5:'',6:'',7:'',8:''}]
                                },
                                {
                                    cols: [
                                        {id: 'chart1', css: 'panel'},
                                        {width: 1},
                                        {id: 'chart2', css: 'panel'}
                                    ]
                                },
                                {height: 2},
                                {
                                    view: 'datatable', yCount: 1, css: 'table',
                                    borderless: 1, id: 'pc:table',
                                    columns: [
                                        {id: 1, header: '日最大出力', fillspace: 1},
                                        {id: 2, header: '日最小出力', fillspace: 1},
                                        {id: 3, header: '出力峰谷差', fillspace: 1},
                                        {id: 4, header: '日出力保证率', fillspace: 1},
                                        {id: 5, header: '日平均出力', fillspace: 1},
                                        {id: 6, header: '方差', fillspace: 1},
                                        {id: 7, header: '平均出力波动', fillspace: 1},
                                        {id: 8, header: '出力最大变化率', fillspace: 1}
                                    ],
                                    data: [{1:'',2:'',3:'',4:'',5:'',6:'',7:'',8:''}]
                                },
                                {
                                    cols: [
                                        {id: 'chart3', css: 'panel'},
                                        {width: 1},
                                        {id: 'chart4', css: 'panel'}
                                    ]
                                }
                            ]
                        },
                        {width: 3}
                    ]
                },
                {height: 5}
            ]
        };
    }
    ready(_$view, _$url) {
        getArea('0').then(function (r) {
            let res = r.json();
            let devList = $$('dev:list');
            devList.define('data', res['dev']);
            devList.refresh();
        });
        setTimeout(function () {
            e1 = echarts.init($$('chart1').getNode(), 'walden');
            e2 = echarts.init($$('chart2').getNode(), 'walden');
            e1.setOption(option3);
            e2.setOption(option13);
            e3 = echarts.init($$('chart3').getNode(), 'walden');
            e4 = echarts.init($$('chart4').getNode(), 'walden');
            e3.setOption(option4);
            e4.setOption(option14);
        },0);

        getStatisticsArea('0').then(function (r) {
            let res = r.json();
            let data = [];
            let data1 = [];
            let tData = [
                {
                    1: convertData(res.area.day_max, 'WM', 100),
                    2: convertData(res.area.day_min, 'MW', 100),
                    3: convertData(res.area.pe_va, 'MW', 100),
                    4: res.area.day_assur,
                    5: convertData(res.area.day_mean, 'MW', 100),
                    6: convertData(res.area.day_var, 'MW²', 10000),
                    7: convertData(res.area.mean_flu, 'MW', 100),
                    8: res.area.max_flu
                }
            ];
            $$('area:table').define('data', tData);
            for (let i = 0; i < res.area.x.length; i++) {
                data.push([(res.area.x[i]*100).toFixed(3), res.area.y[i]]);
            }
            for (let i = 0; i < res.area.x1.length; i++) {
                data1.push([(res.area.x1[i]*100).toFixed(3), res.area.y1[i]]);
            }
            e1.setOption({series: [{data: data}]});
            e2.setOption({series: [{data: data1}]});
        });
    }
}