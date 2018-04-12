import pytest
from midas import session, Terrorist, Base, engine, Organization, Event
import datetime

Base.metadata.create_all(engine)


@pytest.mark.parametrize('table_object, table_line',
                         [(Terrorist, Terrorist(id=111, name='Lady', last_name='Gaga', role='Singer', location='Youtube'))
                          , (Organization, Organization(id=112, prime_location='Communists', name='Cultural Victory'))
                          , (Event, Event(id=113, location='Pyongyang', date=datetime.datetime.now()))])
def test_insert(table_object, table_line):
    session.add(table_line)
    session.commit()
    assert session.query(table_object).filter_by(id=table_line.id).first() is table_line
    session.query(table_object).filter_by(id=table_line.id).delete()
    session.commit()
