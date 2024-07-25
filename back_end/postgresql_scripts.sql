
-- public.applications definition

-- Drop table

drop TABLE if exists public.applications CASCADE;

CREATE TABLE if not exists public.applications (
	application_id serial4 NOT NULL,
	opportunity_id int4 NULL,
	user_id int4 NULL,
	application_date timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	status varchar(50) NOT NULL,
	CONSTRAINT applications_pkey PRIMARY KEY (application_id),
	CONSTRAINT applications_status_check CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'accepted'::character varying, 'rejected'::character varying])::text[])))
);




-- public.organizations definition

-- Drop table

DROP TABLE if exists public.organizations CASCADE;

CREATE TABLE if not exists public.organizations (
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

-- public.reviews definition

-- Drop table

DROP TABLE if exists public.reviews CASCADE;

CREATE TABLE if not exists public.reviews (
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

DROP TABLE if exists public.skills CASCADE;

CREATE TABLE if not exists public.skills (
	skill_id serial4 NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT skills_pkey PRIMARY KEY (skill_id)
);

-- public.user_skills definition

-- Drop table

DROP TABLE if exists public.user_skills CASCADE;

CREATE TABLE if not exists public.user_skills (
	user_id int4 NOT NULL,
	skill_id int4 NOT NULL,
	CONSTRAINT user_skills_pkey PRIMARY KEY (user_id, skill_id)
);




-- public.users definition

-- Drop table

DROP TABLE if exists public.users CASCADE;

CREATE TABLE if not exists public.users (
	user_id serial4 NOT NULL,
	"name" varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	phone varchar(20) NULL,
	address text NULL,
	"role" varchar(50) NOT NULL,
	CONSTRAINT users_email_key UNIQUE (email),
	CONSTRAINT users_pkey PRIMARY KEY (user_id),
	CONSTRAINT users_role_check CHECK (((role)::text = ANY ((ARRAY['volunteer'::character varying, 'organization'::character varying])::text[])))
);

-- public.volunteer_opportunities definition

-- Drop table

DROP TABLE if exists public.volunteer_opportunities CASCADE;

CREATE TABLE if not exists public.volunteer_opportunities (
	opportunity_id serial4 NOT NULL,
	organization_id int4 NULL,
	title varchar(255) NOT NULL,
	description text NULL,
	"location" varchar(255) NULL,
	start_date date NULL,
	end_date date NULL,
	required_skills text NULL,
	requirements text NULL,
	CONSTRAINT volunteer_opportunities_pkey PRIMARY KEY (opportunity_id)
);


-- public.jobs definition

-- Drop table

 DROP TABLE if exists public.jobs CASCADE;

CREATE TABLE if not exists public.jobs (
	id serial4 NOT NULL,
	title varchar(256) NULL,
	description text NULL,
	company varchar(256) NULL,
	imageurl text NULL,
	CONSTRAINT newtable_pk PRIMARY KEY (id)
);



INSERT INTO public.jobs
(id, title, description, company, imageurl)
VALUES(1, 'Build Site Volunteers and Volunteer Crew Leads', 'We are in need of volunteers to help complete construction of our future Build projects. When completed, this site will provide affordable homeownership opportunities for our community.Skilled/experienced individuals with a background in construction, renovations and power tool use are very much welcome to apply! We are also qualified and happy to teach any unskilled individuals who have a desire to help and learn on the go!', 'HABITAT FOR HUMANITY GUELPH WELLINGTON', 'https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2019/8/12/0/Original_Habitat-for-Humanity_group-shot-workers.jpg.rend.hgtvcom.616.411.suffix/1565625346290.jpeg');
INSERT INTO public.jobs
(id, title, description, company, imageurl)
VALUES(2, 'ReStore Associate', 'The ReStore Associate accepts donations received at the store, from entry into the store to pricing and stocking inventory onto the sales floor, and for providing an excellent customer service experience to both residential and corporate donors.Please fill out our volunteer application, this can be found here: https://habitatgw.ca/volunteer/apply-to-volunteer/', 'HABITAT FOR HUMANITY GUELPH WELLINGTON', 'https://www.habitathillsborough.org/wp-content/uploads/2018/09/Blog-page-ReStore-hiring.jpg');
INSERT INTO public.jobs
(id, title, description, company, imageurl)
VALUES(3, 'Kitchen Salvage Service Crew (aka Deconstruction)', 'The Kitchen Salvage Service crew (also known as the deconstruction crew) helps remove kitchen components from local homes and businesses, and loads it onto the ReStore truck, so that the kitchen can be donated to the Habitat ReStore. When the ReStore sells these kitchens, the funds support Habitat for Humanity''s mission of building affordable homes in our community.Kitchen Salvage Service Crew members are ambassadors of the ReStore and Habitat for Humanity. They will be trained on proper processes, including safety measures. Crew members agree that the donor''s home/business and donation is to be treated with care and respect.', 'HABITAT FOR HUMANITY GUELPH WELLINGTON', 'https://cdn.insteading.com/wp-content/uploads/2016/02/french-country-kitchen-700x385.jpg');
INSERT INTO public.jobs
(id, title, description, company, imageurl)
VALUES(4, 'Be a STEM Role Model - Guelph', 'Volunteering with CAGIS is a rewarding opportunity to inspire the next generation of STEM leaders. By sharing your knowledge and passion, you can spark curiosity and encourage young minds to explore the vast possibilities within science, technology, engineering, and mathematics. Whether leading interactive workshops, organizing field trips, or providing mentorship, your contribution will have a lasting impact on these young enthusiasts’ educational journey and career choices. Together, we can create an inclusive and supportive environment that empowers every participant to reach their full potential.', 'CANADIAN ASSOCIATION FOR GIRLS IN SCIENCE', 'https://www.womenintech.co.uk/wp-content/uploads/2019/03/cc1af223-3367-4cdb-bc4a-d4cf4a503fcb-768x385.png');

ALTER TABLE public.users ADD organization_id int4 NULL;
COMMENT ON COLUMN public.users.organization_id IS 'organization id';

ALTER TABLE public.jobs ADD "location" varchar(100) NULL;
COMMENT ON COLUMN public.jobs."location" IS 'location city';
ALTER TABLE public.jobs ADD user_id int4 NULL;
COMMENT ON COLUMN public.jobs.user_id IS 'user id to link with users table';

ALTER TABLE public.jobs DROP COLUMN company;

ALTER TABLE public.jobs RENAME COLUMN imageurl TO image;
ALTER TABLE public.jobs ALTER COLUMN image TYPE bytea USING image::bytea;

ALTER TABLE public.jobs ADD image_type varchar(100) NULL;
COMMENT ON COLUMN public.jobs.image_type IS 'image type, format like: data:image/jpeg;base64';

