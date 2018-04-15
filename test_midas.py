import pytest
from midas import session, Terrorist, Base, engine, Organization, Event, DB_PATH
import datetime
import os


ORGANIZATION112 = Organization(id=112, prime_location='Communists', name='Cultural Victory')
EVENT113 = Event(id=113, location='Pyongyang', date=datetime.datetime.now())
EVENT114 = Event(id=114, location='Ches_hat', date=datetime.datetime.now())
TERRORIST111 = Terrorist(id=111, name='Lady', last_name='Gaga', role='Singer', location='Youtube'
                         , organization=ORGANIZATION112, events=[EVENT113, EVENT114])
TERRORIST115 = Terrorist(id=115, name='Psy', last_name='South', role='Dancer', location='Gangnam'
                         , organization=ORGANIZATION112, events=[EVENT113, EVENT114])


@pytest.mark.parametrize('table_object, table_line',
                         [(Organization, ORGANIZATION112)
                          , (Event, EVENT113)
                          , (Event, EVENT114)
                          , (Terrorist, TERRORIST111)
                          , (Terrorist, TERRORIST115)])
def test_insert(table_object, table_line):
    session.add(table_line)
    session.commit()
    assert session.query(table_object).filter_by(id=table_line.id).first() is table_line


@pytest.mark.parametrize('terrorist, event',
                         [(TERRORIST111, EVENT113)
                          , (TERRORIST111, EVENT114)
                          , (TERRORIST115, EVENT113)
                          , (TERRORIST115, EVENT114)])
def test_terrorist_event_connection(terrorist: Terrorist, event: Event):
    assert event in terrorist.events
    assert terrorist in event.terrorists


@pytest.mark.parametrize('terrorist, organization',
                         [(TERRORIST111, ORGANIZATION112)
                          , (TERRORIST115, ORGANIZATION112)])
def test_terrorist_organization_connection(terrorist: Terrorist, organization: Organization):
    assert organization is terrorist.organization
    assert terrorist in organization.terrorists


@pytest.fixture(scope='session', autouse=True)
def run_around_tests():
    Base.metadata.create_all(engine)
    yield
    session.close()
    os.remove(DB_PATH)
