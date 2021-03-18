-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-03-2021 a las 02:25:04
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 7.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `biblioteca`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `nombre` varchar(50) NOT NULL,
  `categoria_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`nombre`, `categoria_id`) VALUES
('AUTORES ARGENTINOS', 5),
('AUTORES DE CIENCIA FICCIÓN', 10),
('AUTORES ESPAÑOLES', 18),
('AUTORESCHINOS', 22),
('BESTSELLERS', 4),
('CLASICOS DE CIENCIA FICCIÓN', 15),
('CLASICOS DE LA LITERATURA', 13),
('CUENTOS CHINOS', 23),
('DRAMA', 20),
('INFANTIL', 3),
('LIBROS EN INGLÉS', 8),
('NUEVA CATEGORIA', 16),
('SUPER NUEVA CATEGORIA', 17);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libros`
--

CREATE TABLE `libros` (
  `libro_id` int(11) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `descripcion` varchar(60) NOT NULL,
  `categoria_id` int(11) NOT NULL,
  `persona_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `libros`
--

INSERT INTO `libros` (`libro_id`, `nombre`, `descripcion`, `categoria_id`, `persona_id`) VALUES
(1, '1984', 'EN UN FUTURO DISTÓPICO..', 4, NULL),
(2, 'EL ALEPH', 'UNA COLECCIÓN DE CUENTOS DE JORGE LUIS BORGES', 5, 6),
(3, 'EL GATO CON BOTAS', 'UN CLASICO DE LA LITERATURA PARA NIÑOS.', 3, 7),
(5, 'CENICIENTA', 'UN CUENTO DE HADAS.', 3, 6),
(6, 'BLANCA NIEVES Y LOS SIETE ENANITOS.', 'CUENTO CLÁSICO DE LOS HERMANOS GRIMM', 3, 7),
(7, 'EL GAUCHO MARTÍN FIERRO', 'UNA DE LAS MAS RECONOCIDAS OBRAS DE LA LITERATURA ARGENTINA.', 5, NULL),
(8, 'LOS TRES PATITOS', ' ZARAZA', 3, 14),
(9, 'PINOCHO', 'SIN DESCRIPCIÓN.', 3, 14),
(12, 'RAYUELA', 'UNA DE LAS NOVELAS MAS RECONOCIDAS DE JULIO CORTAZAR.', 5, 6),
(13, 'LOS PIRATAS DEL CARIBE', 'LOS PIRATAS..', 3, NULL),
(14, 'EL HOMBRE DUPLICADO', 'LA NOVELA MAS RECONOCIDA DEL AUTOR JOSÉ SARAMAGO', 18, NULL),
(15, 'EL TUNEL', 'LA NOVELA MAS RECONOCIDA DEL AUTOR DE ERNESTO SABATO', 5, NULL),
(18, 'LIBRO X', 'PIRIPRP', 5, 6),
(19, 'LIBRO NUEVO', 'ZARAZA', 5, 6),
(20, 'PEPE', 'ZARAZA', 5, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas`
--

CREATE TABLE `personas` (
  `persona_id` int(20) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `alias` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `personas`
--

INSERT INTO `personas` (`persona_id`, `nombre`, `apellido`, `email`, `alias`) VALUES
(6, 'CARLOS', 'SANCHEZ', 'CARLOSSAN@GMAIL.COM', 'CARLITOS89'),
(7, 'PEDRO', 'GARCIA', 'PEPITOG@GMAIL.COM', 'PEDROG'),
(14, 'ROBERTO', 'FERNADEZ', 'ELCHAVO@GMAIL.COM', 'ROBERTO'),
(20, 'PERSONA', 'PARA BORRAR', 'SEBORRA@GMAIL.COM', 'BORRADO');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`categoria_id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `libros`
--
ALTER TABLE `libros`
  ADD PRIMARY KEY (`libro_id`),
  ADD UNIQUE KEY `nombre` (`nombre`),
  ADD KEY `categoria_id` (`categoria_id`),
  ADD KEY `persona_ibfk_1` (`persona_id`);

--
-- Indices de la tabla `personas`
--
ALTER TABLE `personas`
  ADD PRIMARY KEY (`persona_id`) USING BTREE,
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `categoria_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `libros`
--
ALTER TABLE `libros`
  MODIFY `libro_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `personas`
--
ALTER TABLE `personas`
  MODIFY `persona_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `libros`
--
ALTER TABLE `libros`
  ADD CONSTRAINT `libros_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`categoria_id`),
  ADD CONSTRAINT `persona_ibfk_1` FOREIGN KEY (`persona_id`) REFERENCES `personas` (`persona_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
