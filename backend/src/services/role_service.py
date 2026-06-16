from sqlmodel import Session
from src.repositories.role_repository import RoleRepository
from src.database.model.models import Role
from datetime import datetime, timezone

class RoleService:

    def __init__(self):
        # Inisialisasi 'Tangan' untuk akses database
        self.repo = RoleRepository()

    def get_roles(self, db: Session):
        return self.repo.get_all(db)

    def get_role(self, db: Session, role_id: int):
        return self.repo.get_by_id(db, role_id)

    def create_role(self, db: Session, data):
        now = datetime.now(timezone.utc)
        role = Role(
            name=data.name,
            description=data.description,
            created_at=now,
            updated_at=now
        )
        return self.repo.create(db, role)

    def update_role(self, db: Session, role_id: int, data):
        role = self.repo.get_by_id(db, role_id)
        if not role:
            return None

        if data.name is not None:
            role.name = data.name
        if data.description is not None:
            role.description = data.description

        role.updated_at = datetime.now(timezone.utc)
        return self.repo.update(db, role)

    def delete_role(self, db: Session, role_id: int):
        role = self.repo.get_by_id(db, role_id)
        if not role:
            return None

        self.repo.delete(db, role_id)
        return role
    