-- public.users definition

-- Drop table

-- DROP TABLE public.users;

-- public.applications definition

-- Drop table

-- DROP TABLE public.applications;

CREATE TABLE public.applications (
	application_id serial4 NOT NULL,
	opportunity_id int4 NULL,
	user_id int4 NULL,
	application_date timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	status varchar(50) NOT NULL,
	CONSTRAINT applications_pkey PRIMARY KEY (application_id),
	CONSTRAINT applications_status_check CHECK (((status)::text = ANY (ARRAY[('pending'::character varying)::text, ('accepted'::character varying)::text, ('rejected'::character varying)::text])))
);

-- public.jobs definition

-- Drop table

-- DROP TABLE public.jobs;

CREATE TABLE public.jobs (
	id serial4 NOT NULL,
	title varchar(256) NULL,
	description text NULL,
	image bytea NULL,
	"location" varchar(100) NULL,
	user_id int4 NULL,
	image_type varchar(100) NULL,
	skills text NULL,
	status varchar(50) NULL,
	CONSTRAINT newtable_pk PRIMARY KEY (id)
);

-- public.reviews definition

-- Drop table

-- DROP TABLE public.reviews;

CREATE TABLE public.reviews (
	review_id serial4 NOT NULL,
	opportunity_id int4 NULL,
	user_id int4 NULL,
	rating int4 NULL,
	"comment" text NULL,
	review_date timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT reviews_pkey PRIMARY KEY (review_id),
	CONSTRAINT reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);

-- public.skills definition

-- Drop table

-- DROP TABLE public.skills;

CREATE TABLE public.skills (
	skill_id serial4 NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT skills_pkey PRIMARY KEY (skill_id)
);

-- public.organizations definition

-- Drop table

-- DROP TABLE public.organizations;

CREATE TABLE public.organizations (
	organization_id serial4 NOT NULL,
	"name" varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	phone varchar(20) NULL,
	address text NULL,
	website varchar(255) NULL,
	description text NULL,
	CONSTRAINT organizations_email_key UNIQUE (email),
	CONSTRAINT organizations_pkey PRIMARY KEY (organization_id)
);

CREATE TABLE public.users (
	user_id serial4 NOT NULL,
	"name" varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	phone varchar(20) NULL,
	address text NULL,
	"role" varchar(50) NOT NULL,
	organization_id int4 NULL,
	CONSTRAINT users_email_key UNIQUE (email),
	CONSTRAINT users_pkey PRIMARY KEY (user_id),
	CONSTRAINT users_role_check CHECK (((role)::text = ANY (ARRAY[('volunteer'::character varying)::text, ('organization'::character varying)::text])))
);