/**
 @name: rinei.js
 @editor: PyCharm
 @Date: 2019/6/26 15:32
 @Author: ly
 @Description: 日内评估
 */
import {JetView} from "webix-jet";
import {convertData, getArea, getRiNei, option7, option8, option9} from "../models/data";
import echarts from "echarts";
import "models/walden.js";

let e1, e2, e3;

export default class RiNei extends JetView {
    config() {
        return {
            view: 'carousel', borderless: 1, css: 'carousel',
            cols: [
                {
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
                                                    getRiNei('area', id).then(function (r) {
                                                        let res = r.json();
                                                        let t1 = $$('area:table');
                                                        t1.clearAll();
                                                        t1.define('data', [{
                                                            1: convertData(res.max_power, 'MW', 100),
                                                            2: res.max_gen_rate,
                                                            3: convertData(res.blo_power, 'MW', 100)
                                                        }]);
                                                        let d1 = res.pmax.map(function (item) {
                                                            return item*100;
                                                        });
                                                        let d2 = res.pup.map(function (item) {
                                                            return item*100;
                                                        });
                                                        e1.setOption({series: [{data: d1}, {data: d2}]});
                                                    });
                                                }
                                            }
                                        },
                                        {
                                            view: 'list', width: 250, css: 'list',
                                            borderless: 1, select: 1, id: 'dev:list',
                                            on: {
                                                onItemClick: function (id) {
                                                    getRiNei('pc', id).then(function (r) {
                                                        let name = $$('dev:list').getItem(id)['value'];
                                                        let res = r.json();
                                                        let t1 = $$('pc:table');
                                                        t1.clearAll();
                                                        t1.define('data', [{
                                                            1: convertData(res.max_power, 'MW', 100),
                                                            2: res.max_gen_rate,
                                                            3: convertData(res.blo_power, 'MW', 100)
                                                        }]);
                                                        let d1 = res.pmax.map(function (item) {
                                                            return (item*100).toFixed(3);
                                                        });
                                                        let d2 = res.pup.map(function (item) {
                                                            return (item*100).toFixed(3);
                                                        });
                                                        e2.setOption({title: {subtext: name}, series: [{data: d1}, {data: d2}]});
                                                    });
                                                }
                                            }
                                        }
                                    ]
                                },
                                {width: 3},
                                {
                                    rows: [
                                        {height: 38},
                                        {
                                            view: 'datatable', yCount: 1, css: 'table', borderless: 1, id: 'area:table',
                                            columns: [
                                                {id: '1', header: '最大可消纳电量', fillspace: 1},
                                                {id: '2', header: '最大发电率', fillspace: 1},
                                                {id: '3', header: '受阻电量', fillspace: 1},
                                            ],
                                            data: [{1: '', 2: '', 3: ''}]
                                        },
                                        {id: 'chart1', css: 'panel'},
                                        {height: 2},
                                        {
                                            view: 'datatable', yCount: 1, css: 'table', borderless: 1, id: 'pc:table',
                                            columns: [
                                                {id: '1', header: '最大可消纳电量', fillspace: 1},
                                                {id: '2', header: '最大发电率', fillspace: 1},
                                                {id: '3', header: '受阻电量', fillspace: 1},
                                            ],
                                            data: [{1: '', 2: '', 3: ''}]
                                        },
                                        {id: 'chart2', css: 'panel'}
                                    ]
                                }
                            ]
                        },
                        {height: 5}
                    ]
                },
                {
                    css: 'bg',
                    rows: [
                        {
                            cols: [
                                {
                                    rows: [
                                        {view: 'label', label: '断面选择', css: 'label label-2'},
                                        {
                                            view: 'list', width: 250, css: 'list', borderless: 1, select: 1,
                                            id: 'tie:list',
                                            on: {
                                                onItemClick: function (id) {
                                                    let name = this.getItem(id).value;
                                                    getRiNei('tie', name).then(function (r) {
                                                        let res = r.json();
                                                        let t1 = $$('tie:table');                                                        t1.clearAll();
                                                        t1.define('data', [{
                                                            1: res.tie_blo_rate,
                                                            2: convertData(res.tie_power_sur, 'MW', 100)
                                                        }]);
                                                        let d1 = res.pmax.map(function (item) {
                                                            return (item*100).toFixed(3);
                                                        });
                                                        let d2 = res.pup.map(function (item) {
                                                            return (item*100).toFixed(3);
                                                        });
                                                        e3.setOption({title: {subtext: name},series: [{data: d1}, {data: d2}]});
                                                    });
                                                }
                                            }
                                        }
                                    ]
                                },
                                {width: 3},
                                {
                                    rows: [
                                        {height: 38},
                                        {
                                            view: 'datatable', yCount: 1, css: 'table', borderless: 1, id: 'tie:table',
                                            columns: [
                                                {id: '1', header: '断面阻塞率', fillspace: 1},
                                                {id: '2', header: '断面平均功率裕量', fillspace: 1}
                                            ],
                                            data: [{1: '', 2: ''},]
                                        },
                                        {id: 'chart3', css: 'panel'}
                                    ]
                                }
                            ]
                        },
                        {height: 5}
                    ]
                }
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
            e1.setOption(option7);
            e2 = echarts.init($$('chart2').getNode(), 'walden');
            e2.setOption(option8);
            e3 = echarts.init($$('chart3').getNode(), 'walden');
            e3.setOption(option9);
        },0);
        getRiNei('area', '0').then(function (r) {
            let res = r.json();
            let t1 = $$('area:table');
            t1.clearAll();
            t1.define('data', [{
                1: convertData(res.max_power, 'MW', 100),
                2: res.max_gen_rate,
                3: convertData(res.blo_power, 'MW', 100)
            }]);
            let d1 = res.pmax.map(function (item) {
                return (item*100).toFixed(3);
            });
            let d2 = res.pup.map(function (item) {
                return (item*100).toFixed(3);
            });
            e1.setOption({series: [{data: d1}, {data: d2}]});
        });
        getRiNei('get-tie', '0').then(function (r) {
            let res = r.json();
            $$('tie:list').define('data', res);
        });
    }
}