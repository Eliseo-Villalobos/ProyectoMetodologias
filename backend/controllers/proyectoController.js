const Proyecto = require('../models/proyectoModel');

// Obtener todos los proyectos
const getAll = async (req, res) => {
  try {
    const proyectos = await Proyecto.getAll();
    res.json(proyectos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener proyectos' });
  }
};

// Obtener un proyecto por ID
const getById = async (req, res) => {
  try {
    const proyecto = await Proyecto.getById(req.params.id);
    if (!proyecto) {
      return res.status(404).json({ mensaje: 'Proyecto no encontrado' });
    }
    // Registrar visita cada vez que se consulta un proyecto
    await Proyecto.registrarVisita(req.params.id);
    res.json(proyecto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener proyecto' });
  }
};

// Crear proyecto
const create = async (req, res) => {
  const { titulo, tipo, descripcion_detallada } = req.body;

  if (!titulo || !tipo) {
    return res.status(400).json({ mensaje: 'Título y tipo son obligatorios' });
  }

  const tiposValidos = ['casa', 'edificio', 'render', 'plano'];
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({ mensaje: `Tipo inválido. Debe ser: ${tiposValidos.join(', ')}` });
  }

  try {
    const id = await Proyecto.create(titulo, tipo, descripcion_detallada);
    res.status(201).json({ mensaje: 'Proyecto creado', id_proyecto: id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear proyecto' });
  }
};

// Actualizar proyecto
const update = async (req, res) => {
  const { titulo, tipo, descripcion_detallada } = req.body;

  if (!titulo || !tipo) {
    return res.status(400).json({ mensaje: 'Título y tipo son obligatorios' });
  }

  const tiposValidos = ['casa', 'edificio', 'render', 'plano'];
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({ mensaje: `Tipo inválido. Debe ser: ${tiposValidos.join(', ')}` });
  }

  try {
    const filas = await Proyecto.update(req.params.id, titulo, tipo, descripcion_detallada);
    if (filas === 0) {
      return res.status(404).json({ mensaje: 'Proyecto no encontrado' });
    }
    res.json({ mensaje: 'Proyecto actualizado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar proyecto' });
  }
};

// Eliminar proyecto
const remove = async (req, res) => {
  try {
    const filas = await Proyecto.delete(req.params.id);
    if (filas === 0) {
      return res.status(404).json({ mensaje: 'Proyecto no encontrado' });
    }
    res.json({ mensaje: 'Proyecto eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar proyecto' });
  }
};

// Agregar imagen a un proyecto
const addImagen = async (req, res) => {
  const { url_imagen } = req.body;

  if (!url_imagen) {
    return res.status(400).json({ mensaje: 'La URL de la imagen es obligatoria' });
  }

  try {
    const id = await Proyecto.addImagen(req.params.id, url_imagen);
    res.status(201).json({ mensaje: 'Imagen agregada', id_imagen: id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al agregar imagen' });
  }
};

// Eliminar imagen
const deleteImagen = async (req, res) => {
  try {
    const filas = await Proyecto.deleteImagen(req.params.id_imagen);
    if (filas === 0) {
      return res.status(404).json({ mensaje: 'Imagen no encontrada' });
    }
    res.json({ mensaje: 'Imagen eliminada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar imagen' });
  }
};

module.exports = { getAll, getById, create, update, remove, addImagen, deleteImagen };