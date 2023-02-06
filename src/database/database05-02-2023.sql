--
-- PostgreSQL database dump
--

-- Dumped from database version 13.8
-- Dumped by pg_dump version 14.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: expenses; Type: TABLE; Schema: public; Owner: pol
--

CREATE TABLE public.expenses (
    id integer NOT NULL,
    name character varying(30) NOT NULL,
    amount numeric(10,0) DEFAULT 0 NOT NULL,
    date timestamp(6) with time zone DEFAULT now() NOT NULL,
    "userID" integer NOT NULL,
    category character varying(20) NOT NULL,
    shop character varying(20) NOT NULL,
    "isMinus" boolean DEFAULT true NOT NULL,
    price integer DEFAULT 0 NOT NULL,
    currency character varying(10) NOT NULL
);


ALTER TABLE public.expenses OWNER TO pol;

--
-- Name: expenses_id_seq; Type: SEQUENCE; Schema: public; Owner: pol
--

CREATE SEQUENCE public.expenses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.expenses_id_seq OWNER TO pol;

--
-- Name: expenses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pol
--

ALTER SEQUENCE public.expenses_id_seq OWNED BY public.expenses.id;


--
-- Name: expenses id; Type: DEFAULT; Schema: public; Owner: pol
--

ALTER TABLE ONLY public.expenses ALTER COLUMN id SET DEFAULT nextval('public.expenses_id_seq'::regclass);


--
-- Data for Name: expenses; Type: TABLE DATA; Schema: public; Owner: pol
--

INSERT INTO public.expenses VALUES (133, 'fresitas', 1, '2023-02-05 16:26:53+00', 5, 'Fruit', 'Other', true, 345, 'EURO');
INSERT INTO public.expenses VALUES (145, 'Pasta de reno', 1, '2023-02-05 15:46:28+00', 3, 'Grains', 'Ikea', true, 1400, 'SEK');
INSERT INTO public.expenses VALUES (146, 'Bus Kalmar 405', 1, '2023-02-05 15:54:02+00', 3, 'Public Transport', 'Bus', true, 2600, 'SEK');
INSERT INTO public.expenses VALUES (147, 'Espinacas', 1, '2023-02-05 17:13:36+00', 3, 'Vegetables', 'Coop', true, 1500, 'SEK');
INSERT INTO public.expenses VALUES (148, 'Galletas', 1, '2023-02-05 17:14:16+00', 3, 'Sweets', 'Coop', true, 1000, 'SEK');
INSERT INTO public.expenses VALUES (149, 'Manzanas', 1, '2023-02-05 17:14:37+00', 3, 'Fruit', 'Coop', true, 1595, 'SEK');
INSERT INTO public.expenses VALUES (151, 'Peras', 1, '2023-02-05 17:21:12+00', 3, 'Fruit', 'Coop', true, 2395, 'SEK');
INSERT INTO public.expenses VALUES (153, 'Garbanzos', 1, '2023-02-05 17:22:11+00', 3, 'Legumes', 'Coop', true, 2195, 'SEK');
INSERT INTO public.expenses VALUES (154, 'Huevos', 1, '2023-02-05 16:24:38+00', 3, 'Eggs', 'Coop', true, 1200, 'SEK');
INSERT INTO public.expenses VALUES (156, 'Lechuga', 1, '2023-02-05 16:24:38+00', 3, 'Vegetables', 'Coop', true, 1500, 'SEK');
INSERT INTO public.expenses VALUES (157, 'Pan Bimbo', 1, '2023-02-05 16:24:38+00', 3, 'Bread', 'Coop', true, 2000, 'SEK');
INSERT INTO public.expenses VALUES (158, 'Queso Rayado', 1, '2023-02-05 16:24:38+00', 3, 'Dairy', 'Coop', true, 4850, 'SEK');
INSERT INTO public.expenses VALUES (159, 'Queso Brie', 1, '2023-02-05 16:24:38+00', 3, 'Dairy', 'Coop', true, 1995, 'SEK');
INSERT INTO public.expenses VALUES (161, 'Panini', 1, '2023-02-05 16:39:46+00', 3, 'Pizza', 'Hemköp', true, 1000, 'SEK');
INSERT INTO public.expenses VALUES (164, 'Tomate Frito', 3, '2023-02-05 16:39:46+00', 3, 'Sauces', 'Hemköp', true, 1000, 'SEK');
INSERT INTO public.expenses VALUES (166, 'Bacon', 1, '2023-02-05 16:39:46+00', 3, 'Meat', 'Hemköp', true, 1150, 'SEK');
INSERT INTO public.expenses VALUES (167, 'Queso', 1, '2023-02-05 16:39:46+00', 3, 'Dairy', 'Hemköp', true, 5232, 'SEK');
INSERT INTO public.expenses VALUES (168, 'Guiozas', 1, '2023-02-05 16:39:46+00', 3, 'Vegetables', 'Hemköp', true, 1995, 'SEK');
INSERT INTO public.expenses VALUES (169, 'Banana', 1, '2023-02-05 16:59:34+00', 3, 'Fruit', 'Coop', true, 2444, 'SEK');
INSERT INTO public.expenses VALUES (170, 'Frutos secos', 1, '2023-02-05 16:59:34+00', 3, 'Nuts', 'Coop', true, 1500, 'SEK');
INSERT INTO public.expenses VALUES (171, 'Menta', 1, '2023-02-05 17:08:01+00', 3, 'Plant', 'Hemköp', true, 2395, 'SEK');
INSERT INTO public.expenses VALUES (129, 'Bolsitas', 8, '2023-02-05 10:52:43+00', 3, 'Gift', 'Ikea', true, 900, 'SEK');
INSERT INTO public.expenses VALUES (130, 'Baguette', 1, '2023-02-05 09:55:10+00', 3, 'Bread', 'Hemköp', true, 1695, 'SEK');
INSERT INTO public.expenses VALUES (131, 'Galletas', 1, '2023-02-05 10:55:54+00', 3, 'Sweets', 'Hemköp', true, 2995, 'SEK');
INSERT INTO public.expenses VALUES (172, 'Frankfurts', 1, '2023-02-05 17:08:01+00', 3, 'Meat', 'Hemköp', true, 1895, 'SEK');
INSERT INTO public.expenses VALUES (173, 'Pasas', 1, '2023-02-05 17:08:01+00', 3, 'Nuts', 'Hemköp', true, 1495, 'SEK');
INSERT INTO public.expenses VALUES (174, 'Bolsa de papel', 1, '2023-02-05 17:08:01+00', 3, 'Other', 'Hemköp', true, 400, 'SEK');
INSERT INTO public.expenses VALUES (177, 'Huevos', 1, '2023-02-05 18:29:01.082846+00', 3, 'Eggs', 'Hemköp', true, 3995, 'SEK');


--
-- Name: expenses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pol
--

SELECT pg_catalog.setval('public.expenses_id_seq', 177, true);


--
-- Name: expenses expenses_pkey; Type: CONSTRAINT; Schema: public; Owner: pol
--

ALTER TABLE ONLY public.expenses
    ADD CONSTRAINT expenses_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--
