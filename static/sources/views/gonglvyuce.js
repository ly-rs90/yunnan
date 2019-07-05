/**
 @name: fenqujieguo.js
 @editor: PyCharm
 @Date: 2019/6/25 10:43
 @Author: ly
 @Description: 功率预测
 */
import {JetView} from "webix-jet";
import {getArea, getPredictArea, getPredictPc, option1, option2} from "../models/data";
import echarts from "echarts";
import "models/walden.js";

let e1, e2;
export default class GongLvYuCe extends JetView {
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
                                            getPredictArea(id).then(function (r) {
                                                let res = r.json();
                                                let d1 = res.area.act.map(function (item) {
                                                    return (item*100).toFixed(3);
                                                });
                                                let d2 = res.area.pre.map(function (item) {
                                                    return (item*100).toFixed(3);
                                                });
                                                e1.setOption({series: [{data: d1}, {data: d2}]});
                                            });
                                        }
                                    }
                                },
                                {
                                    view: 'list', width: 250, css: 'list', borderless: 1, select: 1, id: 'dev:list',
                                    on: {
                                        onItemClick: function (id) {
                                            getPredictPc(id).then(function (r) {
                                                let res = r.json();
                                                let name = $$('dev:list').getItem(id)['value'];
                                                let d1 = res.pc.act.map(function (item) {
                                                    return (item*100).toFixed(3);
                                                });
                                                let d2 = res.pc.pre.map(function (item) {
                                                    return (item*100).toFixed(3);
                                                });
                                                e2.setOption({title: {subtext: name},series: [{data: d1}, {data: d2}]});
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
                                {id: 'chart1', css: 'panel'},
                                {height: 2},
                                {id: 'chart2', css: 'panel'}
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
            let devList = $$('dev:list');
            devList.clearAll();
            devList.define('data', res['dev']);
            devList.refresh();
        });
        e1 = echarts.init($$('chart1').getNode(), 'walden');
        e2 = echarts.init($$('chart2').getNode(), 'walden');
        e1.setOption(option1);
        e2.setOption(option2);
        setTimeout(function () {
            e1.resize();
            e2.resize();
        },0);
        getPredictArea('0').then(function (r) {
            let res = r.json();
            let d1 = res.area.act.map(function (item) {
                return (item*100).toFixed(3);
            });
            let d2 = res.area.pre.map(function (item) {
                return (item*100).toFixed(3);
            });
            e1.setOption({series: [{data: d1}, {data: d2}]});
        });
    }
    destroy() {
        if (e1) {
            e1.dispose();
        }
        if (e2) {
            e2.dispose();
        }
    }
}