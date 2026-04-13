-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3307
-- Tiempo de generación: 13-04-2026 a las 00:28:48
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_reservas_viajes`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aerolineas`
--

CREATE TABLE `aerolineas` (
  `id_aerolinea` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `logo_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `aerolineas`
--

INSERT INTO `aerolineas` (`id_aerolinea`, `nombre`, `logo_url`, `created_at`) VALUES
(1, 'Volaris', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Volaris_logo.svg/1200px-Volaris_logo.svg.png', '2026-04-12 06:15:58'),
(2, 'Aerobús', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Autobus_ADO.svg/1200px-Autobus_ADO.svg.png', '2026-04-12 06:15:58'),
(3, 'Viva Aerobús', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/VivaAerobus-logo.svg/1200px-VivaAerobus-logo.svg.png', '2026-04-12 06:15:58'),
(4, 'Aeroméxico', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Aerom%C3%A9xico_Logo.svg/1200px-Aerom%C3%A9xico_Logo.svg.png', '2026-04-12 06:15:58'),
(5, 'TAR Aerolíneas', '', '2026-04-12 06:15:58');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id_reserva` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_viaje` int(11) NOT NULL,
  `fecha_reserva` timestamp NOT NULL DEFAULT current_timestamp(),
  `cantidad_personas` int(11) NOT NULL DEFAULT 1,
  `estado` enum('pendiente','confirmada','cancelada') DEFAULT 'pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`id_reserva`, `id_usuario`, `id_viaje`, `fecha_reserva`, `cantidad_personas`, `estado`) VALUES
(1, 1, 1, '2026-04-12 07:44:20', 2, 'pendiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `email`, `password`, `telefono`, `created_at`) VALUES
(1, 'juan', 'juanmanuelfriascortes@gmail.com', '$2b$10$7ybEPo6hJfWmvGcBPZbZUODKTB.FCooiw/A78Sh76Pka72vw/elT6', '4491810605', '2026-04-11 22:26:03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `viajes`
--

CREATE TABLE `viajes` (
  `id_viaje` int(11) NOT NULL,
  `destino` varchar(150) NOT NULL,
  `pais` varchar(80) NOT NULL,
  `fecha_salida` date NOT NULL,
  `fecha_regreso` date NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `cupo_disponible` int(11) NOT NULL DEFAULT 20,
  `descripcion` text DEFAULT NULL,
  `imagen_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_aerolinea` int(11) DEFAULT NULL,
  `latitud` decimal(10,7) DEFAULT NULL,
  `longitud` decimal(10,7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `viajes`
--

INSERT INTO `viajes` (`id_viaje`, `destino`, `pais`, `fecha_salida`, `fecha_regreso`, `precio`, `cupo_disponible`, `descripcion`, `imagen_url`, `created_at`, `id_aerolinea`, `latitud`, `longitud`) VALUES
(1, 'Cancún', 'México', '2025-07-01', '2025-07-08', 15000.00, 20, 'Disfruta las playas del Caribe mexicano', 'https://images.unsplash.com/photo-1552074284-5e88ef1aef18?w=600', '2026-04-12 06:41:35', 1, 21.1619000, -86.8515000),
(2, 'Ciudad de México', 'México', '2025-08-10', '2025-08-15', 8000.00, 15, 'Explora la capital llena de cultura e historia', 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=600', '2026-04-12 06:41:35', 2, 19.4326000, -99.1332000),
(3, 'Los Cabos', 'México', '2025-09-05', '2025-09-12', 18000.00, 10, 'El paraíso del desierto y el mar', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600', '2026-04-12 06:41:35', 3, 22.8905000, -109.9167000),
(4, 'Guadalajara', 'México', '2025-07-20', '2025-07-25', 6000.00, 25, 'La perla de occidente te espera', 'https://images.unsplash.com/photo-1568952433726-3896e3881c65?w=600', '2026-04-12 06:41:35', 4, 20.6597000, -103.3496000),
(5, 'Puerto Vallarta', 'México', '2025-10-01', '2025-10-07', 12000.00, 18, 'Playas y vida nocturna inigualable', 'https://images.unsplash.com/photo-1510097467424-192d713fd8b2?w=600', '2026-04-12 06:41:35', 1, 20.6534000, -105.2253000);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `aerolineas`
--
ALTER TABLE `aerolineas`
  ADD PRIMARY KEY (`id_aerolinea`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id_reserva`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_viaje` (`id_viaje`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `viajes`
--
ALTER TABLE `viajes`
  ADD PRIMARY KEY (`id_viaje`),
  ADD KEY `id_aerolinea` (`id_aerolinea`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `aerolineas`
--
ALTER TABLE `aerolineas`
  MODIFY `id_aerolinea` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id_reserva` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `viajes`
--
ALTER TABLE `viajes`
  MODIFY `id_viaje` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `reservas_ibfk_2` FOREIGN KEY (`id_viaje`) REFERENCES `viajes` (`id_viaje`) ON DELETE CASCADE;

--
-- Filtros para la tabla `viajes`
--
ALTER TABLE `viajes`
  ADD CONSTRAINT `viajes_ibfk_1` FOREIGN KEY (`id_aerolinea`) REFERENCES `aerolineas` (`id_aerolinea`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
