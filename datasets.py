# In[1]:
from interface import Entry

# In[2]:
from random import Random
rnd = Random(0)

# In[5]:
import ipaddr

# In[17]:
LOWEST_IP = 2 ** 30  # 64.0.0.0
HIGHEST_IP = 2 ** 31  # 128.0.0.0

# In[67]:
import datetime as dt

# In[68]:
LOWEST_TIME = dt.datetime(2001, 1, 1).toordinal()
HIGHEST_TIME = dt.datetime(2016, 1, 1).toordinal()

# In[69]:
PROTOCOLS = ['TCP', 'UDP', 'DNS', 'HTTP', 'SSH', 'FTP']


# In[70]:
def _generate_dataset(number_of_ips, number_of_entries_per_ip):
    for ip_num in (rnd.randint(LOWEST_IP, HIGHEST_IP) for _ in range(number_of_ips)):
        for _ in range(number_of_entries_per_ip):
            yield Entry(str(ipaddr.IPAddress(ip_num)), protocol=rnd.choice(PROTOCOLS),
                        timestamp=dt.datetime.fromordinal(rnd.randint(LOWEST_TIME, HIGHEST_TIME)))


# In[71]:
def s1wide():
    """
    Return a small data set, with a wide variety of ips.
    """
    NUMBER_OF_IPS = 128
    NUMBER_OF_ENTRIES_PER_IP = 128

    for entry in _generate_dataset(NUMBER_OF_IPS, NUMBER_OF_ENTRIES_PER_IP):
        yield entry


# In[72]:
def s1narrow():
    """
    Return a small data set, with a small variey of ips.
    """
    NUMBER_OF_IPS = 16
    NUMBER_OF_ENTRIES_PER_IP = 1024

    for entry in _generate_dataset(NUMBER_OF_IPS, NUMBER_OF_ENTRIES_PER_IP):
        yield entry


def l1wide():
    """
    Return a large data set, with a wide variety of ips.
    """
    NUMBER_OF_IPS = 16384
    NUMBER_OF_ENTRIES_PER_IP = 128

    for entry in _generate_dataset(NUMBER_OF_IPS, NUMBER_OF_ENTRIES_PER_IP):
        yield entry


def l1narrow():
    """
    Return a large data set, with a small variety of ips.
    """
    NUMBER_OF_IPS = 128
    NUMBER_OF_ENTRIES_PER_IP = 16384

    for entry in _generate_dataset(NUMBER_OF_IPS, NUMBER_OF_ENTRIES_PER_IP):
        yield entry
