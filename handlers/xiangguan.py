#!/usr/bin/python
# -*- coding: utf-8 -*-
"""
@name: xiangguan.py
@editor: PyCharm
@Date: 2019/7/3 15:03
@Author: ly
@Description: 相关性分析
"""
import json
from tornado.web import RequestHandler
from .efile import EFile


class XiangGuan(RequestHandler):
    def post(self):
        res_data = {}

        _type = self.get_argument('type', '')
        if not _type:
            self.write(json.dumps(res_data))
            return

        e_file = EFile('rne_cor.txt')
        # 表格数据
        if _type == 'table':
            data = e_file.get_table('rne_cor_idx')
            data = [] if not data else data[0]
            res_data = {'cor_cof': '', 'cor_peak': '', 'cor_val': '', 'cor_day': ''}
            if data:
                res_data['cor_cof'] = data[0]
                res_data['cor_peak'] = data[1]
                res_data['cor_val'] = data[2]
                res_data['cor_day'] = data[3]

        # 分区
        if _type == 'areaA' or _type == 'areaB':
            table_name = 'rne_cor_A' if _type == 'areaA' else 'rne_cor_B'
            _id = self.get_argument('id', '')
            res_data['data'] = []
            if not _id:
                self.write(json.dumps(res_data))
                return
            data = e_file.get_table(table_name, idx=_id)
            data = [] if not data else data[0][3:]
            res_data['data'] = data

        self.write(json.dumps(res_data))
