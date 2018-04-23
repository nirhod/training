import pytest
import os

import cache_it


def func(num):
    return num


def test_cached():
    cached_func = cache_it.cache(func)
    result = cached_func(4)
    assert (func, (4, ), {}) == cache_it.CACHE_KEYS[-1]
    assert result == cache_it.CACHE_VALUES[-1]


def test_use_cached(monkeypatch):
    # monkeypatch.setattr(cache_it.CACHE_KEYS, '__contains__', lambda x: True)
    # monkeypatch.setattr(os.path, 'isdir', lambda x: True)
    # assert os.path.isdir('./blablabla.txt')
    # print(cache_it.CACHE_KEYS.index)
    # monkeypatch.setattr('cache_it.CACHE_KEYS.index', lambda x: 3)
    # monkeypatch.setattr('cache_it.CACHE_KEYS.index', lambda x: 3)
    cache_it.CACHE_KEYS.append((func, (10, ), {}))
    cache_it.CACHE_VALUES.append(11)
    cached_func = cache_it.cache(func)
    assert cached_func(10) == 11
