const report = require('@alexistessier/report');

/*------------------------*/
report('notice', '-- update bucket policy script --');
/*------------------------*/

const {
	shell,
	bucket,
	bucketARN
} = require('./script-options');

const {
	policyUserName,
	policyName
} = require(`.${bucket}/settings`).circleCI;

report('notice', `-- update bucket policy on ${bucketARN} --`);

shell.exec(`aws iam put-user-policy --user-name ${policyUserName} --policy-name ${policyName} --policy-document file://aws/${bucket}/circle-ci-allow-sync.json`);

report('success', '-- update bucket policy done on ${bucketARN} --');