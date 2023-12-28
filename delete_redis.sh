redis-cli -u redis://default:FWkgzzrYTyh6ZnHfUGprMJQalTxp6kW6@redis-11331.c308.sa-east-1-1.ec2.cloud.redislabs.com:11331 EVAL "$(cat delete_except.lua)" 0 "Bucket" "createkey"
