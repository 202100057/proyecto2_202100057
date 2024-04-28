const roles = {
    admin: ['crear', 'leer', 'actualizar', 'eliminar'],
    editor: ['leer', 'actualizar'],
    invitado: ['leer'],
  };
  
  function getRole(role) {
    if (!roles[role]) {
      throw new Error(`Rol '${role}' no encontrado.`);
    }
    return roles[role];
  }
  
  module.exports = {
    tienePermiso,
    getRole,
  };

  function tienePermiso(rol, permiso) {
    if (!roles[rol]) {
      return `Rol '${rol}' no encontrado.`;
    }
  
    if (!roles[rol].includes(permiso)) {
      return `El usuario con rol '${rol}' no tiene permiso para '${permiso}'.`;
    }
  
    return true;
  }
  
  // Ejemplo de uso:
  const userRole = 'editor';
  const permisosRequeridos = 'actualizar';
  
  const result = tienePermiso(userRole, permisosRequeridos);
  
  if (result !== true) {
    console.log(result);
  } else {
    console.log('El usuario tiene permiso para realizar la acción.');
  }
  