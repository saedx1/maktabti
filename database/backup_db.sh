source ./.env
while true; do
PGPASSWORD=$PGPASSWORD pg_dump -d postgres -h localhost -U postgres > backup.sql
aws s3 cp backup.sql s3://maktabti-backups/database/$(date +%s).sql --profile maktabti
sleep 1h
done
