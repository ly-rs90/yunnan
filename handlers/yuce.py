#!/usr/bin/python
# -*- coding: utf-8 -*-
"""
@name: yuce.py
@editor: PyCharm
@Date: 2019/7/2 16:52
@Author: ly
@Description: 功率预测
"""
import json
from tornado.web import RequestHandler
from .efile import EFile


class YuCe(RequestHandler):
    def post(self):
        res_data = {'pc': {'act': [], 'pre': []}, 'area': {'act': [], 'pre': []}}
        e_file = EFile('rne_power.txt')
        _id = self.get_argument('id', '')
        area = self.get_argument('area', '')

        # 场站功率
        if _id:
            # 实际功率
            act = e_file.get_table('rne_pc', idx=_id, type='pact')
            act = [] if not act else act[0]
            # 预测功率
            pre = e_file.get_table('rne_pc', idx=_id, type='ppre')
            pre = [] if not pre else pre[0]

            res_data['pc']['act'] = act[3:]
            res_data['pc']['pre'] = pre[3:]

        # 分区功率
        if area:
            # 实际功率
            act = e_file.get_table('rne_area_pc', subarea=area, type='pact')
            act = [] if not act else act[0]
            # 预测功率
            pre = e_file.get_table('rne_area_pc', subarea=area, type='ppre')
            pre = [] if not pre else pre[0]

            res_data['area']['act'] = act[2:]
            res_data['area']['pre'] = pre[2:]

        self.write(json.dumps(res_data))
