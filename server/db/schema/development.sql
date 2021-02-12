INSERT INTO customers(first_name, last_name, email, password)
VALUES ('Eva' ,'Stanley', 'kelez@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Louisa', ' Myers', 'getsd@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Bells', ' corner', 'bells@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('terry', ' waya', 'terry@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('kerry' ,' washington', 'kerry@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('olivia', ' pope', 'olivia@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');



INSERT INTO job_postings(customer_id, description, therapy, sexuality)
values(2, 'HELLO MY NAME IS MARY', 'Art Therapy', 'Gay')
RETURNING *;

INSERT INTO symptomes (name)
VALUES('ADHD'),('Addicition'),('Adoption'),('Alochol Use'),('Alzheimers'),('Anger Management'),
('Antisocial Personality'),('Anxiety'),('Asperger Syndrome'),('Autism'),('Behavioral Issues'),
('Borderline Personality'),('Bipolar Disorder'),('Child or Adolescent'),('Chronic Illness'),
('Chronic Impulsivity'),('Chronic Pain'),('Chronic Relapse'),('Codependency'),('Coding Skills'),
('Depression'),('Development Disorders'),('Divorce'),('Domestic Abuse'),('Domestic Violence'),
('Drug Abuse'),('Dual Diagnosis'),('Eating Disorders'),('Emotional Disturbance'),('Family Conflict'),
('Gambling'),('Grief'),('Hoarding'),('Infertility'),('Infidelity'),('Intellectual Disability'),
('Internet Addiction'),('Learning Disabilities'),('Life Coaching'),('Life Transitions'),('Martial and Premartial'),
('Medication Management'),('Men Issues'),('Narcissistic Personality'),('Obesity'),
('Obsessive-Compulsive'),('Parenting'),('Peer Relationships'),('Relationship Issues'),
('School Issues'),('Self Esteem'),('Self Harming'),('Sexual Abuse'),('Sexual Addiction'),
('Sports Performance'),('Stress'),('Substance Use'),('Sucidial Ideation'),('Team Violence'),
('Testing and Evaluation'),('Transgender'),('Trauma and PTSD'),('Traumatic Brain Injury'),('Video Game Addiction'),
('Weight Loss'),('Women Issues');

-- ALTERED TABLE TO SET COLUMN TO DEFAULT

alter table job_postings alter column appointmentFor set DEFAULT NULL;      
alter table job_postings alter column description set DEFAULT NULL;
alter table job_postings alter column therapy set DEFAULT NULL;
alter table job_postings alter column insurance set DEFAULT NULL;
alter table job_postings alter column sexuality set DEFAULT NULL;
alter table job_postings alter column age set DEFAULT NULL;
alter table job_postings alter column language set DEFAULT NULL;
alter table job_postings alter column ethnicity set DEFAULT NULL;
alter table job_postings alter column faith set DEFAULT NULL;
alter table job_postings alter column country set DEFAULT NULL;
alter table job_postings alter column typeOfPayment set DEFAULT NULL;
alter table job_postings alter column maxPrice set DEFAULT NULL;
alter table job_postings alter column minPrice set DEFAULT NULL;
alter table job_postings alter column appointmentFrequency set DEFAULT NULL;
alter table job_postings alter column timeRequirement set DEFAULT NULL;
alter table job_postings alter column availabilityFrom set DEFAULT NULL;
alter table job_postings alter column availabilityTo set DEFAULT NULL;
alter table job_postings alter column postCreationTimeZone set DEFAULT NULL;






