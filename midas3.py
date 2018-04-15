from midas import Terrorist, Organization, Event, session
from sqlalchemy import func, distinct


def terrorists_not_in_organization_location(session=session):
    return session.query(Terrorist).join(Organization).filter(Terrorist.location != Organization.prime_location)


def last_event_every_terrorist(session=session):
    return session.query(Terrorist, func.max(Event.date)).join(Terrorist.events).group_by(Terrorist)


def number_of_terrorists_in_every_organization(session=session):
    return session.query(Organization, func.count()).outerjoin(Terrorist).group_by(Organization)


def number_of_organizations_in_every_event(session=session):
    return session.query(Event, func.count(distinct(Terrorist.organization_id))).outerjoin(Event.terrorists).group_by(Event)


def people_terrorist_may_know(session=session):
    """
    For every terrorist, list of terrorists that have been with him at least in one event.
    """
    terrorist_to_people_he_may_know = {}
    terrorists = session.query(Terrorist)
    for terrorist in terrorists:
        events_ids = [e.id for e in terrorist.events]
        q = session.query(Terrorist).distinct().join(Terrorist.events).filter(Event.id.in_(events_ids),
                                                                              Terrorist.id != terrorist.id)
        terrorist_to_people_he_may_know[terrorist] = q.all()
    return terrorist_to_people_he_may_know
