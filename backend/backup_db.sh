source .env
while true; do
pg_dump -d postgres -h mindz -U postgres > backup.sql
aws s3 cp backup.sql s3://maktabti-backup/database/$(date +%s).sql
sleep 6h
done