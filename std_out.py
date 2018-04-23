import io
import sys
from contextlib import contextmanager


@contextmanager
def std_out_redirect():
    old_stdout = sys.stdout
    sys.stdout = io.StringIO()
    yield sys.stdout
    sys.stdout = old_stdout
