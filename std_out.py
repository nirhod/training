import io
import sys


class stdout_redirect:
    def __enter__(self):
        self.old_stdout = sys.stdout
        sys.stdout = io.StringIO()
        return sys.stdout

    def __exit__(self, exc_type, exc_value, traceback):
        sys.stdout = self.old_stdout
