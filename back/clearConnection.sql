SELECT pg_terminate_backend(pid)
FROM   pg_stat_activity
WHERE  usename = 'jsirhxxk'
AND    pid <> pg_backend_pid();