# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


class QuotesToscrapePipeline(object):
    texts = []
    def process_item(self, item, spider):
      if item["text"] in self.texts:
        raise DropItem(item["text"])
      else:
        self.texts.append(item["text"])
        return item
