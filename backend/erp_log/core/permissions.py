from fastapi import Depends, HTTPException
from erp_log.core.security import get_current_user

def check_permission(allowed_roles: list[str]):
    def inner(current_user = Depends(get_current_user)):
        if current_user["perfil"] not in allowed_roles:
            raise HTTPException(status_code=403, detail="Acesso negado")
        return current_user
    return inner
