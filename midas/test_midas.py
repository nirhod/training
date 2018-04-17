import pytest
import os

from midas.tables import Terrorist, Organization, Event
from midas.session_creator import Base, engine, session, DB_PATH
import midas.queries
import midas.tables


def test_terrorist_event_connection(db_session):
    assert db_session['events'][0] in db_session['terrorists'][0].events
    assert db_session['terrorists'][0] in db_session['events'][0].terrorists


def test_terrorist_organization_connection(db_session):
    assert db_session['organizations'][0] is db_session['terrorists'][0].organization
    assert db_session['terrorists'][0] in db_session['organizations'][0].terrorists


def test_queries_get_terrorists_not_in_organization_location(db_session):
    assert db_session['terrorists'] == midas.queries.get_terrorists_not_in_organization_location().all()


def test_queries_get_number_of_terrorists_in_every_organization(db_session):
    number_of_terrorists_in_every_organization = midas.queries.get_number_of_terrorists_in_every_organization().one()
    assert number_of_terrorists_in_every_organization[0] is db_session['organizations'][0]
    assert number_of_terrorists_in_every_organization[1] == 3


def test_terrorist_get(db_session):
    counter = 0
    for terrorist in midas.tables.Terrorist.get():
        counter += 1
        assert terrorist in db_session['terrorists']
    assert counter == len(db_session['terrorists'])


def test_terrorist_refine_filter_by(db_session):
    assert midas.Terrorist.get().refine(name='Lady').one() is db_session['terrorists'][0]


def test_terrorist_refine_filter(db_session):
    assert midas.Terrorist.get().refine(midas.Terrorist.name=='Lady').one() is db_session['terrorists'][0]


@pytest.fixture(scope='session', autouse=True)
def db_session():
    db_rows = {'organizations': [Organization(prime_location='Communists', name='Cultural Victory')],
               'events': [Event(location='Pyongyang'), Event(location='Ches_hat'), Event(location='Red_Square')]}
    db_rows['terrorists'] = [Terrorist(name='Lady', last_name='Gaga', role='Singer', location='Youtube',
                                       organization=db_rows['organizations'][0],
                                       events=[db_rows['events'][0], db_rows['events'][1], db_rows['events'][2]]),
                             Terrorist(name='Psy', last_name='South', role='Dancer', location='Gangnam',
                                       organization=db_rows['organizations'][0],
                                       events=[db_rows['events'][0], db_rows['events'][1], db_rows['events'][2]]),
                             Terrorist(name='Kurt', last_name='Cobain', role='Smells', location='Spirits_Town',
                                       organization=db_rows['organizations'][0],
                                       events=[db_rows['events'][0], db_rows['events'][1]])]
    Base.metadata.create_all(engine)
    session.add_all(db_rows['organizations'] + db_rows['events'] + db_rows['terrorists'])
    session.commit()
    yield db_rows
    session.close()
    os.remove(DB_PATH)
