#!/usr/bin/python
# -*- coding: utf-8 -*-
"""
@name: rinei.py
@editor: PyCharm
@Date: 2019/7/4 11:24
@Author: ly
@Description: 
"""
import json
from tornado.web import RequestHandler
from .efile import EFile


class RiNei(RequestHandler):
    def post(self):
        res_data = {}
        _type = self.get_argument('type', '')
        if not _type:
            self.write(json.dumps(res_data))
            return

        _id = self.get_argument('id', '')
        e_file = EFile('rne_day_ass.txt')

        # 区域
        if _type == 'area':
            res_data['max_power'] = ''
            res_data['max_gen_rate'] = ''
            res_data['blo_power'] = ''
            # 表格
            data = e_file.get_table('rne_area_day_assidx', subarea=_id)
            data = [] if not data else data[0][1:]
            if data:
                res_data['max_power'] = data[0]
                res_data['max_gen_rate'] = data[1]
                res_data['blo_power'] = data[2]
            # 图形
            data = e_file.get_table('rne_area_day_ass', subarea=_id, type='pmax')   # 最大值
            data = [] if not data else data[0][2:]
            res_data['pmax'] = data

            data = e_file.get_table('rne_area_day_ass', subarea=_id, type='pup')  # 评估值
            data = [] if not data else data[0][2:]
            res_data['pup'] = data
        # 场站
        if _type == 'pc':
            res_data['max_power'] = ''
            res_data['max_gen_rate'] = ''
            res_data['blo_power'] = ''
            # 表格
            data = e_file.get_table('rne_day_assidx', idx=_id)
            data = [] if not data else data[0][2:]
            if data:
                res_data['max_power'] = data[0]
                res_data['max_gen_rate'] = data[1]
                res_data['blo_power'] = data[2]
            # 图形
            data = e_file.get_table('rne_day_ass', idx=_id, type='pmax')  # 最大值
            data = [] if not data else data[0][3:]
            res_data['pmax'] = data

            data = e_file.get_table('rne_day_ass', idx=_id, type='pup')  # 评估值
            data = [] if not data else data[0][3:]
            res_data['pup'] = data
        # 断面
        if _type == 'tie':
            res_data['tie_blo_rate'] = ''
            res_data['tie_power_sur'] = ''
            # 表格
            data = e_file.get_table('tie_day_assidx', name=_id)
            data = [] if not data else data[0][1:]
            if data:
                res_data['tie_blo_rate'] = data[0]
                res_data['tie_power_sur'] = data[1]
            # 图形
            data = e_file.get_table('tie_day_ass', name=_id, type='pmax')   # 最大值
            data = [] if not data else data[0][2:]
            res_data['pmax'] = data

            data = e_file.get_table('tie_day_ass', name=_id, type='pup')  # 评估值
            data = [] if not data else data[0][2:]
            res_data['pup'] = data
        # 获取断面
        if _type == 'get-tie':
            res_data = []
            data = e_file.get_table('tie_day_ass')
            tie_name = set()
            for n in data:
                tie_name.add(n[0])
            for n in tie_name:
                res_data.append({'value': n})

        self.write(json.dumps(res_data))
