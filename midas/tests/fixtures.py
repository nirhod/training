import pytest
import os

from midas.config import DB_PATH
from midas.tables import Terrorist, Organization, Event


@pytest.fixture(scope='session')
def db_path(tmpdir_factory):
    return os.path.join(tmpdir_factory.mktemp('temp'), os.path.basename(DB_PATH))


@pytest.fixture(scope='session')
def org_cultural_victory():
    return Organization(prime_location='Communists', name='Cultural Victory')


@pytest.fixture(scope='session')
def event_pyongyang():
    return Event(location='Pyongyang')


@pytest.fixture(scope='session')
def event_ches_hat():
    return Event(location='Ches_hat')


@pytest.fixture(scope='session')
def event_red_square():
    return Event(location='Red_Square')


@pytest.fixture(scope='session')
def terrorist_lady_gaga(org_cultural_victory, event_pyongyang, event_ches_hat, event_red_square):
    return Terrorist(name='Lady', last_name='Gaga', role='Singer', location='Youtube',
                     organization=org_cultural_victory, events=[event_pyongyang, event_ches_hat, event_red_square])


@pytest.fixture(scope='session')
def terrorist_psy(org_cultural_victory, event_pyongyang, event_ches_hat, event_red_square):
    return Terrorist(name='Psy', last_name='South', role='Dancer', location='Gangnam',
                     organization=org_cultural_victory, events=[event_pyongyang, event_ches_hat, event_red_square])


@pytest.fixture(scope='session')
def terrorist_kurt_cobain(org_cultural_victory, event_pyongyang, event_ches_hat):
    return Terrorist(name='Kurt', last_name='Cobain', role='Smells', location='Spirits_Town',
                     organization=org_cultural_victory, events=[event_pyongyang, event_ches_hat])
