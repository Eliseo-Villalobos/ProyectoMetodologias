const db = require('../config/db');

const Proyecto = {

  // Obtener todos los proyectos con su primera imagen
  async getAll() {
    const [rows] = await db.execute(`
      SELECT p.*, 
        (SELECT ip.url_imagen 
         FROM imagen_proyecto ip 
         WHERE ip.id_proyecto = p.id_proyecto 
         LIMIT 1) AS imagen_principal
      FROM proyecto p
    `);
    return rows;
  },

  // Obtener un proyecto por ID con todas sus imágenes
  async getById(id) {
    const [rows] = await db.execute(
      'SELECT * FROM proyecto WHERE id_proyecto = ?', [id]
    );
    if (!rows[0]) return null;

    const [imagenes] = await db.execute(
      'SELECT * FROM imagen_proyecto WHERE id_proyecto = ?', [id]
    );

    return { ...rows[0], imagenes };
  },

  // Crear proyecto
  async create(titulo, tipo, descripcion_detallada) {
    const [result] = await db.execute(
      'INSERT INTO proyecto (titulo, tipo, descripcion_detallada) VALUES (?, ?, ?)',
      [titulo, tipo, descripcion_detallada]
    );
    return result.insertId;
  },

  // Actualizar proyecto
  async update(id, titulo, tipo, descripcion_detallada) {
    const [result] = await db.execute(
      'UPDATE proyecto SET titulo = ?, tipo = ?, descripcion_detallada = ? WHERE id_proyecto = ?',
      [titulo, tipo, descripcion_detallada, id]
    );
    return result.affectedRows;
  },

  // Eliminar proyecto
  async delete(id) {
    const [result] = await db.execute(
      'DELETE FROM proyecto WHERE id_proyecto = ?', [id]
    );
    return result.affectedRows;
  },

  // Agregar imagen a un proyecto
  async addImagen(id_proyecto, url_imagen) {
    const [result] = await db.execute(
      'INSERT INTO imagen_proyecto (id_proyecto, url_imagen) VALUES (?, ?)',
      [id_proyecto, url_imagen]
    );
    return result.insertId;
  },

  // Eliminar imagen
  async deleteImagen(id_imagen) {
    const [result] = await db.execute(
      'DELETE FROM imagen_proyecto WHERE id_imagen = ?', [id_imagen]
    );
    return result.affectedRows;
  },

  // Registrar visita (el trigger de BD actualiza total_visitas automáticamente)
  async registrarVisita(id_proyecto) {
    await db.execute(
      'INSERT INTO visita (id_proyecto) VALUES (?)', [id_proyecto]
    );
  }

};

module.exports = Proyecto;