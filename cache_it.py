import functools

CACHE_KEYS = []
CACHE_VALUES = []


def cache(func):
    """
    A decorator, cache the previous results of functions calls.
    """
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        if (func, args, kwargs) in CACHE_KEYS:
            return CACHE_VALUES[CACHE_KEYS.index((func, args, kwargs))]
        CACHE_KEYS.append((func, args, kwargs))
        CACHE_VALUES.append(func(*args, **kwargs))
        return CACHE_VALUES[-1]
    return wrapper
