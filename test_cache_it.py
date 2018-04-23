from unittest import mock

import cache_it


def test_cache():
    """
    Call twice to a function decorated with cache_it.cache and make sure it was called only once.
    """
    mock_func = mock.Mock().method()
    cached_mock_func = cache_it.cache(mock_func)
    cached_mock_func()
    assert mock_func.call_count == 1
    cached_mock_func()
    assert mock_func.call_count == 1
