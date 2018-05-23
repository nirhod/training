from sqlalchemy import func, distinct
from sqlalchemy.orm import aliased
import sqlalchemy
from collections import defaultdict

from midas.tables import Terrorist, Organization, Event


def get_terrorists_not_in_organization_location(session) -> sqlalchemy.orm.query.Query:
    return session.query(Terrorist).join(Organization).filter(Terrorist.location != Organization.prime_location)


def get_last_event_every_terrorist(session) -> sqlalchemy.orm.query.Query:
    return session.query(Terrorist, func.max(Event.date)).join(Terrorist.events).group_by(Terrorist)


def get_number_of_terrorists_in_every_organization(session) -> sqlalchemy.orm.query.Query:
    return session.query(Organization, func.count()).outerjoin(Terrorist).group_by(Organization)


def get_number_of_organizations_in_every_event(session) -> sqlalchemy.orm.query.Query:
    return session.query(Event, func.count(distinct(Terrorist.organization_id))).outerjoin(Event.terrorists).group_by(
        Event)


def get_people_terrorist_may_know(session) -> dict:
    """
    For every terrorist, list of terrorists that have been with him at least in one event.
    """
    terrorist_acquaintances = defaultdict(list)
    terrorist_alias = aliased(Terrorist)
    q = session.query(terrorist_alias.name, Terrorist.name).join(terrorist_alias.events).join(Event.terrorists) \
        .filter(terrorist_alias.id != Terrorist.id).distinct()
    for line in q:
        terrorist_acquaintances[line[0]].append(line[1])
    return terrorist_acquaintances
