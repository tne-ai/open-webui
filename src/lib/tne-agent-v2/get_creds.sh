# get_creds.sh
set -e

token=`aws sts get-session-token --output json --profile lucas-sts`
export AWS_ACCESS_KEY_ID=`echo -n "${token}" | jq -r .Credentials.AccessKeyId`
export AWS_SECRET_ACCESS_KEY=`echo -n "${token}" | jq -r .Credentials.SecretAccessKey`
export AWS_SESSION_TOKEN=`echo -n "${token}" | jq -r .Credentials.SessionToken`
export AWS_REGION='us-west-2'
