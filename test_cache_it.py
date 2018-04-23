from unittest import mock

import cache_it


def test_cache_calls():
    """
    Call twice to a function decorated with cache_it.cache and make sure it was called only once.
    """
    mock_func = mock.Mock().method()
    cached_mock_func = cache_it.cache(mock_func)
    cached_mock_func()
    assert mock_func.call_count == 1
    cached_mock_func()
    assert mock_func.call_count == 1


def test_cache_result():
    def func(x):
        return x + 1
    result = func(5)
    cached_func = cache_it.cache(func)
    assert cached_func(5) == result
    assert cached_func(5) == result  # Checked twice because func won't be called at the second time.
