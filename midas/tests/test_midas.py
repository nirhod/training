from sqlalchemy import create_engine

from midas.session_creator import Base, session
import midas.queries
import midas.tables

from .fixtures import *


def test_terrorist_event_connection(terrorist_lady_gaga, event_pyongyang):
    assert event_pyongyang in terrorist_lady_gaga.events
    assert terrorist_lady_gaga in event_pyongyang.terrorists


def test_terrorist_organization_connection(terrorist_lady_gaga, org_cultural_victory):
    assert org_cultural_victory is terrorist_lady_gaga.organization
    assert terrorist_lady_gaga in org_cultural_victory.terrorists


def test_queries_get_terrorists_not_in_organization_location(terrorist_lady_gaga, terrorist_psy, terrorist_kurt_cobain):
    assert {terrorist_lady_gaga, terrorist_psy, terrorist_kurt_cobain} == \
           set(midas.queries.get_terrorists_not_in_organization_location(session.session).all())


def test_queries_get_number_of_terrorists_in_every_organization(org_cultural_victory):
    number_of_terrorists_in_every_organization = midas.queries.get_number_of_terrorists_in_every_organization(
        session.session).one()
    assert number_of_terrorists_in_every_organization[0] is org_cultural_victory
    assert number_of_terrorists_in_every_organization[1] == 3


def test_terrorist_get(terrorist_lady_gaga, terrorist_psy, terrorist_kurt_cobain):
    counter = 0
    for terrorist in midas.tables.Terrorist.get():
        counter += 1
        assert terrorist in [terrorist_lady_gaga, terrorist_psy, terrorist_kurt_cobain]
    assert counter == 3


def test_terrorist_refine_filter_by(terrorist_lady_gaga):
    assert midas.Terrorist.get().refine(name='Lady').one() is terrorist_lady_gaga


def test_terrorist_refine_filter(terrorist_lady_gaga):
    assert midas.Terrorist.get().refine(midas.Terrorist.name=='Lady').one() is terrorist_lady_gaga


def test_function_before_refine(terrorist_lady_gaga):
    assert midas.Terrorist.get().order_by(midas.Terrorist.id).refine(name='Lady').one() == terrorist_lady_gaga
    assert midas.Terrorist.get().order_by(midas.Terrorist.id).refine(midas.Terrorist.name=='Lady').one() == \
           terrorist_lady_gaga


def test_refine_before_function(terrorist_lady_gaga):
    assert midas.Terrorist.get().refine(name='Lady').order_by(midas.Terrorist.id).one() == terrorist_lady_gaga
    assert midas.Terrorist.get().refine(midas.Terrorist.name=='Lady').order_by(midas.Terrorist.id).one() == \
           terrorist_lady_gaga


@pytest.fixture(scope='session', autouse=True)
def db_session(db_path, org_cultural_victory, event_pyongyang, event_ches_hat, event_red_square,
               terrorist_lady_gaga, terrorist_psy, terrorist_kurt_cobain):
    engine = create_engine(f'sqlite:///{db_path}')
    Base.metadata.create_all(engine)
    session.connect(engine)
    to_add = [org_cultural_victory, event_pyongyang, event_ches_hat, event_red_square, terrorist_lady_gaga, terrorist_psy, terrorist_kurt_cobain]
    session.session.add_all(to_add)
    session.session.commit()
    yield
    session.session.close()
