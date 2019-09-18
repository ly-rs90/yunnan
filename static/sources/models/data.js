export const getXCoording = function (num, start, len) {
    let n = num || 96;
    let x = [];
    let nowBegin = new Date(new Date().toLocaleDateString()).getTime()/1000;
    let splitSec = 24*3600/n;
    for (let i = 0; i < n; i++) {
        let temp = nowBegin + splitSec * i;
        let t = new Date(temp*1000);
        let hour = t.getHours();
        let minute = t.getMinutes();
        if (minute < 10) minute = "0" + minute;
        x.push(hour + ":" + minute);
    }
    if (start !== undefined && len !== undefined) {
        x = x.slice(start, start + len);
    }
    return x;
};
export const timesData = function (arr, v) {
    let temp = [];
    arr.map(function (item) {
        temp.push((parseFloat(item)*v).toFixed(3));
    });
    return temp;
};
export const convertData = function (d, c, s) {
    let suffix = '' || c;
    let scale = s?s:1;
    let num = parseFloat(d);
    if (isNaN(num))
        return '';
    else
        return (num * scale).toFixed(3) + suffix;
};
export const option1 = {
    title: {text: "分区功率曲线", subtext: ''},
    grid: {x: 60, y: 60, x2: 50, y2: 40},
    legend: {top: 20, data: ["实际功率", "预测功率"]},
    tooltip: {trigger: "axis"},
    xAxis: {name: "时间", data: getXCoording(), boundaryGap: false, splitLine: {interval: 3, show: false}, z: 3},
    yAxis: [{name: "兆瓦", nameGap: 8, z: 3}, {}],
    series: [
        {
            name: "实际功率",
            type: "line",
            lineStyle: {width: 3},
            data: []
        },
        {
            name: "预测功率",
            type: "line",
            lineStyle: {width: 3},
            data: []
        }
    ]
};
export const option2 = {
    title: {text: "场站功率曲线", subtext: ''},
    grid: {x: 60, y: 80, x2: 50, y2: 40},
    legend: {top: 20, data: ["实际功率", "预测功率"]},
    tooltip: {trigger: "axis"},
    xAxis: {name: "时间", data: getXCoording(), boundaryGap: false, splitLine: {interval: 3, show: false}, z: 3},
    yAxis: [{name: "兆瓦", nameGap: 8, z: 3}, {}],
    series: [
        {
            name: "实际功率",
            type: "line",
            lineStyle: {width: 3},
            data: []
        },
        {
            name: "预测功率",
            type: "line",
            lineStyle: {width: 3},
            data: []
        }
    ]
};
export const option3 = {
    title: {text: "分区概率密度"},
    grid: {x: 60, y: 60, x2: 50, y2: 40},
    tooltip: {trigger: "axis"},
    xAxis: {name: "MW", boundaryGap: false, z: 3, splitLine: {show: false}, scale: 1},
    yAxis: {name: "", nameGap: 8, z: 3, splitLine: {show: false}, show: true},
    series: [
        {
            name: "分区概率密度",
            type: "line",
            symbolSize: 1,
            data: []
        }
    ]
};
export const option4 = {
    title: {text: "场站概率密度", subtext: ''},
    grid: {x: 60, y: 80, x2: 50, y2: 40},
    tooltip: {trigger: "axis"},
    xAxis: {name: "MW", boundaryGap: false, z: 3, splitLine: {show: false}, scale: 1},
    yAxis: {name: "", nameGap: 8, z: 3, splitLine: {show: false}, show: true},
    series: [
        {
            name: "场站概率密度",
            type: "line",
            symbolSize: 1,
            data: []
        }
    ]
};
export const option13 = {
    title: {text: "分区分布函数"},
    grid: {x: 60, y: 60, x2: 50, y2: 40},
    tooltip: {trigger: "axis"},
    xAxis: {name: "MW", boundaryGap: false, z: 3, splitLine: {show: false}, scale: 1},
    yAxis: {name: "", nameGap: 8, z: 3, splitLine: {show: false}, show: true},
    series: [
        {
            name: "分区分布函数",
            type: "line",
            symbolSize: 1,
            data: []
        }
    ]
};
export const option14 = {
    title: {text: "场站分布函数", subtext: ''},
    grid: {x: 60, y: 80, x2: 50, y2: 40},
    tooltip: {trigger: "axis"},
    xAxis: {name: "MW", boundaryGap: false, z: 3, splitLine: {show: false}, scale: 1},
    yAxis: {name: "", nameGap: 8, z: 3, splitLine: {show: false}, show: true},
    series: [
        {
            name: "场站分布函数",
            type: "line",
            symbolSize: 1,
            data: []
        }
    ]
};
export const option5 = {
    title: {text: "场站A出力曲线", subtext: ''},
    grid: {x: 60, y: 80, x2: 50, y2: 40},
    tooltip: {trigger: "axis"},
    xAxis: {name: "时间", data: getXCoording(), boundaryGap: false, splitLine: {interval: 3, show: false}, z: 3},
    yAxis: [{name: "兆瓦", nameGap: 8, z: 3}, {}],
    series: [
        {
            name: "实际功率",
            type: "line",
            lineStyle: {width: 3},
            data: []
        }
    ]
};
export const option6 = {
    title: {text: "场站B出力曲线", subtext: ''},
    grid: {x: 60, y: 80, x2: 50, y2: 40},
    tooltip: {trigger: "axis"},
    xAxis: {name: "时间", data: getXCoording(), boundaryGap: false, splitLine: {interval: 3, show: false}, z: 3},
    yAxis: [{name: "兆瓦", nameGap: 8, z: 3}, {}],
    series: [
        {
            name: "实际功率",
            type: "line",
            lineStyle: {width: 3},
            data: []
        }
    ]
};
export const option7 = {
    title: {text: "分区功率评估曲线", subtext: ''},
    grid: {x: 60, y: 60, x2: 50, y2: 40},
    legend: {top: 20, data: ["最大值", "评估值"]},
    tooltip: {trigger: "axis"},
    xAxis: {name: "时间", data: getXCoording(), boundaryGap: false, splitLine: {interval: 3, show: false}, z: 3},
    yAxis: [{name: "兆瓦", nameGap: 8, z: 3}, {}],
    series: [
        {
            name: "最大值",
            type: "line",
            lineStyle: {width: 3},
            data: []
        },
        {
            name: "评估值",
            type: "line",
            lineStyle: {width: 3},
            data: []
        }
    ]
};
export const option8 = {
    title: {text: "场站功率评估曲线", subtext: ''},
    grid: {x: 60, y: 80, x2: 50, y2: 40},
    legend: {top: 20, data: ["评估上界", "评估下界", "置信上界", "置信下界"]},
    tooltip: {trigger: "axis"},
    xAxis: {
        name: "时间", data: getXCoording(),
        boundaryGap: false, splitLine: {interval: 3, show: false}, z: 3},
    yAxis: [{name: "兆瓦", nameGap: 8, z: 3, scale: 1}, {}],
    series: [
        {
            name: "评估上界",
            type: "line",
            lineStyle: {width: 3},
            data: []
        },
        {
            name: "评估下界",
            type: "line",
            lineStyle: {width: 3},
            data: []
        },
        {
            name: "置信上界",
            type: "line",
            lineStyle: {width: 3},
            data: []
        },
        {
            name: "置信下界",
            type: "line",
            lineStyle: {width: 3},
            data: []
        }
    ]
};
export const option9 = {
    title: {text: "断面功率曲线", subtext: ''},
    grid: {x: 60, y: 80, x2: 50, y2: 40},
    legend: {top: 20, data: ["评估上界", "评估下界", "置信上界", "置信下界"]},
    tooltip: {trigger: "axis"},
    xAxis: {name: "时间", data: getXCoording(),
        boundaryGap: false, splitLine: {interval: 3, show: false}, z: 3},
    yAxis: [{name: "兆瓦", nameGap: 8, z: 3, scale: 1}, {}],
    series: [
        {
            name: "评估上界",
            type: "line",
            lineStyle: {width: 3},
            data: []
        },
        {
            name: "评估下界",
            type: "line",
            lineStyle: {width: 3},
            data: []
        },
        {
            name: "置信上界",
            type: "line",
            lineStyle: {width: 3},
            data: []
        },
        {
            name: "置信下界",
            type: "line",
            lineStyle: {width: 3},
            data: []
        }
    ]
};
export const option10 = {
    title: {text: "分区功率评估曲线", subtext: ''},
    grid: {x: 60, y: 60, x2: 50, y2: 40},
    legend: {top: 20, data: ["最大值", "评估值", "最小值"]},
    tooltip: {trigger: "axis"},
    xAxis: {
        name: "时间", data: [1,2,3,4,5,6,7,8,9,10,11,12],
        boundaryGap: false, splitLine: {interval: 3, show: false}, z: 3
    },
    yAxis: [{name: "兆瓦", nameGap: 8, z: 3}, {}],
    series: [
        {
            name: "最大值",
            type: "line",
            lineStyle: {width: 3},
            data: []
        },
        {
            name: "评估值",
            type: "line",
            lineStyle: {width: 3},
            data: []
        },
        {
            name: "最小值",
            type: "line",
            lineStyle: {width: 3},
            data: []
        }
    ]
};
export const option11 = {
    title: {text: "场站功率评估曲线", subtext: ''},
    grid: {x: 60, y: 80, x2: 50, y2: 40},
    legend: {top: 20, data: ["评估上界", "评估下界", "置信上界", "置信下界"]},
    tooltip: {trigger: "axis"},
    xAxis: {
        name: "时间", data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
        boundaryGap: false, splitLine: {interval: 3, show: false}, z: 3
    },
    yAxis: [{name: "兆瓦", nameGap: 8, z: 3}, {}],
    series: [
        {
            name: "评估上界",
            type: "line",
            lineStyle: {width: 3},
            data: []
        },
        {
            name: "评估下界",
            type: "line",
            lineStyle: {width: 3},
            data: []
        },
        {
            name: "置信上界",
            type: "line",
            lineStyle: {width: 3},
            data: []
        },
        {
            name: "置信下界",
            type: "line",
            lineStyle: {width: 3},
            data: []
        }
    ]
};
export const option12 = {
    title: {text: "断面功率曲线", subtext: ''},
    grid: {x: 60, y: 80, x2: 50, y2: 40},
    legend: {top: 20, data: ["评估上界", "评估下界", "置信上界", "置信下界"]},
    tooltip: {trigger: "axis"},
    xAxis: {
        name: "时间", data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
        boundaryGap: false, splitLine: {interval: 3, show: false}, z: 3
    },
    yAxis: [{name: "兆瓦", nameGap: 8, z: 3, scale: 1}, {}],
    series: [
        {
            name: "评估上界",
            type: "line",
            lineStyle: {width: 3},
            data: []
        },
        {
            name: "评估下界",
            type: "line",
            lineStyle: {width: 3},
            data: []
        },
        {
            name: "置信上界",
            type: "line",
            lineStyle: {width: 3},
            data: []
        },
        {
            name: "置信下界",
            type: "line",
            lineStyle: {width: 3},
            data: []
        }
    ]
};
export const getPredictPc = function (id) {
    return webix.ajax().post("/yuce", {id: id});
};

export const getPredictArea = function (area) {
    return webix.ajax().post("/yuce", {area: area});
};

export const getArea = function (area) {
    return webix.ajax().post('/fenqu', {area: area});
};

export const getStatisticsPc = function (id) {
    return webix.ajax().post("/jiben", {id: id});
};
export const getStatisticsArea = function (area) {
    return webix.ajax().post("/jiben", {area: area});
};
export const getAreaA = function (id) {
    return webix.ajax().post("/xiangguan", {type: 'areaA', id: id});
};
export const getAreaB = function (id) {
    return webix.ajax().post("/xiangguan", {type: 'areaB', id: id});
};
export const getRiNei = function (type, id) {
    return webix.ajax().post("/rinei", {type: type, id: id});
};
export const getShiShi = function (type, id) {
    return webix.ajax().post("/shishi", {type: type, id: id});
};