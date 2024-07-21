
import threading as td
import numpy as np
import networkx as nx
import time
import json

from constellation import Constellation

class Coordinator():
    def __init__(self):
        self.constel = Constellation()
        with open('static/test.czml', 'r') as f:
            self.data = json.load(f)

    def build(self, planes, nodes, inclination, altitude):
        pass

    def update(self, t):
        return self.data