-- Insert admin user
INSERT INTO users (email, password, first_name, last_name, enabled, email_verified)
VALUES (
    'timmieoskarsson@yahoo.se',
    '$argon2id$v=19$m=65536,t=3,p=4$c29tZXNhbHQ$RdescudvJCsgt3ub+b+dWRWJTmaaJObG',
    'Timmie',
    'Oskarsson',
    TRUE,
    TRUE
);

-- Insert user security record
INSERT INTO user_security (user_id)
SELECT id FROM users WHERE email = 'timmieoskarsson@yahoo.se';

-- Assign admin role
INSERT INTO user_roles (user_id, role_id)
SELECT 
    u.id,
    r.id
FROM users u
CROSS JOIN roles r
WHERE u.email = 'timmieoskarsson@yahoo.se'
AND r.name = 'ROLE_ADMIN'; 