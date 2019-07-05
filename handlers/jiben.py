#!/usr/bin/python
# -*- coding: utf-8 -*-
"""
@name: jiben.py
@editor: PyCharm
@Date: 2019/7/3 10:22
@Author: ly
@Description: 基本统计信息
"""
import json
from tornado.web import RequestHandler
from .efile import EFile


class JiBen(RequestHandler):
    def post(self):
        res_data = {
            'pc': {
                'x': [],
                'y': [],
                'day_max': '',
                'day_min': '',
                'pe_va': '',
                'day_assur': '',
                'day_mean': '',
                'day_var': '',
                'mean_flu': '',
                'max_flu': '',
            },
            'area': {
                'x': [],
                'y': [],
                'day_max': '',
                'day_min': '',
                'pe_va': '',
                'day_assur': '',
                'day_mean': '',
                'day_var': '',
                'mean_flu': '',
                'max_flu': '',
            }
        }
        e_file = EFile('rne_statistics.txt')
        _id = self.get_argument('id', '')
        area = self.get_argument('area', '')

        # 场站概率
        if _id:
            # x轴
            x = e_file.get_table('rne_pdf', idx=_id, axis='x_axis')
            x = [] if not x else x[0]
            # y轴
            y = e_file.get_table('rne_pdf', idx=_id, axis='y_axis')
            y = [] if not y else y[0]

            res_data['pc']['x'] = x[3:]
            res_data['pc']['y'] = y[3:]

            # 表格数据
            t = e_file.get_table('rne_stidx', idx=_id)
            t = [] if not t else t[0]
            if t:
                res_data['pc']['day_max'] = t[2]
                res_data['pc']['day_min'] = t[3]
                res_data['pc']['pe_va'] = t[4]
                res_data['pc']['day_assur'] = t[5]
                res_data['pc']['day_mean'] = t[6]
                res_data['pc']['day_var'] = t[7]
                res_data['pc']['mean_flu'] = t[8]
                res_data['pc']['max_flu'] = t[9]

        # 分区概率
        if area:
            # x轴
            x = e_file.get_table('rne_area_pdf', subarea=area, axis='x_axis')
            x = [] if not x else x[0]
            # y轴
            y = e_file.get_table('rne_area_pdf', subarea=area, axis='y_axis')
            y = [] if not y else y[0]

            res_data['area']['x'] = x[2:]
            res_data['area']['y'] = y[2:]

            # 表格数据
            t = e_file.get_table('rne_area_stidx', subarea=area)
            t = [] if not t else t[0]
            if t:
                res_data['area']['day_max'] = t[1]
                res_data['area']['day_min'] = t[2]
                res_data['area']['pe_va'] = t[3]
                res_data['area']['day_assur'] = t[4]
                res_data['area']['day_mean'] = t[5]
                res_data['area']['day_var'] = t[6]
                res_data['area']['mean_flu'] = t[7]
                res_data['area']['max_flu'] = t[8]

        self.write(json.dumps(res_data))
