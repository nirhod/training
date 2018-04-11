from midas import session, Terrorist, Base, engine


def test_insert_user():
    Base.metadata.create_all(engine)
    user1 = Terrorist(id=111, name='Lady', last_name='Gaga', role='Singer', location='Youtube')
    session.add(user1)
    session.commit()
    assert session.query(Terrorist).first() is user1
    session.query(Terrorist).filter_by(id=111).delete()
    session.commit()
