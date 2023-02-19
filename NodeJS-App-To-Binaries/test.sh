clientType="dog"
macA="08:00:27:91:e2:45"

apiKey=$(curl --location --request POST 'http://34.130.85.166:8000/genTok' \
--header 'Content-Type: application/json' \
--data-raw '{
    "clientType": "'$clientType'",
    "macA": "'$macA'"
}')
echo $apiKey