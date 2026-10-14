CREATE TABLE public.partnership_requests (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 created_at timestamptz NOT NULL DEFAULT now(),
 name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
 email text NOT NULL CHECK (char_length(email) <= 255),
 organization text NOT NULL DEFAULT '' CHECK (char_length(organization) <= 150),
 interest text NOT NULL CHECK (interest IN ('Robot purchase','Lake cleaning','Water analytics','Collaboration','Investment','Meeting')),
 message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 2000),
 preferred_date date,
 preferred_time text CHECK (preferred_time IN ('Morning','Afternoon','Evening') OR preferred_time IS NULL),
 timezone text NOT NULL DEFAULT 'Asia/Kolkata' CHECK (char_length(timezone) <= 100)
);
GRANT ALL ON public.partnership_requests TO service_role;
ALTER TABLE public.partnership_requests ENABLE ROW LEVEL SECURITY;