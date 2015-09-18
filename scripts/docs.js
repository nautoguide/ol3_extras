require('shelljs/global');

exec('./node_modules/.bin/jsdoc libs/* --destination ol3-extras');

exec('sudo rm -rf /var/www/docs/jsdocs/ol3-extras/');

exec('sudo mv ol3-extras /var/www/docs/jsdocs/');