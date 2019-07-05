#!/usr/bin/python
# -*- coding: utf-8 -*-
"""
@name: fenqu.py
@editor: PyCharm
@Date: 2019/7/1 15:46
@Author: ly
@Description: 
"""
import json
from tornado.web import RequestHandler
from .efile import EFile


class FenQu(RequestHandler):
    def post(self):
        res_data = {'t_cap': '', 'w_cap': '', 's_cap': '', 'h_cap': '', 'dev': []}
        e_file = EFile('rne_subarea.txt')
        area = self.get_argument('area', '0')

        # 获取装机容量
        res_data['t_cap'] = e_file.get_table('rne_cap', subarea=area, type='T')[0][2]       # 总装机容量
        res_data['w_cap'] = e_file.get_table('rne_cap', subarea=area, type='W')[0][2]         # 风电装机容量
        res_data['s_cap'] = e_file.get_table('rne_cap', subarea=area, type='S')[0][2]         # 光伏装机容量
        res_data['h_cap'] = e_file.get_table('rne_cap', subarea=area, type='H')[0][2]         # 水电装机容量

        # 获取分区设备
        if area == '0':
            dev = e_file.get_table('rne_subarea')
        else:
            dev = e_file.get_table('rne_subarea', subarea=area)
        for d in dev:
            res_data['dev'].append({'id': d[0], 'value': d[1]})
        self.write(json.dumps(res_data))
